// import router framework
var express = require('express');
var router = express.Router();


// import fs, path
var fs = require('fs');
var path = require('path');

var mail = require('./../lib/sendMail');


// downloadTest router
router.post('/', (req, res) => {
    let user = req.body.user;
    let userPW = req.body.userPW;
    let realPW = '';

    fs.readFile(path.join(__dirname, '../data', 'user.json'), 'utf8', (err, jsonFile) => {
        var jsonData = JSON.parse(jsonFile);
        var check = false;
        for (var i=0; i < jsonData['user'].length; i++) {
            if (jsonData['user'][i][0] == user) {
                check = true;
                realPW = jsonData['user'][i][1];
                break;
            }
        }

        if (!check) {
            var codeLists = ['student', 'turtle', 'jangseung', 'jang', 'seung', 'js', 'apple', 'banana', 'grapes', 'strawberry', 'snowman', 'snowball', 'classroom']
            var code = `${codeLists[Math.floor(Math.random()*codeLists.length)]}${Math.floor(Math.random() * 100)}`;
            jsonData['user'].push([user, code]);
            fs.writeFile(path.join(__dirname, '../data', 'user.json'), JSON.stringify(jsonData), 'utf8', () => {
                mail.sendMail(mail.generateSchoolEmail(user), '인증 코드', code, code);
                return;
            });
            return;
        }

        if (userPW == '') {
            mail.sendMail(mail.generateSchoolEmail(user), '인증 코드', realPW, realPW);
        }
        
        if (realPW != userPW) {
            return;
        }

        let file = `${path.basename(req.body.fileName)}.pdf`;
        let filePath = path.join(__dirname, '../data', file);
    
        fs.exists(filePath, (exists) => {
            if (exists) {
                res.download(filePath, file);
            }
            return;
        });
    });

});


module.exports = router;