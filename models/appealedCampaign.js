const mongoose = require("mongoose");

const appealcampaignSchema = new mongoose.Schema({
  bid: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  amountneeded: {
    type: Number,
    required: true
  }
});
const Campaignappeal = mongoose.model("Campaignappeal", appealcampaignSchema);

module.exports = Campaignappeal;
