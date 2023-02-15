const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User.js");

const secretJWT = 'n31kcxzkj2J@!Jmdk2kkjew03923';

async function register(email, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email is taken!');
    }

    const user = await User.create({
        email,
        hashedPass: bcrypt.hash(password, 10)
    })

    return {
        _id: user._id,
        email: user.email,
        accessToken: createToken(user)
    }
}
async function login(email, password) {

}
async function logout() {

}

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }

    return jwt.sign(payload, secretJWT);
}

module.exports = {
    register,
    login,
    logout
}