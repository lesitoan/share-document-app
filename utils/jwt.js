const jwt = require('jsonwebtoken');

const generateAccessToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyToken }