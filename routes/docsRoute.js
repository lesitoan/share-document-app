const express = require('express');
const docsController = require('../controllers/docsController');
const uploadFile = require('../middlewares/multerMiddleware');


const router = express.Router();
router.route('/upload')
    .get(docsController.getUploadPage)
    .post(uploadFile.single("fileName"), docsController.createDocs);


module.exports = router;
