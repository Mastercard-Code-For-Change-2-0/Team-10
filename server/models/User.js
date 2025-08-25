const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String },
	category: { type: String, required: true },
	numberOfItems: { type: Number, default: 1 },
	createdAt: { type: Date, default: Date.now },
});

const orgSchema = new mongoose.Schema({
	organisationName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['admin', 'donor', 'receiver'], default: 'donor' },
	isVerified: { type: Boolean, default: false },
	image: { type: String },
	listings: [listingSchema],
}, { timestamps: true });

module.exports = mongoose.model('Organisation', orgSchema);
