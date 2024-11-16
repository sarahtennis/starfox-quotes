import Express from 'express';
import QueryService from "../services/queryService";
import { GET_ALL } from '../queries/characters';

export default class CharactersHandler {
  static async getAllCharacters(request: Express.Request, response: Express.Response) {
    const result = await QueryService.query(GET_ALL);
    response.status(200).json(result.rows);
  }
}
