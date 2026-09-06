const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProductCategory = require('../models/ProductCategory');
const { protect } = require('../middleware/auth');

const DEFAULT_CATEGORIES = [
  { _id: 'cat-1', name: 'VCI Products', slug: 'vci-products', description: 'Volatile Corrosion Inhibitor films, papers, and powders for rust prevention.', isActive: true, order: 1 },
  { _id: 'cat-2', name: 'Wooden Packaging', slug: 'wooden-packaging', description: 'ISPM-15 certified wooden boxes, crates, skids, and export pallets.', isActive: true, order: 2 },
  { _id: 'cat-3', name: 'Protective Packaging', slug: 'protective-packaging', description: 'Aluminium barrier foil bags, desiccants, and Silpaulin tarpaulins.', isActive: true, order: 3 },
  { _id: 'cat-4', name: 'Shrink Wrapping', slug: 'shrink-wrapping', description: 'Heavy-duty thermo shrink film and equipment wrapping solutions.', isActive: true, order: 4 },
  { _id: 'cat-5', name: 'Lashing & Strapping', slug: 'lashing-strapping', description: 'Cordstrap, polyester strapping, edge protectors, and container lashing.', isActive: true, order: 5 }
];

let inMemoryCategories = [...DEFAULT_CATEGORIES];

// GET /api/categories (public)
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const categories = await ProductCategory.find({ isActive: true }).sort({ order: 1 });
        return res.json(categories.length > 0 ? categories : DEFAULT_CATEGORIES);
      } catch (err) {
        console.warn('DB categories query failed, using fallbacks:', err.message);
      }
    }
    res.json(inMemoryCategories.filter(c => c.isActive !== false));
  } catch (error) {
    res.json(DEFAULT_CATEGORIES);
  }
});

// POST /api/admin/categories (admin)
router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const category = await ProductCategory.create(req.body);
        return res.status(201).json(category);
      } catch (err) {
        console.warn('DB category create failed:', err.message);
      }
    }
    const newCat = { _id: 'cat-' + Date.now(), isActive: true, ...req.body };
    inMemoryCategories.push(newCat);
    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

// PUT /api/admin/categories/:id (admin)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const category = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (category) return res.json(category);
      } catch (err) {
        console.warn('DB category update failed:', err.message);
      }
    }
    const idx = inMemoryCategories.findIndex(c => c._id === req.params.id);
    if (idx !== -1) {
      inMemoryCategories[idx] = { ...inMemoryCategories[idx], ...req.body };
      return res.json(inMemoryCategories[idx]);
    }
    res.status(404).json({ message: 'Category not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});

// DELETE /api/admin/categories/:id (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await ProductCategory.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB category delete failed:', err.message);
      }
    }
    inMemoryCategories = inMemoryCategories.filter(c => c._id !== req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

module.exports = router;
