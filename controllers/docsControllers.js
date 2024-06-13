const pool = require('../config/connetDB');
const catchAsync = require('../utils/catchAsync');

const getAllDocs = catchAsync(
    async (req, res, next) => {
        const query = 'SELECT * FROM documents;';
        const response = await pool.query(query);
        return res.status(200).json({
            status: "success",
            data: {
                docs: response[0],
            }
        })
    }
)

const createDoc = catchAsync(
    async (req, res, next) => {
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
        await pool.query(query);
        return res.status(201).json({
            status: "success",
            data: {}
        })
    }
)

const getDocsByQuery = catchAsync(
    async (req, res, next) => {
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
    }
)



module.exports = { createDoc, getAllDocs, getDocsByQuery };
