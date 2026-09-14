#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
command -v node >/dev/null || { echo "Node.js 22+ is required: https://nodejs.org/"; exit 1; }
command -v npm >/dev/null || { echo "npm is required"; exit 1; }
echo "Installing Aegis core dependencies..."
npm install --no-audit --no-fund
npm run setup
echo ""
echo "Aegis is ready. Start it with: npm run dev"
