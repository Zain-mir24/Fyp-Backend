const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const emailSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
});
emailSchema.methods.verifyToken = async function () {
  const email = this;
  const secret = process.env.ACCESS_TOKEN_SECRET + email.Email;

  const payload = {
    email: email.Email,
    _id: email._id.toString(),
  };
  console.log(payload, "payload");
  const token = await jwt.sign(payload, secret, { expiresIn: "5m" });

  console.log(token);
  const link = `http://localhost:3000/emailVerification/${email._id}/${token}/${email.Email}`;
  return link;
};
const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
