// const { NULL } = require('node-sass');
const pool = require('../config/connetDB');

const getAllDocs = async (req, res) => {
    try {
        const query = 'SELECT * FROM documents;';
        const [data, fields] = await pool.query(query);
        return res.status(200).json({
            status: "success",
            data: {
                docs: data,
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
        const url = req.file?.filename ? req.file.filename : null;

        //create slug
        const slug = name.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s/g, '_')
            .toLowerCase();

        const query = ` INSERT INTO documents (name, school, academic, url, slug)
                        VALUES ('${name}', '${school}', '${academic}', '${url}', '${slug}');`;
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

const getDocsByQuery = async (req, res) => {
    try {
        const newQuery = req.query.q.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s/g, '_')
            .toLowerCase();
        const query = `SELECT * FROM documents WHERE slug LIKE '%${newQuery}%';`;
        const docs = await pool.query(query);
        return res.status(200).json({
            status: "success",
            data: {
                docs: docs[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
}



module.exports = { createDoc, getAllDocs, getDocsByQuery };
