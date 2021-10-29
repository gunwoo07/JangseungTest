// import router framework
var express = require('express');
var router = express.Router();


// import fs, path
var fs = require('fs');
var path = require('path');


// downloadTest router
router.get('/:fileName', (req, res) => {
    let file = `${path.basename(req.params.fileName)}.pdf`;
    let filePath = path.join(__dirname, '../data', file);

    fs.exists(filePath, (exists) => {
        if (exists) {
            res.sendFile(filePath);
        }
        return;
    });
});


module.exports = router;