var boardGames = require('./data/board-games.json');
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/board-games', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(boardGames);
    //res.end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});