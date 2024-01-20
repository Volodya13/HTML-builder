// modules import
const fs = require('fs').promises;
const path = require('path');
// using async function
async function copyDir() {
  const filesDir = path.join(__dirname, 'files');
  const filesCopyDir = path.join(__dirname, 'files-copy');
  try {
    await fs.mkdir(filesCopyDir, { recursive: true }); //creating directory files-copy
    const files = await fs.readdir(filesDir, {
      withFileTypes: true,
      recursive: true,
    });
    // each file copying
    for (const file of files) {
      const srcPath = path.join(filesDir, file.name);
      const destPath = path.join(filesCopyDir, file.name);
      // copying file
      await fs.copyFile(srcPath, destPath);
      console.log(`${file.name} copied to ${destPath}`);
    }
    console.log('Copying is complete.');
  } catch (err) {
    console.log(`${err.message}`);
  }
}
copyDir();
