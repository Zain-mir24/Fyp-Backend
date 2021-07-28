let express = require("express");
let router = express.Router();
let query = require('../libs/sql');



/* POST Signup */
router.post("/add", async function (req, res, next) {
  // res.send("this is the mainpage");
  const Firstname = req.body.Firstname;
  const Lastname =  req.body.Lastname
  const Email= req.body.Email
  const Password= req.body.Password
    console.log("Zain",req.body.Firstname);
  console.log('zain')
  //query for selection email

  //if email found { return email alreayd present}
  //else { insert query sign up}
  query(
    "INSERT INTO signup (Firstname, Lastname, Email, Password) VALUES (?,?,?,?)",
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
