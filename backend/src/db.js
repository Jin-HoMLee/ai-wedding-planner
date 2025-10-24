// backend/src/db.js
// This file handles the MongoDB connection using Mongoose.

// Import Mongoose (MongoDB ODM) and dotenv for environment variables
const mongoose = require('mongoose');
const config = require('config'); // Import config package to manage configuration
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Export a function to connect to MongoDB
// This function is called in server.js (for dev/prod) and in test setup (for tests)
// It ensures the correct URI is used for each environment, including in-memory MongoDB for tests
async function connectDB() {
  let mongoURI = config.get('mongoURI');
  // If the config value is a placeholder, use the env variable directly (for tests)
  if (mongoURI === '${MONGO_URI}') {
    mongoURI = process.env.MONGO_URI;
  } else {
    // Otherwise, replace placeholders with actual env vars (for dev/prod)
    mongoURI = mongoURI
      .replace('${MONGODB_USER}', process.env.MONGODB_USER)
      .replace('${MONGODB_PASS}', process.env.MONGODB_PASS)
      .replace('${MONGODB_HOST}', process.env.MONGODB_HOST)
      .replace('${MONGODB_DBNAME}', process.env.MONGODB_DBNAME);
  }
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = connectDB;