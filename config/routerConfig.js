const authController = require('../controllers/authController.js');
const dataController = require('../controllers/dataController.js');

const router = require('express').Router();

router.use('/users', authController);
router.use('/data', dataController);

router.get('*', (req, res) => {
    res.status(404);
    res.json({ message: 'Page Not Found' });
})

module.exports = (app) => app.use(router);