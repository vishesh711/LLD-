#!/bin/bash

# Stop on any error
set -e

echo "🚀 Starting deployment process..."

# Check if build exists
if [ ! -d ".next" ]; then
  echo "❌ No build found. Running production build first..."
  ./build-prod.sh
else
  echo "✅ Build directory found."
  
  # Install dependencies (just to be safe)
  echo "📦 Installing dependencies..."
  npm install
  
  # Copy Python files to public directory
  echo "📂 Copying Python files..."
  node copy-files.js
fi

# Deploy to Vercel with production flag
echo "🌍 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete! Your app should be available at the URL above." 