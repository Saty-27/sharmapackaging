const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderId: { type: String, required: true },
  senderType: { type: String, enum: ['customer', 'admin', 'bot', 'system'], required: true },
  messageType: { type: String, enum: ['text', 'image', 'pdf', 'document', 'spreadsheet', 'archive', 'other'], default: 'text' },
  message: { type: String, default: '' },
  attachmentUrl: { type: String, default: '' },
  attachmentName: { type: String, default: '' },
  attachmentSize: { type: Number, default: 0 },
  attachmentMime: { type: String, default: '' },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date, default: null },
  idempotencyId: { type: String, default: '' }
}, { timestamps: true });

chatMessageSchema.index({ conversationId: 1, createdAt: 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
