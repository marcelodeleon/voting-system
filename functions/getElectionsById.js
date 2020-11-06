const mongoose = require('mongoose');
const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');
const withAuth = require('./middleware/auth');

const { Types } = mongoose;
const mongodbUri = process.env.MONGODB_URI;

const getElectionsById = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { electionId } = event.queryStringParameters;

  await mongodb(mongodbUri);

  try {
    const election = await Election.findOne({
      _id: Types.ObjectId(electionId),
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(election),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'No existe esa eleccion' }),
    };
  }
};

exports.handler = (event, context) =>
  withAuth(getElectionsById)(event, context);
