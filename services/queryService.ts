import Service from "./serviceInterface";
import PoolService from './poolService';

class QueryService implements Service {
  constructor() {}

  static async query(queryString: string, values: any[] = []) {
    const result = await PoolService.getPool().query(queryString, values);
    return result;
  }

  destroy() {}
}

export default QueryService;
