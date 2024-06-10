const jwt = require('jsonwebtoken');

const generateAccessToken = (id, role) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const generateRefreshToken = (id, role) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                reject(err.name);
            }
            resolve(decode);
        })
    })
}


module.exports = { generateAccessToken, generateRefreshToken, verifyToken }