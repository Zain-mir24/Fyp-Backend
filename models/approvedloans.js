const mongoose = require("mongoose");

const approvedloanSchema = new mongoose.Schema({
  bid: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  loandescription: {
    type: String,
    required: true,
  },
  Loanamount: {
    type: Number,
    required: true,
  },
  loanType: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});
const approveloan = mongoose.model("approvedloan", approvedloanSchema);

module.exports = approveloan;
