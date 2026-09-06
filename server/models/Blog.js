const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  featuredImage: { type: String, default: '' },
  category: { type: String, default: 'Packaging Insights' },
  author: { type: String, default: 'Sharma Packaging' },
  status: { type: String, enum: ['published', 'draft', 'unpublished'], default: 'published' },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  publishDate: { type: Date, default: Date.now },
  
  // SEO fields
  seoTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  focusKeyword: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  ogTitle: { type: String, default: '' },
  ogDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' },
}, { timestamps: true });

blogSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  // Sync isPublished with status
  if (this.status) {
    this.isPublished = (this.status === 'published');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
