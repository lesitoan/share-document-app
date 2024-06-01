var bcrypt = require('bcryptjs');
const pool = require('../config/connetDB');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');


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
            data: {
                data: {},
            }
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
        const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (!user[0][0]) {
            throw Error('Email or Password not correct !!!');
        }
        const checkPassword = await bcrypt.compare(password, user[0][0].password);
        if (!checkPassword) {
            throw Error('Email or Password not correct !!!');
        }

        // create access token and refresh token
        const accessToken = generateAccessToken(user[0][0].id, user[0][0].role);
        const refreshToken = generateRefreshToken(user[0][0].id, user[0][0].role);
        res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true });
        res.cookie('refreshToken', refreshToken, { maxAge: 900000, httpOnly: true });

        return res.status(200).json({
            status: "success",
            data: {
                user: user[0][0],
            },
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "faild",
            data: {
                data: {},
            }
        });
    }
}

module.exports = { signUp, signIn }

