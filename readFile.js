const fs = require('fs');
const path = require('path');

const readFile = (fileName) => {
  const filePath = path.join(__dirname, './', 'messages', fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  
  return JSON.parse(data);
};

module.exports = {
    readFile
};