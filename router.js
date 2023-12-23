const express = require("express");
const router = express.Router();
const {DbPool} = require('./db/pool');
const queries = require('./queries/characters');

router.get('/', async (req, res) => {
  queries.getAllCharacters(req, res);
});

router.get('/:id', async (req, res) => {
  queries.getCharacterById(req, res);
});

module.exports = {
  router
};
