const mongoose = require('mongoose');
const { Result } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const { Types } = mongoose;
const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);
  const { body } = event;

  const resultData = JSON.parse(body);
  const { electionId, proposals } = resultData;

  const updateVotes = {};
  // eslint-disable-next-line
  for (const [title, option] of Object.entries(proposals)) {
    updateVotes[`proposals.${title}.${option}`] = 1;
  }

  await Result.findOneAndUpdate(
    { electionId: Types.ObjectId(electionId) },
    { $inc: updateVotes },
  );

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
