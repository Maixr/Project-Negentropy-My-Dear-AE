@echo off
chcp 65001 >nul
title 同步整合包到 GitHub
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\sync.ps1" %*
echo.
pause
