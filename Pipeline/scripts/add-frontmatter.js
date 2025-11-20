#!/usr/bin/env node
/**
 * Add frontmatter to markdown files that don't have it
 * Extracts title from first H1, generates date from filename
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { titleToSlug } from './generate-slug.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

/**
 * Extract title from markdown content
 */
function extractTitle(content) {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  return null;
}

/**
 * Generate frontmatter for a post
 */
function generateFrontmatter(filePath, content) {
  const filename = basename(filePath, '.md');
  const title = extractTitle(content) || filename.replace(/_/g, ' ').replace(/-/g, ' ');
  const slug = titleToSlug(title);
  
  return {
    title: title,
    slug: slug,
    date: new Date().toISOString().split('T')[0],
    published: true
  };
}

/**
 * Add frontmatter to a markdown file
 */
function addFrontmatter(filePath) {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    // If frontmatter already exists, skip
    if (Object.keys(data).length > 0) {
      console.log(`Skipping ${filePath} - already has frontmatter`);
      return false;
    }
    
    // Generate frontmatter
    const frontmatter = generateFrontmatter(filePath, content);
    
    // Write back with frontmatter
    const newContent = matter.stringify(content, frontmatter);
    writeFileSync(filePath, newContent, 'utf-8');
    
    console.log(`Added frontmatter to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node add-frontmatter.js <path-to-markdown-file>');
    process.exit(1);
  }
  
  addFrontmatter(filePath);
}

