const express = require('express');
const Donation = require('../models/Donation');
const Request = require('../models/Request');
const Match = require('../models/Match');
const { auth, allowRoles } = require('../middleware/auth');
const router = express.Router();

function scorePair(d, r) {
	let score = 0;
	if (!d || !r) return 0;
	if (d.category && r.category && d.category === r.category) score += 50;
	if (d.city && r.city && d.city === r.city) score += 20;
	const qty = Math.min(d.quantity || 0, r.quantity || 0);
	if (qty > 0) score += Math.min(20, qty * 5);
	const t1 = (d.title || '').toLowerCase();
	const t2 = (r.title || '').toLowerCase();
	if (t1 && t2) {
		const words = t1.split(/[^a-z0-9]+/).filter(Boolean);
		const hits = words.filter(w => t2.includes(w)).length;
		score += Math.min(10, hits * 2);
	}
	return score;
}

// GET /api/matches/suggest: compute suggestions on the fly (admin only)
router.get('/suggest', auth(true), allowRoles('admin'), async (req, res) => {
	const [donations, requests] = await Promise.all([
		Donation.find({ status: { $in: ['Pending', 'Approved'] } }).lean(),
		Request.find({ status: { $in: ['Pending', 'Approved'] } }).lean(),
	]);
	const suggestions = [];
	for (const d of donations) {
		for (const r of requests) {
			const score = scorePair(d, r);
			if (score >= 40) suggestions.push({ donation: d, request: r, score });
		}
	}
	suggestions.sort((a, b) => b.score - a.score);
	// Limit to top N to keep response light
	res.json({ data: suggestions.slice(0, 50).map(x => ({
		id: `${x.donation._id}-${x.request._id}`,
		donation: { id: x.donation._id, title: x.donation.title, category: x.donation.category, quantity: x.donation.quantity, city: x.donation.city },
		request: { id: x.request._id, title: x.request.title, category: x.request.category, quantity: x.request.quantity, city: x.request.city },
		score: x.score,
		status: 'pending'
	})) });
});

// POST /api/matches/decide { donationId, requestId, decision, note }
router.post('/decide', auth(true), allowRoles('admin'), async (req, res) => {
	const { donationId, requestId, decision = 'approved', note = '' } = req.body || {};
	if (!donationId || !requestId) return res.status(400).json({ message: 'donationId and requestId required' });
	const [d, r] = await Promise.all([
		Donation.findById(donationId),
		Request.findById(requestId),
	]);
	if (!d || !r) return res.status(404).json({ message: 'Pair not found' });
	const score = scorePair(d, r);
	const match = await Match.findOneAndUpdate(
		{ donation: d._id, request: r._id },
		{ $set: { score, status: decision, decidedAt: new Date(), decidedBy: req.user._id, note } },
		{ upsert: true, new: true }
	);
	// Optionally update statuses
	if (decision === 'approved') {
		d.status = 'Matched';
		r.status = 'Matched';
		await Promise.all([d.save(), r.save()]);
	}
	res.json({ id: match._id, donation: d._id, request: r._id, score, status: match.status, decidedAt: match.decidedAt });
});

// GET /api/matches: list stored matches (admin only)
router.get('/', auth(true), allowRoles('admin'), async (req, res) => {
	const items = await Match.find().populate('donation request').sort({ createdAt: -1 }).lean();
	res.json({ data: items.map(m => ({
		id: m._id,
		donation: { id: m.donation?._id, title: m.donation?.title, category: m.donation?.category, quantity: m.donation?.quantity, city: m.donation?.city },
		request: { id: m.request?._id, title: m.request?.title, category: m.request?.category, quantity: m.request?.quantity, city: m.request?.city },
		score: m.score,
		status: m.status,
		decidedAt: m.decidedAt,
	})) });
});

module.exports = router;
