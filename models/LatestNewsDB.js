const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
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
  },
  category: {
    type: String,
  },
});
const News = mongoose.model("LatestNews", newsSchema);

module.exports = News;
