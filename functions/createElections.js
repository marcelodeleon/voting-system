const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  // "event" has information about the path, body, headers, etc. of the request
  await mongodb(mongodbUri);

  const election = new Election({
    name: 'TestN',
    description: 'A desc for the test',
    proposals: [{ title: 'newprop', options: ['opt1', 'opt2'] }],
    startAt: new Date(),
    endAt: new Date(),
    city: 'Montevideo',
    states: 'Montevideo',
    age: '23',
  });

  await election
    .save()
    .then((doc) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(doc),
      });
    })
    .catch((err) => {
      console.error(err);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
