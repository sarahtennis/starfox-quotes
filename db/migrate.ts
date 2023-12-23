import path from 'path';
import { DbPool } from './pool';
import { queryStr, executeMigration } from './queryHelper';
import { getSortedFiles  } from './fileHelper';

async function main() {
    const client = DbPool;
    const migrationFiles = await getSortedFiles('../migrations');

    let unmigrated;
    try {
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

    client.end();
}

main();
