const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const guestsController = require('../controllers/guestController');
const router = express.Router();

const guestValidationRules = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters')
    .trim(),
  body('email')
    .optional()
    .isEmail().withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional()
    .isString().withMessage('Phone must be a string')
    .trim(),
  body('rsvp')
    .optional()
    .isBoolean().withMessage('RSVP must be true or false'),
  body('notes')
    .optional()
    .isString().withMessage('Notes must be a string')
    .isLength({ max: 200 }).withMessage('Notes must be at most 200 characters')
    .trim()
];

router.get('/', guestsController.getAllGuests);

router.get('/:id', guestsController.getGuestById);

router.post('/', guestValidationRules, handleValidationErrors, guestsController.createGuest);

router.put('/:id', guestValidationRules, handleValidationErrors, guestsController.updateGuest);

router.delete('/:id', guestsController.deleteGuest);

module.exports = router;