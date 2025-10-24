
// backend/src/models/Vendor.js
// Defines the Vendor schema and model for MongoDB using Mongoose.

const mongoose = require('mongoose');
const { EMAIL_REGEX } = require('../utils/validation');

// Define the schema for a wedding vendor
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  service: { type: String, required: true, trim: true },
  contact: { type: String, trim: true },
  email: { type: String, trim: true, match: EMAIL_REGEX },
  notes: { type: String, maxlength: 200 }
});

// Create the Vendor model from the schema
const Vendor = mongoose.model('Vendor', vendorSchema);

// Export the Vendor model for use in routes and controllers
module.exports = Vendor;