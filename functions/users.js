const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodb(mongodbUri);
  const { body } = event;

  const usersData = JSON.parse(body);

  const newUser = new User(usersData);
  await newUser.save();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: newUser.id }),
  };
};
