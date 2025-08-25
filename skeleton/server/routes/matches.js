const express = require('express');
const router = express.Router();

// Matches routes placeholders
router.get('/', (req, res) => {
  res.json({ message: 'Get all matches endpoint' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create match endpoint' });
});

module.exports = router;
