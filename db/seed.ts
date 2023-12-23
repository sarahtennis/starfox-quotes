
import { getSortedFiles } from "./fileHelper";
import { queryFile } from "./queryHelper";
import { DbPool } from './pool';

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
