const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organisation = require('../models/User');
const { auth, allowRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { organisationName, email, password, role = 'donor', image } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const exists = await Organisation.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await Organisation.create({ organisationName: organisationName || email.split('@')[0], email, password: hashed, role, image });
  res.json({ id: user._id, email: user.email, role: user.role });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await Organisation.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '24h' });
  res.json({ token, role: user.role });
});

router.get('/donor/dashboard', auth(true), allowRoles('admin', 'donor'), async (req, res) => {
  const me = await Organisation.findOne({ email: req.user.email });
  res.json({ profile: me });
});
router.get('/receiver/dashboard', auth(true), allowRoles('admin', 'receiver'), async (req, res) => {
  const me = await Organisation.findOne({ email: req.user.email });
  res.json({ profile: me });
});
router.get('/admin/dashboard', auth(true), allowRoles('admin'), async (req, res) => {
  const donors = await Organisation.find({ role: 'donor' });
  const receivers = await Organisation.find({ role: 'receiver' });
  res.json({ donors, receivers });
});

module.exports = router;