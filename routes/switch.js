const express = require("express");
const fs = require("fs");
const request = require('request');

const router = express.Router();

// get
router.get('/', function(req, res){
    fs.readFile('./views/switch.html', function(err, data){
        if(err){
            res.send('에러');
        }
        else{
            res.writeHead(200, {'Content-Type': 'switch.html'});
            res.write(data);
            res.end();
        }
    });
});

module.exports = router;