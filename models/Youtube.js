const mongoose = require("mongoose");
const YoutubeSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
});
const Youtube = mongoose.model("Youtube", YoutubeSchema);

module.exports = Youtube;
