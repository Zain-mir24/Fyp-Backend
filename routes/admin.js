const dotenv = require('dotenv');
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");

const  auth= require("../middleware/auth") 
const User=require("../models/users")
const mongoose =require("../db/mongoose")

  
module.exports = router;
