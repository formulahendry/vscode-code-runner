'use strict';
import * as vscode from 'vscode';
import { CodeManager } from './codeManager';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "code-runner" is now active!');

    let codeManager = new CodeManager();

    vscode.window.onDidCloseTerminal(() => {
        codeManager.onDidCloseTerminal();
    });

    let run = vscode.commands.registerCommand('code-runner.runCode', () => {
        codeManager.runCode();
    });

    let runByLanguage = vscode.commands.registerCommand('code-runner.runCodeByLanguage', () => {
        codeManager.runCodeByLanguage();
    });
    
    let runCustomCommand = vscode.commands.registerCommand('code-runner.runCustomCommand', () => {
        codeManager.runCustomCommand();
    });    

    let stop = vscode.commands.registerCommand('code-runner.stop', () => {
        codeManager.stop();
    });

    context.subscriptions.push(runCode);
    context.subscriptions.push(runCodeByLanguage);
    context.subscriptions.push(runCustomCommand);
    context.subscriptions.push(stop);
}

export function deactivate() {
}
