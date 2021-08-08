const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");
const auth = require("../middleware/auth");
const User = require("../models/users");
const mongoose = require("../db/mongoose");
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

  try {
    await user.save();

    const token = await user.generateAuthToken();
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
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    console.log(user);
    console.log("tokeeen", token);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
//logout route for the user
//post route for the user
router.post("/logout", async (req, res) => {
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
router.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
