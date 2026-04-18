import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  services: [{ type: String, required: true }],
  projectSpecifications: { type: String, required: true },
  files: [{
    filename: { type: String, required: true },
  }], 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
