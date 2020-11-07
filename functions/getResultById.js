const mongoose = require('mongoose');
const { Result } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const { Types } = mongoose;

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { electionId } = event.queryStringParameters;

  await mongodb(mongodbUri);

  try {
    const result = await Result.find({
      electionId: Types.ObjectId(electionId),
    });

    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 404,
      body: JSON.stringify({ error: 'No existe esa eleccion' }),
    });
  }
};
