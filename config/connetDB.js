const mysql = require('mysql2/promise');
const { NULL } = require('node-sass');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : NULL
});

module.exports = pool;