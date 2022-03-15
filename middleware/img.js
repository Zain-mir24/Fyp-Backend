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
    cb(null, file.originalname);
    // }
  },
});

const multi_upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
});

const upload = multer({ storage: storage });
module.exports = { upload, multi_upload };
