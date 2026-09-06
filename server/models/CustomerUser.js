const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerUserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  address: { type: String, default: '', trim: true },
  country: { type: String, default: 'India', trim: true },
  inquiryType: { type: String, default: 'General Enquiry', trim: true },
  password: { type: String, required: true },
  accountStatus: { type: String, enum: ['active', 'blocked', 'inactive'], default: 'active' },
  isOnline: { type: Boolean, default: false },
  lastSeenAt: { type: Date, default: Date.now }
}, { timestamps: true });

customerUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

customerUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('CustomerUser', customerUserSchema);
