// modules import
const fs = require('fs').promises;
const readline = require('readline');
const path = require('path');
// creating a new text file
const textFile = 'text.txt';
// file path
const filePath = path.join(__dirname, textFile);
// creating interface to read the text from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function writeFileToLog() {
  // checking if text file is not existing, create a new text file
  try {
    await fs.access(filePath);
  } catch (err) {
    await fs.writeFile(filePath, '');
  }

  console.log(
    // eslint-disable-next-line quotes
    "Hello! Please enter your message. If you want to end enter 'exit' or tap 'ctrl + c' to exit",
  );

  rl.on('line', async (input) => {
    if (
      input.trim().toLowerCase() === 'exit' ||
      input.trim().toLowerCase() === 'ctrl + c'
    ) {
      console.log('Goodbye! Programmed exit!');
      process.exit(0);
    }
    // writing the text to the text file
    await fs.appendFile(filePath, input + '\n');
    console.log('Please enter next message: ');
  });

  // end texting event handling
  rl.on('close', () => {
    console.log('Goodbye! Programmed exit!');
    process.exit(0);
  });
}

writeFileToLog();
