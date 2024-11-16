
import { Client } from "pg";
import { CONFIG } from "../services/poolService";
import { getSortedFiles } from "./fileHelper";
import { queryFile } from "./queryHelper";

// Main script
async function main() {
  const client = new Client(CONFIG);
  await client.connect();
  const seedFiles = getSortedFiles('../seeds');
  for (let file of seedFiles) {
    await queryFile(file, client);
    console.log(`Seeded db with file: ${file}`);
  }

  await client.end();
}

main();
