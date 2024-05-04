const express = require('express');
const homeControllers = require('../controllers/homeControllers');
const upload = require('../middlewares/multerMiddleware');

const router = express.Router();

router.get('/', homeControllers.home);

module.exports = router;
