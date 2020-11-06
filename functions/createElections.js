const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');
const sendEmail = require('../src/utils/sendEmail');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);

  const { electionData } = JSON.parse(event.body);
  console.log(electionData);
  const election = new Election(electionData);

  sendEmail(
    'gonzalogg.garcia@gmail.com',
    'hola',
    '<strong>esto es un mail</strong>',
    new Date(electionData.startAt),
  );

  await election.save();
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
