const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");
const auth = require("../middleware/auth");
const User = require("../models/users");
const mongoose = require("../db/mongoose");
//Admin routes
//admindahsboard route should also be created

//updating the user in the database
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(req.body )
  console.log(updates);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every((update) =>{
    return allowedUpdates.includes(update)
  }   
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user =await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!user){
      return res.status(404).send()
    }
  
   
    res.send(user);
  } catch (e) {
    console.log("error",e);
    res.status(400).send(e);
  }
});
//deleting user from the database

module.exports = router;
