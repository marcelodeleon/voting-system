require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { NODE_ENV } = process.env;
//sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const { urlOrigin } =
  NODE_ENV === 'development'
    ? 'http://localhost:8888/vote'
    : 'https://voting-system-tas.netlify.app/vote';

unixTimestamp: function unixTimestamp(date) {
  if (date === undefined) {
    date = new Date();
  }
  return Math.floor(date.getTime() / 1000.0);
}
sgMail.setApiKey(
  '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',
);
const msg = {
  to: 'gonzalogg.garcia@gmail.com',
  from: 'topicosavanzados2020@gmail.com',
  subject: 'Comienza el periodo de votacion',
  //html: html,
  html:
    '<strong>Comienza el período de votación, ingresa </strong><a href=http://localhost:8888/vote>aquí</a>',
  //the sendAt time is in UNIXTimestamp

  //https://www.epochconverter.com
  sendAt: 1604553497,
  //sendAt: unixTimeStamp(date),
};

sgMail
  .send(msg)
  .then(() => {
    console.log(msg);
  })
  .catch((error) => callback(error));
