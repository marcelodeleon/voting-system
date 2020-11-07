//require('dotenv').config();

const sgMail = require('@sendgrid/mail');

//sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function unixTimestamp(date) {
  if (date === undefined) {
    date = new Date();
  }
  return Math.floor(date.getTime() / 1000.0);
}

sgMail.setApiKey(
  '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',
);

function sendEmail(emailTo, subject, html, sendAt = null) {
  msg = {
    to: emailTo,
    from: 'fdralberti@gmail.com',
    subject: subject,
    html: html,
    //the sendAt time is in UNIXTimestamp
    //https://www.epochconverter.com
  };
  if (sendAt) {
    msg.sendAt = unixTimestamp(sendAt);
  }
  sgMail
    .sendMultiple(msg)
    .then(() => {
      console.log(msg);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response.body);
    });
  // .catch((error) => callback(error));
}

module.exports = sendEmail;

//sendEmail('gonzalogg.garcia@gmail.com',new Date('2020-11-05T22:45:57.413Z'))
