// mdules import
const fs = require('fs').promises;
const path = require('path');
// using async function
async function mergeStyles() {
  const stylesDir = path.join(__dirname, 'styles');
  const projectDist = path.join(__dirname, 'project-dist');
  const bundleCss = path.join(projectDist, 'bundle.css');
  try {
    const files = await fs.readdir(stylesDir, { recursive: true });
    const styles = []; //array for the styles
    // handling each file in the styles directory
    for (const file of files) {
      const filePath = path.join(stylesDir, file);
      // checking if the object is a file and has the correct extension
      if (path.extname(file) === '.css') {
        const styleInner = await fs.readFile(filePath);
        styles.push(styleInner);
      }
    }
    // writing the styles(array) to the bundle.css file
    await fs.writeFile(bundleCss, styles.join('\n'));
    console.log('Styles merged successfully');
  } catch (err) {
    console.log(`${err.message}`);
  }
}
mergeStyles();
