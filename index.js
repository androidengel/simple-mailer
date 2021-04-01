const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const path = require('path');
require('dotenv').config();

const filepath = process.argv[2];
console.log(filepath);
const auth = {
  auth: {
    api_key: process.env.EMAIL_API,
    domain: process.env.EMAIL_DOMAIN,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const sendEmail = async (filepath) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'Your email',
    text: 'Here is your email',
    attachments: [{ path: filepath}],
  };

  nodemailerMailgun.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log(`Complete. Email sent: ${info.messageId}`);
    }
  });
};

sendEmail(filepath);