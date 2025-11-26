# GitHub Pages Setup - Important!

## The Error You're Seeing

If you see "Invalid YAML front matter" or Jekyll build errors, GitHub Pages is trying to use Jekyll instead of your GitHub Actions workflow.

## Fix: Change Pages Source

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, you should see options:
   - ❌ **"Deploy from a branch"** - This uses Jekyll (WRONG)
   - ✅ **"GitHub Actions"** - This uses your workflow (CORRECT)

4. **Select "GitHub Actions"** (not a branch)
5. Click **Save**

## Why This Happens

GitHub Pages has two modes:
- **Branch mode**: Automatically builds with Jekyll (old way)
- **Actions mode**: Uses your custom workflow (new way, what we want)

If you selected a branch as the source, GitHub tries to build with Jekyll, which fails because we're using Astro.

## After Changing to GitHub Actions

1. The `.nojekyll` file in the build will prevent Jekyll from processing
2. Your workflow will build with Astro
3. The site will deploy correctly

## Verify It's Working

After changing to "GitHub Actions":
1. Go to **Actions** tab
2. You should see workflow runs
3. Once a run completes successfully, your site will be live
4. Check **Settings** → **Pages** - it should show "Your site is live at..."

## Still Having Issues?

If you still see Jekyll errors after switching to GitHub Actions:
1. Make sure the workflow completed successfully (green checkmark)
2. Wait 1-2 minutes after deployment
3. Clear browser cache and try again
4. Check the workflow logs to ensure `.nojekyll` was created




