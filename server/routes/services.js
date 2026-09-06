const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');

const DEFAULT_SERVICES = [
  { _id: 'srv-1', title: 'Seaworthy Export Packing', slug: 'seaworthy-packing-in-vadodara', description: 'Engineered wooden box crating, vacuum packaging, and VCI rust prevention for ocean freight machinery exports.', icon: 'Ship', isPublished: true, order: 1 },
  { _id: 'srv-2', title: 'VCI Rust Prevention Packaging', slug: 'vci-packaging-in-vadodara', description: 'Volatile Corrosion Inhibitor films, papers, and emitters protecting metal parts from atmospheric oxidation.', icon: 'ShieldCheck', isPublished: true, order: 2 },
  { _id: 'srv-3', title: 'Over-Dimensional Cargo (ODC) Packing', slug: 'odc-cargo-packing-in-vadodara', description: 'Heavy-duty timber bracing, strapping, and shrink-wrap protection for heavy project cargo transport.', icon: 'Truck', isPublished: true, order: 3 },
  { _id: 'srv-4', title: 'Thermo Shrink Wrapping Services', slug: 'thermo-shrink-packing-in-vadodara', description: 'On-site heat shrink wrapping offering 100% dust, rain, and UV protective enclosure for large equipment.', icon: 'Box', isPublished: true, order: 4 },
  { _id: 'srv-5', title: 'Aluminium Barrier Foil Preservation', slug: 'aluminium-barrier-foil-packing-in-vadodara', description: 'Ultra-low MVTR heat sealed barrier foil bags with active desiccants for climate-sensitive equipment.', icon: 'Layers', isPublished: true, order: 5 },
  { _id: 'srv-6', title: 'Packaging Technical Consultancy', slug: 'packaging-consultancy-in-vadodara', description: 'Expert technical evaluation of export packaging standards, material selection, and cost optimization.', icon: 'FileText', isPublished: true, order: 6 }
];

let inMemoryServices = [...DEFAULT_SERVICES];

// GET /api/services (public)
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const services = await Service.find({ isPublished: true }).sort({ order: 1 });
        return res.json(services.length > 0 ? services : DEFAULT_SERVICES);
      } catch (err) {
        console.warn('DB services query failed:', err.message);
      }
    }
    res.json(inMemoryServices.filter(s => s.isPublished !== false));
  } catch (error) {
    res.json(DEFAULT_SERVICES);
  }
});

// GET /api/services/admin/all (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const services = await Service.find().sort({ order: 1 });
        return res.json(services.length > 0 ? services : inMemoryServices);
      } catch (err) {
        console.warn('DB services admin query failed:', err.message);
      }
    }
    res.json(inMemoryServices);
  } catch (error) {
    res.json(inMemoryServices);
  }
});

// GET /api/services/:slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    if (mongoose.connection.readyState === 1) {
      try {
        const service = await Service.findOne({ slug, isPublished: true });
        if (service) return res.json(service);
      } catch (err) {
        console.warn('DB service findOne failed:', err.message);
      }
    }
    const item = inMemoryServices.find(s => s.slug === slug) || DEFAULT_SERVICES[0];
    res.json(item);
  } catch (error) {
    res.json(DEFAULT_SERVICES[0]);
  }
});

// POST /api/admin/services (admin)
router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const service = await Service.create(req.body);
        return res.status(201).json(service);
      } catch (err) {
        console.warn('DB service create failed:', err.message);
      }
    }
    const newSrv = { _id: 'srv-' + Date.now(), isPublished: true, ...req.body };
    inMemoryServices.push(newSrv);
    res.status(201).json(newSrv);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});

// PUT /api/admin/services/:id (admin)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (service) return res.json(service);
      } catch (err) {
        console.warn('DB service update failed:', err.message);
      }
    }
    const idx = inMemoryServices.findIndex(s => s._id === req.params.id);
    if (idx !== -1) {
      inMemoryServices[idx] = { ...inMemoryServices[idx], ...req.body };
      return res.json(inMemoryServices[idx]);
    }
    res.status(404).json({ message: 'Service not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

// DELETE /api/admin/services/:id (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await Service.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB service delete failed:', err.message);
      }
    }
    inMemoryServices = inMemoryServices.filter(s => s._id !== req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

module.exports = router;
