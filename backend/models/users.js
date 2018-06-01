const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const utils = require('../libs/utils');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: Date,
  lastUpdatedAt: Date,
  lastLogin: Date,
  friends: {
    type: [String],
    default: []
  },
  verified: Boolean
});

UserSchema.pre('save', function (next) {
  this.lastUpdatedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.lastUpdatedAt;
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        this.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);