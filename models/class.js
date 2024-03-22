const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  professor: {
    type: String
  },
  meetingTimes: {
    type: String
  },
  priority: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Class', classSchema);