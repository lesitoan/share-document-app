var bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const pool = require('../config/connetDB');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');


const signUp = catchAsync(
    async (req, res, next) => {
        const { userName, email, password, passwordConfirm } = req.body;
        if (!userName || !email || !password || !passwordConfirm) {
            return next(new AppError('Please enter full field !!!', 400));
        } else if (password !== passwordConfirm) {
            throw Error('Please enter password again !!!');
        };
        //check userName
        const checkUserName = await pool.query(`SELECT * FROM users WHERE userName = '${userName}'`);
        const checkEmal = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (checkEmal[0][0] || checkUserName[0][0]) {
            return next(new AppError('Email or userName exit !!!', 400));
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const query = ` INSERT INTO users (userName, email, password )
                            VALUE ('${userName}', '${email}', '${secPass}')`;
        await pool.query(query);
        return res.status(201).json({
            status: "success",
            data: ''
        })
    }
)

const signIn = catchAsync(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('dsds')
            return next(new AppError('Please enter email or password !!!', 400));
        }
        //check password
        const response = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (!response[0][0]) {
            return next(new AppError('Email or Password not correct !!!', 400));
        }
        const checkPassword = await bcrypt.compare(password, response[0][0].password);
        if (!checkPassword) {
            return next(new AppError('Email or Password not correct !!!', 400));
        }

        // create access token and refresh token
        const accessToken = await generateAccessToken(response[0][0].id, response[0][0].role);
        const refreshToken = await generateRefreshToken(response[0][0].id, response[0][0].role);

        //save refresh token in db
        await pool.query(`UPDATE users SET refreshToken = '${refreshToken}' WHERE id = ${response[0][0].id}`)

        // res.cookie('accessToken', accessToken, { maxAge: 1000 * 3 * 60 * 60, httpOnly: true }); //3hour
        // res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 3 * 60 * 60, httpOnly: true });//3hour
        const user = response[0][0];
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        return res.status(200).json({
            status: "success",
            data: { user },
        })
    }

)


const logOut = catchAsync(
    async (req, res, next) => {
        if (req.user?.id) {
            await pool.query(`UPDATE users SET refreshToken = '' WHERE id = ${req.user.id}`)
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({
            status: "success",
            data: {},
        })
    }
)

const changePassword = catchAsync(
    async (req, res, next) => {
        const checkPassword = await bcrypt.compare(req.body.password, req.user.password);
        if (!checkPassword) {
            return next(new AppError('Password not correct!!!', 400));

        }
        if (req.body.newPassword !== req.body.newPasswordConfirm) {
            return next(new AppError('the new password and the confirmation password do not match !!!', 400));

        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);
        await pool.query(`UPDATE users SET password = '${newPassword}' WHERE id= ${req.user.id}`)
        return res.status(200).json({
            status: "success",
            data: {},
        });
    }

)

const refreshToken = catchAsync(
    async (req, res, next) => {
        try {
            const refreshToken = req.body.refreshToken ? req.body.refreshToken : req.cookies.refreshToken;
            console.log(refreshToken)
            if (!refreshToken) {
                return next(new AppError("Refresh token faild !!!", 400));

            }
            const decode = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (!decode || !decode.id) {
                return next(new AppError("Refresh token faild !!!", 400));

            }
            const response = await pool.query(`SELECT * FROM users WHERE id = ${decode.id}`);
            if (!response || !response[0][0] || response[0][0].refreshToken !== refreshToken) {
                return next(new AppError("Refresh token faild !!!", 400));
            }
            const newAccessToken = await generateAccessToken(response[0][0].id, response[0][0].role);

            // res.cookie('accessToken', newAccessToken, { maxAge: 1000 * 3 * 60 * 60, httpOnly: true }); //3hour
            return res.status(200).json({
                status: "success",
                data: { newAccessToken },
            })
        } catch (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return next(new AppError('You not login !!!', 400));
            }
        }
    }
)

const getMe = catchAsync(
    async (req, res, next) => {
        console.log("req.user: ", req.user);
        if (!req.user) {
            return next(new AppError('Get me faild !!!', 400));
        }
        return res.status(200).json({
            status: "success",
            data: { user: req.user },
        });
    }
)


module.exports = { signUp, signIn, logOut, changePassword, refreshToken, getMe }

