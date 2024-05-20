const login = (req, res) => {
    res.render('pages/loginPage')
}

const signUp = (req, res) => {
    res.render('pages/signUpPage')
}


module.exports = { login, signUp }