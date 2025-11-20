#!/usr/bin/env node
/**
 * Generate CNAME file from configuration
 * This should be run during build to create the CNAME file
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate CNAME file
 * @param {string} outputPath - Path to write CNAME file
 */
export function generateCNAME(outputPath) {
  const config = getConfig();
  const domain = config.blogDomain;
  
  // Write CNAME file
  writeFileSync(outputPath, `${domain}\n`, 'utf-8');
  console.log(`Generated CNAME file: ${domain}`);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const outputPath = process.argv[2] || join(__dirname, '../../site/public/CNAME');
  generateCNAME(outputPath);
}

