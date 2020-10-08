// TODO: Remove after adding the first endpoint!
const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  await await mongodb(mongodbUri);

  const election = new Election({
    name: 'TestN',
    description: 'A desc for the test',
    proposals: [{ title: 'newprop', options: ['opt1', 'opt2'] }],
    startAt: new Date(),
    endAt: new Date(),
  });
  await election.save();

  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  });
};
