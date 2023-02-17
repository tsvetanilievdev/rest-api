const express = require('express');
const cors = require('../middlewares/cors.js');
const trimBody = require('../middlewares/trimBody.js');

module.exports = (app) => {
    app.use(express.json())
    app.use(cors());
    app.use(trimBody())
}