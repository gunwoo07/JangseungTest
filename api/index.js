// import express framework
const express = require('express');
const app = express();

// import body-parser for post
const bodyParser = require('body-parser');

// import cors for API
const cors = require('cors');


// import router
const testList = require('./router/testList');
const downloadTest = require('./router/downloadTest');


// use bodyParser for post
app.use(bodyParser());

// use cors for API
app.use(cors());


// use router
app.use('/testList', testList);
app.use('/downloadTest', downloadTest);


require('greenlock-express').init({
    packageRoot: __dirname,
    configDir: './greenlock.d',
    maintainerEmail: 'studentdeveloper07@gmail.com',
}).serve(app);