const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
