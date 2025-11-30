#!/bin/bash
# Test script for local Astro build
# This simulates what the GitHub Actions workflow does

set -e

echo "🧪 Testing local Astro build..."

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"
SITE_DIR="$REPO_ROOT/Pipeline/site"

cd "$REPO_ROOT"

echo "📁 Setting up test environment..."

# Copy posts to Astro content directory
echo "📝 Copying posts..."
mkdir -p "$SITE_DIR/src/content/blog"
cp Posts/*.md "$SITE_DIR/src/content/blog/" || echo "⚠️  No posts found"

# Copy images
echo "🖼️  Copying images..."
mkdir -p "$SITE_DIR/public/Images"
if [ -d "Images" ] && [ "$(ls -A Images 2>/dev/null)" ]; then
  cp -r Images/* "$SITE_DIR/public/Images/" || echo "⚠️  No images found"
else
  echo "⚠️  Images directory not found"
fi

# Normalize frontmatter
echo "🔧 Normalizing frontmatter..."
cd "$SCRIPT_DIR"
if [ -f "package.json" ]; then
  npm install --silent
  for post in "$SITE_DIR/src/content/blog"/*.md; do
    if [ -f "$post" ]; then
      node normalize-frontmatter.js "$post" || true
    fi
  done
fi

# Fix image paths
echo "🔗 Fixing image paths..."
find "$SITE_DIR/src/content/blog" -name "*.md" -exec sed -i.bak 's|../Images/|/Images/|g' {} \;
find "$SITE_DIR/src/content/blog" -name "*.bak" -delete

# Set base path for GitHub Pages
export ASTRO_BASE_PATH="/ModernBlog/"

# Build
echo "🏗️  Building Astro site..."
cd "$SITE_DIR"
npm install --silent
npm run build

echo "✅ Build complete! Check Pipeline/build/ for output"
echo "🌐 To preview: cd Pipeline/site && npm run preview"





