const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Admin = require("../models/Admin");
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token, "my new token");
    const decoded = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
    console.log("milgya user", decoded);

    const user = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log("milgya Admin", user);
    console.log("token recieved?");
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ e });
  }
};

module.exports = adminAuth;
