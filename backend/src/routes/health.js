
// backend/src/routes/health.js
// This route provides a simple health check endpoint for the API.

// Import Express to create a router
const express = require('express');
const router = express.Router(); // Create a new router instance

// Define GET / endpoint for health check
// Responds with a JSON object indicating server status
router.get('/', (req, res) => {
  // Send a status response to confirm the server is running
  res.json({ status: 'OK' });
});

// Export the router so it can be used in app.js
module.exports = router;