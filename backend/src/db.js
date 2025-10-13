// backend/src/db.js
// This file handles the MongoDB connection using Mongoose.

// Import Mongoose (MongoDB ODM) and dotenv for environment variables
const mongoose = require('mongoose');
const config = require('config'); // Import config package to manage configuration
// const dotenv = require('dotenv');

// Load environment variables from .env file
// dotenv.config({ quiet: true });

// Get the MongoDB connection URI from environment variables
// const mongoURI = process.env.MONGODB_URI;

// Use config package to get MongoDB URI from configuration files
const mongoURI = config.get('mongoURI');

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
// If connection is successful, log a message
.then(() => console.log('Connected to MongoDB'))
// If connection fails, log the error
.catch((err) => console.error('MongoDB connection error:', err));