// mdules import
const fs = require('fs').promises;
const path = require('path');
// function to copy directory
async function copyDirectory(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true }); //creating directory
    const items = await fs.readdir(src, { withFileTypes: true });
    // copying files and folders
    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
      if (item.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
        console.log(`${item.name} copied to ${destPath}`);
      }
    }
    console.log('Copying is complete.');
  } catch (err) {
    console.log(`${err.message}`);
  }
}

// using async function
async function buildPage() {
  const projectDist = path.join(__dirname, 'project-dist');
  const templateHtml = path.join(__dirname, 'template.html');
  const indexHtml = path.join(projectDist, 'index.html');
  const styleFile = path.join(projectDist, 'style.css');
  try {
    await fs.mkdir(projectDist, { recursive: true }); //creating directory project-dist
    const innerTemplate = await fs.readFile(templateHtml, { encoding: 'utf8' }); //reading templates
    const htmlTagNames = innerTemplate
      .match(/{{([^{}]+)}}/g)
      .map((tag) => tag.slice(2, -2).trim()); //searching tag names in a template file
    // reading and changing tags to the components inners
    let update = innerTemplate;
    for (const tagName of htmlTagNames) {
      const component = path.join(__dirname, 'components', `${tagName}.html`);
      const componentInner = await fs.readFile(component, { encoding: 'utf8' });
      update = update.replace(
        new RegExp(`{{${tagName}}}`, 'g'),
        componentInner,
      );
    }
    await fs.writeFile(indexHtml, update); //writing changed template to the index.html
    // copying styles from styles
    const stylesDir = path.join(__dirname, 'styles');
    const styles = await fs.readdir(stylesDir);
    const stylesInner = await Promise.all(
      styles.map(async (style) => {
        const stylePath = path.join(stylesDir, style);
        return await fs.readFile(stylePath, { encoding: 'utf8' });
      }),
    );
    await fs.writeFile(styleFile, stylesInner.join('\n'));

    const assets = path.join(__dirname, 'assets');
    const assetsDist = path.join(projectDist, 'assets');
    await copyDirectory(assets, assetsDist);
    console.log('Build Successful!');
  } catch (err) {
    console.log(`${err.message}`);
  }
}
buildPage();
