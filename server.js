const express = require('express');

const dbConfig = require('./config/dbConfig.js');
const expressConfig = require('./config/expressConfig.js');
const routerConfig = require('./config/routerConfig.js');

const app = express();

async function start() {
    await dbConfig(app);
    expressConfig(app);
    routerConfig(app);

    app.listen(3030, () => { console.log('Running on 3030...') })
}

module.exports = start;


// DO 1:57