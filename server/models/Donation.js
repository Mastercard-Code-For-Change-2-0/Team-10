const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Donor is required']
  },
  title: {
    type: String,
    required: [true, 'Donation title is required'],
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
  condition: {
    type: String,
    required: [true, 'Item condition is required'],
    enum: ['new', 'like-new', 'good', 'fair', 'poor']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    enum: ['pieces', 'kg', 'lbs', 'liters', 'boxes', 'bags', 'sets', 'other']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
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
  availability: {
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    pickupTimes: [{
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
    preferredReceiverType: [{
      type: String,
      enum: ['ngo', 'school', 'hospital', 'orphanage', 'old-age-home', 'community-center', 'individual', 'any']
    }],
    deliveryMethod: {
      type: String,
      enum: ['pickup', 'delivery', 'both'],
      default: 'pickup'
    },
    maxDistance: {
      type: Number,
      default: 50 // in kilometers
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'available', 'reserved', 'donated', 'expired'],
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
      enum: ['inappropriate-content', 'spam', 'fraudulent', 'duplicate', 'other']
    }],
    aiContentScore: {
      type: Number,
      min: 0,
      max: 1
    },
    aiImageScore: {
      type: Number,
      min: 0,
      max: 1
    }
  },
  engagement: {
    views: {
      type: Number,
      default: 0
    },
    interested: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      interestedAt: {
        type: Date,
        default: Date.now
      },
      message: String
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
  isUrgent: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
donationSchema.index({ donor: 1 });
donationSchema.index({ category: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ 'location.city': 1 });
donationSchema.index({ 'location.state': 1 });
donationSchema.index({ createdAt: -1 });
donationSchema.index({ expiresAt: 1 });
donationSchema.index({ 'engagement.views': -1 });
donationSchema.index({ isUrgent: -1 });

// Text search index
donationSchema.index({
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
donationSchema.index({ 'location.coordinates': '2dsphere' });

// TTL index for auto-expiration
donationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for donation age
donationSchema.virtual('age').get(function() {
  return Date.now() - this.createdAt;
});

// Virtual for days until expiration
donationSchema.virtual('daysUntilExpiration').get(function() {
  if (!this.expiresAt) return null;
  const diffTime = this.expiresAt - Date.now();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware
donationSchema.pre('save', function(next) {
  // Auto-generate tags from title and description
  if (this.isModified('title') || this.isModified('description')) {
    const text = `${this.title} ${this.description}`.toLowerCase();
    const words = text.match(/\b\w{3,}\b/g) || [];
    this.tags = [...new Set(words)].slice(0, 10); // Keep unique, max 10 tags
  }

  // Set expiration based on category
  if (this.isNew && this.category === 'food') {
    this.expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days for food
  }

  next();
});

// Method to increment view count
donationSchema.methods.incrementViews = function() {
  this.engagement.views += 1;
  return this.save();
};

// Method to add interested user
donationSchema.methods.addInterested = function(userId, message) {
  const existingInterest = this.engagement.interested.find(
    interest => interest.user.toString() === userId.toString()
  );

  if (!existingInterest) {
    this.engagement.interested.push({
      user: userId,
      message: message || ''
    });
  }

  return this.save();
};

// Static method to find available donations
donationSchema.statics.findAvailable = function(filters = {}) {
  const query = {
    status: 'available',
    expiresAt: { $gt: new Date() },
    ...filters
  };

  return this.find(query)
    .populate('donor', 'name organization profile.avatar')
    .sort({ isUrgent: -1, createdAt: -1 });
};

// Static method to find by location
donationSchema.statics.findByLocation = function(latitude, longitude, maxDistance = 50000) {
  return this.find({
    status: 'available',
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance
      }
    }
  }).populate('donor', 'name organization profile.avatar');
};

module.exports = mongoose.model('Donation', donationSchema);
