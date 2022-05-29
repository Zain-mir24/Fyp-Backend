const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  // Uid: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  donation: {
    type: Number,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});
const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
