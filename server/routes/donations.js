const express = require('express');
const router = express.Router();

// In-memory placeholder store for demo
const DEMO_DONATIONS = Array.from({ length: 25 }).map((_, i) => ({
	id: String(1000 + i),
	title: `Donation #${i + 1}`,
	category: ['Clothes','Food','Books','Toys'][i % 4],
	city: ['Pune','Mumbai','Nashik','Thane'][i % 4],
	status: ['Pending','Approved','Matched'][i % 3],
	createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

// GET /api/donations
router.get('/', (req, res) => {
	const { q = '', category, city, sort, page = 1, pageSize = 12 } = req.query;
	let items = DEMO_DONATIONS.slice();
	if (q) items = items.filter(d => d.title.toLowerCase().includes(String(q).toLowerCase()));
	if (category) items = items.filter(d => d.category === category);
	if (city) items = items.filter(d => d.city === city);
	if (sort === 'Newest') items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	const p = Math.max(1, parseInt(page));
	const ps = Math.max(1, parseInt(pageSize));
	const start = (p - 1) * ps;
	const paged = items.slice(start, start + ps);
	res.json({ data: paged, total: items.length, page: p, pageSize: ps });
});

// POST /api/donations
router.post('/', (req, res) => {
	const payload = req.body || {};
	const id = String(1000 + DEMO_DONATIONS.length);
	const item = { id, status: 'Pending', createdAt: new Date().toISOString(), ...payload };
	DEMO_DONATIONS.push(item);
	res.status(201).json(item);
});

module.exports = router;
