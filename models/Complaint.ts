import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['pothole', 'waste', 'air_pollution', 'noise', 'streetlight', 'water', 'other']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  images: [{
    url: String,
    publicId: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  contact: {
    mobile: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
complaintSchema.index({ location: '2dsphere' });
complaintSchema.index({ status: 1 });
complaintSchema.index({ createdAt: -1 });

export default mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);