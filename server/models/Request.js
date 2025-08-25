const mongoose = require('mongoose');

const DocSchema = new mongoose.Schema({ name: String, data: String }, { _id: false });

const RequestSchema = new mongoose.Schema({
	title: { type: String, required: true },
	category: { type: String, required: true },
	quantity: { type: Number, default: 1 },
	urgency: { type: String },
	description: { type: String },
	orgName: { type: String },
	regNo: { type: String },
	contact: { type: String },
	city: { type: String },
	docs: [DocSchema],
	status: { type: String, default: 'Pending' },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },
}, { timestamps: true });

RequestSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Request', RequestSchema);
// placeholder
