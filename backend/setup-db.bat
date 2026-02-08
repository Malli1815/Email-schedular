@echo off
echo Setting up database...

cd /d "%~dp0"

REM Set environment variable for this session
set DATABASE_URL=file:./dev.db

REM Run Prisma commands
echo Generating Prisma Client...
call npx prisma generate

echo Running database migrations...
call npx prisma migrate deploy

echo.
echo Database setup complete!
echo.
pause
