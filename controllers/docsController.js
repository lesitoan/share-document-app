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

const textDb = async (req, res) => {
    try {
        const fakeData = {
            name: "cau truc du lieu va giai thuat",
            url: "/pdf/abcdefgh",
            school: 'bkdn',
            academic: 'it',
            type: 0,
        };
        // const query = ` INSERT INTO documents (name, url, school, academic)
        //                 VALUES ('${fakeData.name}', '${fakeData.url}', '${fakeData.school}', '${fakeData.academic}');`
        const query = 'SELECT * FROM documents';
        const [rows, fields] = await pool.query(query);
        console.log(rows);
        console.log(fields);
        return res.send("ok");
    } catch (err) {
        console.log(err);
    }
}

module.exports = { test, textDb };