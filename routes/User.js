const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/users");
const mongoose = require("../db/mongoose");
const mailSender = require("../email/account");
const jwt = require("jsonwebtoken");

//Reading users
router.get("/users", auth, async (req, res, next) => {
  try {
    const user = await User.find({});
    console.log("its working");
    res.send(user);
  } catch (e) {
    res.status(501).send();
  }
});
/* POST Signup */

router.post("/Signup", async (req, res, next) => {
  const user = new User(req.body);
  const email = req.body.email;
  const mailOptions = {
    from: '"Our Code World " <zainzz123@outlook.com>',
    to: email,
    subject: "You have signedup for global reach",
    text: "Welcome to global reach",
  };

  try {
    await user.save();
    const token = await user.generateAuthToken();
    await mailSender.transporter.sendMail(mailOptions);

    res.status(201).send({ user, token });
  } catch (e) {
    console.log("errrorr", e);
    res.status(400).send(e);
  }
});

//user login route
// Post route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.getEmail,
      req.body.getPassword
    );

    const token = await user.generateAuthToken();
    console.log(user);
    console.log("tokeeen", token);
    res.status(200).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
//logout route for the user
//post route for the user
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
//loggingout everyone
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
//showing the users profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//Changing user's passowrd route
router.post("/changepassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("user with given email does not exist");
    }
    user.password = req.body.newpass;
    await user.save();
    return res.status(201).send("User's password has been changeds");
  } catch (e) {
    console.log("Couldnt change the password", e);
  }
});
//Forgot password route

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("user does not exist");
    }
    //User link valid for 5 minutes
    const link = await user.generateSecretToken();

    const mailOptions = {
      from: '"Global Reach " <zainzz123@outlook.com>',
      to: email,
      subject: "Resetlink",
      text: `Here is your reset link ${link}`,
    };
    mailSender.transporter
      .sendMail(mailOptions)
      .then((res) => {
        console.log("sent success");
        console.log("result", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
    res.status(201).send(link);
  } catch (e) {
    console.log("error ocured", e);
  }
});
//Resetpassword
router.post("/resetPassword/:_id/:token", async (req, res) => {
  const { _id, token } = req.params;

  const user = await User.findOne({ _id });
  if (!user) return res.send("invalid id");
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
  try {
    const payload = await jwt.verify(token, secret);
    if (!payload) return res.render("doesnt work");
    user.password = req.body.pass;
    await user.save();

    return res.status(201);
  } catch (e) {
    console.log("Myerror", e.message);
    res.send(e.message);
  }
});

module.exports = router;
