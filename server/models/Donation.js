const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
	name: String,
	data: String, // base64 or URL
}, { _id: false });

const DonationSchema = new mongoose.Schema({
	title: { type: String, required: true },
	category: { type: String, required: true },
	condition: { type: String },
	quantity: { type: Number, default: 1 },
	description: { type: String },
	city: { type: String },
	location: { type: String },
	availability: { type: String },
	photos: [PhotoSchema],
	status: { type: String, default: 'Pending' },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },
}, { timestamps: true });

DonationSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Donation', DonationSchema);
