var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:globalreach123@cluster0.kdgc0.mongodb.net/test",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("this is the mainpage");
  const Cat = mongoose.model("Cat", { name: String });

  const kitty = new Cat({ name: "Zildjian" });
  kitty.save().then(() => console.log("meow"));
});

module.exports = router;
