// backend/src/db.js
// This file handles the MongoDB connection using Mongoose.

// Import Mongoose (MongoDB ODM) and dotenv for environment variables
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB connection URI from environment variables
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,      // Use new URL parser (recommended)
  useUnifiedTopology: true,  // Use new server discovery and monitoring engine
})
// If connection is successful, log a message
.then(() => console.log('Connected to MongoDB'))
// If connection fails, log the error
.catch((err) => console.error('MongoDB connection error:', err));