"use strict";
import * as vscode from "vscode";
import { CodeManager } from "./codeManager";

export function activate(context: vscode.ExtensionContext) {

    const codeManager = new CodeManager();

    vscode.window.onDidCloseTerminal(() => {
        codeManager.onDidCloseTerminal();
    });

    const run = vscode.commands.registerCommand("code-runner.run", (fileUri: vscode.Uri) => {
        codeManager.run(null, fileUri);
    });

    const runCustomCommand = vscode.commands.registerCommand("code-runner.runCustomCommand", () => {
        codeManager.runCustomCommand();
    });

    const runByLanguage = vscode.commands.registerCommand("code-runner.runByLanguage", () => {
        codeManager.runByLanguage();
    });

    const stop = vscode.commands.registerCommand("code-runner.stop", () => {
        codeManager.stop();
    });

    const setClassPath = vscode.commands.registerCommand("code-runner.setClassPath", () => {
        codeManager.setClassPath();
    });

    const runWithIO = vscode.commands.registerCommand("code-runner.runWithIO", () => {
        codeManager.runWithIO();
    })

    const setInputFilePath = vscode.commands.registerCommand("code-runner.setInputFilePath",()=>{
        codeManager.setInputFilePath();
    })
    
    const setOutputFilePath = vscode.commands.registerCommand("code-runner.setOutputFilePath",()=>{
        codeManager.setOutputFilePath();
    })

    context.subscriptions.push(run);
    context.subscriptions.push(runCustomCommand);
    context.subscriptions.push(runByLanguage);
    context.subscriptions.push(stop);
    context.subscriptions.push(setClassPath);
    context.subscriptions.push(runWithIO);
    context.subscriptions.push(setInputFilePath);
    context.subscriptions.push(setOutputFilePath);
}

export function deactivate() {
}
