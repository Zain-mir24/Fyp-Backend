const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();

const auth = require("../middleware/auth");
const Campaignappeal = require("../models/appealedCampaign");
const loanappeal=require("../models/appealedLoans")
const mongoose = require("../db/mongoose");
const mailSender = require("../email/account");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/img");

router.post("/addCampaignappeal", upload.single("file"), async (req, res) => {
  var obj = {
    bid: req.body.bid,
    name: req.body.name,
    description: req.body.description,
    file: req.body.fileName,
    amountneeded: req.body.amountneeded,
  };
  const camp = new Campaignappeal(obj);
  try {
    await camp.save();
    res.status(200).send(camp);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.post("/addloanappeal", upload.single("file"), async (req, res) => {
  var obj = {
    bid: req.body.bid,
    name: req.body.name,
    loandescription: req.body.loandescription,
    Loanamount: req.body.Loanamount,
    loanType: req.body.loanType,
    file: req.body.fileName,
  };
  console.log(obj);
  const loan = new loanappeal(obj);
  try {
    await loan.save();
    res.status(200).send(loan);
  } catch (e) {
    res.status(500).send(e);
    console.log(e, "error");
  }
});
module.exports = router;
