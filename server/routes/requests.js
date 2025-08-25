const express = require('express');
const { auth } = require('../middleware/auth');
const Request = require('../models/Request');
const router = express.Router();

// GET /api/requests
router.get('/', async (req, res) => {
	const { q, category, city, sort, page = 1, pageSize = 12 } = req.query;
	const filter = {};
	if (q) filter.$text = { $search: String(q) };
	if (category) filter.category = category;
	if (city) filter.city = city;
	const p = Math.max(1, parseInt(page));
	const ps = Math.max(1, parseInt(pageSize));
	const total = await Request.countDocuments(filter);
	const items = await Request.find(filter)
		.sort(sort === 'Newest' ? { createdAt: -1 } : { createdAt: 1 })
		.skip((p - 1) * ps)
		.limit(ps)
		.lean();
	res.json({ data: items.map(it => ({ ...it, id: it._id })), total, page: p, pageSize: ps });
});

// POST /api/requests
router.post('/', auth(true), async (req, res) => {
	const payload = req.body || {};
	const doc = await Request.create({ ...payload, owner: req.user?._id });
	res.status(201).json({ ...doc.toObject(), id: doc._id });
});

module.exports = router;
