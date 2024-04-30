const pool = require('../config/connetDB');

const test = async (req, res) => {
    try {
        res.render('pages/homePage', {
            title: "toandz"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { test };