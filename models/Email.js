const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Category: {
    role: { type: String, default: "All" },
  },
});
const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
