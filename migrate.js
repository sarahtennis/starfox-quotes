
const fs = require('fs');
const path = require('path');
const { DbPool } = require('./pool');

// Function to apply a migration
async function applyMigration(filename) {
    const client = DbPool;
    try {
        const sql = fs.readFileSync(path.join(__dirname, '/migrations/' + filename), 'utf8');
        await client.query(sql); // Execute the migration script
        // await client.query(fs.readFileSync(path.join(__dirname, 'migrations-init.sql'), 'utf8'));
        await client.query("INSERT INTO migrations (name) VALUES ($1)", [filename]); // Record the migration
        console.log(`Applied migration: ${filename}`);
    } catch (err) {
        console.error(`Error applying migration ${filename}:`, err);
    }
}

// Main script
async function main() {
    const migrationFiles = [
      '001_create_migrations_table.sql',
      '002_create_images_table.sql',
      '003_create_quotes_table.sql',
      '004_create_characters_table.sql'
    ]; // List of migration files

    for (let file of migrationFiles) {
      await applyMigration(file);
    }
}

main();
