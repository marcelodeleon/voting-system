const { Election } = require('../libs/models');
const { Result } = require('../libs/models');
const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');
const sendEmail = require('../src/utils/sendEmail');
const { NODE_ENV } = process.env;

const mongodbUri = process.env.MONGODB_URI;
const urlOriginStart =
  NODE_ENV === 'development'
    ? 'http://localhost:8888/vote?electionId='
    : 'https://voting-system-tas.netlify.app/vote?electionId=';

const urlOriginEnd =
  NODE_ENV === 'development'
    ? 'http://localhost:8888/users/result?electionId='
    : 'https://voting-system-tas.netlify.app/users/result?electionId=';

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

  const ages = newElection.age.split('-');
  const ri = ages[0];
  const rf = ages[1];
  const users = await User.find({
    age: { $gte: ri, $lte: rf },
    city: newElection.city,
    department: newElection.states,
  });
  const mails = users.map((user) => user.email);
  console.log(mails);

  if (mails.length > 0) {
    sendEmail(
      mails,
      'Comienza el periodo de votacion',
      '<strong>Comienza el período de votación, ingresa </strong><a href=' +
        urlOriginStart +
        newElection.id +
        '>aquí</a>',
      new Date(electionData.startAt),
    );
    sendEmail(
      mails,
      'Resultados de elecciones',
      '<strong>Ha finalizado el periodo de votacion, para ver los resultados ingresa </strong><a href=' +
        urlOriginEnd +
        newElection.id +
        '>aquí</a>',
      new Date(electionData.endAt),
    );
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
