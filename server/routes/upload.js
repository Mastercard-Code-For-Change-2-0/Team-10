const express = require('express');
const router = express.Router();

// Upload routes placeholders
router.post('/image', (req, res) => {
  res.json({ message: 'Upload image endpoint' });
});

router.post('/document', (req, res) => {
  res.json({ message: 'Upload document endpoint' });
});

module.exports = router;
