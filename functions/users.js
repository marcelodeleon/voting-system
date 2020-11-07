const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const sendEmail = require('../src/utils/sendEmail');
const mongodbUri = process.env.MONGODB_URI;
const { NODE_ENV } = process.env;

const urlOrigin = 'https://voting-system-tas.netlify.app/verify?userId=';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodb(mongodbUri);
  const { body } = event;

  const usersData = JSON.parse(body);

  const newUser = new User(usersData);
  await newUser.save();

  sendEmail(
    [newUser.email],
    'Validacion de usuario.',
    '<strong>Valida tu usuario haciendo click </strong><a href=' +
      urlOrigin +
      newUser._id +
      '&tokenId=' +
      newUser.emailVerificationToken +
      '>aquí</a>',
  );

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: newUser.id }),
  };
};
