const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
const Campaignappeal = require("../models/appealedCampaign");
const loanappeal = require("../models/appealedLoans");
const upload = require("../middleware/img");
const auth = require("../middleware/auth")

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
    console.log(e)
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
    isApproved: false
  };
  const camp = new loanappeal(obj);
  try {
    await camp.save();
    res.status(200).send(camp);
  } catch (e) {
    console.log("Error", e)
    res.status(500).send(e);
  }
});
module.exports = router;
