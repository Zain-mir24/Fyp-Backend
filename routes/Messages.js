let express = require("express");
let router = express.Router();
const Messages = require("../models/Message");

// add Conversation
router.post("/", async (req, res) => {
  try {
    const saveMessage = Message.save(req.body);
    res.status(200).send(saveMessage);
  } catch (e) {
    res.status(500).send(e);
  }
});

// get Messages

router.get("/:conversationId", async (req, res) => {
  try {
    const getMessages = await Messages.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(getMessages);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
