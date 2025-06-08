#!/bin/bash

# Stop on any error
set -e

echo "🧪 Testing production build locally..."

# Check if build exists
if [ ! -d ".next" ]; then
  echo "❌ No build found. Running production build first..."
  ./build-prod.sh
fi

# Start the production server
echo "🚀 Starting production server..."
npm run start

# Note: this will run the server in the foreground
# To stop it, press Ctrl+C 