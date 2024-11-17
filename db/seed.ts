import 'dotenv/config'

import { Client } from "pg";
import { CONFIG } from "../services/poolService";
import { getSortedFiles } from "./fileHelper";
import { queryFile } from "./queryHelper";

// Main script
async function main() {
  const client = new Client(CONFIG);
  await client.connect();
  const seedFiles = getSortedFiles('../seeds');
  for (let fileInfo of seedFiles) {
    const {fileName, path} = fileInfo;
    await queryFile(`${path}/${fileName}`, client);
    console.log(`Seeded db with file: ${fileName}`);
  }

  await client.end();
}

main();
