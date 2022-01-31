const mongoose = require("mongoose");
const donorDonationSchema = new mongoose.Schema({
 
    campaignid: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userid:{
      type:mongoose.Types.ObjectId,
      reference:"users",
      required:true
    },
    amount:{
        type:Number,
        required:true
    }
  });
  const donorDonation = mongoose.model("donorDonation", donorDonationSchema);
  
  module.exports = donorDonation;
  