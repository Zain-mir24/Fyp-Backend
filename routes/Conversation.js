let express = require("express");
let router = express.Router();
const Conversation = require("../models/Conversation");

// add Conversation
router.post("/", async (req, res) => {
  // Admin.find()
  const newConversation = new Conversation({
    member: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get Conversation
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      member: { $in: [req.params.userId] },
    });
    res.status(200).send(conversation);
  } catch (e) {
    res.status(500).send(e);
  }
});
// this is for all conversation
router.get("/", async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.status(200).send(conversation);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
