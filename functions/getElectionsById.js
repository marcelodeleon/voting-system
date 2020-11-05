const mongoose = require('mongoose');
const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const { Types } = mongoose;
const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log({ test: event.queryStringParameters });

  const { electionId } = event.queryStringParameters;

  await mongodb(mongodbUri);

  try {
    const election = await Election.findOne({
      electionId: Types.ObjectId(electionId),
    });

    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(election),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ error: 'No existe esa eleccion' }),
    });
  }
};
