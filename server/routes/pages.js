const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Page = require('../models/Page');
const { protect } = require('../middleware/auth');
const defaultPages = require('../config/defaultPages');

const DEFAULT_PAGES_WITH_ID = defaultPages.map((p, idx) => ({
  _id: `page-${idx + 1}`,
  ...p,
  isPublished: true,
  createdAt: new Date()
}));

let inMemoryPages = [...DEFAULT_PAGES_WITH_ID];

async function ensureDefaultPages() {
  if (mongoose.connection.readyState !== 1) return;
  try {
    const defaultPageSlugs = defaultPages.map(page => page.slug);
    const existingCount = await Page.countDocuments({ slug: { $in: defaultPageSlugs } });
    if (existingCount >= defaultPages.length) return;

    await Page.bulkWrite(
      defaultPages.map(page => ({
        updateOne: {
          filter: { slug: page.slug },
          update: { $setOnInsert: page },
          upsert: true,
        },
      })),
      { ordered: false }
    );
  } catch (err) {
    console.warn('ensureDefaultPages DB error:', err.message);
  }
}

// GET /api/pages
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await ensureDefaultPages();
        const pages = await Page.find().sort({ pageName: 1 });
        return res.json(pages.length > 0 ? pages : inMemoryPages);
      } catch (err) {
        console.warn('DB pages query failed, using in-memory:', err.message);
      }
    }
    res.json(inMemoryPages);
  } catch (error) {
    res.json(DEFAULT_PAGES_WITH_ID);
  }
});

// GET /api/pages/:slug
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    if (mongoose.connection.readyState === 1) {
      try {
        const page = await Page.findOne({ slug });
        if (page) return res.json(page);
      } catch (err) {
        console.warn('DB page findOne failed:', err.message);
      }
    }
    const target = inMemoryPages.find(p => p.slug === slug || p.slug === `/${slug}`) || DEFAULT_PAGES_WITH_ID[0];
    res.json(target);
  } catch (error) {
    res.json(DEFAULT_PAGES_WITH_ID[0]);
  }
});

// POST /api/pages (admin)
router.post('/', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const page = await Page.create(req.body);
        return res.status(201).json(page);
      } catch (err) {
        console.warn('DB page create failed:', err.message);
      }
    }
    const newPage = { _id: 'page-' + Date.now(), isPublished: true, ...req.body };
    inMemoryPages.push(newPage);
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error: error.message });
  }
});

// PUT /api/pages/:id (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (page) return res.json(page);
      } catch (err) {
        console.warn('DB page update failed:', err.message);
      }
    }
    const idx = inMemoryPages.findIndex(p => p._id === req.params.id);
    if (idx !== -1) {
      inMemoryPages[idx] = { ...inMemoryPages[idx], ...req.body };
      return res.json(inMemoryPages[idx]);
    }
    res.status(404).json({ message: 'Page not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating page', error: error.message });
  }
});

// DELETE /api/pages/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await Page.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB page delete failed:', err.message);
      }
    }
    inMemoryPages = inMemoryPages.filter(p => p._id !== req.params.id);
    res.json({ message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error: error.message });
  }
});

module.exports = router;
