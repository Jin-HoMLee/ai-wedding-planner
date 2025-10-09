// backend/src/routes/vendors.js
// Defines API routes for managing wedding vendors.

const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const Vendor = require('../models/Vendor');
const router = express.Router();

// Validation rules for creating/updating a vendor
const vendorValidationRules = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters')
    .trim(),
  body('service')
    .isString().withMessage('Service must be a string')
    .notEmpty().withMessage('Service is required')
    .trim(),
  body('contact')
    .optional()
    .isString().withMessage('Contact must be a string')
    .trim(),
  body('email')
    .optional()
    .isEmail().withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('notes')
    .optional()
    .isString().withMessage('Notes must be a string')
    .isLength({ max: 200 }).withMessage('Notes must be at most 200 characters')
    .trim()
];

// GET /api/vendors
// Retrieve all vendors from the database
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/vendors/:id
// Retrieve a single vendor by its MongoDB ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/vendors
// Create a new vendor with data from the request body
router.post('/', vendorValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/vendors/:id
// Update an existing vendor by its ID
router.put('/:id', vendorValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(updatedVendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/vendors/:id
// Delete a vendor by its ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export the router to be used in app.js
module.exports = router;