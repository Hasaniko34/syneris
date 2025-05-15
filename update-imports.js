const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Function to walk through directories recursively
const walkDir = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : 
      callback(path.join(dir, f));
  });
};

// Paths to exclude
const excludePaths = [
  'node_modules',
  '.next',
  '.git',
  'components/motion-wrapper.tsx' // Don't modify our wrapper
];

// File extensions to include
const includeExtensions = ['.tsx', '.ts', '.jsx', '.js'];

// Update imports in a file
async function updateImports(filePath) {
  try {
    // Exclude certain directories and files
    if (excludePaths.some(excludePath => filePath.includes(excludePath))) {
      return false;
    }
    
    // Only process files with the correct extensions
    const ext = path.extname(filePath);
    if (!includeExtensions.includes(ext)) {
      return false;
    }
    
    // Read file content
    const content = await readFileAsync(filePath, 'utf8');
    
    // Skip files that don't import from framer-motion
    if (!content.includes('framer-motion')) {
      return false;
    }
    
    // Replace imports
    let updatedContent = content.replace(
      /import\s+\{\s*motion\s*\}\s+from\s+["']framer-motion["']/g, 
      'import { motion } from "@/components/motion-wrapper"'
    );
    
    updatedContent = updatedContent.replace(
      /import\s+\{\s*AnimatePresence\s*\}\s+from\s+["']framer-motion["']/g, 
      'import { AnimatePresence } from "@/components/motion-wrapper"'
    );
    
    updatedContent = updatedContent.replace(
      /import\s+\{\s*motion,\s*AnimatePresence\s*\}\s+from\s+["']framer-motion["']/g, 
      'import { motion, AnimatePresence } from "@/components/motion-wrapper"'
    );
    
    // Also handle potential additional imports
    const animationHooks = [
      'useAnimate', 'useAnimation', 'useInView', 'useScroll', 
      'useSpring', 'useTransform', 'useMotionValue', 'useMotionTemplate',
      'useVelocity', 'useCycle', 'animate'
    ];
    
    for (const hook of animationHooks) {
      const regex = new RegExp(`import\\s+\\{\\s*.*?${hook}.*?\\}\\s+from\\s+["']framer-motion["']`, 'g');
      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(regex, (match) => {
          // Keep other imports but replace the hook
          return match.replace(hook, `/* ${hook} from framer-motion */`);
        });
        // Add the import from our wrapper
        updatedContent = `import { ${hook} } from "@/components/motion-wrapper";\n${updatedContent}`;
      }
    }
    
    // Only write if content has changed
    if (content !== updatedContent) {
      await writeFileAsync(filePath, updatedContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
async function main() {
  console.log('Starting to update framer-motion imports...');
  const rootDir = '.';
  let filesUpdated = 0;
  
  // Get all files
  const files = [];
  walkDir(rootDir, filePath => files.push(filePath));
  
  // Update imports in all files
  for (const file of files) {
    const updated = await updateImports(file);
    if (updated) {
      console.log(`Updated: ${file}`);
      filesUpdated++;
    }
  }
  
  console.log(`Done! Updated ${filesUpdated} files.`);
}

main().catch(console.error); 