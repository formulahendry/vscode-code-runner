'use strict';
import * as vscode from 'vscode';
import { join, dirname } from 'path';
import * as os from 'os';
import * as fs from 'fs';

const TmpDir = os.tmpdir();

export class CodeManager {
    private _outputChannel: vscode.OutputChannel;
    private _isRunning: boolean;
    private _process;
    private _codeFile: string;
    private _isTmpFile: boolean;
    private _languageId: string;
    private _cwd: string;
    private _config: vscode.WorkspaceConfiguration;

    constructor() {
        this._outputChannel = vscode.window.createOutputChannel('Code');
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

        this.initialize();

        let fileExtension = this.getFileExtension(editor);
        let executor = this.getExecutor(languageId, fileExtension);
        // undefined or null
        if (executor == null) {
            vscode.window.showInformationMessage('Code language not supported or defined.');
            return;
        }

        this.getCodeFileAndExecute(editor, fileExtension, executor);
    }

    public runByLanguage(): void {
        vscode.window.showInputBox({ prompt: "Enter language: e.g. php, javascript, bat, shellscript..." }).then((languageId) => {
            if (languageId !== undefined) {
                this.run(languageId);
            }
        });
    }

    public stop(): void {
        if (this._isRunning) {
            this._isRunning = false;
            let kill = require('tree-kill');
            kill(this._process.pid);
        }
    }

    private initialize(): void {
        this._config = vscode.workspace.getConfiguration('code-runner');
        this._cwd = this._config.get<string>('cwd');
        if (this._cwd) {
            return;
        }
        this._cwd = vscode.workspace.rootPath;
        if (this._cwd) {
            return;
        }
        this._cwd = TmpDir;
    }

    private getCodeFileAndExecute(editor: vscode.TextEditor, fileExtension: string, executor: string): any {
        let selection = editor.selection;

        if (selection.isEmpty && !editor.document.isUntitled) {
            this._isTmpFile = false;
            this._codeFile = editor.document.fileName;

            if (this._config.get<boolean>('saveFileBeforeRun')) {
                return editor.document.save().then(() => {
                    this.executeCommand(executor);
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

        this.executeCommand(executor);
    }

    private rndName(): string {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    }

    private createRandomFile(content: string, folder: string, fileExtension: string) {
        let fileType = "";
        if (this._languageId === 'bat') {
            fileType = '.bat';
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

    private executeCommand(executor: string) {
        this._isRunning = true;
        let clearPreviousOutput = this._config.get<boolean>('clearPreviousOutput');
        if (clearPreviousOutput) {
            this._outputChannel.clear();
        }
        this._outputChannel.show();
        let exec = require('child_process').exec;
        let command = executor + ' \"' + this._codeFile + '\"';
        this._outputChannel.appendLine('[Running] ' + command);
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
            this._outputChannel.appendLine('[Done] exited with code=' + code + ' in ' + elapsedTime + ' seconds');
            this._outputChannel.appendLine('');
            if (this._isTmpFile) {
                fs.unlink(this._codeFile);
            }
        });
    }
}