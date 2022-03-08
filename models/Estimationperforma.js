const mongoose = require("mongoose");
const EstimationSchema = new mongoose.Schema({
  Project: {
    type: String,
    required: "true",
  },
  Location: {
    type: String,
    required: true,
  },
  Caretaker: {
    type: String,
    required: true,
  },
  Cellno: {
    type: Number,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Material: [
    {
      name: { type: String, required: true },
      AU: { type: String, required: true },
      QTY: { type: Number, required: true },
      Rate: { type: Number, require: true },
      Cost: { type: Number, reqired: true },
    },
  ],
  Masoncharges: {
    type: Number,
  },
  Labourcharges: {
    type: Number,
  },
  Electriciancharges: {
    type: Number,
  },
  Plumbercharges: {
    type: Number,
  },
  Shutteringcharges: {
    type: Number,
  },
  Paintercharges: {
    type: Number,
  },
  Total: {
    type: Number,
    required: true,
  },
});
const Estimation = mongoose.model("EstimationSchema", EstimationSchema);
module.exports = Estimation;
