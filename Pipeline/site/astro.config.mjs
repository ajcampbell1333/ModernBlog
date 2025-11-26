import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { remarkYouTubeEmbed } from './src/plugins/remark-youtube-embed.js';
import { remarkFixImagePaths } from './src/plugins/remark-fix-image-paths.js';

// Base path is set dynamically during build
// For GitHub Pages: /REPO_NAME/
// For custom domain: /
const base = process.env.ASTRO_BASE_PATH || '/ModernBlog/';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  output: 'static',
  base: base,
  outDir: '../build', // Top-level outDir (relative to config file location)
  markdown: {
    remarkPlugins: [remarkYouTubeEmbed, remarkFixImagePaths],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});

