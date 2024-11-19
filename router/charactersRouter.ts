import express, { Router } from 'express';

import CharactersHandler from '../handlers/charactersHandler';

const CharactersRouter: Router = express.Router();

CharactersRouter.get('/', CharactersHandler.getAllCharacters);

export default CharactersRouter;
