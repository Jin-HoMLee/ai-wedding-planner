const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const Guest = require('../models/Guest');
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

router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ error: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', guestValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const guest = new Guest(req.body);
    const savedGuest = await guest.save();
    res.status(201).json(savedGuest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', guestValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGuest) return res.status(404).json({ error: 'Guest not found' });
    res.json(updatedGuest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest) return res.status(404).json({ error: 'Guest not found' });
    res.json({ message: 'Guest deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;