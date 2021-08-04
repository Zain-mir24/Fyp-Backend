const dotenv = require('dotenv');
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");
const  auth= require("../middleware/auth") 
const User=require("../models/users")
const mongoose =require("../db/mongoose")
//Admin routes

//viewing all the users
router.get("/user", async (req, res, next) => {
 try{
   const user =await User.find({})
   res.send(user)
 }catch(e){
 res.status(501).send()
 }
});

//updating the user in the database
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//deleting user from the database

module.exports = router;
