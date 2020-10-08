// TODO: Remove after adding the first endpoint!
const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  await mongodb(mongodbUri);

  const election = new Election({ name: 'Test' });
  await election.save();

  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  });
};
