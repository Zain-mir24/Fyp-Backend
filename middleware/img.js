const multer = require('multer');

var storage = multer.diskStorage({
    destination: "public/uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
  
const upload = multer({ storage: storage });
module.exports =upload