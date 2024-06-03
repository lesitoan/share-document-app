const express = require('express');
const viewControllers = require('../controllers/viewControllers');

const router = express.Router();

router.get('/', viewControllers.homePage);
router.get('/sign-in', viewControllers.signInPage);
router.get('/sign-up', viewControllers.signUpPage);
router.get('/docs/upload', viewControllers.uploadPage);
router.get('/docs/:fileName', viewControllers.detailPage);
router.get('/docs', viewControllers.docsPage);
router.get('/me', viewControllers.userPage);


module.exports = router;
