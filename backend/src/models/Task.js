const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  notes: { type: String, maxlength: 200 }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;