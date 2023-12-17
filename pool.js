const { Pool } = require('pg');
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'testapi',
  password: 'password',
  port: 5432,
})

module.exports = {
  DbPool: pool
};
