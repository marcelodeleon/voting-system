const jwt = require('jsonwebtoken');

const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const jwtSecret = process.env.JWT_SECRET;
const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event) => {
  await mongodb(mongodbUri);
  const { body } = event;

  const { email, password } = JSON.parse(body);

  const foundUser = await User.findOne({ email });
  if (!foundUser || foundUser.password !== password) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Invalid email/password combination.' }),
    };
  }

  const token = jwt.sign({ sub: foundUser.id }, jwtSecret);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  };
};
