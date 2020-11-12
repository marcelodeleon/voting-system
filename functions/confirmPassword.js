const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { mongodb } = require('../libs/connectors');
const { User } = require('../libs/models');

const { Types } = mongoose;
const mongodbUri = process.env.MONGODB_URI;

const saltWorkFactor = 10;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await mongodb(mongodbUri);
  const { body } = event;

  const data = JSON.parse(body);
  const { userId, password } = data;

  const user = await User.findOne({
    _id: Types.ObjectId(userId),
  });

  const salt = await bcrypt.genSalt(saltWorkFactor);
  user.password = await bcrypt.hash(user.password, salt);

  user.password = password;
  user.save();

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok' }),
  });
};
