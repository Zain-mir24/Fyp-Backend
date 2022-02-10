const mongoose = require("mongoose");

const appealloanSchema = new mongoose.Schema({
  bid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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
  LoanReturned: {
    type: Number,
  },
  loanType: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
  bankAcc: {
    type: Number,
    required: true,
  },
});
const Loanappeal = mongoose.model("loanappeal", appealloanSchema);

module.exports = Loanappeal;
