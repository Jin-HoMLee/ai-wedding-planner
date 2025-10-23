const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const tasksController = require('../controllers/taskController');
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

router.get('/', tasksController.getAllTasks);

router.get('/:id', tasksController.getTaskById);

router.post('/', taskValidationRules, handleValidationErrors, tasksController.createTask);

router.put('/:id', taskValidationRules, handleValidationErrors, tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

module.exports = router;