### 0.6.2
* Add support for R Language
* Add donation section in README.md

### 0.6.1
* Minor fix for running custom command when there is no active editor window

### 0.6.0
* Add support to run custom command

### 0.5.1
* Resolve [GitHub issue#21](https://github.com/formulahendry/vscode-code-runner/issues/21): Remove "Run Code" in Output Channel
* Add "Stop Code Run" in Output Channel
* Resolve [GitHub issue#32](https://github.com/formulahendry/vscode-code-runner/issues/32): Preserve focus of Text Editor after code is running
* Not add quote for $fileNameWithoutExt and $fileName
* Not add extra space for placeholders

### 0.5.0
* Add placeholders into configuration for compiled language
* Add support for C, C++, Java

### 0.4.2
* Add support for OCaml Script

### 0.4.1
* Avoid running code in Integrated Terminal when it is untitled file or code snippet

### 0.4.0
* Add support to run code in Integrated Terminal

### 0.3.4
* Resolve [GitHub issue#24](https://github.com/formulahendry/vscode-code-runner/issues/24): Add config entry to set whether to Whether to show extra execution message

### 0.3.3
* Add support to run by language from a suggestion list

### 0.3.2
* Add support for Swift, Julia, Crystal

### 0.3.1
* Update README.md about running TypeScript with ts-node

### 0.3.0
* Add support for TypeScript, CoffeeScript, Scala

### 0.2.4
* Resolve [GitHub issue#20](https://github.com/formulahendry/vscode-code-runner/issues/20): Add config entry to determine whether to use the directory of the file to be executed as the working directory

### 0.2.3
* Resolve [GitHub issue#18](https://github.com/formulahendry/vscode-code-runner/issues/18): Fix output highlight when execution time is greater than 10 seconds

### 0.2.2
* Resolve [GitHub issue#12](https://github.com/formulahendry/vscode-code-runner/issues/12): Add 'Run Code' entry to editor context menu

### 0.2.1
* Resolve [GitHub issue#8](https://github.com/formulahendry/vscode-code-runner/issues/8): Fix output highlight
* Resolve [GitHub issue#10](https://github.com/formulahendry/vscode-code-runner/issues/10): Add option to save the file before running
* Resolve [GitHub issue#11](https://github.com/formulahendry/vscode-code-runner/issues/11): Set the mapping of languageId to file extension
* Add Application Insights to track telemetry data to improve this extension

### 0.2.0
* Resolve [GitHub issue#6](https://github.com/formulahendry/vscode-code-runner/issues/6): Add config entry to set whether to clear previous output before each run
* Resolve [GitHub issue#7](https://github.com/formulahendry/vscode-code-runner/issues/7): Add colorizer for output and refine output
* Use the current file to run if there is no selection and it is not untitled
* If there is selection and the file is not untitled, create tmp file in the file folder to run the code sinnpet

### 0.1.3
* Resolve [GitHub issue#5](https://github.com/formulahendry/vscode-code-runner/issues/5): Put the temp code file in working directory instead of os temp folder

### 0.1.2
* Resolve [GitHub issue#5](https://github.com/formulahendry/vscode-code-runner/issues/5): Add support to set working directory

### 0.1.1
* Add support for VBScript
* Add config entry to set the executor per file extension

### 0.1.0
* Add support to set default language to run
* Add support to select language to run

### 0.0.5
* Add support for C# script

### 0.0.4
* Add support for F# script

### 0.0.3
* Add support for powershell, bat/cmd and bash/sh

### 0.0.2
* Add support for lua and groovy

### 0.0.1
* Initial Release