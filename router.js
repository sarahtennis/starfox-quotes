const express = require("express");
const router = express.Router();
const {DbPool} = require('./pool');
const queries = require('./queries/characters');

router.get('/', async (req, res) => {
  queries.getAllCharacters(req, res);
});

module.exports = {
  router
};
