const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();
router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/log-out', userController.logOut);



module.exports = router;
