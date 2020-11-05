require('dotenv').config();
const sgMail = require('@sendgrid/mail');

unixTimestamp: function unixTimestamp(date) {
  if (date === undefined) {
    date = util.date.getDate();
  }
  return date.getTime() / 1000;
}

exports.handler = async function (event, context, callback) {
  sgMail.setApiKey(
    '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',
  );

  const msg = {
    to: 'gonzalogg.garcia@gmail.com',
    from: 'topicosavanzados2020@gmail.com',
    subject: 'Comienza el periodo de votacion',
    // text: text,
    text: 'and easy to do anywhere, even with Node.js',
    //html: html,
    html:
      '<strong>Comienza el período de votación, ingresa </strong><a href="http://localhost:8888/vote">aquí</a>',
    //the sendAt time is in UNIXTimestamp
    //https://www.epochconverter.com
    //sendAt: unixTimeStamp(date),
    sendAt: 1604292398,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log(msg);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(msg),
      });
    })
    .catch((error) => callback(error));
};
