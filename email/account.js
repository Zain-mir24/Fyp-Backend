const nodemailer=require('nodemailer')
const mailGun=require('nodemailer-mailgun-transport')

const auth={
        auth:{
            api_key:'2e44feb9e9703acc34eeaef9aeb9882b-9ad3eb61-403dbf3d',
            domain:'https://app.mailgun.com/app/sending/domains/sandbox4cea388a96b8438b8943038896545d9f.mailgun.org'
        }
}
const transporter = nodemailer.createTransport(mailGun(auth));
const sendMail = (name, email, cb) => {
    const mailOptions = {
        sender: name,
        from: 'zainmir1000@gmail.com',
        to:email ,
        subject: "Signup for mailgun",
        text: "Welcome to mail gun. we are happy to have you!"
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });

// Exporting the sendmail
module.exports = sendMail;
}