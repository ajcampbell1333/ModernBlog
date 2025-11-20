#!/usr/bin/env node
/**
 * Generate URL-friendly slug from title
 * Converts title to lowercase, replaces spaces with hyphens, removes special chars
 */

/**
 * Convert a title to a URL-friendly slug
 * @param {string} title - The title to convert
 * @returns {string} - URL-friendly slug
 */
export function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove special characters except hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const title = process.argv[2];
  if (!title) {
    console.error('Usage: node generate-slug.js "Your Title Here"');
    process.exit(1);
  }
  console.log(titleToSlug(title));
}

