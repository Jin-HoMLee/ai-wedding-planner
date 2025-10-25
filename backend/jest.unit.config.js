// Jest configuration for unit tests that don't require database
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/utils/*.test.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/'
  ]
};
