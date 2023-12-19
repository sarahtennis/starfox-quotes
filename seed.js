
const fs = require('fs');
const path = require('path');
const { DbPool } = require('./pool');

// Function to apply a migration
async function seed(filename) {
    const client = DbPool;
    try {
        const sql = fs.readFileSync(path.join(__dirname, '/seeds/' + filename), 'utf8');
        await client.query(sql); // Execute the migration script
    } catch (err) {
        console.error(`Error seeding ${filename}:`, err);
    }
}

// Main script
async function main() {
    const seedFiles = [
      '001_seed_quotes.sql'
    ]; // List of seed files

    for (let file of seedFiles) {
      await seed(file);
    }
}

main();
