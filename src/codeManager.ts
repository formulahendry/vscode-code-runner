'use strict';
import * as vscode from 'vscode';
import {join} from 'path';
import * as os from 'os';
import * as fs from 'fs';

export class CodeManager {
    private _outputChannel: vscode.OutputChannel;
    private _isRunning: boolean;
    private _process;
    private _tmpFile: string;

    constructor() {
        this._outputChannel = vscode.window.createOutputChannel('Code');
    }

    public run(): void {
        if (this._isRunning) {
            vscode.window.showInformationMessage('Code is already running!');
            return;
        }

        let code = this.getCode();
        if (!code) {
            vscode.window.showInformationMessage('No code found or selected.');
            return;
        }

        let executor = this.getExecutor();
        if (executor == null) {
            vscode.window.showInformationMessage('Code language not supported or defined.');
            return;
        }

        this.createRandomFile(code);

        this.ExecuteCommand(executor);
    }

    public stop(): void {
        if (this._isRunning) {
            this._isRunning = false;       
            let kill = require('tree-kill');
            kill(this._process.pid);
            this._outputChannel.appendLine('');
            this._outputChannel.append('Code run stopped.');
        }
    }

    private getCode(): string {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return null;
        }

        let selection = editor.selection;
        let text = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);

        let languageId = editor.document.languageId;
        if (languageId === "php") {
            text = text.trim();
            if (!text.startsWith("<?php")) {
                text = "<?php\r\n" + text;
            }
        }

        return text;
    }

    private rndName(): string {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    }

    private createRandomFile(content: string) {
        let fileName = vscode.window.activeTextEditor.document.fileName;
        let fileType = "";
        let index = fileName.lastIndexOf(".");
        if (index !== -1) {
            fileType = fileName.substr(index);
        }
        let tmpFileName = this.rndName() + fileType;
        this._tmpFile = join(os.tmpdir(), tmpFileName);
        fs.writeFileSync(this._tmpFile, content);
    }

    private getExecutor(): string {
        let languageId = vscode.window.activeTextEditor.document.languageId;
        let config = vscode.workspace.getConfiguration('code-runner');
        let executorMap = config.get<any>('executorMap');
        return executorMap[languageId];
    }

    private ExecuteCommand(executor: string) {
        this._isRunning = true;
        this._outputChannel.show();
        let exec = require('child_process').exec;
        let command = executor + ' \"' + this._tmpFile + '\"'
        this._outputChannel.appendLine('>> Running ' + vscode.window.activeTextEditor.document.languageId);
        this._process = exec(command);

        this._process.stdout.on('data', (data) => {
            this._outputChannel.append(data);
        });

        this._process.stderr.on('data', (data) => {
            this._outputChannel.append(data);
        });

        this._process.on('close', (code) => {
            this._isRunning = false;
            this._outputChannel.appendLine('');
            this._outputChannel.appendLine('[Done]');
            this._outputChannel.appendLine('');
            fs.unlink(this._tmpFile);
        });
    }
}