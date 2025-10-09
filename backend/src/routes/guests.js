const express = require('express');
const Guest = require('../models/Guest');
const router = express.Router();

// Get all guests
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a guest by ID
router.get('/:id', async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ error: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new guest
router.post('/', async (req, res) => {
  try {
    const guest = new Guest(req.body);
    const savedGuest = await guest.save();
    res.status(201).json(savedGuest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a guest
router.put('/:id', async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedGuest) return res.status(404).json({ error: 'Guest not found' });
    res.json(updatedGuest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a guest
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