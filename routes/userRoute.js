const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/login', userController.login);
router.get('/sign-up', userController.signUp);

module.exports = router;
