#!/bin/bash
# Sync posts from Posts/ to Pipeline/site/src/content/blog/
# Run this before building locally to ensure your edits are included

set -e

echo "🔄 Syncing posts from Posts/ to Astro content directory..."

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"
BLOG_DIR="$REPO_ROOT/Pipeline/site/src/content/blog"

cd "$REPO_ROOT"

# Ensure blog directory exists
mkdir -p "$BLOG_DIR"

# Copy posts (overwrite existing)
echo "📝 Copying posts..."
if [ -d "Posts" ]; then
    copied=0
    for post in Posts/*.md; do
        if [ -f "$post" ]; then
            cp "$post" "$BLOG_DIR/"
            echo "  ✓ Copied: $(basename "$post")"
            ((copied++))
        fi
    done
    echo "✅ Synced $copied post(s) to Astro content directory"
else
    echo "⚠️  Posts directory not found"
fi

echo ""
echo "💡 Tip: Run this script before 'npm run build' or 'npm run preview' to ensure your latest edits are included"


