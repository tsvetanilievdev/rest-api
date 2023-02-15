const dataController = require('express').Router();

dataController
    .route('/catalog')
    .get((req, res) => {
        res.json([]);
    })
module.exports = dataController;
