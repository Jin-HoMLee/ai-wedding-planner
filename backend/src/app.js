// backend/src/app.js
// This file sets up the Express app
// and exports it for use in other files.

// Import necessary modules
const express = require('express'); // Express framework for building APIs
const dotenv = require('dotenv');   // Loads environment variables from .env file

// Load environment variables from .env into process.env
dotenv.config();

// Initiate DB connection
require('./db'); 

// Initialize Express app
const app = express(); // Creates the main Express application instance

// Middleware
app.use(express.json()); // Automatically parse incoming JSON requests

// Routes will be added here later
// Example: app.use('/api/guests', guestsRouter);

// Export the app for use in other files (like server.js)
module.exports = app;