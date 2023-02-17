const { body, validationResult } = require('express-validator');
const { register, login, logout } = require('../services/userService.js');
const parseError = require('../utils/parser.js');

const authController = require('express').Router();

authController.post('/register',
    body('email', 'Email must be email@ggg.com format!').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            const token = await register(req.body.email, req.body.password);
            res.json(token);
        } catch (error) {
            const message = parseError(error);
            res.status(403);
            res.json({ message });
        }
    })

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.status(403);
        res.json({ message });
    }
})

authController.get('/logout', async (req, res) => {
    const token = req.headers['x-authorization'];
    try {
        await logout(token);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(403);
        res.json({ message });
    }
})

module.exports = authController;