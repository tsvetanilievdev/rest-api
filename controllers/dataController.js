const dataController = require('express').Router();

dataController
    .route('/catalog')
    .get((req, res) => {
        console.log(req.user);
        console.log(req.token);
        res.json([]);
    })
    .post((req, res) => {
        console.log(req.body);
        res.end()
    })
module.exports = dataController;
