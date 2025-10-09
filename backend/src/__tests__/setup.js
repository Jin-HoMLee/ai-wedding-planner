const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri; // Set env before app/db loads
  await mongoose.disconnect();  // Disconnect any previous connection
  await mongoose.connect(uri);  // Connect to the in-memory server
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});