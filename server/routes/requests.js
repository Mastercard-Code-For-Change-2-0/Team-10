const express = require('express');
const router = express.Router();

const DEMO_REQUESTS = [];

// GET /api/requests (basic list)
router.get('/', (req, res) => {
	res.json({ data: DEMO_REQUESTS, total: DEMO_REQUESTS.length });
});

// POST /api/requests
router.post('/', (req, res) => {
	const payload = req.body || {};
	const id = String(5000 + DEMO_REQUESTS.length);
	const item = { id, status: 'Pending', createdAt: new Date().toISOString(), ...payload };
	DEMO_REQUESTS.push(item);
	res.status(201).json(item);
});

module.exports = router;
