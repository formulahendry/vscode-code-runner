# Code Runner

[![Join the chat at https://gitter.im/formulahendry/vscode-code-runner](https://badges.gitter.im/formulahendry/vscode-code-runner.svg)](https://gitter.im/formulahendry/vscode-code-runner?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Marketplace Version](http://vsmarketplacebadge.apphb.com/version/formulahendry.code-runner.svg)](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) [![Installs](http://vsmarketplacebadge.apphb.com/installs/formulahendry.code-runner.svg)](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) [![Rating](http://vsmarketplacebadge.apphb.com/rating/formulahendry.code-runner.svg)](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) [![Build Status](https://travis-ci.org/formulahendry/vscode-code-runner.svg?branch=master)](https://travis-ci.org/formulahendry/vscode-code-runner)

Run code snippet or code file for multiple languages: **C, C++, Java, JavaScript, PHP, Python, Perl, Ruby, Go, Lua, Groovy, PowerShell, BAT/CMD, BASH/SH, F# Script, C# Script, VBScript, TypeScript, CoffeeScript, Scala, Swift, Julia, Crystal, OCaml Script, R, AppleScript, Elixir, Visual Basic .NET, Clojure**, **Haxe**, and custom command

## Donation

If you like this extension, you could donate via **[PayPal](https://www.paypal.me/junhanme)**, or scan below QR code to donate via **Alipay**. Any amount is welcome. It will encourage me to make this extension better and better!

![Alipay](images/alipay.png)

## Features

* Run code file of current active Text Editor
* Run selected code snippet in Text Editor
* Run custom command
* Stop code running
* View output in Output Window
* Set default language to run
* Select language to run
* Support REPL by running code in Integrated Terminal

## Usages

* Open code file or select code snippet in Text Editor, then use shortcut `Ctrl+Alt+N`, or press `F1` and then select/type `Run Code`, or right click the Text Editor and then click `Run Code` in context menu, the code will run and the output will be shown in the Output Window.
* To stop the running code, use shortcut `Ctrl+Alt+M`, or press `F1` and then select/type `Stop Code Run`, or right click the Output Channel and then click `Stop Code Run` in context menu

![Usage](images/usage.gif)

* To select language to run, use shortcut `Ctrl+Alt+J`, or press `F1` and then select/type `Run By Language`, then type or select the language to run: e.g `php, javascript, bat, shellscript...`

![Usage](images/usageRunByLanguage.gif)

* To run custom command, then use shortcut `Ctrl+Alt+K`, or press `F1` and then select/type `Run Custom Command`

## Configuration

Make sure the executor PATH of each language is set in the environment variable.
You could also add entry into `code-runner.executorMap` to set the executor PATH.
e.g. To set the executor PATH for ruby, php and html:
```json
{
    "code-runner.executorMap": {
        "javascript": "node",
        "php": "C:\\php\\php.exe",
        "python": "python",
        "perl": "perl",
        "ruby": "C:\\Ruby23-x64\\bin\\ruby.exe",
        "go": "go run",
        ".html": "\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\"",
        "java": "cd $dir && javac $fileName && java $fileNameWithoutExt",
        "c": "gcc $fullFileName && ./a.out"
    }
}
```
**Supported customized parameters**
  * $workspaceRoot: The path of the folder opened in VS Code
  * $dir: The directory of the code file being run
  * $fullFileName: The full name of the code file being run
  * $fileName: The base name of the code file being run, that is the file without the directory
  * $fileNameWithoutExt: The base name of the code file being run without its extension

**Please take care of the back slash and the space in file path of the executor**
  * Back slash: please use `\\`
  * If there ares spaces in file path, please use `\"` to surround your file path

Besides, you could set the default language to run:
```json
{
    "code-runner.defaultLanguage": "javascript"
}
```
**For the default language:** It should be set with language id defined in [VS Code](https://github.com/Microsoft/vscode/tree/master/extensions). The languages you could set are `java, c, cpp, javascript, php, python, perl, ruby, go, lua, groovy, powershell, bat, shellscript, fsharp, csharp, vbscript, typescript, coffeescript, swift, r, clojure haxe`

Also, you could set the executor per file extension:
```json
{
    "code-runner.executorMapByFileExtension": {
        ".vbs": "cscript //Nologo"
    }
}
```

To set the custom command to run:
```json
{
    "code-runner.customCommand": "echo Hello"
}
```

To set the the working directory:
```json
{
    "code-runner.cwd": "path/to/working/directory"
}
```

To set whether to clear previous output before each run (default is false):
```json
{
    "code-runner.clearPreviousOutput": false
}
```

To set whether to save the file before running (default is false):
```json
{
    "code-runner.saveFileBeforeRun": false
}
```

To set whether to show extra execution message like [Running] ... and [Done] ... (default is true):
```json
{
    "code-runner.showExecutionMessage": true
}
```

**[REPL support]** To set whether to run code in Integrated Terminal (only support to run whole file in Integrated Terminal, neither untitled file nor code snippet) (default is false):
```json
{
    "code-runner.runInTerminal": false
}
```

## About CWD Setting (current working directory)
1. By default, use the `code-runner.cwd` setting
2. If `code-runner.cwd` is not set and `code-runner.fileDirectoryAsCwd` is `true`, use the directory of the file to be executed
3. If `code-runner.cwd` is not set and `code-runner.fileDirectoryAsCwd` is `false`, use the path of root folder that is open in VS Code
4. If no folder is open, use the os temp folder

## Note
* To run C# script, you need to install [scriptcs](http://scriptcs.net/)
* To run TypeScript, you need to install [ts-node](https://github.com/TypeStrong/ts-node)

## Telemetry data
By default, telemetry data collection is turned on to understand user behavior to improve this extension. To disable it, update the settings.json as below:
```json
{
    "code-runner.enableAppInsights": false
}
```

## Change Log
See Change Log [here](CHANGELOG.md)

## Issues
Submit the [issues](https://github.com/formulahendry/vscode-code-runner/issues) if you find any bug or have any suggestion.

## Contribution
Fork the [repo](https://github.com/formulahendry/vscode-code-runner) and submit pull requests.