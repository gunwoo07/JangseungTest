// import router framework
var express = require('express');
var router = express.Router();


// import fs, path
var fs = require('fs');
var path = require('path');


// testList router
router.post('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../data', 'data.json'), 'utf8', (err, data) => {
        res.send(data);
    });
});


module.exports = router;