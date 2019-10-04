const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PlatformSchema = new Schema({
  system: String,
  own: Boolean,
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

  platforms: [PlatformSchema],

})

const User = mongoose.model('User', UserSchema);

User.prototype.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = User;