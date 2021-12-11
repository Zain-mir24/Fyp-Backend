const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const News = mongoose.model("Category", categorySchema);

module.exports = News;
