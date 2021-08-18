const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
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