
// backend/src/models/Vendor.js
// Defines the Vendor schema and model for MongoDB using Mongoose.

const mongoose = require('mongoose');

// Define the schema for a wedding vendor
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Vendor name (required)
  service: { type: String, required: true },   // Type of service provided (required)
  contact: { type: String },                   // Contact phone or info (optional)
  email: { type: String },                     // Contact email (optional)
  notes: { type: String }                      // Additional notes (optional)
});

// Create the Vendor model from the schema
const Vendor = mongoose.model('Vendor', vendorSchema);

// Export the Vendor model for use in routes and controllers
module.exports = Vendor;