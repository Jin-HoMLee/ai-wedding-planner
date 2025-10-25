// Test setup for isolated, in-memory MongoDB
// This ensures tests never touch your real database
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const connectDB = require('../db');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri;  // Set env before app/db loads
  await mongoose.disconnect();  // Disconnect any previous connection
  await connectDB();            // Use app's DB connection logic (reads MONGO_URI)
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});