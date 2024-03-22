const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyPlanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);