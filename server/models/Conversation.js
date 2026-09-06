const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerUser', required: true },
  assignedAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', default: null },
  status: { type: String, enum: ['open', 'pending', 'resolved', 'closed'], default: 'open' },
  supportMode: { type: String, enum: ['bot', 'human', 'hybrid'], default: 'human' },
  lastMessageAt: { type: Date, default: Date.now },
  unreadCountCustomer: { type: Number, default: 0 },
  unreadCountAdmin: { type: Number, default: 0 }
}, { timestamps: true });

conversationSchema.index({ customerId: 1 });
conversationSchema.index({ status: 1 });
conversationSchema.index({ updated_at: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);
