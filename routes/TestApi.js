const dotenv = require('dotenv');
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");

const  auth= require("../middleware/auth") 
const User=require("../models/users")
const mongoose =require("../db/mongoose")
/* POST Signup */

router.post("/add", async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();
    
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log('errrorr',e)
    res.status(400).send(e);
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
