Write-Host "🎨 Setting up FontPair.ai..." -ForegroundColor Cyan
Write-Host ""

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🌐 Open http://localhost:3000 in your browser" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm run dev 