const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');

const DEFAULT_TESTIMONIALS = [
  { _id: 't-1', name: 'Rajesh Kumar', company: 'L&T Heavy Engineering', rating: 5, content: 'Sharma Packaging provided exceptional seaworthy packing for our heavy export machinery. Zero rust or damage reported upon arrival in Europe.', isActive: true },
  { _id: 't-2', name: 'Dharmesh Parikh', company: 'ABB India Ltd', rating: 5, content: 'Their VCI film rolls and aluminium barrier foil bags meet global export standards. Excellent on-site packaging service team in Vadodara.', isActive: true },
  { _id: 't-3', name: 'Sanjay Shah', company: 'Baroda Equipment Pvt Ltd', rating: 5, content: 'ISPM-15 certified wooden crates and prompt delivery. Highly reliable industrial packaging partner.', isActive: true }
];

let inMemoryTestimonials = [...DEFAULT_TESTIMONIALS];

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const testimonials = await Testimonial.find({ isActive: true });
        return res.json(testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS);
      } catch (err) {
        console.warn('DB testimonials query failed:', err.message);
      }
    }
    res.json(inMemoryTestimonials.filter(t => t.isActive !== false));
  } catch (error) {
    res.json(DEFAULT_TESTIMONIALS);
  }
});

router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const t = await Testimonial.create(req.body);
        return res.status(201).json(t);
      } catch (err) {
        console.warn('DB testimonial create failed:', err.message);
      }
    }
    const newT = { _id: 't-' + Date.now(), isActive: true, ...req.body };
    inMemoryTestimonials.push(newT);
    res.status(201).json(newT);
  } catch (error) {
    res.status(500).json({ message: 'Error creating testimonial', error: error.message });
  }
});

router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (t) return res.json(t);
      } catch (err) {
        console.warn('DB testimonial update failed:', err.message);
      }
    }
    const idx = inMemoryTestimonials.findIndex(t => t._id === req.params.id);
    if (idx !== -1) {
      inMemoryTestimonials[idx] = { ...inMemoryTestimonials[idx], ...req.body };
      return res.json(inMemoryTestimonials[idx]);
    }
    res.status(404).json({ message: 'Testimonial not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial', error: error.message });
  }
});

router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await Testimonial.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB testimonial delete failed:', err.message);
      }
    }
    inMemoryTestimonials = inMemoryTestimonials.filter(t => t._id !== req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
  }
});

module.exports = router;
