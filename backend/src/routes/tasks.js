const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const Task = require('../models/Task');
const router = express.Router();

const taskValidationRules = [
  body('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Title must be 2-100 characters')
    .trim(),
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be true or false'),
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid ISO8601 date'),
  body('notes')
    .optional()
    .isString().withMessage('Notes must be a string')
    .isLength({ max: 200 }).withMessage('Notes must be at most 200 characters')
    .trim()
];

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', taskValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', taskValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;