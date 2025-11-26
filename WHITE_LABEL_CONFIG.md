# White-Label Configuration Guide

This repository is fully white-label. All personal information is stored in configuration variables, not hardcoded in the codebase.

## Configuration System

The repository uses environment variables and GitHub Secrets for all personal configuration. The config system is in `Pipeline/scripts/config.js`.

## Required Configuration

### GitHub Secrets (Repository Settings → Secrets)

Set these in your GitHub repository:

1. **`BLOG_DOMAIN`** - Your blog domain
   - Example: `blog.yourdomain.com`
   - Used for: CNAME file generation, canonical URLs

2. **`GITHUB_USERNAME`** - Your GitHub username
   - Example: `yourusername`
   - Used for: GitHub Pages URL references

3. **`MEDIUM_TOKEN`** (optional, for v2)
   - Your Medium API access token

4. **`DEVTO_API_KEY`** (optional, for v2)
   - Your Dev.to API key

5. **`LINKEDIN_ACCESS_TOKEN`** (optional, for v2)
   - Your LinkedIn OAuth token

6. **`LINKEDIN_ORG_ID`** (optional, for v2)
   - LinkedIn organization ID if posting to company page

7. **`VERCEL_TOKEN`** (optional, for v2)
   - Vercel deployment token

8. **`VERCEL_ORG_ID`** (optional, for v2)
   - Vercel organization ID

9. **`VERCEL_PROJECT_ID`** (optional, for v2)
   - Vercel project ID

## How It Works

### During Build

1. GitHub Actions workflow reads secrets
2. Scripts use `config.js` to get values
3. CNAME file is generated from `BLOG_DOMAIN`
4. Canonical URLs are generated from `BLOG_DOMAIN`
5. All personal info comes from environment variables

### Local Development

For local testing, you can:
1. Set environment variables before running scripts
2. Use `LOCAL_AGENT.md` (outside repo) to inject values
3. Scripts will use placeholders if no env vars are set

## Placeholder Values

When no configuration is provided, the system uses these placeholders:
- `blog.YOUR_DOMAIN.com` - Blog domain
- `YOUR_GITHUB_USERNAME` - GitHub username
- `YOUR_DOMAIN.com` - Portfolio domain

## Files That Use Configuration

- `Pipeline/scripts/config.js` - Configuration loader
- `Pipeline/scripts/process-post.js` - Canonical URL generation
- `Pipeline/scripts/generate-cname.js` - CNAME file generation
- `.github/workflows/deploy-blog.yml` - Workflow secrets

## Verifying White-Label Status

To verify the repo is white-label:
1. Search for personal domains/usernames: `grep -r "yourdomain\|yourusername" Remote/`
2. Check all URLs use config variables
3. Verify no hardcoded personal info in code
4. Check documentation uses placeholders

## Adding New Configuration

If you need to add new personal configuration:

1. Add to `Pipeline/scripts/config.js`:
   ```javascript
   newConfigValue: process.env.NEW_CONFIG || 'YOUR_PLACEHOLDER'
   ```

2. Add to GitHub Secrets (if needed in CI/CD)

3. Document in this file

4. Update `LOCAL_AGENT.md` template (outside repo)

5. Never hardcode the actual value in the repo




