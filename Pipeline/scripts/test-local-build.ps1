# Test script for local Astro build (PowerShell)
# This simulates what the GitHub Actions workflow does

$ErrorActionPreference = "Stop"

Write-Host "🧪 Testing local Astro build..." -ForegroundColor Cyan

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent (Split-Path -Parent $ScriptDir)
$SiteDir = Join-Path $RepoRoot "Pipeline\site"

Set-Location $RepoRoot

Write-Host "📁 Setting up test environment..." -ForegroundColor Yellow

# Copy posts to Astro content directory
Write-Host "📝 Copying posts..." -ForegroundColor Yellow
$BlogDir = Join-Path $SiteDir "src\content\blog"
New-Item -ItemType Directory -Path $BlogDir -Force | Out-Null
Copy-Item -Path "Posts\*.md" -Destination $BlogDir -ErrorAction SilentlyContinue

# Copy images
Write-Host "🖼️  Copying images..." -ForegroundColor Yellow
$ImagesDir = Join-Path $SiteDir "public\Images"
New-Item -ItemType Directory -Path $ImagesDir -Force | Out-Null
if (Test-Path "Images") {
    Copy-Item -Path "Images\*" -Destination $ImagesDir -Recurse -ErrorAction SilentlyContinue
} else {
    Write-Host "⚠️  Images directory not found" -ForegroundColor Yellow
}

# Normalize frontmatter
Write-Host "🔧 Normalizing frontmatter..." -ForegroundColor Yellow
Set-Location $ScriptDir
if (Test-Path "package.json") {
    npm install --silent
    Get-ChildItem "$SiteDir\src\content\blog\*.md" | ForEach-Object {
        node normalize-frontmatter.js $_.FullName
    }
}

# Fix image paths - use base path for local testing
Write-Host "🔗 Fixing image paths..." -ForegroundColor Yellow
$ImageBasePath = "/ModernBlog/Images/"
Get-ChildItem "$SiteDir\src\content\blog\*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    # Replace ../Images/ with the base path
    $content = $content -replace '../Images/', $ImageBasePath
    # Also fix any /Images/ that might already be there (from previous runs)
    $content = $content -replace '/Images/', $ImageBasePath
    Set-Content $_.FullName -Value $content -NoNewline
}

# Set base path for GitHub Pages
$env:ASTRO_BASE_PATH = "/ModernBlog/"

# Build
Write-Host "🏗️  Building Astro site..." -ForegroundColor Yellow
Set-Location $SiteDir
npm install --silent
npm run build

Write-Host "✅ Build complete! Check Pipeline\build\ for output" -ForegroundColor Green
Write-Host "🌐 To preview: cd Pipeline\site && npm run preview" -ForegroundColor Cyan

