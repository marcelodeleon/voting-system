//require('dotenv').config();

const sgMail = require('@sendgrid/mail');
const { NODE_ENV } = process.env;

//sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function unixTimestamp(date) {
  if (date === undefined) {
    date = new Date();
  }
  return Math.floor(date.getTime() / 1000.0);
}

const urlOrigin =
  NODE_ENV === 'development'
    ? 'http://localhost:8888/vote'
    : 'https://voting-system-tas.netlify.app/vote';

sgMail.setApiKey(
  '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',
);

// function sendEmail(emailTo, sendAt){
function sendEmail(emailTo, subject, html, sendAt) {
  msg = {
    //to: 'gonzalogg.garcia@gmail.com',
    to: emailTo,
    from: 'topicosavanzados2020.2@gmail.com',
    subject: subject,
    //subject: 'Comienza el periodo de votacion2',
    html: html,
    // html:
    //   '<strong>Comienza el período de votación, ingresa </strong><a href=' +
    //   urlOrigin +
    //   '>aquí</a>',
    //the sendAt time is in UNIXTimestamp

    //https://www.epochconverter.com
    sendAt: unixTimestamp(sendAt),
  };
  sgMail
    .send(msg)
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
