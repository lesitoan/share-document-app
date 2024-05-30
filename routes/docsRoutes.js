const express = require('express');
const docsController = require('../controllers/docsControllers');
const uploadFile = require('../middlewares/multerMiddleware');


const router = express.Router();
router.route('/')
    .get(docsController.getAllDocs);
router.route('/upload')
    .post(uploadFile.single("fileName"), docsController.createDoc);

module.exports = router;
