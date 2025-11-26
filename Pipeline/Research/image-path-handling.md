# Image Path Handling - Critical Rules

## The Problem That Happened

**Date:** 2025-11-26  
**Issue:** Image paths were broken after attempting to "fix" them, causing 2+ hours of debugging.

**What Triggered It:**
- User requested signature code build and local preview
- Images weren't rendering in local preview (likely because images weren't copied to `public/Images/`)
- **Mistake:** Instead of fixing the image copy step, hard-coded path modifications were added to make local preview work
- Those hard-coded paths (`/ModernBlog/Images/` or `/Images/`) broke production URLs

**Root Cause:** 
- Astro's `base: "/ModernBlog/"` configuration means ALL paths are relative to the base
- Manually adding `/ModernBlog/` or `/Images/` prefixes causes double-prefixing or incorrect resolution
- The browser resolves paths relative to the current page URL, not the base path
- **Local preview issues should be fixed by ensuring images are copied, NOT by modifying source paths**

## The Correct Solution

### Source Files (Markdown)
**ALWAYS use relative paths without any prefix:**
```html
<img src="Images/wizard-of-oz.jpg" alt="..." />
```

**NEVER use:**
- ❌ `src="/ModernBlog/Images/..."` (causes double-prefixing)
- ❌ `src="/Images/..."` (resolves to wrong location)
- ❌ `src="../Images/..."` (relative to wrong location)

### Build Process
1. **Remark Plugin** (`remark-fix-image-paths.js`) automatically converts:
   - `src="Images/..."` → `src="/ModernBlog/Images/..."`
   - Uses `process.env.ASTRO_BASE_PATH` from build environment
   - Only processes during Markdown → HTML conversion

2. **Workflow** converts `../Images/` → `Images/` in source files (for legacy posts)

3. **Astro Build** outputs HTML with correct absolute paths

### Final HTML Output
```html
<img src="/ModernBlog/Images/wizard-of-oz.jpg" alt="..." />
```

This resolves correctly because:
- Images are in `public/Images/`
- Astro serves `public/` from the base path
- Browser resolves `/ModernBlog/Images/` correctly from `https://username.github.io/ModernBlog/`

## Rules to Prevent This

1. **NEVER manually add base path prefixes to image src attributes**
2. **ALWAYS use relative paths in source: `Images/filename.jpg`**
3. **NEVER modify image paths in workflow post-build steps** (removed the sed command that caused issues)
4. **If local preview shows broken images:**
   - ✅ **DO:** Check that images are copied to `Pipeline/site/public/Images/`
   - ✅ **DO:** Verify `npm run preview` is using the correct base path
   - ❌ **DON'T:** Modify source file paths to "fix" local preview
   - ❌ **DON'T:** Add hard-coded prefixes to make local preview work
5. **Test locally before deploying** - build and check HTML output
6. **If images break, check:**
   - Source files use `Images/...` (no prefix)
   - Remark plugin is enabled in `astro.config.mjs`
   - `ASTRO_BASE_PATH` is set correctly in workflow
   - Images exist in `public/Images/`

## How Astro Base Path Works

With `base: "/ModernBlog/"`:
- All assets in `public/` are served from `/ModernBlog/`
- `public/Images/file.jpg` → accessible at `/ModernBlog/Images/file.jpg`
- HTML paths starting with `/` are absolute from domain root
- HTML paths without `/` are relative to current page (WRONG for nested pages)

Therefore:
- Source: `Images/file.jpg` (relative, no prefix)
- Plugin converts to: `/ModernBlog/Images/file.jpg` (absolute with base)
- Browser resolves: `https://username.github.io/ModernBlog/Images/file.jpg` ✅

## Files Involved

- `Pipeline/site/src/plugins/remark-fix-image-paths.js` - Converts relative to absolute paths
- `Pipeline/site/astro.config.mjs` - Enables the remark plugin
- `.github/workflows/deploy-blog.yml` - Sets `ASTRO_BASE_PATH` and converts `../Images/` → `Images/`
- Source markdown files - Use `Images/...` format

## If You Break This Again

1. Revert to this documented pattern
2. Check the remark plugin is working (build and grep HTML output)
3. Never add manual path prefixes
4. Test locally first

