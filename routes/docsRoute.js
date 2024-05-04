const express = require('express');
const docsController = require('../controllers/docsController');
const upload = require('../middlewares/multerMiddleware');

const router = express.Router();

router.route('/')
    .get(docsController.test)
    .post(upload.single("pdf_file"), (req, res) => {
        console.log(req.body)
        res.send("oke !!!!!");
    })
router.route('/documents')
    .get(docsController.textDb);


module.exports = router;
