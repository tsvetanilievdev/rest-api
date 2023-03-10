const { parseToken } = require("../services/userService.js");

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const payload = parseToken(token)
            req.user = payload;
            req.token = token;
        } catch (error) {
            return res.status(404).json({ message: 'Invalid Session Token' })
        }
    }
    next();
}