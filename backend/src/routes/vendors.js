// backend/src/routes/vendors.js
// Defines API routes for managing wedding vendors.

const express = require('express');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const vendorController = require('../controllers/vendorController');
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
router.get('/', vendorController.getAllVendors);

// GET /api/vendors/:id
router.get('/:id', vendorController.getVendorById);

// POST /api/vendors
router.post('/', vendorValidationRules, handleValidationErrors, vendorController.createVendor);

// PUT /api/vendors/:id
router.put('/:id', vendorValidationRules, handleValidationErrors, vendorController.updateVendor);

// DELETE /api/vendors/:id
router.delete('/:id', vendorController.deleteVendor);

// Export the router to be used in app.js
module.exports = router;