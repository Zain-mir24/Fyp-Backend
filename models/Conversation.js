const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    member: [{
      type: mongoose.Types.ObjectId,
      ref: "User"
    }],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
