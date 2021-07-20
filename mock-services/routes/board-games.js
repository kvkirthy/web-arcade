var express = require('express');
var router = express.Router();
var boardGames = require('../data/board-games.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(boardGames);
});

module.exports = router;