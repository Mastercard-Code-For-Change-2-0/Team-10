const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Requester is required']
  },
  title: {
    type: String,
    required: [true, 'Request title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'food',
      'clothing',
      'books',
      'electronics',
      'furniture',
      'medical',
      'toys',
      'sports',
      'educational',
      'household',
      'other'
    ]
  },
  subcategory: {
    type: String,
    maxlength: [100, 'Subcategory cannot exceed 100 characters']
  },
  urgency: {
    type: String,
    required: [true, 'Urgency level is required'],
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  quantity: {
    needed: {
      type: Number,
      required: [true, 'Needed quantity is required'],
      min: [1, 'Needed quantity must be at least 1']
    },
    received: {
      type: Number,
      default: 0,
      min: 0
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      enum: ['pieces', 'kg', 'lbs', 'liters', 'boxes', 'bags', 'sets', 'other']
    }
  },
  targetBeneficiaries: {
    count: {
      type: Number,
      required: [true, 'Number of beneficiaries is required'],
      min: [1, 'Number of beneficiaries must be at least 1']
    },
    demographics: {
      ageGroups: [{
        type: String,
        enum: ['children', 'adults', 'elderly', 'all']
      }],
      gender: {
        type: String,
        enum: ['male', 'female', 'mixed', 'other'],
        default: 'mixed'
      },
      specialNeeds: [{
        type: String,
        enum: ['disabled', 'medical-condition', 'homeless', 'refugee', 'orphan', 'other']
      }]
    },
    description: String
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    },
    coordinates: {
      latitude: {
        type: Number,
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180
      }
    }
  },
  timeline: {
    neededBy: {
      type: Date,
      required: [true, 'Needed by date is required']
    },
    availableFrom: {
      type: Date,
      default: Date.now
    },
    deliveryTimes: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      },
      startTime: String,
      endTime: String
    }],
    isFlexible: {
      type: Boolean,
      default: true
    }
  },
  preferences: {
    acceptedConditions: [{
      type: String,
      enum: ['new', 'like-new', 'good', 'fair']
    }],
    deliveryMethod: {
      type: String,
      enum: ['pickup', 'delivery', 'both'],
      default: 'both'
    },
    maxDistance: {
      type: Number,
      default: 100 // in kilometers
    },
    minQuantityPerDonation: {
      type: Number,
      min: 1
    }
  },
  documentation: {
    images: [{
      url: String,
      caption: String,
      type: {
        type: String,
        enum: ['beneficiary', 'location', 'need-evidence', 'other']
      }
    }],
    certificates: [{
      url: String,
      type: {
        type: String,
        enum: ['registration', 'tax-exemption', '80g', 'fcra', 'other']
      },
      issueDate: Date,
      expiryDate: Date
    }],
    impactReport: {
      previousProjects: [{
        title: String,
        description: String,
        beneficiariesReached: Number,
        completedAt: Date,
        images: [String]
      }]
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'partially-fulfilled', 'fulfilled', 'expired', 'cancelled'],
    default: 'pending'
  },
  moderation: {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    rejectionReason: String,
    moderationNotes: String,
    flaggedReasons: [{
      type: String,
      enum: ['inappropriate-content', 'spam', 'fraudulent', 'duplicate', 'unrealistic', 'other']
    }],
    aiContentScore: {
      type: Number,
      min: 0,
      max: 1
    },
    verificationStatus: {
      type: String,
      enum: ['unverified', 'verified', 'flagged'],
      default: 'unverified'
    }
  },
  engagement: {
    views: {
      type: Number,
      default: 0
    },
    interested: [{
      donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      interestedAt: {
        type: Date,
        default: Date.now
      },
      message: String,
      offeredQuantity: Number
    }],
    matches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match'
    }],
    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    }
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  fulfillment: {
    donations: [{
      donation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation'
      },
      quantity: Number,
      receivedAt: Date,
      status: {
        type: String,
        enum: ['pending', 'received', 'verified'],
        default: 'pending'
      }
    }],
    totalReceived: {
      type: Number,
      default: 0
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  expiresAt: {
    type: Date,
    index: { expireAfterSeconds: 0 }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
requestSchema.index({ requester: 1 });
requestSchema.index({ category: 1 });
requestSchema.index({ status: 1 });
requestSchema.index({ urgency: -1 });
requestSchema.index({ 'location.city': 1 });
requestSchema.index({ 'location.state': 1 });
requestSchema.index({ 'timeline.neededBy': 1 });
requestSchema.index({ createdAt: -1 });
requestSchema.index({ 'engagement.views': -1 });

// Text search index
requestSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text'
}, {
  weights: {
    title: 10,
    tags: 5,
    description: 1
  }
});

