#!/bin/bash

echo "🔄 Resetting Gatsby Theme Novela installation..."

# Load nvm
source ~/.nvm/nvm.sh

# Switch to Node 12
echo "📦 Switching to Node.js 12..."
nvm use 12

# Clean everything
echo "🧹 Cleaning node_modules..."
rm -rf node_modules
rm -rf @narative/gatsby-theme-novela/node_modules
rm -rf www/node_modules

# Clean yarn cache
echo "🗑️  Cleaning yarn cache..."
yarn cache clean

# Install with ignore-optional to skip problematic packages
#echo "⚡ Installing dependencies (ignoring optional packages)..."
#yarn install --ignore-optional

#echo "✅ Installation complete!"
#echo "🚀 You can now run: yarn dev"
