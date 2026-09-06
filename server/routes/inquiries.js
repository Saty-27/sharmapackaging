const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');
const { protect } = require('../middleware/auth');

const DEFAULT_INQUIRIES = [
  {
    _id: 'inq-1',
    name: 'Rajesh Patel',
    companyName: 'Gujarat Heavy Engineering Pvt Ltd',
    companyGst: '24AAAAA0000A1Z5',
    email: 'r.patel@ghel.com',
    phone: '+91 98250 12345',
    productInterested: 'ISPM-15 Export Wooden Box & Crate',
    message: 'Need 25 custom wooden export crates for turbine component shipment to Europe.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 5)
  },
  {
    _id: 'inq-2',
    name: 'Amit Shah',
    companyName: 'Baroda Bearing Components Ltd',
    companyGst: '24BBBBB1111B1Z6',
    email: 'amit.shah@barodabearings.in',
    phone: '+91 94260 67890',
    productInterested: 'VCI Film Roll (Anti-Corrosion Wrap)',
    message: 'Looking for 50 rolls of VCI film for export rust protection.',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 86400000 * 2)
  }
];

let inMemoryInquiries = [...DEFAULT_INQUIRIES];

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, companyName, companyGst, productInterested, message, file } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

    if (mongoose.connection.readyState === 1) {
      try {
        const inquiry = await Inquiry.create({ name, email, phone, companyName, companyGst, productInterested, message, file });
        return res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
      } catch (err) {
        console.warn('DB inquiry submit failed, using in-memory:', err.message);
      }
    }

    const newInquiry = {
      _id: 'inq-' + Date.now(),
      name, email, phone, companyName, companyGst, productInterested, message, file,
      status: 'new',
      createdAt: new Date()
    };
    inMemoryInquiries.unshift(newInquiry);
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const { status, product } = req.query;
        const query = {};
        if (status) query.status = status;
        if (product) query.productInterested = { $regex: product, $options: 'i' };
        const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
        return res.json(inquiries.length > 0 ? inquiries : inMemoryInquiries);
      } catch (err) {
        console.warn('DB inquiries admin failed, using in-memory:', err.message);
      }
    }
    let list = [...inMemoryInquiries];
    if (req.query.status) list = list.filter(i => i.status === req.query.status);
    if (req.query.product) {
      const p = req.query.product.toLowerCase();
      list = list.filter(i => i.productInterested?.toLowerCase().includes(p));
    }
    res.json(list);
  } catch (error) {
    res.json(inMemoryInquiries);
  }
});

router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (inquiry) return res.json(inquiry);
      } catch (err) {
        console.warn('DB inquiry update failed:', err.message);
      }
    }
    const idx = inMemoryInquiries.findIndex(i => i._id === req.params.id);
    if (idx !== -1) {
      inMemoryInquiries[idx] = { ...inMemoryInquiries[idx], ...req.body };
      return res.json(inMemoryInquiries[idx]);
    }
    res.status(404).json({ message: 'Inquiry not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await Inquiry.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB inquiry delete failed:', err.message);
      }
    }
    inMemoryInquiries = inMemoryInquiries.filter(i => i._id !== req.params.id);
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/admin/export', protect, async (req, res) => {
  try {
    let inquiries = inMemoryInquiries;
    if (mongoose.connection.readyState === 1) {
      try {
        const dbInquiries = await Inquiry.find().sort({ createdAt: -1 });
        if (dbInquiries.length > 0) inquiries = dbInquiries;
      } catch (err) {
        console.warn('DB export inquiries failed:', err.message);
      }
    }
    const header = 'Name,Company,Company GST,Email,Phone,Product,Message,Status,Date';
    const rows = inquiries.map(i => `"${i.name || ''}","${i.companyName || ''}","${i.companyGst || ''}","${i.email || ''}","${i.phone || ''}","${i.productInterested || ''}","${(i.message || '').replace(/"/g, '""')}","${i.status || ''}","${i.createdAt || ''}"`);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=inquiries.csv');
    res.send([header, ...rows].join('\n'));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
