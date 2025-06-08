const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, '..');
const destDir = path.join(__dirname, 'public', 'code');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Get all Python files from the source directory
const pythonFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.py'));

// Copy each Python file to the destination directory
pythonFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied: ${file}`);
});

console.log('All Python files have been copied successfully!'); 