#!/bin/bash

echo "🔧 Building React app..."
npm run build

echo "📁 Copying build files..."
cp -r build/* .

echo "📤 Committing to main..."
git add .
git commit -m "Update build files - $(date)"
git push origin main

echo "🚀 Deploying to gh-pages..."
git checkout gh-pages
git checkout main -- index.html asset-manifest.json manifest.json static/
git add .
git commit -m "Deploy updated build - $(date)"
git push origin gh-pages
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your app is live at: https://sytykhandrei1.github.io/cooking-helper"
