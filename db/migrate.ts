import 'dotenv/config';

import { queryStr, executeMigration } from './queryHelper';
import { FileInfo, getSortedFiles  } from './fileHelper';
import { CONFIG } from '../services/poolService';
import { Client } from 'pg';

async function main() {
    const client = new Client(CONFIG);
    let unmigrated;
    const migrationFiles: FileInfo[] = await getSortedFiles('../migrations');
    try {
        await client.connect();
        const alreadyMigrated = await queryStr('SELECT name FROM migrations;', client);
        const alreadyMigratedArr = alreadyMigrated.rows.map((row: any) => row.name);
        unmigrated = migrationFiles.filter(fileInfo => {
            return !alreadyMigratedArr.includes(fileInfo.fileName);
        });
    } catch (err) {
        console.log("Error querying migrations table, probably doesn't exist, running all migrations");
        unmigrated = migrationFiles;
    }

    console.log('Unmigrated:', unmigrated);

    for (let fileInfo of unmigrated) {
        await executeMigration(`${fileInfo.path}/${fileInfo.fileName}`, client);
        console.log(`Applied migration for file: ${fileInfo.fileName}`);
    }

    await client.end();
}

main();
