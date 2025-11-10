@echo off
cd /d "%~dp0backend"
echo Starting backend server...
call npm run dev
