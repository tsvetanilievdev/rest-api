const { register } = require('../services/userService.js');

const authController = require('express').Router();

authController.post('/register', async (req, res) => {
    try {
        const token = await register(req.body.email, req.body.password);
        res.json(token)
    } catch (error) {
        console.log(error)
        res.status(403);
        res.json({ message: error.message });
    }
})

module.exports = authController;