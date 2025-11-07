import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Assuming you have a User model
});

export default mongoose.model('Complaint', complaintSchema);