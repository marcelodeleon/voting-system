const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);

  const { electionData } = JSON.parse(event.body);

  const election = new Election(electionData);
  await election.save();

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
