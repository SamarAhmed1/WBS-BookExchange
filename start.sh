#!/bin/bash

# Quick Start Script for BE Book Exchange
# Run this script to install dependencies and start the dev server

echo "🚀 BE Book Exchange - Quick Start"
echo "=================================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎯 Starting development server..."
    echo "📱 App will open at: http://localhost:5173"
    echo ""
    npm run dev
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
