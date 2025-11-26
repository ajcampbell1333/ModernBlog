#!/usr/bin/env node
/**
 * Configuration loader for white-label values
 * Reads from environment variables or defaults to placeholders
 */

/**
 * Get configuration values
 * In GitHub Actions, these come from secrets/env vars
 * Locally, they can be injected from LOCAL_AGENT.md
 */
export function getConfig() {
  return {
    // Blog domain (e.g., blog.yourdomain.com)
    blogDomain: process.env.BLOG_DOMAIN || 'blog.YOUR_DOMAIN.com',
    
    // GitHub username (for GitHub Pages URL)
    githubUsername: process.env.GITHUB_USERNAME || 'YOUR_GITHUB_USERNAME',
    
    // GitHub repository name
    githubRepo: process.env.GITHUB_REPO || 'ModernBlog',
    
    // Portfolio domain (main site)
    portfolioDomain: process.env.PORTFOLIO_DOMAIN || 'YOUR_DOMAIN.com',
    
    // Blog subdomain (if using subdomain approach)
    blogSubdomain: process.env.BLOG_SUBDOMAIN || 'blog',
  };
}

/**
 * Get canonical URL for a post
 * @param {string} postSlug - Post slug/filename
 * @returns {string} - Canonical URL
 */
export function getCanonicalUrl(postSlug) {
  const config = getConfig();
  return `https://${config.blogDomain}/${postSlug}`;
}

/**
 * Get GitHub Pages URL
 * @returns {string} - GitHub Pages URL
 */
export function getGitHubPagesUrl() {
  const config = getConfig();
  return `https://${config.githubUsername}.github.io`;
}

// CLI usage for testing
if (import.meta.url === `file://${process.argv[1]}`) {
  const config = getConfig();
  console.log('Configuration:');
  console.log(JSON.stringify(config, null, 2));
}




