@echo off
echo ========================================================
echo Starting TrendPilot Live Production Server
echo Port: 3001 (http://localhost:3001)
echo Timezone: Asia/Kuala_Lumpur
echo ========================================================
cd /d "D:\dev\trendpilot"
node .\node_modules\next\dist\bin\next start --port 3001
pause
