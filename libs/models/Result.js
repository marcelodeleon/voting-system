const mongoose = require('mongoose');

const { Schema } = mongoose;

const resultSchema = new Schema(
  {
    electionId: { type: Schema.Types.ObjectId, required: true },
    proposals: { type: Object, required: true },
  },
  { timestamps: true },
);

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
