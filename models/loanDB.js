const mongoose = require("mongoose");
const validator = require("validator");

const loanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});
const Loan = mongoose.model("Campaign", loanSchema);

module.exports = Loan;
