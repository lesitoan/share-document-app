const pool = require('../config/connetDB');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt');

const isLogin = async (req, res, next) => {
    try {
        res.locals.user = "";
        const token = req.cookies.accessToken;
        if (!token) return next();
        const decode = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
        const respone = await pool.query(`SELECT * FROM users WHERE id = ${decode.id};`);
        if (!respone) return next();
        const user = {
            userName: respone[0][0].userName,
        }
        res.locals.user = user;
        return next();
    } catch (err) {
        console.log(err);
        next();
    }
}

const authorize = async (req, res, next) => {

}

module.exports = { isLogin, authorize }