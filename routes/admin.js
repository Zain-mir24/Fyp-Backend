const dotenv = require('dotenv');
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");

const  auth= require("../middleware/auth") 
const User=require("../models/users")
const mongoose =require("../db/mongoose")
//Admin routes
router.get("/user", async (req, res, next) => {
 try{
   const user =await User.find({})
   res.send(user)
 }catch(e){
 res.status(501).send()
 }
});
  
module.exports = router;
