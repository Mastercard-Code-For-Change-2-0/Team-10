const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema(
  {
    donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
    score: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    decidedAt: { type: Date },
    decidedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },
    note: { type: String },
  },
  { timestamps: true }
);

MatchSchema.index({ donation: 1, request: 1 }, { unique: true });

module.exports = mongoose.model('Match', MatchSchema);
