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

router.get("/displayEmail", async (req, res) => {
  try {
    const email = await Email.find();
    res.json(email);
  } catch (e) {
    console.log("errorrrr", e);
  }
});

router.post("/sendAllEmail", async (req, res) => {
  var exp = await Email.find();
  exp.map((item) => {
    const mailOptions = {
      from: req.body.from,
      to: item.Email,
      subject: req.body.subject,
      text: req.body.message,
    };
    mailSender.transporter.sendMail(mailOptions);
  });

  res.status(200).send("OK");
});

router.delete("/deleteEmail/:id", async (req, res) => {
  try {
    await Email.findOneAndDelete({ _id: req.params.id }).then((response) => {
      res.status(200).send(response);
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
