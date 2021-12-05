const mongoose = require("mongoose");

const appealloanSchema = new mongoose.Schema({
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
const Loanappeal = mongoose.model("Campaignappeal", appealloanSchema);

module.exports = Loanappeal;
