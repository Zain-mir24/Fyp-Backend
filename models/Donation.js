const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  campaignid: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  campaignname: {
    type: String,
    required: true,
  },
   // anonymous user makes donation
  anonymousUser: {
    type: [
      {
        email: {
          type: String,
        },
        donation: {
          type: Number
        },
      },
    ],
  },
  // registered
  registeredUser:{
    type:[
      {
        userId:{
          type:mongoose.Types.ObjectId,
          ref:"User"
        },
        donation:{
          type:Number
        }
      }
    ]
  },
  // total donations from  anonymous+registered 
  totalamount: {
    type: Number,
    required: true,
  },
});
const Donation = mongoose.model("Donation", DonationSchema);

module.exports = Donation;
