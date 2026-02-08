@echo off
echo ====================================
echo Starting Email Scheduler Application
echo ====================================
echo.

REM Check if database is initialized
cd backend
if not exist "dev.db" (
    echo Setting up database for first time...
    call npm run setup-db
    echo.
)

echo Starting backend server...
start cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting frontend...
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ====================================
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ====================================
echo.
echo Press any key to exit this window (servers will keep running)
pause > nul
