const pool = require('../config/connetDB');

const home = async (req, res) => {
    try {
        // const query = 'SELECT * FROM documents LIMIT 5';
        // const [data, fields] = await pool.query(query);
        res.render('pages/homePage', {
            title: "home",
            // data: data
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { home };