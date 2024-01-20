// modules import
const fs = require('fs').promises;
const path = require('path');
// using async function to realize this script that will work correctly
async function showFileInfo() {
  const folderPath = path.join(__dirname, 'secret-folder');
  try {
    const inners = await fs.readdir(folderPath, { withFileTypes: true }); // read directory inners
    // each file handling
    for (const file of inners) {
      const filePath = path.join(folderPath, file.name); //path to file
      const stats = await fs.stat(filePath); // getting infos about file
      if (stats.isFile()) {
        const extension = path.extname(file.name).slice(1); //getting file extension
        console.log(`${file.name} - ${extension} - ${stats.size} bytes`);
      }
    }
  } catch (err) {
    console.error(`${err.message}`);
  }
}
// calling the async function
showFileInfo();
