@echo off
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js 20 or newer is required. & pause & exit /b 1)
if not exist node_modules (echo Installing dependencies... & npm install || (pause & exit /b 1))
if not exist data\admin.json (echo First run setup: choose your admin email and password. & npm run setup-admin || (pause & exit /b 1))
npm run build || (pause & exit /b 1)
npm start
pause
