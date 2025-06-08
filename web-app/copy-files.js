const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, '..');
const destDir = path.join(__dirname, 'public', 'code');
const publicDir = path.join(__dirname, 'public');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Get all Python files from the source directory
const pythonFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.py'));

// Store file contents in an object for JSON generation
const fileContents = {};

// Copy each Python file to the destination directory
pythonFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  // Read file content
  const content = fs.readFileSync(sourcePath, 'utf8');
  
  // Store content in the object
  fileContents[file] = content;
  
  // Copy file to public directory
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied: ${file}`);
});

// Generate a JSON file with all the file contents
const jsonPath = path.join(__dirname, 'app', 'data');

// Create data directory if it doesn't exist
if (!fs.existsSync(jsonPath)) {
  fs.mkdirSync(jsonPath, { recursive: true });
}

// Write the JSON file to app/data directory
fs.writeFileSync(
  path.join(jsonPath, 'code-files.json'), 
  JSON.stringify(fileContents, null, 2)
);

// Also write the JSON file to the public directory for client-side access
fs.writeFileSync(
  path.join(publicDir, 'code-files.json'), 
  JSON.stringify(fileContents, null, 2)
);

// And write to the root directory as a third fallback
fs.writeFileSync(
  path.join(__dirname, 'code-files.json'), 
  JSON.stringify(fileContents, null, 2)
);

console.log('Generated code-files.json with all file contents');
console.log('All Python files have been copied successfully!'); 