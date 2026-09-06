const mongoose = require('mongoose');
const slugify = require('slugify');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  description: { type: String, default: '' },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  category: { type: String, default: 'Industrial Packaging' },
  videoType: { type: String, default: 'local' },
  aspectRatio: { type: String, default: '9:16' },
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
