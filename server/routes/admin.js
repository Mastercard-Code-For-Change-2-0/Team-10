const express = require('express');
const router = express.Router();

// Admin routes placeholders
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard data endpoint' });
});

router.get('/matches/pending', (req, res) => {
  res.json({ message: 'Get pending matches for admin review' });
});

module.exports = router;
