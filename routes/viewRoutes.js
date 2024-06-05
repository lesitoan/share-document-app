const express = require('express');
const viewControllers = require('../controllers/viewControllers');
const { isLogin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', isLogin, viewControllers.homePage);
router.get('/sign-in', isLogin, viewControllers.signInPage);
router.get('/sign-up', isLogin, viewControllers.signUpPage);
router.get('/docs/upload', isLogin, viewControllers.uploadPage);
router.get('/docs/:fileName', isLogin, viewControllers.detailPage);
router.get('/docs', isLogin, viewControllers.docsPage);
router.get('/me', isLogin, viewControllers.userPage);


module.exports = router;
