const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pdf')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1000) + ".pdf";
        cb(null, uniqueSuffix);
    }
})

const uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length);
        if (ext !== ".pdf") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
})

module.exports = uploadFile;