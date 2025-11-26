/**
 * Remark plugin to fix image paths in Markdown
 * Converts relative paths (Images/...) to base-relative paths
 */
export function remarkFixImagePaths() {
  return (tree) => {
    const basePath = process.env.ASTRO_BASE_PATH || '/ModernBlog/';
    // Ensure basePath ends with /
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    
    // Debug logging
    console.log('[remark-fix-image-paths] ASTRO_BASE_PATH:', process.env.ASTRO_BASE_PATH);
    console.log('[remark-fix-image-paths] basePath:', basePath);
    console.log('[remark-fix-image-paths] normalizedBase:', normalizedBase);
    
    function visit(node) {
      if (node.type === 'html' && node.value) {
        // Fix relative image paths: src="Images/..." -> src="/ModernBlog/Images/..."
        // Match paths that start with "Images/" (no leading slash, no base prefix)
        const originalValue = node.value;
        node.value = node.value.replace(
          /src=(["'])Images\/([^"']+)\1/g,
          (match, quote, imagePath) => {
            // Add base path prefix
            const newValue = `src=${quote}${normalizedBase}Images/${imagePath}${quote}`;
            console.log(`[remark-fix-image-paths] Replacing: ${match} -> ${newValue}`);
            return newValue;
          }
        );
        if (originalValue !== node.value) {
          console.log(`[remark-fix-image-paths] Updated HTML node value`);
        }
      }
      
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    
    visit(tree);
  };
}

