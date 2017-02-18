'use strict';
import * as vscode from 'vscode';

const appInsights = require("applicationinsights");
const compilers = ['gcc -framework Cocoa', 'gcc', 'g++', 'javac'];

export class AppInsightsClient {
    private _client;
    private _enableAppInsights;

    constructor() {
        this._client = appInsights.getClient('a25ddf11-20fc-45c6-96ae-524f47754f28');
        let config = vscode.workspace.getConfiguration('code-runner');
        this._enableAppInsights = config.get<boolean>('enableAppInsights');
    }

    public sendEvent(eventName: string): void {
        if (this._enableAppInsights) {
            for (let i in compilers) {
                if (eventName.indexOf(compilers[i] + ' ') >= 0) {
                    eventName = compilers[i];
                    break;
                }
            }
            this._client.trackEvent(eventName === '' ? 'bat' : eventName);
        }
    }
}