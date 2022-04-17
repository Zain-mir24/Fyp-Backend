// This db will be altered by Admin
const mongoose = require("mongoose");
const AmountSchema = new mongoose.Schema({
  bid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  LoanDetail: [
    {
      Date: {
        type: String,
        required: true,
      },
      AmountReceivedpound: {
        type: Number,
        required: true,
      },
      Rate: {
        type: Number,
        required: true,
      },
      AmountRecievedpkr: {
        type: Number,
        required: true,
      },
      amountsentDate: {
        type: String,
        required: true,
      },
      giventobeneficiary: {
        type: Number,
        required: true,
      },
      Balance: {
        type: Number,
        required: true,
      },
      Sourcedelivery: {
        type: String,
        required: true,
      },
    },
  ],
});
const Amount = mongoose.model("AmountSchema", AmountSchema);

module.exports = Amount;
