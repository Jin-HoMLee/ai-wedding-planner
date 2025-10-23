const { validationResult } = require('express-validator');
const Task = require('../models/Task');

/**
 * GET /api/tasks
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().lean();
    return res.status(200).json(tasks);
  } catch (err) {
    console.error('getAllTasks error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/tasks/:id
 */
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (err) {
    console.error('getTaskById error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /api/tasks
 */
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = new Task(req.body);
    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    console.error('createTask error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/tasks/:id
 */
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (err) {
    console.error('updateTask error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE /api/tasks/:id
 */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id).lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('deleteTask error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};