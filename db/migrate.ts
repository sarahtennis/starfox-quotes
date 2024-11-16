import path from 'path';
import { queryStr, executeMigration } from './queryHelper';
import { getSortedFiles  } from './fileHelper';
import { CONFIG } from '../services/poolService';
import { Client } from 'pg';

async function main() {
    const client = new Client(CONFIG);
    let unmigrated;
    const migrationFiles = await getSortedFiles('../migrations');
    try {
        await client.connect();
        const alreadyMigrated = await queryStr('SELECT name FROM migrations;', client);
        const alreadyMigratedArr = alreadyMigrated.rows.map((row: any) => row.name);
        unmigrated = migrationFiles.filter(filePath => {
            const fileName = path.parse(filePath).base;
            return !alreadyMigratedArr.includes(fileName);
        });
    } catch (err) {
        console.log("Error querying migrations table, probably doesn't exist, running all migrations");
        unmigrated = migrationFiles;
    }

    console.log('Unmigrated:', unmigrated);

    for (let filePath of unmigrated) {
        await executeMigration(filePath, client);
        console.log(`Applied migration for file: ${filePath}`);
    }

    await client.end();
}

main();
