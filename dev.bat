@echo off
echo ========================================================
echo Starting TrendPilot Live Development Server (Hot Reload)
echo Port: 3001 (http://localhost:3001)
echo ========================================================
cd /d "D:\dev\trendpilot"
node .\node_modules\next\dist\bin\next dev --port 3001
pause
