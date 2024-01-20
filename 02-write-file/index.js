// modules import
const fs = require('fs');
const readline = require('readline');
const path = require('path');
// creating a new text file
const textFile = 'text.txt';
// file path
const filePath = path.join(__dirname, textFile);
// adding writeStream to the text file
const writeStream = fs.createWriteStream(filePath);
console.log(
  // eslint-disable-next-line quotes
  "Hello! Please enter your message. If you want to end enter '.exit' or tap 'ctrl + c' to exit",
);
// creating interface to read the text from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// awaiting user texting
rl.on('line', function (input) {
  if (input === '.exit' || input === 'ctrl + c') {
    console.log('Programmed exit');
    rl.close();
    process.exit(0);
  }
  writeStream.write(input + '\n'); // writing inserted text to the text.txt
  console.log('Please enter your next message:'); // hint for the next message
});
