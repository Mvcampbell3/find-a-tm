const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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

  selfRating: {
    type: Number,
    required: true
  }

})

const Matrix = mongoose.model('Matrix', MatrixSchema)

module.exports = Matrix;