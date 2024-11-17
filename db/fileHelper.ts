import fs from 'fs';
import path from 'path';

export function getSortedFiles(filepath: string) {
  const files = fs.readdirSync(path.resolve(__dirname, filepath));
  files.sort((a, b) => {
      const fileNumA = Number(a.split('_')[0]);
      const fileNumB = Number(b.split('_')[0]);
      return fileNumA - fileNumB;
  });
  return files.map(file => `${filepath}/${file}`);
}
