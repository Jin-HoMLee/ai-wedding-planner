const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'List of budgets (example)' });
});

module.exports = router;