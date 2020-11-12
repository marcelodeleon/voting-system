const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const saltWorkFactor = 10;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  age: {
    type: Number,
    required: false,
  },
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

console.log(calculate_age(new Date()));

async function hashPassword() {
  const user = this;

  if (!user.password || !user.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(saltWorkFactor);
  user.password = await bcrypt.hash(user.password, salt);
  user.age = await calculate_age(this.dateOfBirth);

  if (user.emailVerificationToken) {
    return;
  }

  user.emailVerificationToken = crypto.randomBytes(24).toString('hex');
}

userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
