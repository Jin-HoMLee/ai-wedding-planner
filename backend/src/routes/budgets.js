const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const Budget = require('../models/Budget');
const router = express.Router();

const budgetValidationRules = [
  body('category')
    .isString().withMessage('Category must be a string')
    .notEmpty().withMessage('Category is required')
    .trim(),
  body('amount')
    .isNumeric().withMessage('Amount must be a number')
    .isFloat({ min: 0 }).withMessage('Amount must be zero or greater'),
  body('notes')
    .optional()
    .isString().withMessage('Notes must be a string')
    .isLength({ max: 200 }).withMessage('Notes must be at most 200 characters')
    .trim()
];

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a budget by ID
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new budget
router.post('/', budgetValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const budget = new Budget(req.body);
    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a budget
router.put('/:id', budgetValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBudget) return res.status(404).json({ error: 'Budget not found' });
    res.json(updatedBudget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) return res.status(404).json({ error: 'Budget not found' });
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;