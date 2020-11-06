const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');
const sendEmail = require('../src/utils/sendEmail');
const { NODE_ENV } = process.env;

const mongodbUri = process.env.MONGODB_URI;
const urlOrigin =
  NODE_ENV === 'development'
    ? 'http://localhost:8888/vote'
    : 'https://voting-system-tas.netlify.app/vote';

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);

  const { electionData } = JSON.parse(event.body);
  console.log(electionData);
  const election = new Election(electionData);

  sendEmail(
    'gonzalogg.garcia@gmail.com',
    'hola',
    '<strong>Comienza el período de votación, ingresa </strong><a href=' +
      urlOrigin +
      '>aquí</a>',
    new Date(electionData.startAt),
  );

  await election.save();
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
