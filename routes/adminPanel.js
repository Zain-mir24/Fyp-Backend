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

// Verifying Email for  Latest News
router.post("/saveEmail", async (req, res) => {
  console.log(req.body, "frontend");
  const email = new Email(req.body);
  const email1 = await Email.findOne({ Email: req.body.Email });
  try {
    if (!email1) {
      const link = await email.verifyToken();
      console.log(link);
      const mailOptions = {
        from: '"Our Code World " <zainzz123@outlook.com>',
        to: email,
        subject: "Verify your email",
        text: `Here is your verification link ${link}`,
      };
      await mailSender.transporter.sendMail(mailOptions);
      res.status(201).send("Mailsent");
    } else {
      console.log("Mail exists");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
// saving verified email
router.post("/saveEmail/:id/:token", async (req, res) => {
  const { token } = req.params;
  console.log(req.body);
  const email = new Email(req.body);
  console.log(email.Email);
  const secret = process.env.ACCESS_TOKEN_SECRET + email.Email;
  try {
    const payload = await jwt.verify(token, secret);
    console.log("token verified");
    if (!payload) {
      console.log("user not saved because token was not verified");
      return res.render("doesnt work");
    }
    await email.save();
    res.status(201).send({ email });
    console.log("User saved");
  } catch (e) {
    console.log(e, "error while saving");
  }
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
  try {
    var exp = await Email.find();
    exp.map((item) => {
      console.log(item.Email);
    });
    exp.map(async (item) => {
      const mailOptions = {
        from: req.body.from,
        to: item.Email,
        subject: req.body.subject,
        text: req.body.message,
      };
      await mailSender.transporter.sendMail(mailOptions);
    });
  } catch (e) {
    console.log(e);
  }

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
