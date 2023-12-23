import fs from 'fs';
import path from 'path';

export function queryStr(sql: any, client: any) {
  try {
    return client.query(sql);
  } catch (err) {
    console.error(`Error executing query ${sql}:`, err);
  }
}

export function queryFile(filepath: string, client: any) {
  try {
    const sql = fs.readFileSync(path.resolve(__dirname, filepath), 'utf-8');
    return queryStr(sql, client); 
  } catch (err) {
    console.error(`Error executing query at ${filepath}:`, err);
  }
}

export async function executeMigration(filepath: string, client: any) {
  try {
    await queryFile(filepath, client);
    const fileName = path.parse(filepath).base;
    await queryStr(`INSERT INTO migrations (name) VALUES ('${fileName}')`, client); // Record the migration
  } catch (err) {
    console.error(`Error applying migration at ${filepath}:`, err);
  }
}
