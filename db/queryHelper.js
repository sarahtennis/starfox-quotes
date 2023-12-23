const fs = require('fs');
const path = require('path');

function queryStr(sql, client) {
  try {
    return client.query(sql);
  } catch (err) {
    console.error(`Error executing query ${sql}:`, err);
  }
}

function queryFile(filepath, client) {
  try {
    const sql = fs.readFileSync(path.resolve(__dirname, filepath), 'utf-8');
    return queryStr(sql, client); 
  } catch (err) {
    console.error(`Error executing query at ${filepath}:`, err);
  }
}

async function executeMigration(filepath, client) {
  try {
    await queryFile(filepath, client);
    const fileName = path.parse(filepath).base;
    await queryStr(`INSERT INTO migrations (name) VALUES ('${fileName}')`, client); // Record the migration
  } catch (err) {
    console.error(`Error applying migration at ${filepath}:`, err);
  }
}


module.exports = {
  executeMigration,
  queryFile,
  queryStr
};
