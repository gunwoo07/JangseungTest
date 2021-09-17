// import express framework
const express = require('express');
const app = express();

// import body-parser for post
const bodyParser = require('body-parser');


// import router
const testList = require('./router/testList');
const downloadTest = require('./router/downloadTest');


// use bodyParser for post
app.use(bodyParser());

// use router
app.use('/testList', testList);
app.use('/downloadTest', downloadTest);


// set listening port
const port = 3000;


// listening on port
app.listen(port, () => {
    console.log('Jangseng Test API');
    console.log(`* Running on port ${port}`);
});