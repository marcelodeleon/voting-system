// TODO: Remove after adding the first endpoint!
const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodb(mongodbUri);
  return await Election.find()
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
