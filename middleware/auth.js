const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const User = require("../models/users");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("milgya user",decoded)
    
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log("milgya user",user)
    console.log("token recieved?")
    if (!user) {
      throw new Error();
    }
   
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
