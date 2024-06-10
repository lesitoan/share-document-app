const express = require('express');
const userController = require('../controllers/userControllers');
const { isLogin, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/log-out', isLogin, userController.logOut);
router.patch('/change-pw', authorize(["admin", "user"]), userController.changePassword);
router.post('/refresh-token', userController.refreshToken);





module.exports = router;
