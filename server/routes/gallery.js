const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');
const { protect } = require('../middleware/auth');

const DEFAULT_GALLERY = [
  { _id: 'gal-1', title: 'Heavy Machine Seaworthy Wooden Crating', slug: 'heavy-machine-wooden-crating', category: 'Wooden Crating', image: '/uploads/seaworthy_packing.jpg', caption: 'Custom heavy-duty timber crating for ocean shipment', isActive: true, order: 1 },
  { _id: 'gal-2', title: 'VCI Vacuum Film Wrapping', slug: 'vci-vacuum-film-wrapping', category: 'VCI Packing', image: '/uploads/vaccum-packing.jpg', caption: 'Rust-proof VCI film vacuum packaging', isActive: true, order: 2 },
  { _id: 'gal-3', title: 'Thermo Shrink Film Machinery Enclosure', slug: 'thermo-shrink-film-machinery', category: 'Shrink Wrapping', image: '/uploads/Shrink-Wrapping.jpeg', caption: 'Full-body heat shrink wrap for weather protection', isActive: true, order: 3 },
  { _id: 'gal-4', title: 'Silpaulin Outdoor Tarpaulin Cover', slug: 'silpaulin-outdoor-tarpaulin', category: 'Tarpaulin Covers', image: '/uploads/tarpaulin.jpg', caption: 'Waterproof multi-layered Silpaulin cover in yard', isActive: true, order: 4 },
  { _id: 'gal-5', title: 'Aluminium Barrier Foil Heat Sealing', slug: 'aluminium-barrier-foil-sealing', category: 'Barrier Packaging', image: '/uploads/aluminium_foil_preservation.jpg', caption: 'Hermetic barrier foil heat seal with desiccants', isActive: true, order: 5 },
  { _id: 'gal-6', title: 'ODC Heavy Cargo Lashing & Packing', slug: 'odc-heavy-cargo-lashing', category: 'ODC Packing', image: '/uploads/odc_cargo_packing.jpg', caption: 'Project cargo lashing and transport bracing', isActive: true, order: 6 }
];

let inMemoryGallery = [...DEFAULT_GALLERY];

// GET /api/gallery (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    if (mongoose.connection.readyState === 1) {
      try {
        const query = { isActive: true };
        if (category && category !== 'All') query.category = category;
        const images = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
        return res.json(images.length > 0 ? images : DEFAULT_GALLERY);
      } catch (err) {
        console.warn('DB gallery query failed, using in-memory:', err.message);
      }
    }
    let list = inMemoryGallery.filter(g => g.isActive !== false);
    if (category && category !== 'All') list = list.filter(g => g.category === category);
    res.json(list);
  } catch (error) {
    res.json(DEFAULT_GALLERY);
  }
});

// GET /api/gallery/admin/all (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const images = await Gallery.find().sort({ order: 1 });
        return res.json(images.length > 0 ? images : inMemoryGallery);
      } catch (err) {
        console.warn('DB gallery admin query failed:', err.message);
      }
    }
    res.json(inMemoryGallery);
  } catch (error) {
    res.json(inMemoryGallery);
  }
});

// GET /api/gallery/:slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    if (mongoose.connection.readyState === 1) {
      try {
        const image = await Gallery.findOne({ slug, isActive: true });
        if (image) return res.json(image);
      } catch (err) {
        console.warn('DB gallery item query failed:', err.message);
      }
    }
    const item = inMemoryGallery.find(g => g.slug === slug) || DEFAULT_GALLERY[0];
    res.json(item);
  } catch (error) {
    res.json(DEFAULT_GALLERY[0]);
  }
});

// POST /api/admin/gallery (admin)
router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const image = await Gallery.create(req.body);
        return res.status(201).json(image);
      } catch (err) {
        console.warn('DB gallery create failed:', err.message);
      }
    }
    const newImg = { _id: 'gal-' + Date.now(), isActive: true, ...req.body };
    inMemoryGallery.unshift(newImg);
    res.status(201).json(newImg);
  } catch (error) {
    res.status(500).json({ message: 'Error creating gallery item', error: error.message });
  }
});

// PUT /api/admin/gallery/:id (admin)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (image) return res.json(image);
      } catch (err) {
        console.warn('DB gallery update failed:', err.message);
      }
    }
    const idx = inMemoryGallery.findIndex(g => g._id === req.params.id);
    if (idx !== -1) {
      inMemoryGallery[idx] = { ...inMemoryGallery[idx], ...req.body };
      return res.json(inMemoryGallery[idx]);
    }
    res.status(404).json({ message: 'Image not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating gallery item', error: error.message });
  }
});

// DELETE /api/admin/gallery/:id (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await Gallery.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB gallery delete failed:', err.message);
      }
    }
    inMemoryGallery = inMemoryGallery.filter(g => g._id !== req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
  }
});

module.exports = router;
