#!/bin/bash

# Stop on any error
set -e

echo "🚀 Starting production build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Copy Python files to public directory
echo "📂 Copying Python files..."
node copy-files.js

# Run linting
echo "🔍 Linting code..."
npm run lint

# Build the application
echo "🏗️ Building application for production..."
npm run build

echo "✅ Build completed successfully! Your app is ready for deployment."
echo "To deploy to Vercel, run: ./deploy.sh" 