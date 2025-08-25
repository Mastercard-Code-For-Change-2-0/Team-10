const express = require('express');
const { auth } = require('../middleware/auth');
const Donation = require('../models/Donation');
const router = express.Router();

// GET /api/donations
router.get('/', async (req, res) => {
	const { q, category, city, sort, page = 1, pageSize = 12 } = req.query;
	const filter = {};
	if (q) filter.$text = { $search: String(q) };
	if (category) filter.category = category;
	if (city) filter.city = city;
	const p = Math.max(1, parseInt(page));
	const ps = Math.max(1, parseInt(pageSize));
	const total = await Donation.countDocuments(filter);
	const cursor = Donation.find(filter)
		.sort(sort === 'Newest' ? { createdAt: -1 } : { createdAt: 1 })
		.skip((p - 1) * ps)
		.limit(ps);
	const items = await cursor.lean();
	res.json({ data: items.map(it => ({ ...it, id: it._id })), total, page: p, pageSize: ps });
});

// POST /api/donations
router.post('/', auth(true), async (req, res) => {
	const payload = req.body || {};
	const doc = await Donation.create({ ...payload, owner: req.user?._id });
	res.status(201).json({ ...doc.toObject(), id: doc._id });
});

module.exports = router;
