const mongoose = require('mongoose');
const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const { Types } = mongoose;

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { country } = event.queryStringParameters;

  await mongodb(mongodbUri);

  try {
    const user = await User.find({
      country: Types.ObjectId(country),
    });

    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 404,
      body: JSON.stringify({ error: 'No existe el pais o el usuario' }),
    });
  }
};
