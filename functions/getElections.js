// TODO: Remove after adding the first endpoint!
import election from './hello';

const { Election } = require('../libs/models/Election');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  await mongodb(mongodbUri);

  const election = new Election();
  await election.find();

  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  });
};
