const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const MatrixSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  gameID: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },

  platform: {
    type: String,
    required: true
  },

  gamerTag: {
    type: String,
    required: true
  },

  selfRating: {
    type: Number,
    required: true
  }

})

MatrixSchema.pre('save', function(next) {
  User.findByIdAndUpdate(this.userID, { $push: { gameIDs: this.gameID } })
    .then(() => next())
    .catch(err => console.log(err));
})

MatrixSchema.pre('remove', function(next) {
  User.findByIdAndUpdate(this.userID, { $pull: { gameIDs: this.gameID } })
    .then(() => next())
    .catch(err => console.log(err))
})

const Matrix = mongoose.model('Matrix', MatrixSchema)

module.exports = Matrix;