// backend/src/app.js
// This file sets up the Express app and exports it for use in other files.
// Note: The app does NOT connect to the database directly. DB connection is handled in server.js (for dev/prod) and in test setup (for tests).

// Import necessary modules
const express = require('express'); // Express framework for building APIs

// Import route handlers
const healthRouter = require('./routes/health'); // Health check route
const vendorsRouter = require('./routes/vendors'); // Vendors route
const budgetsRouter = require('./routes/budgets'); // Budgets route
const guestsRouter = require('./routes/guests'); // Guests route
const tasksRouter = require('./routes/tasks'); // Tasks route

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