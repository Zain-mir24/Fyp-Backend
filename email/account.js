const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: "globalreach.donate@gmail.com",
    pass: "globalreach123",
  },
});

module.exports = { transporter };
