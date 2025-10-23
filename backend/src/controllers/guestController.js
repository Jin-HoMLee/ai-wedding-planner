const { validationResult } = require('express-validator');
const Guest = require('../models/Guest');

/**
 * GET /api/guests
 */
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().lean();
    return res.status(200).json(guests);
  } catch (err) {
    console.error('getAllGuests error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/guests/:id
 */
exports.getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id).lean();
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    return res.status(200).json(guest);
  } catch (err) {
    console.error('getGuestById error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /api/guests
 */
exports.createGuest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const guest = new Guest(req.body);
    await guest.save();
    return res.status(201).json(guest);
  } catch (err) {
    console.error('createGuest error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/guests/:id
 */
exports.updateGuest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    return res.status(200).json(guest);
  } catch (err) {
    console.error('updateGuest error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE /api/guests/:id
 */
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id).lean();
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    return res.status(200).json({ message: 'Guest deleted' });
  } catch (err) {
    console.error('deleteGuest error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};