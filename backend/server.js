// backend/server.js
// Entry point for starting the backend server.
// This file imports the Express app, sets the port, and begins listening for requests.

// Import the Express app instance (configured in src/app.js)
const app = require('./src/app');

// Define the port to listen on
// Uses environment variable PORT if set, otherwise defaults to 4000
const PORT = process.env.PORT || 4000;

// Start the server and begin listening for incoming HTTP requests
// The callback runs only after the server is successfully listening
app.listen(PORT, () => {
  // Log a message to confirm the server is running and ready
  console.log(`Backend server running on port ${PORT}`);
});