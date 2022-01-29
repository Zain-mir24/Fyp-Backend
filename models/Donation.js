const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
 
  campaignid: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  amount:{
      type:Number,
      required:true
  }
});
const Donation = mongoose.model("Donation", DonationSchema);

module.exports = Donation;
