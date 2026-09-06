const mongoose = require('mongoose');
const slugify = require('slugify');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  description: { type: String, default: '' },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  category: { 
    type: String, 
    enum: [
      'Industrial Packaging', 
      'Wooden Packaging', 
      'Shrink Wrapping', 
      'VCI Packaging', 
      'Protective Packaging', 
      'Contract Packaging', 
      'General'
    ],
    default: 'Industrial Packaging' 
  },
  videoType: { type: String, enum: ['local', 'youtube', 'url'], default: 'local' },
  aspectRatio: { type: String, enum: ['9:16', '9:12', '16:9'], default: '9:16' },
  displayOrder: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  duration: { type: String, default: '' },
}, { timestamps: true });

videoSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Video', videoSchema);
