'use strict';
import * as vscode from 'vscode';
import { join, dirname } from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { AppInsightsClient } from './appInsightsClient';

const TmpDir = os.tmpdir();

export class CodeManager {
    private _outputChannel: vscode.OutputChannel;
    private _terminal: vscode.Terminal;
    private _isRunning: boolean;
    private _process;
    private _codeFile: string;
    private _isTmpFile: boolean;
    private _languageId: string;
    private _cwd: string;
    private _config: vscode.WorkspaceConfiguration;
    private _appInsightsClient: AppInsightsClient;

    constructor() {
        this._outputChannel = vscode.window.createOutputChannel('Code');
        this._terminal = null;
        this._appInsightsClient = new AppInsightsClient();
    }

    public onDidCloseTerminal(): void {
        this._terminal = null;
    }

    public run(languageId: string = null): void {
        if (this._isRunning) {
            vscode.window.showInformationMessage('Code is already running!');
            return;
        }

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No code found or selected.');
            return;
        }

        this.initialize(editor);

        let fileExtension = this.getFileExtension(editor);
        let executor = this.getExecutor(languageId, fileExtension);
        // undefined or null
        if (executor == null) {
            vscode.window.showInformationMessage('Code language not supported or defined.');
            return;
        }

        this.getCodeFileAndExecute(editor, fileExtension, executor);
    }

    public runCustomCommand(): void {
        if (this._isRunning) {
            vscode.window.showInformationMessage('Code is already running!');
            return;
        }

        let editor = vscode.window.activeTextEditor;
        this.initialize(editor);

        let executor = this._config.get<string>('customCommand');

        if (editor) {
            let fileExtension = this.getFileExtension(editor);
            this.getCodeFileAndExecute(editor, fileExtension, executor, false);
        } else {
            this.executeCommand(executor, false);
        }
    }

    public runByLanguage(): void {
        this._appInsightsClient.sendEvent('runByLanguage');
        let config = vscode.workspace.getConfiguration('code-runner');
        var executorMap = config.get<any>('executorMap');
        vscode.window.showQuickPick(Object.keys(executorMap), { placeHolder: "Type or select language to run" }).then((languageId) => {
            if (languageId !== undefined) {
                this.run(languageId);
            }
        });
    }

    public stop(): void {
        this._appInsightsClient.sendEvent('stop');
        if (this._isRunning) {
            this._isRunning = false;
            let kill = require('tree-kill');
            kill(this._process.pid);
        }
    }

    private initialize(editor: vscode.TextEditor): void {
        this._config = vscode.workspace.getConfiguration('code-runner');
        this._cwd = this._config.get<string>('cwd');
        if (this._cwd) {
            return;
        }
        if (this._config.get<boolean>('fileDirectoryAsCwd') && editor && !editor.document.isUntitled) {
            this._cwd = dirname(editor.document.fileName);
        } else {
            this._cwd = vscode.workspace.rootPath;
        }
        if (this._cwd) {
            return;
        }
        this._cwd = TmpDir;
    }

    private getCodeFileAndExecute(editor: vscode.TextEditor, fileExtension: string, executor: string, appendFile: boolean = true): any {
        let selection = editor.selection;

        if (selection.isEmpty && !editor.document.isUntitled) {
            this._isTmpFile = false;
            this._codeFile = editor.document.fileName;

            if (this._config.get<boolean>('saveFileBeforeRun')) {
                return editor.document.save().then(() => {
                    this.executeCommand(executor, appendFile);
                });
            }
        } else {
            let text = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);

            if (this._languageId === "php") {
                text = text.trim();
                if (!text.startsWith("<?php")) {
                    text = "<?php\r\n" + text;
                }
            }

            this._isTmpFile = true;
            let folder = editor.document.isUntitled ? this._cwd : dirname(editor.document.fileName);
            this.createRandomFile(text, folder, fileExtension);
        }

        this.executeCommand(executor, appendFile);
    }

    private rndName(): string {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    }

    private createRandomFile(content: string, folder: string, fileExtension: string) {
        let fileType = "";
        let languageIdToFileExtensionMap = this._config.get<any>('languageIdToFileExtensionMap');
        if (this._languageId && languageIdToFileExtensionMap[this._languageId]) {
            fileType = languageIdToFileExtensionMap[this._languageId];
        } else {
            if (fileExtension) {
                fileType = fileExtension;
            } else {
                fileType = '.' + this._languageId;
            }
        }
        let tmpFileName = 'temp-' + this.rndName() + fileType;
        this._codeFile = join(folder, tmpFileName);
        fs.writeFileSync(this._codeFile, content);
    }

    private getExecutor(languageId: string, fileExtension: string): string {
        this._languageId = languageId === null ? vscode.window.activeTextEditor.document.languageId : languageId;
        let executorMap = this._config.get<any>('executorMap');
        let executor = executorMap[this._languageId];
        // executor is undefined or null
        if (executor == null && fileExtension) {
            let executorMapByFileExtension = this._config.get<any>('executorMapByFileExtension');
            executor = executorMapByFileExtension[fileExtension];
            if (executor != null) {
                this._languageId = fileExtension;
            }
        }
        if (executor == null) {
            this._languageId = this._config.get<string>('defaultLanguage');
            executor = executorMap[this._languageId];
        }

        return executor;
    }

    private getFileExtension(editor: vscode.TextEditor): string {
        let fileName = editor.document.fileName;
        let index = fileName.lastIndexOf(".");
        if (index !== -1) {
            return fileName.substr(index);
        } else {
            return "";
        }
    }

    private executeCommand(executor: string, appendFile: boolean = true) {
        if (this._config.get<boolean>('runInTerminal') && !this._isTmpFile) {
            this.executeCommandInTerminal(executor, appendFile);
        } else {
            this.executeCommandInOutputChannel(executor, appendFile);
        }
    }

    private getWorkspaceRoot(codeFileDir: string): string {
        return vscode.workspace.rootPath ? vscode.workspace.rootPath : codeFileDir;
    }

    /**
     * Gets the base name of the code file, that is without its directory.
     */
    private getCodeBaseFile(): string {
        let regexMatch = this._codeFile.match(/.*[\/\\](.*)/)
        return regexMatch.length ? regexMatch[1] : this._codeFile
    }

    /**
     * Gets the code file name without its directory and extension.
     */
    private getCodeFileWithoutDirAndExt(): string {
        let regexMatch = this._codeFile.match(/.*[\/\\](.*(?=\..*))/)
        return regexMatch.length ? regexMatch[1] : this._codeFile
    }

    /**
     * Gets the directory of the code file.
     */
    private getCodeFileDir(): string {
        let regexMatch = this._codeFile.match(/(.*[\/\\]).*/)
        return regexMatch.length ? regexMatch[1] : this._codeFile
    }

    /**
     * Gets the directory of the code file without a trailing slash.
     */
    private getCodeFileDirWithoutTrailingSlash(): string {
        return this.getCodeFileDir().replace(/\\$/, "")
    }

    /**
     * Includes double quotes around a given file name.
     */
    private quoteFileName(fileName: string): string {
        return '\"' + fileName + '\"'
    }

    /**
     * Gets the executor to run a source code file
     * and generates the complete command that allow that file to be run.
     * This executor command may include a variable $1 to indicate the place where
     * the source code file name have to be included.
     * If no such a variable is present in the executor command,
     * the file name is appended to the end of the executor command.   
     *
     * @param executor The command used to run a source code file
     * @return the complete command to run the file, that includes the file name   
     */
    private getFinalCommandToRunCodeFile(executor: string, appendFile: boolean = true): string {
        var cmd = executor

        if (this._codeFile) {
            let codeFileDir = this.getCodeFileDir();
            let placeholders: { regex: RegExp, replaceValue: string }[] = [
                //A placeholder that has to be replaced by the path of the folder opened in VS Code
                //If no folder is opened, replace with the directory of the code file
                { "regex": /\$workspaceRoot/g, "replaceValue": this.getWorkspaceRoot(codeFileDir) },
                //A placeholder that has to be replaced by the code file name without its extension
                { "regex": /\$fileNameWithoutExt/g, "replaceValue": this.getCodeFileWithoutDirAndExt() },
                //A placeholder that has to be replaced by the full code file name
                { "regex": /\$fullFileName/g, "replaceValue": this.quoteFileName(this._codeFile) },
                //A placeholder that has to be replaced by the code file name without the directory
                { "regex": /\$fileName/g, "replaceValue": this.getCodeBaseFile() },
                //A placeholder that has to be replaced by the directory of the code file without a trailing slash
                { "regex": /\$dirWithoutTrailingSlash/g, "replaceValue": this.quoteFileName(this.getCodeFileDirWithoutTrailingSlash()) },
                //A placeholder that has to be replaced by the directory of the code file
                { "regex": /\$dir/g, "replaceValue": this.quoteFileName(codeFileDir) }
            ];

            placeholders.forEach(placeholder => {
                cmd = cmd.replace(placeholder.regex, placeholder.replaceValue)
            });
        }

        return (cmd != executor ? cmd : executor + (appendFile ? ' ' + this.quoteFileName(this._codeFile) : ''));
    }

    private executeCommandInTerminal(executor: string, appendFile: boolean = true) {
        if (this._terminal === null) {
            this._terminal = vscode.window.createTerminal('Code');
        }
        this._terminal.show(true);
        let command = this.getFinalCommandToRunCodeFile(executor, appendFile);
        this._terminal.sendText(command);
    }

    private executeCommandInOutputChannel(executor: string, appendFile: boolean = true) {
        this._isRunning = true;
        let clearPreviousOutput = this._config.get<boolean>('clearPreviousOutput');
        if (clearPreviousOutput) {
            this._outputChannel.clear();
        }
        let showExecutionMessage = this._config.get<boolean>('showExecutionMessage');
        this._outputChannel.show(true);
        let exec = require('child_process').exec;
        let command = this.getFinalCommandToRunCodeFile(executor, appendFile);
        if (showExecutionMessage) {
            this._outputChannel.appendLine('[Running] ' + command);
        }
        this._appInsightsClient.sendEvent(executor);
        let startTime = new Date();
        this._process = exec(command, { cwd: this._cwd });

        this._process.stdout.on('data', (data) => {
            this._outputChannel.append(data);
        });

        this._process.stderr.on('data', (data) => {
            this._outputChannel.append(data);
        });

        this._process.on('close', (code) => {
            this._isRunning = false;
            let endTime = new Date();
            let elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
            this._outputChannel.appendLine('');
            if (showExecutionMessage) {
                this._outputChannel.appendLine('[Done] exited with code=' + code + ' in ' + elapsedTime + ' seconds');
                this._outputChannel.appendLine('');
            }
            if (this._isTmpFile) {
                fs.unlink(this._codeFile);
            }
        });
    }
}