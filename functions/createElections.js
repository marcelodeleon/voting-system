const apiClient = require('../src/utils/api-client');
const { Election } = require('../libs/models');
const { Result } = require('../libs/models');
const { mongodb } = require('../libs/connectors');
const sendEmail = require('../src/utils/sendEmail');
const { NODE_ENV } = process.env;

const mongodbUri = process.env.MONGODB_URI;
const urlOrigin =
  NODE_ENV === 'development'
    ? 'http://localhost:8888/vote?electionId='
    : 'https://voting-system-tas.netlify.app/vote?electionId=';

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);

  const { electionData } = JSON.parse(event.body);
  console.log(electionData);
  const election = new Election(electionData);
  const newElection = await election.save();

  const resultProposalsData = electionData.proposals.reduce(
    (accProposals, proposal) => {
      const options = proposal.options.reduce((accOptions, option) => {
        return { ...accOptions, [option]: 0 };
      }, {});

      return { ...accProposals, [proposal.title]: options };
    },
    {},
  );

  const resultData = {
    electionId: newElection.id,
    proposals: resultProposalsData,
  };

  const result = new Result(resultData);
  await result.save();

  sendEmail(
    ['gonzalogg.garcia@gmail.com', 'marcebattlenet@gmail.com'],
    'Comienza el periodo de votacion',
    '<strong>Comienza el período de votación, ingresa </strong><a href=' +
      urlOrigin +
      newElection.id +
      '>aquí</a>',
    new Date(electionData.startAt),
  );

  const user = await apiClient.get(`getUserByCountry?country=Uruguay`);

  console.log(user);

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
