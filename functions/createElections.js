const { Election } = require('../libs/models');
const { Result } = require('../libs/models');
const { mongodb } = require('../libs/connectors');
const sendEmail = require('../src/utils/sendEmail');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);

  const { electionData } = JSON.parse(event.body);
  console.log(electionData);
  const election = new Election(electionData);
<<<<<<< HEAD
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
=======
>>>>>>> 9718da5... Sending email done

  sendEmail(
    'gonzalogg.garcia@gmail.com',
    'hola',
    '<strong>esto es un mail</strong>',
    new Date(electionData.startAt),
  );

  await election.save();
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
