// const { NULL } = require('node-sass');
const pool = require('../config/connetDB');

const createDocs = async (req, res) => {
    try {
        let { name, school, academic, type } = req.body;
        const url = req.file.filename;
        type = type ? Number(type) : 0;
        const query = ` INSERT INTO documents (name, school, academic, url, type)
                        VALUES ('${name}', '${school}', '${academic}', '${url}', ${type});`;
        const [data, fields] = await pool.query(query);
        return res.status(201).json({
            status: "success",
            data: {
                data: NULL,
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            status: "faild",
            data: {
                data: NULL,
            }
        })
    }
}



module.exports = { createDocs };