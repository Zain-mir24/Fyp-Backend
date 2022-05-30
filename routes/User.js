const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/users");
const mongoose = require("../db/mongoose");
const mailSender = require("../email/account");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/img").upload;
const userController = require("../controllers/UserController");
const appointmentController = require("../controllers/appointmentController");
const Conversation = require("../models/Conversation");
// var randtoken = require('rand-token')
// var refreshTokens={}

//Reading users
router.get("/users", auth, async (req, res, next) => {
  try {
    const user = await User.find({});
    console.log("its working");
    res.send(user);
  } catch (e) {
    res.status(501).send(e);
  }
});
/* POST Signup */
// verification email in this route
router.post("/Signup", async (req, res, next) => {
  const user = new User(req.body);
  const { name, email, password, userType } = req.body;
  const matchEmail = await User.findOne({ email });
  try {
    if (!matchEmail) {
      const link = await user.verifyToken();
      const mailOptions = {
        from: '"Our Code World " <zainzz123@outlook.com>',
        to: email,
        subject: "Verify your email",
        text: `Here is your verification link ${link}`,
      };
      await mailSender.transporter.sendMail(mailOptions);
      res.status(201).send("Mailsent");
    } else {
      res.send("ALready existing email");
    }
  } catch (e) {
    console.log("errrorr", e);
    res.status(400).send(e);
  }
});
//  adding user in this route
router.post("/signup/:_id/:token", async (req, res) => {
  const { _id, token } = req.params;
  const user = new User(req.body);
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

  try {
    const payload = await jwt.verify(token, secret);
    console.log("token verified");
    if (!payload) {
      console.log("user not saved because token was not verified");
      return res.render("doesnt work");
    }
    const response = await user.save();
    console.log(response._id.toString(), "User saved");


    const newConversation = new Conversation({
      member: [response._id.toString(), "620baeeab232720e2c73d30e"],
    });
    const savedConversation = await newConversation.save();
    console.log("conversation created");
    if (savedConversation) res.status(201).send({ user, token });
  } catch (e) {
    console.log(e, "error while saving");
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
    if (!user) {
      res.send("not found");
    }
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
  console.log(req.body);
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
  console.log(token, "my reset token");
  const user = await User.findOne({ _id });
  if (!user) return res.send("invalid id");
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
  console.log(secret, "New reset secret");
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
// Scheduling meeting for child adoption
router.get("/appointments", appointmentController.viewMeeting.all);
router.post("/appointmentCreate", appointmentController.createMeeting);
router.get("/viewChildren", userController.viewChildren);

// adding Monthly support
router.post(
  "/MonthlyAppeal",
  upload.fields([
    { name: "bform", maxCount: 1 },
    { name: "deathcertificate", maxCount: 1 },
  ]),
  userController.monthlyAppeal
);
// view monthly support of beneficiary
// router.get("/viewMonthlyAppeal", userController.viewAppeal)
// View Audit Reports
router.get("/viewAudit/:cid", userController.SpecificAudit);

// Notification Routes

router.post("/sendnotification", userController.sendnotification);
router.get("/viewnotification", userController.viewnotification);
module.exports = router;
