const dataController = require('express').Router();

dataController
    .route('/catalog')
    .get((req, res) => {
        console.log(req.user);
        console.log(req.token);
        res.json([]);
    })
module.exports = dataController;
