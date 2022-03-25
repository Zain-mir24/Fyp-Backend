const mongoose = require("mongoose");
const CowSchema = new mongoose.Schema({
  Uid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deserverName: {
    type: String,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },
  cell: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  family: [
    {
      name: { type: String },
      age: { type: Number },
      study: { type: Boolean },
      alive: { type: Boolean },
    },
  ],
  accountNo: {
    type: Number,
    required: true,
  },
  sourceOfIncome: {
    type: String,
    required: true,
  },
  cowPrice: {
    type: Number,
    required: true,
  },
  cowOwner: {
    type: String,
    required: true,
  },

  finalPrice: {
    type: Number,
    required: true,
  },
  approxMilk: {
    type: Number,
    required: true,
  },
  salePricePerLitre: {
    type: Number,
    required: true,
  },
  expectedIncome: {
    type: Number,
    required: true,
  },
  foodExpenseOfCow: {
    type: Number,
    required: true,
  },
  savingPerDay: {
    type: Number,
    required: true,
  },
  savingPerMonth: {
    type: Number,
    required: true,
  },
});
const Cow = mongoose.model("Cow", CowSchema);

module.exports = Cow;
