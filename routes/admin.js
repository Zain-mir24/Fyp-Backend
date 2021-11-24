const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
const path = require("path");
const Campaign = require("../models/CampaignDB");
const auth = require("../middleware/auth");
const Admin = require("../models/Admin");
const mongoose = require("../db/mongoose");
const News = require("../models/LatestNewsDB");
const upload = require("../middleware/img");
const fs = require("fs");

//Admin routes
router.post("/Signup",async(req,res,next)=>{
const admin = new Admin(req.body)
try {
  await admin.save();
  const token = await user.generateAuthToken();
  const mailOptions = {
    from: '"Our Code World " <zainzz123@outlook.com>',
    to: email,
    subject: "You have signedup as an admin for global reach",
    text: "Welcome to global reach",
  };
  mailSender.transporter
    .sendMail(mailOptions)
    .then((result) => {
      console.log("sent success");
      console.log("result", result);
    })
    .catch((err) => {
      console.log("error", err);
    });
  res.status(201).send({ user, token });

  
} catch (e) {
  console.log("errrorr", e);
  res.status(400).send(e);
}
})

//reading the users
router.get("/users", async (req, res) => {
  const user = await User.find();
  res.json(user);
});
//updating the user in the database
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(req.body);
  console.log(updates);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    console.log("error", e);
    res.status(400).send(e);
  }
});


//deleting user from the database
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id }); //checking if id is in the database

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});


//Adding campaigns
router.post("/addCampaign", async (req, res) => {
  const campaign = new Campaign(req.body);
  try {
    await campaign.save();
    res.status(201).send("campaign added");
  } catch (e) {
    console.log(e);
    res.status(401);
  }
});



//Latest news section
//Reading the news data
router.get("/LatestNews", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news)
  } catch (e) {
    console.log("errorrrr", e);
  }
});

//Addnews
router.post("/addNews", upload.single("file"), async (req, res) => {

  var obj = {
    name: req.body.name,
    description: req.body.description,
   file:req.body.fileName
  };
  const news = new News(obj);  
  try {
    await news.save();
    res.status(201).send("Latest News added");
  } catch (e) {
    console.log(e);
    res.status(401);
  }
 
});
module.exports = router;
