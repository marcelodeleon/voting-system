const mongoose = require('mongoose');
const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const { Types } = mongoose;
const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { userId, tokenId } = event.queryStringParameters;

  await mongodb(mongodbUri);

  try {
    const user = await User.findOne({
      _id: Types.ObjectId(userId),
    });

    if (user.emailVerificationToken !== tokenId) {
      return callback(null, {
        statusCode: 404,
        body: JSON.stringify({ error: 'Token de usuario incorrecto' }),
      });
    }

    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error. Token de usuario incorrecto.' }),
    });
  }
};
