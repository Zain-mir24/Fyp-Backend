let express = require("express");
let router = express.Router();
let query = require("../libs/sql");

/* POST Signup */
router.post("/add", async (req, res, next) => {
  try {
    //getting data from input fields
  const Firstname = req.body.Firstname;
  const Lastname = req.body.Lastname;
  const Email = req.body.Email;
  const Password = req.body.Password;

  //query for selection email

  //if not then enter the data into the database

  const ifEmail = await query(`SELECT Email FROM signup WHERE Email = "${Email}"`);
  if (ifEmail.length > 0) {
    console.log("ifEMail", ifEmail);
    return res.status(409).json(ifEmail);
  } 

  const addEmail = await query(
    "INSERT INTO signup (Firstname, Lastname, Email, Password) VALUES (?,?,?,?)",
    [Firstname, Lastname, Email, Password]
  )

  if(!addEmail) {
    return res.status(400).json({message: "Not saved"});
  }

  return res.status(200).json(addEmail);



  } catch(err) {
    console.log("err", err);
    next(err)
  }
  
});
router.post("/search", (req, res, next) => {
  res.send({ type: "post" });
  
});

module.exports = router;
