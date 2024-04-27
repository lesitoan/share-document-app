const express = require('express');
const docsController = require('../controllers/docsController');

const router = express.Router();

router.route('/')
    .get(docsController.test);


module.exports = router;
