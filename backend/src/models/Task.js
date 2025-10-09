const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  notes: { type: String, maxlength: 200 }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;