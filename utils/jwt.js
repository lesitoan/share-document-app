const jwt = require('jsonwebtoken');

const generateAccessToken = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    console.log(token);
    return token;
};

const generateRefreshToken = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    console.log(token);
    return token;
};

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyToken }