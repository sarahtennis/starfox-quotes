import { ClientConfig, Pool } from "pg";
import Service from "./serviceInterface";

export const CONFIG: ClientConfig = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.PORT),
};

class PoolService implements Service {
  private pool: Pool;
  constructor() {
    this.pool = new Pool(CONFIG);
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async destroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

export default new PoolService();
