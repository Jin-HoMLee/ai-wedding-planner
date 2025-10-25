const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const budgetsController = require('../controllers/budgetController');
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
router.get('/', budgetsController.getAllBudgets);

// Get a budget by ID
router.get('/:id', budgetsController.getBudgetById);

// Create a new budget
router.post('/', budgetValidationRules, handleValidationErrors, budgetsController.createBudget);

// Update a budget
router.put('/:id', budgetValidationRules, handleValidationErrors, budgetsController.updateBudget);

// Delete a budget
router.delete('/:id', budgetsController.deleteBudget);

module.exports = router;