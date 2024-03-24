const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSessionSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  duration: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

module.exports = mongoose.model('ClassSession', classSessionSchema);