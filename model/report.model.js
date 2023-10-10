const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
  task_title: {
    type: String,
    required: true,
  },
  task_tags: {
    type: [String],
    required: true,
  },
  task_images: {
    type: [String],
    required: true,
  },
  task_date: {
    type: Date,
    required: true,
  },
  task_author: {
    type: String,
    required: true,
  },
});

const Report = mongoose.model('UserReport', ReportSchema);

module.exports = Report;
