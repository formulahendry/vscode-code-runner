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

    context.subscriptions.push(run);
    context.subscriptions.push(runCustomCommand);
    context.subscriptions.push(runByLanguage);
    context.subscriptions.push(stop);
    context.subscriptions.push(codeManager);

    const updateContext = () => {
        const config = vscode.workspace.getConfiguration("code-runner");
        if (!config.get<boolean>("showRunIconInEditorTitleMenu", true)) {
            vscode.commands.executeCommand("setContext", "code-runner.showRunButton", false);
            return;
        }

        if (!config.get<boolean>("onlyShowRunIconIfExecutorExists", true)) {
            vscode.commands.executeCommand("setContext", "code-runner.showRunButton", true);
            return;
        }

        vscode.commands.executeCommand("setContext", "code-runner.showRunButton", codeManager.fileHasExecutor());
    };
    vscode.workspace.onDidChangeConfiguration(updateContext);
    vscode.window.onDidChangeActiveTextEditor(updateContext);

    updateContext();
}

export function deactivate() {
}
