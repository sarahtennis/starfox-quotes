import 'dotenv/config'

import fs from 'fs';
import path from 'path';
import { Client } from "pg";
import { CONFIG } from "../services/poolService";

interface InsertValues {
  imageString: string;
  name: string;
  quotes: string[];
}

const EXT_TYPES = {
  SVG: 'svg',
  JSON: 'json'
};

const CHARACTERS_DIR_PATH = "../characters";
const DESTROY_QUERY = "TRUNCATE characters RESTART IDENTITY CASCADE;TRUNCATE quotes RESTART IDENTITY CASCADE;";
const INSERT_CHARACTER_QUERY = "INSERT INTO characters (name) VALUES ($1) RETURNING id;";
const INSERT_QUOTE_QUERY = "INSERT INTO quotes (content) VALUES ($1) RETURNING id;";
const INSERT_IMAGE_QUERY = "INSERT INTO images (character_id, content, mime_type) VALUES ($1, $2, $3);";
const INSERT_JOIN_QUERY = "INSERT INTO character_quotes (character_id, quote_id) VALUES ($1, $2);";

// Main script
async function main() {
  const client = new Client(CONFIG);
  await client.connect();
  await client.query(DESTROY_QUERY);

  const dirsPath = __dirname + "/" + CHARACTERS_DIR_PATH;
  const characterDirs = fs.readdirSync(path.resolve(dirsPath));

  let insertArr: InsertValues[] = [];
  characterDirs.forEach(dir => {
    const dirPath = dirsPath + '/' + dir;
    const files = fs.readdirSync(path.resolve(dirPath));

    let insert: Partial<InsertValues> = {};
    files.forEach(file => {
      const ext = file.split('.')[1];
      const filePath = dirPath + "/" + file;

      switch(ext) {
        case EXT_TYPES.SVG:
          const svgFileString = fs.readFileSync(filePath, {encoding: 'utf-8'});
          insert.imageString = svgFileString.replace(/\n|\s+/g, '');
          break;
        case EXT_TYPES.JSON:
          const jsonFileString = fs.readFileSync(filePath, {encoding: 'utf8'});
          const characterInfo: InsertValues = JSON.parse(jsonFileString);
          insert = Object.assign(insert, characterInfo);
          break;
      }
    });
    insertArr.push(<InsertValues>insert);
  });

  for (let charInfo of insertArr) {
    const charResult = await client.query(INSERT_CHARACTER_QUERY, [charInfo.name]);
    const charId = charResult.rows[0].id;

    await client.query(INSERT_IMAGE_QUERY, [charId, charInfo.imageString, 'image/svg+xml']);

    for (let quote of charInfo.quotes) {
      const quotesResult = await client.query(INSERT_QUOTE_QUERY, [quote]);
      const quoteId = quotesResult.rows[0].id;
      await client.query(INSERT_JOIN_QUERY, [charId, quoteId]);
    }
  }

  await client.end();
}

main();
