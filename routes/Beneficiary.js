const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();

const auth = require("../middleware/auth");
const Campaignappeal = require("../models/appealedCampaign");
const mongoose = require("../db/mongoose");
const mailSender = require("../email/account");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/img");



router.post("/addCampaignappeal",upload.single("file"),async(req,res)=>{
    var obj = {
        bid:req.body.bid,
        name: req.body.name,
        description: req.body.description,
       file:req.body.fileName,
       amountneeded:req.body.amountneeded  
      };
const camp = new Campaignappeal(obj)
try{
   await camp.save()
   res.status(200).send(camp)
}
catch(e){
    res.status(500).send(e)
}
})
router.post("/addloanappeal",upload.single("file"),async(req,res)=>{
    var obj = {
        bid:req.body.bid,
        name: req.body.name,
        description: req.body.description,
        file:req.body.fileName,
       
      };
const camp = new Campaignappeal(obj)
try{
   await camp.save()
   res.status(200).send(camp)
}
catch(e){
    res.status(500).send(e)
}
})
module.exports = router;
