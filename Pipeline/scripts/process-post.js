#!/usr/bin/env node
/**
 * Process a single blog post markdown file
 * Extracts frontmatter and validates schema
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { getCanonicalUrl } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

/**
 * Frontmatter schema
 */
const REQUIRED_FIELDS = ['title'];
const OPTIONAL_FIELDS = ['tags', 'published', 'description', 'canonical_url', 'date'];

/**
 * Process a markdown file
 * @param {string} filePath - Path to markdown file
 * @returns {Object} - { frontmatter, content, errors }
 */
export function processPost(filePath) {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const errors = validateFrontmatter(frontmatter, filePath);
    
    // Auto-generate canonical_url if not provided
    if (!frontmatter.canonical_url) {
      const filename = filePath.split(/[/\\]/).pop().replace('.md', '');
      frontmatter.canonical_url = getCanonicalUrl(filename);
    }
    
    // Auto-generate date if not provided
    if (!frontmatter.date) {
      frontmatter.date = new Date().toISOString().split('T')[0];
    }
    
    // Default published to true if not specified
    if (frontmatter.published === undefined) {
      frontmatter.published = true;
    }
    
    return {
      frontmatter,
      content,
      errors,
      filePath
    };
  } catch (error) {
    return {
      frontmatter: {},
      content: '',
      errors: [`Failed to process file: ${error.message}`],
      filePath
    };
  }
}

/**
 * Validate frontmatter against schema
 * @param {Object} frontmatter - Frontmatter object
 * @param {string} filePath - File path for error messages
 * @returns {Array} - Array of error messages
 */
function validateFrontmatter(frontmatter, filePath) {
  const errors = [];
  
  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) {
      errors.push(`Missing required field: ${field} in ${filePath}`);
    }
  }
  
  // Validate field types
  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    errors.push(`tags must be an array in ${filePath}`);
  }
  
  if (frontmatter.published !== undefined && typeof frontmatter.published !== 'boolean') {
    errors.push(`published must be a boolean in ${filePath}`);
  }
  
  if (frontmatter.date && !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date)) {
    errors.push(`date must be in YYYY-MM-DD format in ${filePath}`);
  }
  
  return errors;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node process-post.js <path-to-markdown-file>');
    process.exit(1);
  }
  
  const result = processPost(filePath);
  
  if (result.errors.length > 0) {
    console.error('Validation errors:');
    result.errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }
  
  console.log('Post processed successfully:');
  console.log('Frontmatter:', JSON.stringify(result.frontmatter, null, 2));
  console.log('Content length:', result.content.length, 'characters');
}

