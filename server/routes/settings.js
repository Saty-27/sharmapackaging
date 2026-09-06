const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SiteSettings = require('../models/SiteSettings');
const { protect } = require('../middleware/auth');

const DEFAULT_SETTINGS = {
  _id: 'site-settings-1',
  siteName: 'Sharma Packaging',
  tagline: 'Strong Packaging. Stronger Protection.',
  contactEmail: 'info@sharmapackagings.com',
  contactPhone: '+91 87091 55299',
  address: 'Plot No. 442, GIDC Industrial Estate, Makarpura, Vadodara, Gujarat 390010',
  isoCertification: 'ISO 9001:2015 Certified',
  socialLinks: {
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918709155299'
  }
};

let inMemorySettings = { ...DEFAULT_SETTINGS };

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        let settings = await SiteSettings.findOne();
        if (!settings) settings = await SiteSettings.create({});
        return res.json(settings);
      } catch (err) {
        console.warn('DB settings query failed:', err.message);
      }
    }
    res.json(inMemorySettings);
  } catch (error) {
    res.json(DEFAULT_SETTINGS);
  }
});

router.put('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        let settings = await SiteSettings.findOne();
        if (!settings) {
          settings = await SiteSettings.create(req.body);
        } else {
          Object.assign(settings, req.body);
          await settings.save();
        }
        return res.json(settings);
      } catch (err) {
        console.warn('DB settings update failed:', err.message);
      }
    }
    inMemorySettings = { ...inMemorySettings, ...req.body };
    res.json(inMemorySettings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
});

module.exports = router;
