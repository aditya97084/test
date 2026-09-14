$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot\..
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js 22+ is required: https://nodejs.org/' }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw 'npm is required' }
Write-Host 'Installing Aegis core dependencies...'
npm install --no-audit --no-fund
npm run setup
Write-Host ''
Write-Host 'Aegis is ready. Start it with: npm run dev'
