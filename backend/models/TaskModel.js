const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  assignees: [String],
  project: String,
  description: String,
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
  },
  attachments: [
    {
      filename: String,
      path: String,
    },
  ],
});

module.exports = mongoose.model('tasks', TaskSchema);
