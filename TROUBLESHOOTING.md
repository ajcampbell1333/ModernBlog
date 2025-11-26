# Troubleshooting GitHub Pages 404

If you're seeing a 404 at `username.github.io`, check these:

## 1. Check Workflow Status

Go to your repository → **Actions** tab:
- ✅ **Green checkmark** = Workflow succeeded, check step 2
- ❌ **Red X** = Workflow failed, check the logs
- ⏳ **Yellow circle** = Still running, wait for it to complete
- ❓ **No workflow run** = Workflow didn't trigger, see step 4

## 2. Verify GitHub Pages Settings

1. Go to **Settings** → **Pages**
2. Check **Source**: Should be "GitHub Actions"
3. Check **Custom domain**: Can be empty for now
4. Look for a message like "Your site is live at..."

## 3. Check Workflow Logs

If workflow failed, click on the failed run and check:
- **Which job failed?** (detect-changes, process-posts, build-site, deploy-github-pages)
- **What's the error message?**
- Common issues:
  - Missing dependencies
  - Build errors
  - Permission issues

## 4. Manual Workflow Trigger

If workflow didn't run automatically:
1. Go to **Actions** tab
2. Click **Deploy Blog** workflow
3. Click **Run workflow** button (top right)
4. Select branch: `main`
5. Select mode: `stage`
6. Click **Run workflow**

## 5. Verify Build Output

The workflow should:
1. Detect posts in `Posts/` directory
2. Build Astro site to `Pipeline/build/`
3. Upload as artifact
4. Deploy to GitHub Pages

Check the **build-site** job logs to verify:
- Posts were copied
- Astro build succeeded
- Artifact was uploaded

## 6. Common Issues

### Issue: "No posts to process"
**Solution**: Make sure you have `.md` files in `Posts/` directory with frontmatter

### Issue: "Build failed"
**Solution**: Check Astro build logs, might be missing dependencies or config issue

### Issue: "Deployment failed"
**Solution**: Check permissions - repository needs Pages write permission

### Issue: "Environment not found"
**Solution**: The `github-pages` environment should be created automatically when you enable Pages

## 7. Force Re-run

If everything looks correct but still 404:
1. Go to **Actions** → Latest workflow run
2. Click **Re-run all jobs**
3. Wait for completion
4. Check Pages URL again (may take 1-2 minutes after deployment)

## Quick Test

To test if workflow is working:
1. Make a small change to a post in `Posts/`
2. Commit and push
3. Workflow should trigger automatically
4. Check Actions tab for the new run




