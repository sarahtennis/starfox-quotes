import express from 'express';
import { DbPool } from './db/pool';
import { getAllCharacters, getCharacterById } from './queries/characters';
const router = express.Router();

router.get('/', async (req, res) => {
  getAllCharacters(req, res);
});

router.get('/:id', async (req, res) => {
  getCharacterById(req, res);
});

export default router;
