// TODO: Remove after adding the first endpoint!
const { Result } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  // "event" has information about the path, body, headers, etc. of the request
  await mongodb(mongodbUri);

  const result = new Result({
    idElection: '1234',
    proposal: 'newprop',
    count: 2,
  });

  await result
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
