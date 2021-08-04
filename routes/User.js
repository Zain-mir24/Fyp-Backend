const dotenv = require("dotenv");
dotenv.config();
let express = require("express");
let router = express.Router();
let query = require("../libs/sql");

const auth = require("../middleware/auth");
const User = require("../models/users");
const mongoose = require("../db/mongoose");

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
    const token = user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    
    res.status(409).send(e);
  }
});
//logout route for the user
//post route for the user
router.post("/logout", async (req, res) => {
  try {
    console.log("logout");
  } catch (e) {}
});
module.exports = router;
