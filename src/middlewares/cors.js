module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Origin', '*');
    res.setHeader('Access-Control-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Headers', 'Content-Type, Authorization');

    next();
}