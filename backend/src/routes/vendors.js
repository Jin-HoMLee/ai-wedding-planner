const express = require('express');
const router = express.Router();

// Example GET endpoint for vendors
router.get('/', (req, res) => {
  res.json({ message: 'List of vendors (example)' });
});

module.exports = router;