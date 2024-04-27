const pool = require('../config/connetDB');


const test = async (req, res) => {
    try {
        res.send('OK OK !!!!!!!!!!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { test };