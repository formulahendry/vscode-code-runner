tsc --build --verbose

vsce package --allow-missing-repository --allow-star-activation
Write-Host

$name = Get-ChildItem -Name -File -Filter *.vsix | Select-Object -First 1
Invoke-Expression "code --force --install-extension $name"
Write-Host

Write-Host "AHK"
RunAhk.ps1 @'
WinActivate "ahk_exe Code.exe"
WinWaitActive "ahk_exe Code.exe"
Send "^!+r"
'@
Write-Host

PressEnterToContinue.ps1
