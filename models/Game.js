const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  developer: {
    type: String,
    required: true,
  },

  ps4: {
    type: Boolean,
    default: false
  },

  team_game: {
    type: Boolean,
    default: false
  },

  img_url: {
    type: String,
    default: 'https://d29pz51ispcyrv.cloudfront.net/images/I/v0uWu6A21X8wob6RJ.MD256.JPEG'
  },

  reviewed: {
    type: Boolean,
    default: false
  },

  userId: {
    type: String,
    required: true
  }
})

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;