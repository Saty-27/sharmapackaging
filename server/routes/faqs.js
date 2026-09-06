const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FAQ = require('../models/FAQ');
const { protect } = require('../middleware/auth');

const DEFAULT_FAQS = [
  { _id: 'faq-1', page: 'home', question: 'What is VCI Packaging and how does it prevent rust?', answer: 'VCI (Volatile Corrosion Inhibitor) releases rust-inhibiting vapors inside an enclosed package that coat metal surfaces at a molecular level, preventing oxygen and moisture oxidation without oily residues.', order: 1, isActive: true },
  { _id: 'faq-2', page: 'home', question: 'Are your wooden crates ISPM-15 certified for export?', answer: 'Yes, all our export wooden boxes, crates, and pallets undergo heat treatment (HT) and carry official ISPM-15 phytosanitary certification stamps accepted by international customs worldwide.', order: 2, isActive: true },
  { _id: 'faq-3', page: 'home', question: 'Do you offer on-site packaging services in Makarpura GIDC and Gujarat?', answer: 'Yes, our mobile packaging engineering teams provide full turn-key on-site crating, vacuum packing, and cargo lashing directly at customer factories across Vadodara, Halol, Ankleshwar, and Gujarat.', order: 3, isActive: true }
];

let inMemoryFaqs = [...DEFAULT_FAQS];

router.get('/:page', async (req, res) => {
  try {
    const page = req.params.page;
    if (mongoose.connection.readyState === 1) {
      try {
        const faqs = await FAQ.find({ page, isActive: true }).sort({ order: 1 });
        return res.json(faqs.length > 0 ? faqs : DEFAULT_FAQS.filter(f => f.page === page));
      } catch (err) {
        console.warn('DB faqs query failed:', err.message);
      }
    }
    res.json(inMemoryFaqs.filter(f => f.page === page && f.isActive !== false));
  } catch (error) {
    res.json(DEFAULT_FAQS);
  }
});

router.get('/admin/all/:page', protect, async (req, res) => {
  try {
    const page = req.params.page;
    if (mongoose.connection.readyState === 1) {
      try {
        const faqs = await FAQ.find({ page }).sort({ order: 1 });
        return res.json(faqs.length > 0 ? faqs : inMemoryFaqs.filter(f => f.page === page));
      } catch (err) {
        console.warn('DB faqs admin query failed:', err.message);
      }
    }
    res.json(inMemoryFaqs.filter(f => f.page === page));
  } catch (error) {
    res.json(DEFAULT_FAQS);
  }
});

router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const faq = await FAQ.create(req.body);
        return res.status(201).json(faq);
      } catch (err) {
        console.warn('DB faq create failed:', err.message);
      }
    }
    const newFaq = { _id: 'faq-' + Date.now(), isActive: true, ...req.body };
    inMemoryFaqs.push(newFaq);
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ message: 'Error creating FAQ', error: error.message });
  }
});

router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (faq) return res.json(faq);
      } catch (err) {
        console.warn('DB faq update failed:', err.message);
      }
    }
    const idx = inMemoryFaqs.findIndex(f => f._id === req.params.id);
    if (idx !== -1) {
      inMemoryFaqs[idx] = { ...inMemoryFaqs[idx], ...req.body };
      return res.json(inMemoryFaqs[idx]);
    }
    res.status(404).json({ message: 'FAQ not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating FAQ', error: error.message });
  }
});

router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await FAQ.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB faq delete failed:', err.message);
      }
    }
    inMemoryFaqs = inMemoryFaqs.filter(f => f._id !== req.params.id);
    res.json({ message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
  }
});

module.exports = router;
