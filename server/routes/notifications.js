const express = require('express');
const router = express.Router();

// Notifications routes placeholders
router.get('/', (req, res) => {
  res.json({ message: 'Get notifications endpoint' });
});

router.patch('/:id/read', (req, res) => {
  res.json({ message: 'Mark notification as read endpoint' });
});

module.exports = router;
