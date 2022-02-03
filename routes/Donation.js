const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();

const Donation = require("../models/Donation");

// Making view for donations recieved for each campaign
router.get("/viewDonation/:cid",async (req, res, next) => {
    try{
        const find= await Donation.findOne({campaignid:req.params.cid})
       if(!find){
           console.log("Error with id")
           return new Error("Campaign doesnt exist")
       } 
       console.log(find)
       res.status(200).send(find)

    }catch(e){
    console.log("error",e)
    }

})

module.exports = router;
