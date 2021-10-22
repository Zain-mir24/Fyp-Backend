const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
<<<<<<< HEAD
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "zainzz123@outlook.com",
    pass: "test12345678",
  },
});

module.exports = { transporter };
=======
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection: false,
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: 'zainzz123@outlook.com',
        pass: 'test12345678'
    }
})



module.exports = {transporter};
>>>>>>> cab326bca5ea144cc526a0c2c3937979d5266cee
