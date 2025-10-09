module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/testSetup/setup.js'],
  testMatch: ['**/?(*.)+(test).js'],
};