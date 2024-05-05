const pool = require('../config/connetDB');

const getUploadPage = async (req, res) => {
    try {
        res.render('pages/uploadPage', {
            title: "upload"
        });
    } catch (err) {
        console.log(err);
    }
}

const createDocs = async (req, res) => {
    try {
        let { name, school, academic, type } = req.body;
        const url = req.file.filename;
        type = Number(type);

        const query = ` INSERT INTO documents (name, school, academic, url, type)
                        VALUES ('${name}', '${school}', '${academic}', '${url}', ${type});`;
        console.log(query)
        const [data, fields] = await pool.query(query);
        console.log(data)
        res.send('ok');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUploadPage, createDocs };