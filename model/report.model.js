// report.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
  task_headline: {
    type: String,
    required: true,
  },
  task_summary: {
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
  // Add a reference to the User model
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Report', ReportSchema);
