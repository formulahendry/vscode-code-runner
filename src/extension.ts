'use strict';
import * as vscode from 'vscode';
import { CodeManager } from './codeManager';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "code-runner" is now active!');

    let codeManager = new CodeManager();

    let run = vscode.commands.registerCommand('code-runner.run', () => {
        codeManager.run();
    });

    let stop = vscode.commands.registerCommand('code-runner.stop', () => {
        codeManager.stop();
    });

    context.subscriptions.push(run);
    context.subscriptions.push(stop);
}

export function deactivate() {
}