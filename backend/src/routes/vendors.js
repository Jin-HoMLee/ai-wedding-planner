
// backend/src/routes/vendors.js
// Defines API routes for managing wedding vendors.

const express = require('express');
const Vendor = require('../models/Vendor');
const router = express.Router();

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
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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