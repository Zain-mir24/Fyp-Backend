let express = require("express");
let router = express.Router();
let query = require('../libs/sql');



/* GET home page. */
router.post("/add", async function (req, res, next) {
  // res.send("this is the mainpage");
  const {Firstname, Lastname, Email, Password} = req.body;
  console.log("query", query);
  query(
    "INSERT INTO `signup`(`Firstname`, `Lastname`, `Email`, `Password`) VALUES (?,?,?,?)",
    [Firstname, Lastname, Email, Password]
  ).then((val) => {
    console.log("val", val);
    return res.status(200).json({body: val})
  }
  ).catch((err) => {
    console.log("err", err);
    return res.status(400).json({body: err})
  });
});

module.exports = router;
