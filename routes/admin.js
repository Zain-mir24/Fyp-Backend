const dotenv = require('dotenv');
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");

const  auth= require("../middleware/auth") 
const User=require("../models/users")
const mongoose =require("../db/mongoose")
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
