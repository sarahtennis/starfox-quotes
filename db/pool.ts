import { Pool } from 'pg';

export const DbPool: Pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'testapi',
  password: 'password',
  port: 5432,
});
