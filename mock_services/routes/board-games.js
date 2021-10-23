var fs = require('fs');
var express = require('express');
var router = express.Router();
var boardGames = require('../data/board-games.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(boardGames);
});

router.get('/gameById', function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    res.send(boardGames.boardGames.find( i => +i.gameId === +req.query.gameId));
});

router.get('/comments', function(req, res){
    fs.readFile("mock_services/data/comments.json", {encoding: 'utf-8'},  function(err, data){
        let comments = [];
        if(err){
            return console.log("error reading from the file", err);
        }  
        res.setHeader('Content-Type', 'application/json');
        comments = JSON.parse(data);
        comments = Object.values(comments).filter( i => {
            console.log(i, i.gameId, req.query.gameId, +i.gameId === +req.query.gameId);
            return +i.gameId === +req.query.gameId
        });
        res.send(comments);
    });
});

router.post('/comments', function(req, res){
    let commentsData = [];
    try{
        fs.readFile("mock_services/data/comments.json", {encoding: 'utf-8'},  function(err, data){
            if(err){
                return console.log("error reading from the file", err);
            }  
            commentsData = commentsData.concat(JSON.parse(data));
            commentsData = commentsData.concat(req.body);

            fs.writeFile("mock_services/data/comments.json", JSON.stringify(commentsData), function(err){
                if(err){
                    return console.log("error writing to file", err);
                }  
                console.log("file saved");
            });
        });
        res.send({
            status: 'success'
        });
    }catch(err){
        console.log('err2', err);
        res.sendStatus(200);
    }
});

module.exports = router;