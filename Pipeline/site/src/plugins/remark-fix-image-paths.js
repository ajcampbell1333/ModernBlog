/**
 * Remark plugin to fix image paths in Markdown
 * Converts relative paths (Images/...) to base-relative paths
 */
export function remarkFixImagePaths() {
  return (tree) => {
    const basePath = process.env.ASTRO_BASE_PATH || '/ModernBlog/';
    // Ensure basePath ends with /
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    
    function visit(node) {
      if (node.type === 'html' && node.value) {
        // Fix relative image paths: src="Images/..." -> src="/ModernBlog/Images/..."
        // Match paths that start with "Images/" (no leading slash, no base prefix)
        node.value = node.value.replace(
          /src=(["'])Images\/([^"']+)\1/g,
          (match, quote, imagePath) => {
            // Add base path prefix
            return `src=${quote}${normalizedBase}Images/${imagePath}${quote}`;
          }
        );
      }
      
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    
    visit(tree);
  };
}

