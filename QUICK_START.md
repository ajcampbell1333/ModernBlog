# Quick Start - First Deployment

After pushing to GitHub, follow these steps to get your blog live:

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Click **Save**

## Step 2: Check Workflow Status

1. Go to the **Actions** tab in your repository
2. You should see a workflow run (either running or completed)
3. If it failed, check the logs to see what went wrong

## Step 3: Access Your Site

Once the workflow completes successfully:

- **Default URL**: `https://YOUR_GITHUB_USERNAME.github.io`
- **Custom Domain**: Only works after you set `BLOG_DOMAIN` secret and configure DNS

## Step 4: (Optional) Set GitHub Secrets

For full functionality, set these secrets in **Settings** → **Secrets and variables** → **Actions**:

- `BLOG_DOMAIN` - Your blog domain (e.g., `blog.yourdomain.com`)
- `GITHUB_USERNAME` - Your GitHub username

**Note**: The workflow will work without these secrets (using placeholders), but:
- CNAME file will have placeholder domain
- Canonical URLs will use placeholder domain
- Custom domain won't work until secrets are set

## Troubleshooting

### Workflow Not Running
- Check that you pushed to `main` branch
- Verify workflow file is in `.github/workflows/`
- Check repository Actions are enabled

### Build Failing
- Check Actions logs for specific errors
- Common issues:
  - Missing dependencies (should auto-install)
  - Invalid frontmatter in posts
  - Node.js version issues

### Site Not Accessible
- Wait a few minutes after workflow completes
- Check GitHub Pages settings show the site is published
- Verify the workflow completed successfully (green checkmark)

## Next Steps

Once basic deployment works:
1. Set up custom domain (see `CUSTOM_DOMAIN_SETUP.md`)
2. Configure v2 features (see `V2_FEATURES.md`)
3. Test with a new post





