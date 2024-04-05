### 0.12.2 (2024-04-05)
* Add support for Erlang
* Add support for SPWN
* Add support for Pkl
* Add support for Gleam

### 0.12.1 (2023-10-08)
* Add support for Mojo language

### 0.12.0 (2023-01-23)
* Add support for Zig language
* Use `runghc` to replace `runhaskell` for Haskell 

### 0.11.8 (2022-06-11)
* Add support for Standard ML
* Adopt extension sponsorship

### 0.11.7 (2022-02-08)
* Update run/stop icons

### 0.11.6 (2021-10-10)
* Add support for Ring

### 0.11.5 (2021-07-10)
* [#776](https://github.com/formulahendry/vscode-code-runner/pull/776): Add stop button in editor title bar

### 0.11.4 (2021-05-14)
* [#783](https://github.com/formulahendry/vscode-code-runner/issues/783): Not detect shell on Windows correctly in VS Code 1.56

### 0.11.3 (2021-03-11)
* Adopt 'run' menu in editor title

### 0.11.2 (2021-01-05)
* Activate extension after VS Code starts up

### 0.11.1 (2020-10-11)
* Add support for Fortran

### 0.11.0 (2020-07-07)
* Integrate with new Python Interpreter Path API V2 of Python extension
* Add support for Less

### 0.10.0 (2020-05-02)
* Integrate with new Python Interpreter Path API of Python extension

### 0.9.17 (2020-03-11)
* Add support for CUDA

### 0.9.16 (2020-02-20)
* Add support for SCSS and Sass

### 0.9.15 (2019-11-21)
* Add support for [V Programming Language](https://vlang.io/)

### 0.9.14 (2019-08-17)
* [#516](https://github.com/formulahendry/vscode-code-runner/pull/516): Update "Run" icon to match new icon style

### 0.9.13 (2019-08-14)
* [#428](https://github.com/formulahendry/vscode-code-runner/pull/428): Use spawn to avoid stdout buffer exceeded

### 0.9.12 (2019-08-02)
* Add support for Scheme using [CHICKEN Scheme](https://www.call-cc.org/)

### 0.9.11 (2019-06-12)
* [#491](https://github.com/formulahendry/vscode-code-runner/issues/491): Fix terminal detection due to VS Code's change in 1.35

### 0.9.10 (2019-06-02)
* [#484](https://github.com/formulahendry/vscode-code-runner/pull/484): Fix Rust attributes considered as Shebang

### 0.9.9 (2019-05-04)
* Fix tempCodeRunnerFile not being deleted
* Add option to hide "Run Code" from explorer context menu

### 0.9.8 (2019-04-07)
* Add support for [Kit](https://www.kitlang.org/)

### 0.9.7 (2019-01-29)
* Add config entry to set the executor per filename glob
* Support Maven project (pom.xml)
* Add [CODING](https://e.coding.net/?utm_source=hendry-code-runner&utm_medium=cpc&utm_campaign=hendry-code-runner) as our second sponsor

### 0.9.6 (2019-01-16)
* Add support for Lisp

### 0.9.5 (2018-10-29)
* We have our first sponsor now: [CodeStream](https://codestream.com/?utm_source=vscmarket&utm_medium=banner&utm_campaign=coderunner)

### 0.9.4 (2018-08-03)
* [#70](https://github.com/formulahendry/vscode-code-runner/issues/70): Use `-u` flag for Python to force stdin, stdout and stderr to be totally unbuffered.

### 0.9.3 (2018-03-19)
* [#273](https://github.com/formulahendry/vscode-code-runner/issues/273): Could not run file without extension

### 0.9.2 (2018-03-13)
* Add $pythonPath customized parameter to respect `python.pythonPath` setting

### 0.9.1 (2018-03-08)
* Add option to respect Shebang or not

### 0.9.0 (2018-03-04)
* Add support for Shebang

### 0.8.7 (2017-12-30)
* Add support for Perl 6

### 0.8.6 (2017-12-22)
* Fix kotlin script execution

### 0.8.5 (2017-11-30)
* Add support for F# (.NET Core)

### 0.8.4 (2017-11-17)
* [#207](https://github.com/formulahendry/vscode-code-runner/issues/207): Add option to hide "Run Code" from editor context menu

### 0.8.3 (2017-11-04)
* Add support for C# (.NET Core)

### 0.8.2 (2017-10-26)
* [#196](https://github.com/formulahendry/vscode-code-runner/issues/196): Fix 'run code' hotkey not working

### 0.8.1 (2017-10-26)
* Distinguish whether it is running from file explorer

### 0.8.0 (2017-10-25)
* [#88](https://github.com/formulahendry/vscode-code-runner/issues/88): Run file through context menu of file explorer

### 0.7.4 (2017-10-20)
* [#191](https://github.com/formulahendry/vscode-code-runner/issues/191): Stop running code when VS Code is closed

### 0.7.3 (2017-10-14)
* Add support for Multi Root Workspaces

### 0.7.2 (2017-09-29)
* [#182](https://github.com/formulahendry/vscode-code-runner/issues/182): Add $driveLetter customized parameter

### 0.7.1 (2017-08-24)
* [#98](https://github.com/formulahendry/vscode-code-runner/issues/98): Add .ts extension mapping for typescript

### 0.7.0 (2017-08-20)
* [#164](https://github.com/formulahendry/vscode-code-runner/issues/164): Make temporary file name not random by default
* Support running code snippet in terminal

### 0.6.33 (2017-08-10)
* [#149](https://github.com/formulahendry/vscode-code-runner/issues/149): Set custom terminal root path for Linux Shell on Windows

### 0.6.32 (2017-08-05)
* [#146](https://github.com/formulahendry/vscode-code-runner/issues/146): Enable fileDirectoryAsCwd in Terminal

### 0.6.31 (2017-08-03)
* Fix code running in PowerShell

### 0.6.30 (2017-08-01)
* [#152](https://github.com/formulahendry/vscode-code-runner/issues/152): Clear previous output when running in terminal

### 0.6.29 (2017-07-28)
* [#132](https://github.com/formulahendry/vscode-code-runner/issues/132): Refine 'Run Code' button

### 0.6.28 (2017-07-22)
* [#106](https://github.com/formulahendry/vscode-code-runner/issues/106): [Continuous Fix for Bash on Windows] Handle multiple file path and case-insensitive bash path  

### 0.6.27 (2017-07-20)
* [#106](https://github.com/formulahendry/vscode-code-runner/issues/106): Handle file path for Bash on Windows

### 0.6.26 (2017-07-13)
* [#140](https://github.com/formulahendry/vscode-code-runner/issues/140): Add support for Nim

### 0.6.25 (2017-07-12)
* [#130](https://github.com/formulahendry/vscode-code-runner/issues/130): Add option to save all files before running

### 0.6.24 (2017-06-22)
* Add support for Haskell

### 0.6.23 (2017-06-21)
* [#131](https://github.com/formulahendry/vscode-code-runner/issues/131): Option to hide 'Run Code' button
* Refine 'Run Code' button

### 0.6.22 (2017-06-20)
* [#128](https://github.com/formulahendry/vscode-code-runner/issues/128): Add 'Run Code' buuton in editor title menu

### 0.6.21 (2017-06-18)
* Add support for D

### 0.6.20 (2017-06-14)
* Resolve [GitHub issue#126](https://github.com/formulahendry/vscode-code-runner/issues/126): Add support for Free Pascal

### 0.6.19 (2017-06-13)
* Add support for Dart

### 0.6.18 (2017-06-02)
* Add support for Kotlin script (.kts) 

### 0.6.17 (2017-05-20)
* Resolve [GitHub issue#113](https://github.com/formulahendry/vscode-code-runner/issues/113): Add support for Kotlin

### 0.6.16 (2017-04-15)
* Resolve [GitHub issue#102](https://github.com/formulahendry/vscode-code-runner/issues/102): Add config entry to set whether to ignore selection to always run entire file

### 0.6.15 (2017-03-26)
* Add support for AutoIt

### 0.6.14 (2017-03-12)
* Resolve [GitHub issue#93](https://github.com/formulahendry/vscode-code-runner/issues/93): Add config entry to set whether to preserve focus on code editor after code run is triggered

### 0.6.13 (2017-03-05)
* Add support for AutoHotkey

### 0.6.12
* Add support for Racket

### 0.6.11
* Add support for Rust
* Set cwd as the directory of the code file if no folder has been opened

### 0.6.10
* Resolve [GitHub issue#77](https://github.com/formulahendry/vscode-code-runner/issues/77): Add support for Objective-C

### 0.6.9
* Change executor if the Integrated Terminal is PowerShell on Windows

### 0.6.8
* Add support for Haxe

### 0.6.7
* Resolve [GitHub issue#57](https://github.com/formulahendry/vscode-code-runner/issues/57): Add support for Clojure
* Fix output color due to changed VS Code 1.9
* Improve output color for numeric

### 0.6.6
* Resolve [GitHub issue#54](https://github.com/formulahendry/vscode-code-runner/issues/54): Add support for VB.NET
* Resolve [GitHub issue#51](https://github.com/formulahendry/vscode-code-runner/issues/51): Add support for $workspaceRoot

### 0.6.5
* Resolve [GitHub issue#43](https://github.com/formulahendry/vscode-code-runner/issues/43): Add support for Elixir
* Upgrade applicationinsights npm since [telemetry data requires HTTPS](https://azure.microsoft.com/en-us/updates/application-insights-telemetry-data-now-requires-https-with-shutdown-of-http-data-collectors/)

### 0.6.4
* Resolve [GitHub issue#41](https://github.com/formulahendry/vscode-code-runner/issues/41): Fix running C/C++ in Windows

### 0.6.3
* Add support for AppleScript
* Add PayPal link in donation section

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
* Resolve [GitHub issue#24](https://github.com/formulahendry/vscode-code-runner/issues/24): Add config entry to set whether to show extra execution message

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
