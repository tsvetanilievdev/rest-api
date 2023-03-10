function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in!' })
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.status(404).json({ message: 'Your already logged in!' })
        } else {
            next();
        }
    }
}

module.exports = {
    hasUser,
    isGuest
}