const fs = require('fs');
const path = require('path');

function getSortedFiles(filepath) {
  const files = fs.readdirSync(path.resolve(__dirname, filepath));
  files.sort((a, b) => {
      const fileNumA = Number(a.split('_')[0]);
      const fileNumB = Number(b.split('_')[0]);
      return fileNumA - fileNumB;
  });
  return files.map(file => `${filepath}/${file}`);
}

module.exports = {
  getSortedFiles
};
