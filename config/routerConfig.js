const authController = require('../controllers/authController.js');
const dataController = require('../controllers/dataController.js');

const configRouter = require('express').Router();

configRouter.use('/users', authController);
configRouter.use('/data', dataController);

configRouter.get('*', (req, res) => {
    res.status(404);
    res.json({ message: 'Page Not Found' });
})

module.exports = (app) => app.use(configRouter);