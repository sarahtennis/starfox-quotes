const fs = require('fs');
const path = require('path');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'testapi',
  password: 'password',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}


// Function to apply a migration
async function applyMigration(filename) {
    const client = await pool.connect();
    try {
        const sql = fs.readFileSync(path.join(__dirname, '/migrations/' + filename), 'utf8');
        await client.query(sql); // Execute the migration script
        // await client.query(fs.readFileSync(path.join(__dirname, 'migrations-init.sql'), 'utf8'));
        await client.query("INSERT INTO migrations (name) VALUES ($1)", [filename]); // Record the migration
        console.log(`Applied migration: ${filename}`);
    } catch (err) {
        console.error(`Error applying migration ${filename}:`, err);
    } finally {
        client.release();
    }
}

// Main script
async function main() {
    const migrationFiles = ['001_create_users_table.sql']; // List of migration files

    for (const file of migrationFiles) {
        await applyMigration(file);
    }

    await pool.end();
}

main();







module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
