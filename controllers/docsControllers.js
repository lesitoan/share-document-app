// const { NULL } = require('node-sass');
const pool = require('../config/connetDB');

const getAllDocs = async (req, res) => {
    try {
        const query = 'SELECT * FROM documents;';
        const [data, fields] = await pool.query(query);
        return res.status(200).json({
            status: "success",
            data: {
                data: data,
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "faild",
            data: {
                data: null,
            }
        })
    }
}


const createDoc = async (req, res) => {
    try {
        const { name, school, academic } = req.body;
        const url = req.file?.filename ? req.file.fileName : null;
        const query = ` INSERT INTO documents (name, school, academic, url)
                        VALUES ('${name}', '${school}', '${academic}', '${url}');`;
        const [data, fields] = await pool.query(query);
        return res.status(201).json({
            status: "success",
            data: {
                data: null,
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "faild",
            data: {
                data: null,
            }
        })
    }
}



module.exports = { createDoc, getAllDocs };