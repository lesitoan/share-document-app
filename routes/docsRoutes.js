const express = require('express');
const docsController = require('../controllers/docsControllers');
const uploadFile = require('../middlewares/multerMiddleware');


const router = express.Router();
router.route('/upload')
    .post(uploadFile.single("fileName"), docsController.createDocs);

module.exports = router;
