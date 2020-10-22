// TODO: Remove after adding the first endpoint!
const { Election } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  const name = event.queryStringParameters.name || 'World';
  await mongodb(mongodbUri);

  console.log('Running hello function');
  try {
    console.log('Connecting db');
    await mongodb(mongodbUri);
  } catch (error) {
    console.log(error);
  }
  console.log('finished connection');

  console.log('creating election');
  const election = new Election({
    name: name,
    description: 'A desc for the test',
    proposals: [{ title: 'newprop', options: ['opt1', 'opt2'] }],
    startAt: new Date(),
    endAt: new Date(),
    city: 'Montevideo',
    states: 'Montevideo',
    age: '23',
  });
  await election.save();
  console.log('election created');

  callback(null, {
    statusCode: 200,
    //body: 'Hello, World',
    body: `Hello, ${name}`,
  });
};
