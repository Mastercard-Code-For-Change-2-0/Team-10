const express = require('express');
const { auth, allowRoles } = require('../middleware/auth');
const Donation = require('../models/Donation');
const Request = require('../models/Request');
const Match = require('../models/Match');
const { Parser } = require('json2csv');
const router = express.Router();

// GET /api/admin/reports
// Query: type=donations|requests|matches format=csv|json from=YYYY-MM-DD to=YYYY-MM-DD
router.get('/reports', auth(true), allowRoles('admin'), async (req, res) => {
	const { type = 'donations', format = 'csv', from, to } = req.query;
	const range = {};
	if (from) range.$gte = new Date(String(from));
	if (to) range.$lte = new Date(String(to));
	const filter = Object.keys(range).length ? { createdAt: range } : {};
	let data = [];
	if (type === 'donations') data = await Donation.find(filter).lean();
	else if (type === 'requests') data = await Request.find(filter).lean();
	else if (type === 'matches') data = await Match.find(filter).populate('donation request').lean();
	else return res.status(400).json({ message: 'Invalid type' });

	if (format === 'json') {
		return res.json({ data });
	}
	// default CSV
	const flat = data.map(doc => {
		if (type === 'matches') {
			return {
				id: doc._id,
				donationId: doc.donation?._id,
				donationTitle: doc.donation?.title,
				requestId: doc.request?._id,
				requestTitle: doc.request?.title,
				score: doc.score,
				status: doc.status,
				createdAt: doc.createdAt,
			};
		}
		return { id: doc._id, title: doc.title, category: doc.category, quantity: doc.quantity, city: doc.city, status: doc.status, createdAt: doc.createdAt };
	});
	const parser = new Parser();
	const csv = parser.parse(flat);
	res.setHeader('Content-Type', 'text/csv');
	res.setHeader('Content-Disposition', `attachment; filename="${type}.csv"`);
	res.send(csv);
});

module.exports = router;
