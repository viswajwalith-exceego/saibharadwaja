#!/bin/bash

# GoDaddy Deployment Script
# This script builds your React app and prepares it for deployment

echo "🚀 Starting deployment preparation..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build for production
echo "🔨 Building for production..."
npm run build

# Step 3: Copy .htaccess to dist folder
echo "📝 Copying .htaccess file..."
cp dist/.htaccess dist/.htaccess 2>/dev/null || echo "⚠️  .htaccess file not found. Make sure to create it manually."

# Step 4: List files to upload
echo ""
echo "✅ Build complete! Files ready for upload:"
echo "📁 Location: ./dist/"
echo ""
echo "📋 Files to upload to GoDaddy public_html:"
ls -la dist/ | head -20

echo ""
echo "✨ Next steps:"
echo "1. Upload all files from ./dist/ to your GoDaddy public_html folder"
echo "2. Make sure .htaccess file is uploaded (it might be hidden)"
echo "3. Test your website in a browser"
echo ""
echo "📖 See DEPLOYMENT_GODADDY.md for detailed instructions"
