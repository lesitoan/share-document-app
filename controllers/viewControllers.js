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
        return res.render('pages/detailFilePage');
    } catch (err) {
        console.log(err);
    }
}

const homePage = async (req, res) => {
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

const signInPage = (req, res) => {
    res.render('pages/signInPage')
}

const signUpPage = (req, res) => {
    res.render('pages/signUpPage')
}

module.exports = { uploadPage, detailPage, homePage, signInPage, signUpPage }