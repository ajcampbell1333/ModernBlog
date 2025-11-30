#!/usr/bin/env node
/**
 * Normalize frontmatter in markdown files
 * Converts Date objects to strings, ensures proper formatting
 */

import { readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';

/**
 * Normalize frontmatter in a markdown file
 * @param {string} filePath - Path to markdown file
 * @returns {boolean} - True if file was modified
 */
export function normalizeFrontmatter(filePath) {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    let modified = false;
    
    // Convert Date objects to YYYY-MM-DD strings
    if (frontmatter.date) {
      if (frontmatter.date instanceof Date) {
        frontmatter.date = frontmatter.date.toISOString().split('T')[0];
        modified = true;
      } else {
        // Ensure it's a string in YYYY-MM-DD format
        const dateStr = String(frontmatter.date).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          frontmatter.date = dateStr;
          if (dateStr !== String(frontmatter.date).trim()) {
            modified = true;
          }
        }
      }
    }
    
    // Write back if modified
    if (modified) {
      const newContent = matter.stringify(content, frontmatter);
      writeFileSync(filePath, newContent, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error normalizing ${filePath}:`, error.message);
    return false;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node normalize-frontmatter.js <path-to-markdown-file>');
    process.exit(1);
  }
  
  const modified = normalizeFrontmatter(filePath);
  if (modified) {
    console.log(`Normalized frontmatter in ${filePath}`);
  } else {
    console.log(`No changes needed in ${filePath}`);
  }
}





