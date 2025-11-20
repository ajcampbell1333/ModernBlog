# Custom Domain Setup for GitHub Pages

This blog can be configured to be hosted at a custom domain via GitHub Pages (e.g., `blog.YOUR_DOMAIN.com`).

## Setup Steps

### 1. Configure Domain in GitHub Secrets

Add the following secret in your repository settings:
- **Secret Name**: `BLOG_DOMAIN`
- **Secret Value**: `blog.YOUR_DOMAIN.com` (replace with your actual domain)

### 2. GitHub Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Custom domain**, enter your blog domain (e.g., `blog.YOUR_DOMAIN.com`)
4. Check **Enforce HTTPS** (after DNS propagates)
5. Click **Save**

The CNAME file will be automatically generated during build from the `BLOG_DOMAIN` secret.

### 3. DNS Configuration

At your domain registrar, add a CNAME record:

**CNAME Record:**
- **Host/Name**: `blog` (or your chosen subdomain)
- **Value/Target**: `YOUR_GITHUB_USERNAME.github.io`
- **TTL**: 3600 (or default)

**Note**: Do NOT include the repository name in the CNAME target, just your GitHub username.

### 4. Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- You can check propagation with: `dig blog.YOUR_DOMAIN.com` or `nslookup blog.YOUR_DOMAIN.com`
- Once propagated, GitHub will automatically enable HTTPS

### 5. Verify Setup

1. Visit your blog domain (should work after DNS propagates)
2. Check that HTTPS is enforced in GitHub Pages settings
3. The site should show your latest blog post with a sidebar of previous posts

## Alternative: Subpath (/blog)

If you prefer `YOUR_DOMAIN.com/blog` instead of `blog.YOUR_DOMAIN.com`, you have two options:

### Option A: Proxy from Main Site
Configure your main portfolio site to proxy `/blog` requests to your blog subdomain. This depends on your hosting setup:
- **Nginx**: Use `proxy_pass` directive
- **Apache**: Use `ProxyPass` directive
- **Vercel/Netlify**: Use rewrites in config

### Option B: Move Entire Site to GitHub Pages
Host your entire portfolio on GitHub Pages and structure it so `/blog` is a subdirectory. This would require moving your portfolio site to GitHub Pages.

## Current Configuration

- **Custom Domain**: Set via `BLOG_DOMAIN` GitHub secret
- **CNAME File**: Automatically generated during build from config
- **Canonical URLs**: Auto-generated from `BLOG_DOMAIN` config

## Required GitHub Secrets

For custom domain to work:
- `BLOG_DOMAIN` - Your blog domain (e.g., `blog.yourdomain.com`)
- `GITHUB_USERNAME` - Your GitHub username (for GitHub Pages URL)

## Troubleshooting

### Domain Not Working
- Check DNS propagation: `dig blog.YOUR_DOMAIN.com`
- Verify CNAME record points to `YOUR_GITHUB_USERNAME.github.io` (not the repo URL)
- Wait 24-48 hours for full propagation
- Check GitHub Pages settings show the custom domain
- Verify `BLOG_DOMAIN` secret is set correctly

### HTTPS Not Available
- Wait for DNS to fully propagate
- GitHub enables HTTPS automatically after DNS is verified
- Can take up to 24 hours after DNS propagation

### 404 Errors
- Ensure the workflow is building and deploying successfully
- Check that CNAME file is being generated (check build logs)
- Verify the build output includes the CNAME file
