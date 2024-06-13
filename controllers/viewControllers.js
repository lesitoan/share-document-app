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
        const fileUrl = req.originalUrl.slice(req.originalUrl.lastIndexOf('/') + 1);
        return res.render('pages/detailFilePage', { fileUrl });
    } catch (err) {
        console.log(err);
    }
}

const homePage = async (req, res) => {
    try {
        const cnttData = await pool.query(`SELECT name, url FROM documents WHERE academic = 'cntt' LIMIT 5`);
        const cdtData = await pool.query(`SELECT name, url FROM documents WHERE academic = 'codientu' LIMIT 5`);
        const dtvtData = await pool.query(`SELECT name, url FROM documents WHERE academic = 'dtvt' LIMIT 5`);
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
    try {
        return res.render('pages/signInPage');
    } catch (err) {
        console.log(err);
    }
}

const signUpPage = (req, res) => {
    try {
        return res.render('pages/signUpPage');
    } catch (err) {
        console.log(err);
    }
}

const docsPage = (req, res) => {
    try {
        return res.render('pages/docsPage', {
            query: req.query.q,
        });
    } catch (err) {
        console.log(err);
    }
}

const userPage = (req, res) => {
    try {
        return res.render('pages/userPage');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { uploadPage, detailPage, homePage, signInPage, signUpPage, docsPage, userPage }