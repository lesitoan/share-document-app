var bcrypt = require('bcryptjs');
const pool = require('../config/connetDB');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt');
const { NULL } = require('node-sass');


const signUp = async (req, res) => {
    try {
        const { userName, email, password, passwordConfirm } = req.body;
        if (!userName || !email || !password || !passwordConfirm) {
            throw Error('Please enter full field !!!');
        } else if (password !== passwordConfirm) {
            throw Error('Please enter password again !!!');
        };
        //check userName
        const checkUserName = await pool.query(`SELECT * FROM users WHERE userName = '${userName}'`);
        const checkEmal = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (checkEmal[0][0] || checkUserName[0][0]) {
            throw Error('email or userName exit !!!');
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
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "faild",
            data: {}
        });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw Error('Please enter email or password !!!');
        }
        //check password
        const response = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (!response[0][0]) {
            throw Error('Email or Password not correct !!!');
        }
        const checkPassword = await bcrypt.compare(password, response[0][0].password);
        if (!checkPassword) {
            throw Error('Email or Password not correct !!!');
        }

        // create access token and refresh token
        const accessToken = await generateAccessToken(response[0][0].id, response[0][0].role);
        const refreshToken = await generateRefreshToken(response[0][0].id, response[0][0].role);

        //save refresh token in db
        await pool.query(`UPDATE users SET refreshToken = '${refreshToken}' WHERE id = ${response[0][0].id}`)

        res.cookie('accessToken', accessToken, { maxAge: 1000 * 3 * 60 * 60, httpOnly: true }); //3hour
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 3 * 60 * 60, httpOnly: true });//3hour
        const user = response[0][0];
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        return res.status(200).json({
            status: "success",
            data: { user },
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "faild",
            data: {}
        });
    }
}

const logOut = async (req, res) => {
    try {
        if (req.user?.id) {
            await pool.query(`UPDATE users SET refreshToken = '' WHERE id = ${req.user.id}`)
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({
            status: "success",
            data: {},
        })
    } catch (err) {
        console.log(err);
    }
}

const changePassword = async (req, res) => {
    try {
        console.log("req.user: ", req.user);
        console.log("req.body: ", req.body);
        const checkPassword = await bcrypt.compare(req.body.password, req.user.password);
        if (!checkPassword) {
            throw Error('Password not correct!!!');
        }
        if (req.body.newPassword !== req.body.newPasswordConfirm) {
            throw Error('the new password and the confirmation password do not match !!!');
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);
        await pool.query(`UPDATE users SET password = '${newPassword}' WHERE id= ${req.user.id}`)
        return res.status(200).json({
            status: "success",
            data: {},
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "faild",
            data: {}
        });
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken ? req.body.refreshToken : req.cookies.refreshToken;
        console.log(refreshToken)
        if (!refreshToken) {
            throw Error("Refresh token faild !!!");
        }
        const decode = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decode || !decode.id) {
            throw Error("Refresh token faild !!!");
        }
        const response = await pool.query(`SELECT * FROM users WHERE id = ${decode.id}`);
        if (!response || !response[0][0] || response[0][0].refreshToken !== refreshToken) {
            throw Error("Refresh token faild !!!");
        }
        const newAccessToken = await generateAccessToken(response[0][0].id, response[0][0].role);

        res.cookie('accessToken', newAccessToken, { maxAge: 1000 * 3 * 60 * 60, httpOnly: true }); //3hour
        return res.status(200).json({
            status: "success",
            data: { newAccessToken },
        })
    } catch (err) {
        console.log(err);
        if (err === 'TokenExpiredError') {
            return res.status(403).json({
                status: "faild",
                data: {},
            })
        }
    }
}

module.exports = { signUp, signIn, logOut, changePassword, refreshToken }

