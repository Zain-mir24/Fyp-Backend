const dotenv = require('dotenv');
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");
let jwt = require("jsonwebtoken");
const  auth= require("../middleware/auth") 
const findUser=require("../models/users")
/* POST Signup */

router.post("/add", async (req, res, next) => {
  try {
    //getting data from input fields
    //Authenticating the user
    
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const Email = req.body.Email;
    const Password = req.body.Password;

    const User = {
      Firstname,
      Lastname,
      Email,
      Password,
    };

    //if not then enter the data into the database

    const ifEmail = await query(
      `SELECT Email FROM signup WHERE Email = "${Email}"`
    );
    if (ifEmail.length > 0) {
      console.log("ifEMail", ifEmail);
      return res.status(409).json(ifEmail);
    }

    const addEmail = await query(
      "INSERT INTO signup (Firstname, Lastname, Email, Password) VALUES (?,?,?,?)",
      [Firstname, Lastname, Email, Password]
    );
    const accesstoken = jwt.sign(User, process.env.ACCESS_TOKEN_SECRET);

    if (!addEmail) {
      return res.status(400).json({ message: "Not saved" });
    }

    return res.status(200).json({ accesstoken: accesstoken });
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});
//this route is for the admin. To search and get the data of the User
router.post("/search",auth, async (req, res, next) => {
  const Email = req.body.Email;
  let Id,Firstname, Lastname, Password;
  const ifEmail = await query(
    `SELECT id,firstname,lastname,email,password FROM signup WHERE email = "${Email}"`
  );
  if (ifEmail.length > 0) {
    console.log("ifEmail", ifEmail);
    Id =ifEmail[0].id
    Firstname = ifEmail[0].Firstname;
    Lastname = ifEmail[0].Lastname;
    Password = ifEmail[0].Password;
    const User = {
      Firstname,
      Lastname,
      Email,
      Password,
    };
    return res.status(409).json(User);
  }
});

module.exports = router;
