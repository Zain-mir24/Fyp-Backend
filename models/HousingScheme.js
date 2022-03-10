const mongoose = require("mongoose");
const HousingSchema = new mongoose.Schema({
  ProposalNo: {
    type: String,
  },
  Deservername: {
    type: String,
    required: true,
  },
  Guardian: {
    type: String,
  },
  Status: {
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
  Dependents: {
    type: String,
    required: true,
  },
  Sourceofincome: {
    type: String,
    required: true,
  },
  Monthlyincome: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  accomodationself: {
    type: String,
    required: true,
  },
  accomodationdonated: {
    type: String,
    required: true,
  },
  accomodationrental: {
    type: String,
    required: true,
  },
  ownerofland: {
    type: String,
    required: true,
  },
  PlotDimensions: {
    type: String,
    required: true,
  },
  EstimatedCost: {
    type: Number,
    required: true,
  },
  EstimatedTimeFrame: {
    type: String,
    required: true,
  },
  contructionDetail: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },

  family: [
    {
      name: { type: String },
      age: { type: Number },
      study: { type: Boolean },
      alive: { type: Boolean },
    },
  ],

  needs: {
    type: String,
  },
  outcomes: {
    type: String,
  },

  communicationFeedback: {
    Phone: {
      type: String,
    },
  },
});
const Housing = mongoose.model("HousingScheme", HousingSchema);

module.exports = Housing;
