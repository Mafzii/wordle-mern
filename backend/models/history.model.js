const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  playspace: {
    type: [[String]],
    required: true
  },
  words: {
    type: [[String]],
    required: true
  },
  won: {
    type: Boolean,
    required: true 
  },
  word: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const History = mongoose.model('History', historySchema);

module.exports = History;