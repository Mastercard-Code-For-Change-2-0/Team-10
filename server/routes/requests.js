const express = require('express');
const router = express.Router();

// Requests routes placeholders
router.get('/', (req, res) => {
  res.json({ message: 'Get all requests endpoint' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create request endpoint' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get request by ID endpoint' });
});

module.exports = router;
