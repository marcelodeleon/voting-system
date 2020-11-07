const jwt = require('jsonwebtoken');
const { User } = require('../../libs/models');
const { mongodb } = require('../../libs/connectors');

const jwtSecret = process.env.JWT_SECRET;
const mongodbUri = process.env.MONGODB_URI;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return null;
    }

    throw err;
  }
};

const withAuth = (func) => (a, b) => {
  const handler = {
    apply: async (target, thisArg, args) => {
      await mongodb(mongodbUri);
      const event = args[0];
      const context = args[1];

      const { headers } = event;
      const { authorization } = headers;

      if (!authorization) {
        return {
          statusCode: 401,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ error: 'You must be logged in.' }),
        };
      }

      const [scheme, token] = authorization.split(' ');

      if (!/^Bearer$/i.test(scheme)) {
        return {
          statusCode: 401,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: `Unsupported authentication scheme: "${scheme}". Supported schemes: "Bearer".`,
          }),
        };
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: 'Invalid token.',
          }),
        };
      }

      const { sub: userId } = decoded;
      const user = await User.findById(userId);

      if (!user) {
        return {
          statusCode: 401,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: 'Invalid token.',
          }),
        };
      }

      return target(event, context);
    },
  };

  const proxy = new Proxy(func, handler);

  return proxy.apply(this, [a, b]);
};

module.exports = withAuth;
