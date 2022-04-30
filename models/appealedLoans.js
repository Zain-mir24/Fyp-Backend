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
  fileName: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});
const Loanappeal = mongoose.model("loanappeal", appealloanSchema);

module.exports = Loanappeal;