// Geospatial index for location-based queries
requestSchema.index({ 'location.coordinates': '2dsphere' });

// Compound indexes for common queries
requestSchema.index({ status: 1, urgency: -1, 'timeline.neededBy': 1 });
requestSchema.index({ category: 1, status: 1, createdAt: -1 });

// Virtual for completion percentage
requestSchema.virtual('completionPercentage').get(function() {
  if (this.quantity.needed === 0) return 100;
  return Math.round((this.quantity.received / this.quantity.needed) * 100);
});

// Virtual for days until needed
requestSchema.virtual('daysUntilNeeded').get(function() {
  if (!this.timeline.neededBy) return null;
  const diffTime = this.timeline.neededBy - Date.now();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for remaining quantity needed
requestSchema.virtual('remainingQuantity').get(function() {
  return Math.max(0, this.quantity.needed - this.quantity.received);
});

// Pre-save middleware
requestSchema.pre('save', function(next) {
  // Auto-generate tags from title and description
  if (this.isModified('title') || this.isModified('description')) {
    const text = `${this.title} ${this.description}`.toLowerCase();
    const words = text.match(/\b\w{3,}\b/g) || [];
    this.tags = [...new Set(words)].slice(0, 10); // Keep unique, max 10 tags
  }

  // Update completion percentage
  if (this.isModified('quantity.received') || this.isModified('quantity.needed')) {
    this.fulfillment.completionPercentage = this.completionPercentage;
    
    // Update status based on completion
    if (this.completionPercentage >= 100) {
      this.status = 'fulfilled';
    } else if (this.completionPercentage > 0 && this.status === 'active') {
      this.status = 'partially-fulfilled';
    }
  }

  // Set expiration date based on needed by date
  if (this.timeline.neededBy) {
    this.expiresAt = new Date(this.timeline.neededBy.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days after needed by
  }

  next();
});

// Method to increment view count
requestSchema.methods.incrementViews = function() {
  this.engagement.views += 1;
  return this.save();
};

// Method to add interested donor
requestSchema.methods.addInterested = function(donorId, message, offeredQuantity) {
  const existingInterest = this.engagement.interested.find(
    interest => interest.donor.toString() === donorId.toString()
  );

  if (!existingInterest) {
    this.engagement.interested.push({
      donor: donorId,
      message: message || '',
      offeredQuantity: offeredQuantity || 1
    });
  }

  return this.save();
};

// Method to record donation received
requestSchema.methods.recordDonation = function(donationId, quantity) {
  this.fulfillment.donations.push({
    donation: donationId,
    quantity: quantity,
    receivedAt: new Date()
  });

  this.quantity.received += quantity;
  this.fulfillment.totalReceived += quantity;

  return this.save();
};

// Static method to find active requests
requestSchema.statics.findActive = function(filters = {}) {
  const query = {
    status: { $in: ['active', 'partially-fulfilled'] },
    'timeline.neededBy': { $gt: new Date() },
    ...filters
  };

  return this.find(query)
    .populate('requester', 'name organization profile.avatar')
    .sort({ urgency: -1, 'timeline.neededBy': 1, createdAt: -1 });
};

// Static method to find urgent requests
requestSchema.statics.findUrgent = function() {
  return this.find({
    status: { $in: ['active', 'partially-fulfilled'] },
    urgency: { $in: ['high', 'critical'] },
    'timeline.neededBy': { $gt: new Date() }
  })
  .populate('requester', 'name organization profile.avatar')
  .sort({ urgency: -1, 'timeline.neededBy': 1 });
};

// Static method to find by location
requestSchema.statics.findByLocation = function(latitude, longitude, maxDistance = 100000) {
  return this.find({
    status: { $in: ['active', 'partially-fulfilled'] },
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance
      }
    }
  }).populate('requester', 'name organization profile.avatar');
};

module.exports = mongoose.model('Request', requestSchema);
