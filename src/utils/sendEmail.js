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
    from: 'topicosavanzados2020.3@gmail.com',
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
