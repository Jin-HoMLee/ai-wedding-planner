// backend/src/app.js
// This file sets up the Express app
// and exports it for use in other files.

// Import necessary modules
const express = require('express'); // Express framework for building APIs
const dotenv = require('dotenv');   // Loads environment variables from .env file

// Import route handlers
const healthRouter = require('./routes/health'); // Health check route
const vendorsRouter = require('./routes/vendors'); // Vendors route
const budgetsRouter = require('./routes/budgets'); // Budgets route
const guestsRouter = require('./routes/guests'); // Guests route
const tasksRouter = require('./routes/tasks'); // Tasks route

// Load environment variables from .env into process.env
dotenv.config({ quiet: true });

// Initiate DB connection
require('./db'); 

// Initialize Express app
const app = express(); // Creates the main Express application instance

// Middleware
app.use(express.json()); // Automatically parse incoming JSON requests

// Routes will be added here later
// Example: app.use('/api/guests', guestsRouter);

// Health check API route
// Provides a simple endpoint to verify the backend server is running
// Accessible at GET /api/health, responds with { status: 'OK' }
app.use('/api/health', healthRouter);

// Other API routes
// Each resource (vendors, budgets, guests, tasks) has its own router
// These routers handle all CRUD operations for their respective resources
app.use('/api/vendors', vendorsRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/guests', guestsRouter);
app.use('/api/tasks', tasksRouter);

// Export the app for use in other files (like server.js)
module.exports = app;