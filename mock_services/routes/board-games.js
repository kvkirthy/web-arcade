var fs = require('fs');
var express = require('express');
var router = express.Router();
var boardGames = require('../data/board-games.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(boardGames);
});

router.post('/comments', function(req, res){
    console.log('1', req.body);
    let commentsData = [];
    try{
        fs.readFile("data/comments.json", {encoding: 'utf-8'},  function(err, data){
            if(err){
                return console.log("error reading from the file", err);
            }  
            commentsData = commentsData.concat(JSON.parse(data));
            console.log("data", commentsData, req.body);
            commentsData.push(req.body);
            // console.log("current comments", commentsData);

            fs.writeFile("data/comments.json", JSON.stringify(commentsData), function(err){
                if(err){
                    return console.log("error writing to file", err);
                }  
                console.log("file saved");
            });
        })

        res.sendStatus(200);
    }catch(err){
        console.log('err2', err);
        res.sendStatus(200);
    }
});

module.exports = router;