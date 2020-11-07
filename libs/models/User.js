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
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

async function hashPassword() {
  const user = this;

  if (!user.password || !user.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(saltWorkFactor);
  user.password = await bcrypt.hash(user.password, salt);

  if (user.emailVerificationToken) {
    return;
  }

  user.emailVerificationToken = crypto.randomBytes(24).toString('hex');
}

userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
