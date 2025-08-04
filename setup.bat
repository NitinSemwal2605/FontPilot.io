@echo off
echo 🎨 Setting up FontPair.ai...
echo.

echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!
echo.
echo 🚀 Starting development server...
echo.
echo 🌐 Open http://localhost:3000 in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev 