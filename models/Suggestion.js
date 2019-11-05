const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
  game_title: {
    type: String,
    required: true
  },

  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  added: {
    type: Boolean,
    default: false
  }
})

module.exports = Suggestion = mongoose.model('Suggestion', SuggestionSchema);