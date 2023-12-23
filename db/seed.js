
const { getSortedFiles } = require('./fileHelper.js');
const { queryFile } = require('./queryHelper.js');
const { DbPool } = require('./pool.js');

// Main script
async function main() {
  const client = DbPool;

  const seedFiles = getSortedFiles('../seeds');
  for (let file of seedFiles) {
    await queryFile(file, client);
    console.log(`Seeded db with file: ${file}`);
  }

  client.end();
}

main();
