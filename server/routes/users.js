const express = require('express');
const Organisation = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth(true), async (req, res) => {
  const me = await Organisation.findById(req.user._id).select('-password');
  res.json(me);
});

router.patch('/me', auth(true), async (req, res) => {
  const updates = (({ organisationName, image }) => ({ organisationName, image }))(req.body || {});
  const me = await Organisation.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
  res.json(me);
});

module.exports = router;