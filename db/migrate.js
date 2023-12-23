const path = require('path');
const { DbPool } = require('./pool');
const { queryStr, executeMigration } = require('./queryHelper.js');
const { getSortedFiles } = require('./fileHelper.js');

async function main() {
    const client = DbPool;
    const migrationFiles = await getSortedFiles('../migrations');

    let unmigrated;
    try {
        const alreadyMigrated = await queryStr('SELECT name FROM migrations;', client);
        const alreadyMigratedArr = alreadyMigrated.rows.map(row => row.name);
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
