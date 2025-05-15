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
  'update-imports.js',
  'add-use-client.js'
];

// File extensions to include
const includeExtensions = ['.tsx', '.jsx'];

// Add 'use client' to a file if needed
async function addUseClient(filePath) {
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
    
    // Skip files that don't import from motion-wrapper
    if (!content.includes('@/components/motion-wrapper')) {
      return false;
    }
    
    // Skip files that already have 'use client'
    if (content.includes('"use client"') || content.includes("'use client'")) {
      return false;
    }
    
    // Add 'use client' directive at the beginning of the file
    const updatedContent = `"use client";\n\n${content}`;
    
    // Write the updated content
    await writeFileAsync(filePath, updatedContent, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
async function main() {
  console.log('Starting to add "use client" directive to files...');
  const rootDir = '.';
  let filesUpdated = 0;
  
  // Get all files
  const files = [];
  walkDir(rootDir, filePath => files.push(filePath));
  
  // Update files
  for (const file of files) {
    const updated = await addUseClient(file);
    if (updated) {
      console.log(`Updated: ${file}`);
      filesUpdated++;
    }
  }
  
  console.log(`Done! Added "use client" directive to ${filesUpdated} files.`);
}

main().catch(console.error); 