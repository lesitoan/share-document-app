const pool = require('../config/connetDB');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const isLogin = catchAsync(
    async (req, res, next) => {
        try {
            res.locals.user = "";
            let token = "";
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(' ')[1];
            } else {
                token = req.cookies.accessToken;
            }
            if (!token) {
                return next(new AppError('Login and try again !!!', 401));
            };
            const decode = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
            const respone = await pool.query(`SELECT * FROM users WHERE id = ${decode.id};`);
            if (!respone) {
                return next(new AppError('Login and try again !!!', 401));
            };
            const user = {
                userName: respone[0][0].userName,
            }
            req.user = respone[0][0];
            res.locals.user = user;
            return next();
        } catch (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return next(new AppError('Login and try again !!!', 401));
            }
        }
    }
)


const authorize = (roles) => {
    return async (req, res, next) => {
        try {
            let token = "";
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(' ')[1];
            } else {
                token = req.cookies.accessToken;
            }
            console.log("token: ", token);
            if (!token) {
                throw Error("Please login and try again !!!");
            }
            const decode = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
            console.log("decode: ", decode);
            if (!decode) {
                throw Error("Please login and try again !!!");
            } else if (!roles.includes(decode.role)) {
                throw Error("You do not have permission to access this page !!!");
            }
            //kiêmr tra user còn trong db hay đã xóa
            const respone = await pool.query(`SELECT * FROM users WHERE id=${decode.id}`);
            if (!respone || !respone[0][0]) {
                throw Error("Account does not exist !!!");
            }
            req.user = respone[0][0];
            return next();
        } catch (err) {
            console.log("authMiddleware err: ", err);
        }
    }
}

module.exports = { isLogin, authorize }