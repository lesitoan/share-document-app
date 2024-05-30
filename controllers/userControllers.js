var bcrypt = require('bcryptjs');
const pool = require('../config/connetDB');


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
        const checkPassword = await bcrypt.compare(password, user[0][0].password);
        if (!checkPassword) {
            throw Error('Email or Password not correct !!!');
        }
        return res.status(200).json({
            status: "success",
            data: {
                user: user[0][0],
            },
        })
    } catch (err) {

    }
}

module.exports = { signUp, signIn }

