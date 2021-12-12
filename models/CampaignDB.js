const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
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
const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
