const multer = require("multer");

var storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    // console.log(file.originalname, "print?")
    // if (file.fieldname === "bform") {
    //   cb(null, file.originalname);

    // }
    // else if (file.fieldname === "deathcertificate") {
    //   cb(null, file.originalname)
    // } else {
    cb(null, file.originalname)
    // }
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
