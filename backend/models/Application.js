const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  appliedFor: {
    type: String,
    required: [true, 'Application field is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'accepted', 'rejected'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  additionalInfo: {
    type: String,
    trim: true,
  },
});

// Index for faster queries
applicationSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Application', applicationSchema);

