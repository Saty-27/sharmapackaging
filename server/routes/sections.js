const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Section = require('../models/Section');
const { protect } = require('../middleware/auth');

const DEFAULT_SECTIONS = [
  { _id: 'sec-1', pageName: 'home', sectionKey: 'hero', title: 'Strong Packaging. Stronger Protection.', content: { subtitle: 'ISO 9001:2015 Certified Manufacturer of VCI Anti-Corrosion & Seaworthy Packaging' }, order: 1, isActive: true },
  { _id: 'sec-2', pageName: 'about', sectionKey: 'company-overview', title: 'About Sharma Packaging', content: { description: 'Leading packaging engineering company in Vadodara since 2012.' }, order: 1, isActive: true },
  { _id: 'sec-3', pageName: 'contact', sectionKey: 'contact-info', title: 'Get In Touch', content: { address: 'GIDC Makarpura, Vadodara, Gujarat', phone: '+91 87091 55299' }, order: 1, isActive: true }
];

let inMemorySections = [...DEFAULT_SECTIONS];

// GET /api/sections/:pageName
router.get('/:pageName', async (req, res) => {
  try {
    const pageName = req.params.pageName;
    if (mongoose.connection.readyState === 1) {
      try {
        const sections = await Section.find({ pageName, isActive: true }).sort({ order: 1 });
        return res.json(sections.length > 0 ? sections : inMemorySections.filter(s => s.pageName === pageName && s.isActive));
      } catch (err) {
        console.warn('DB sections query failed, using in-memory:', err.message);
      }
    }
    const filtered = inMemorySections.filter(s => s.pageName === pageName && s.isActive !== false);
    res.json(filtered);
  } catch (error) {
    res.json(DEFAULT_SECTIONS.filter(s => s.pageName === req.params.pageName));
  }
});

// GET /api/sections/admin/all/:pageName (admin - includes inactive)
router.get('/admin/all/:pageName', protect, async (req, res) => {
  try {
    const pageName = req.params.pageName;
    if (mongoose.connection.readyState === 1) {
      try {
        const sections = await Section.find({ pageName }).sort({ order: 1 });
        return res.json(sections.length > 0 ? sections : inMemorySections.filter(s => s.pageName === pageName));
      } catch (err) {
        console.warn('DB sections admin query failed:', err.message);
      }
    }
    const filtered = inMemorySections.filter(s => s.pageName === pageName);
    res.json(filtered);
  } catch (error) {
    res.json(DEFAULT_SECTIONS.filter(s => s.pageName === req.params.pageName));
  }
});

// POST /api/sections (admin)
router.post('/', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const section = await Section.create(req.body);
        return res.status(201).json(section);
      } catch (err) {
        console.warn('DB section create failed:', err.message);
      }
    }
    const newSec = { _id: 'sec-' + Date.now(), isActive: true, ...req.body };
    inMemorySections.push(newSec);
    res.status(201).json(newSec);
  } catch (error) {
    res.status(500).json({ message: 'Error creating section', error: error.message });
  }
});

// PUT /api/sections/:id (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (section) return res.json(section);
      } catch (err) {
        console.warn('DB section update failed:', err.message);
      }
    }
    const idx = inMemorySections.findIndex(s => s._id === req.params.id);
    if (idx !== -1) {
      inMemorySections[idx] = { ...inMemorySections[idx], ...req.body };
      return res.json(inMemorySections[idx]);
    }
    res.status(404).json({ message: 'Section not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating section', error: error.message });
  }
});

// DELETE /api/sections/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await Section.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB section delete failed:', err.message);
      }
    }
    inMemorySections = inMemorySections.filter(s => s._id !== req.params.id);
    res.json({ message: 'Section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section', error: error.message });
  }
});

// PUT /api/sections/reorder/bulk (admin)
router.put('/reorder/bulk', protect, async (req, res) => {
  try {
    const { sections } = req.body;
    if (Array.isArray(sections)) {
      if (mongoose.connection.readyState === 1) {
        try {
          const updates = sections.map((s) =>
            Section.findByIdAndUpdate(s.id, { order: s.order })
          );
          await Promise.all(updates);
        } catch (err) {
          console.warn('DB sections reorder failed:', err.message);
        }
      }
      sections.forEach(s => {
        const target = inMemorySections.find(sec => sec._id === s.id);
        if (target) target.order = s.order;
      });
      inMemorySections.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    res.json({ message: 'Sections reordered' });
  } catch (error) {
    res.status(500).json({ message: 'Error reordering sections', error: error.message });
  }
});

module.exports = router;
