const pool = require('../config/connetDB');

const uploadPage = async (req, res) => {
    try {
        res.render('pages/uploadPage', {
            title: "upload"
        });
    } catch (err) {
        console.log(err);
    }
}

const detailPage = async (req, res) => {
    try {
        return res.render('pages/detailFilePage');
    } catch (err) {
        console.log(err);
    }
}

const homePage = async (req, res) => {
    try {
        const cnttData = await pool.query(`SELECT name FROM documents WHERE academic = 'cntt' LIMIT 5`);
        const cdtData = await pool.query(`SELECT name FROM documents WHERE academic = 'codientu' LIMIT 5`);
        const dtvtData = await pool.query(`SELECT name FROM documents WHERE academic = 'dtvt' LIMIT 5`);
        res.render('pages/homePage', {
            title: "home",
            data: {
                cntt: cnttData[0],
                dtvt: dtvtData[0],
                cdt: cdtData[0],
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const signInPage = (req, res) => {
    res.render('pages/signInPage')
}

const signUpPage = (req, res) => {
    res.render('pages/signUpPage')
}

module.exports = { uploadPage, detailPage, homePage, signInPage, signUpPage }