const pool = require('../config/connetDB');

const test = async (req, res) => {
    try {
        res.render('test');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { test };