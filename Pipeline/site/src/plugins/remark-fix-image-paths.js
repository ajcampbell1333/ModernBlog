/**
 * Remark plugin to fix image paths in Markdown
 * Ensures image src attributes use the correct base path
 * Handles both /ModernBlog/Images/ and /Images/ paths
 */
export function remarkFixImagePaths() {
  return (tree) => {
    const basePath = process.env.ASTRO_BASE_PATH || '/ModernBlog/';
    // Ensure basePath ends with /
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    
    function visit(node) {
      if (node.type === 'html' && node.value) {
        // Fix img src attributes
        // Replace any /ModernBlog/Images/ or /Images/ with the correct base path
        node.value = node.value.replace(
          /src=["'](\/ModernBlog\/Images\/|\/Images\/)([^"']+)["']/g,
          (match, pathPrefix, imagePath) => {
            // Always use the base path from env, ensuring no double-prefixing
            return `src="${normalizedBase}Images/${imagePath}"`;
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

