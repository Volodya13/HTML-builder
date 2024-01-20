// modules import
const fs = require('fs');
const path = require('path');
// path to the text.txt file
const filePath = path.join(__dirname, 'text.txt');
// creating readStream
const readStream = fs.createReadStream(filePath);
// handling 'data' event and displaying message from text.txt file to console
readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
