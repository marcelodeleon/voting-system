const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;
const crypto = require('crypto');

const sendEmail = require('../src/utils/sendEmail');
const { NODE_ENV } = process.env;

const urlOrigin =
  NODE_ENV === 'development'
    ? 'https://voting-system-tas.netlify.app/verify?userId='
    : 'http://localhost:8888/verify?userId=';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodb(mongodbUri);
  const { body } = event;

  const { email } = JSON.parse(body);

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'User not found.' }),
    };
  }

  foundUser.passwordResetToken = crypto.randomBytes(24).toString('hex');
  foundUser.save();

  sendEmail(
    [foundUser.email],
    'Reinicio contraseña.',
    '<strong>Para reiniciar tu contraseña haz click</strong><a href=' +
      urlOrigin +
      foundUser._id +
      '&tokenId=' +
      foundUser.passwordResetToken +
      '>aquí</a>',
  );

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ success: true }),
  };
};
