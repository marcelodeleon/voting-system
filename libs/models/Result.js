const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    idElection: { type: String, required: false },
    proposals: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true },
);

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
