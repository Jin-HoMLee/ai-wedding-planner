// backend/server.js
// Entry point for starting the backend server.
// This file imports the Express app, sets the port, and begins listening for requests.

// Import the Express app instance (configured in src/app.js)
const app = require('./src/app');
const config = require('config');
const connectDB = require('./src/db');

// Define the port to listen on
const PORT = config.get('port');

// Connect to the database, then start the server
// This ensures the DB is ready before accepting requests
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB. Server not started.');
  process.exit(1);
});