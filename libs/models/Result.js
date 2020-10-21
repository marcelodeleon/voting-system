const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    idElection: { type: String, required: true },
    proposal: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { timestamps: true },
);

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
