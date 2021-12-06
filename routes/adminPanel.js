const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
const path = require("path");
const Campaign = require("../models/CampaignDB");
const auth = require("../middleware/auth");
const Admin = require("../models/Admin");
const Email = require("../models/Email");
const mongoose = require("../db/mongoose");
const News = require("../models/LatestNewsDB");
const upload = require("../middleware/img");
const fs = require("fs");
const { response } = require("express");
const mailSender = require("../email/account");

router.post("/saveEmail", (req, res) => {
  Email.findOne({ Email: req.body.Email }).then((result) => {
    if (result == null) {
      Email.create(req.body).then((response) => {
        res.status(200).send(response);
      });
    } else {
      res.status(300).send("Email Exist");
    }
  });
});

router.get("/sendAllEmail", async (req, res) => {
  var exp = await Email.find();
  exp.map((item) => {
    const mailOptions = {
      from: '"Global Reach " <zainzz123@outlook.com>',
      to: item.Email,
      subject: "Resetlink",
      text: `Here is your reset link`,
    };
    mailSender.transporter.sendMail(mailOptions);
  });

  res.status(200).send("OK");
});

module.exports = router;
