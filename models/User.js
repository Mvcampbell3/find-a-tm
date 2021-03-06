const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const moment = require('moment');

const PlatformSchema = new Schema({
  system: String,
  gamerTag: String
})

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  lastOnline: {
    type: String,
    default: moment().format('x')
  },

  platforms: [PlatformSchema],

  gameIDs: {
    type: [Schema.Types.ObjectId],
    ref: 'Game'
  },

  intro: {
    type: Boolean,
    default: true
  }
})

UserSchema.pre('save', function(next) {
  this.lastOnline = moment().format('x');
  next();
})

const User = mongoose.model('User', UserSchema);

User.prototype.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = User;