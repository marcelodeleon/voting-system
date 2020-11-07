const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    proposals: {
      type: {
        title: String,
        options: [String],
      },
      required: true,
    },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    city: { type: String, required: true },
    states: { type: String, required: true },
    age: { type: String, required: true },
  },
  { timestamps: true },
);

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
