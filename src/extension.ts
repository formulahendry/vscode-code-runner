'use strict';
import * as vscode from 'vscode';
import { CodeManager } from './codeManager';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "code-runner" is now active!');

    let codeManager = new CodeManager();

    vscode.window.onDidCloseTerminal(() => {
        codeManager.onDidCloseTerminal();
    });

    let run = vscode.commands.registerCommand('code-runner.run', () => {
        codeManager.run();
    });

    let runByLanguage = vscode.commands.registerCommand('code-runner.runByLanguage', () => {
        codeManager.runByLanguage();
    });

    let stop = vscode.commands.registerCommand('code-runner.stop', () => {
        codeManager.stop();
    });

    context.subscriptions.push(run);
    context.subscriptions.push(runByLanguage);
    context.subscriptions.push(stop);
}

export function deactivate() {
}