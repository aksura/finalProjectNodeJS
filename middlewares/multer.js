const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
    }
};


const upload = multer({
    fileFilter: fileFilter,
    limits: { fileSize: (255 * 1024) }
});




module.exports = upload;