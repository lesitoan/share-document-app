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
    res.render('pages/signInPage');
}

const signUpPage = (req, res) => {
    res.render('pages/signUpPage');
}

const getDocsByKeyWord = async (req, res) => {
    try {
        const newQuery = req.query.q.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s/g, '_')
            .toLowerCase();
        const query = `SELECT * FROM documents WHERE slug LIKE '%${newQuery}%';`;
        const docs = await pool.query(query);
        return res.render('pages/docsPage', {
            query: req.query.q,
            docs: docs[0]
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { uploadPage, detailPage, homePage, signInPage, signUpPage, getDocsByKeyWord }