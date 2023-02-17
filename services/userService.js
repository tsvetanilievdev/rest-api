const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User.js");

const secretJWT = 'n31kcxzkj2J@!Jmdk2kkjew03923';

const tokenBlackList = new Set();

async function register(email, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email is taken!');
    }

    const user = await User.create({
        email,
        hashedPass: await bcrypt.hash(password, 10)
    })

    return createToken(user);

}
async function login(email, password) {
    const existingUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!existingUser) {
        throw new Error('Incorrect credentials!');
    }

    const isSamePassword = await bcrypt.compare(password, existingUser.hashedPass);
    if (!isSamePassword) {
        throw new Error('Incorrect credentials!');
    }

    return createToken(existingUser);
}
async function logout(token) {
    tokenBlackList.add(token);
}

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    }
    return {
        _id: user._id,
        email: user.email,
        accessToken: jwt.sign(payload, secretJWT)
    }
}

function parseToken(token) {
    //TODO scan blacklist for token
    if (tokenBlackList.has(token)) {
        throw new Error('Session expired! Please Sign In!')
    }
}

module.exports = {
    register,
    login,
    logout
}