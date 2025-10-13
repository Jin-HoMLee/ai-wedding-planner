// backend/src/db.js
// This file handles the MongoDB connection using Mongoose.

// Import Mongoose (MongoDB ODM) and dotenv for environment variables
const mongoose = require('mongoose');
const config = require('config'); // Import config package to manage configuration
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ silent: true });

// Use config package to get MongoDB URI from configuration files
let mongoURI = config.get('mongoURI');

// Replace placeholders with actual env vars
mongoURI = mongoURI
  .replace('${MONGODB_USER}', process.env.MONGODB_USER)
  .replace('${MONGODB_PASS}', process.env.MONGODB_PASS)
  .replace('${MONGODB_HOST}', process.env.MONGODB_HOST)
  .replace('${MONGODB_DBNAME}', process.env.MONGODB_DBNAME);

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
// If connection is successful, log a message
.then(() => console.log('Connected to MongoDB'))
// If connection fails, log the error
.catch((err) => console.error('MongoDB connection error:', err));