const { Election } = require('../libs/models');
const { Result } = require('../libs/models');
const { mongodb } = require('../libs/connectors');
const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);

  const { electionData } = JSON.parse(event.body);
  console.log(electionData);
  console.log(electionData.name);
  console.log(electionData.proposals.map((proposal) => proposal.title));
  console.log(
    electionData.proposals.map((proposal) =>
      proposal.options.map((option) => option),
    ),
  );

  const election = new Election(electionData);
  const result = new Result();
  result.idElection = 1;
  result.proposals = electionData.proposals;
  await election.save();
  await result.save();

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
