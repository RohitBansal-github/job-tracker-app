import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Index for faster queries by user
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offered', 'Rejected', 'Accepted'],
    default: 'Applied',
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
