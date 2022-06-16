const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "globalreach.donate@gmail.com",
    pass: "yhziserzjgoyrvks",
  },
});

module.exports = { transporter };