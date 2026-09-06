const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/Video');
const { protect } = require('../middleware/auth');

const DEFAULT_VIDEOS = [
  {
    _id: 'vid-1',
    title: 'Heavy Machinery Shrink Cover Application',
    slug: 'heavy-machinery-shrink-cover-application',
    category: 'Shrink Wrapping',
    description: 'Watch our technical packaging team apply heavy-duty thermo shrink film over large industrial gearboxes.',
    videoUrl: '/uploads/1780642013161-717563536.mov',
    thumbnailUrl: '/uploads/Shrink-Wrapping.jpeg',
    aspectRatio: '9:16',
    videoType: 'local',
    displayOrder: 1,
    isPublished: true,
    isFeatured: true,
    duration: '0:45',
    createdAt: new Date()
  },
  {
    _id: 'vid-2',
    title: 'ISPM 15 Certified Export Wooden Box Fabrication',
    slug: 'export-wooden-box-fabrication',
    category: 'Wooden Packaging',
    description: 'On-site wooden crate assembly and load securing for heavy export shipments.',
    videoUrl: '/uploads/1780642013161-717563536.mov',
    thumbnailUrl: '/uploads/seaworthy_packing.jpg',
    aspectRatio: '9:16',
    videoType: 'local',
    displayOrder: 2,
    isPublished: true,
    isFeatured: true,
    duration: '0:50',
    createdAt: new Date()
  },
  {
    _id: 'vid-3',
    title: 'VCI Film Vacuum Packing for Precision Metal Parts',
    slug: 'vci-film-vacuum-packing',
    category: 'VCI Packaging',
    description: 'Sealing automotive components inside anti-rust VCI film bags and vacuum extraction.',
    videoUrl: '/uploads/1780642013161-717563536.mov',
    thumbnailUrl: '/uploads/vaccum-packing.jpg',
    aspectRatio: '9:16',
    videoType: 'local',
    displayOrder: 3,
    isPublished: true,
    isFeatured: true,
    duration: '0:35',
    createdAt: new Date()
  },
  {
    _id: 'vid-4',
    title: 'Silpaulin Heavy Duty Protective Cover Installation',
    slug: 'silpaulin-heavy-duty-cover-installation',
    category: 'Protective Packaging',
    description: 'Custom tailored Silpaulin tarpaulin covers securing outdoor machinery against rain and sunlight.',
    videoUrl: '/uploads/1780642013161-717563536.mov',
    thumbnailUrl: '/uploads/tarpaulin.jpg',
    aspectRatio: '9:16',
    videoType: 'local',
    displayOrder: 4,
    isPublished: true,
    isFeatured: true,
    duration: '0:40',
    createdAt: new Date()
  },
  {
    _id: 'vid-5',
    title: 'Aluminium Barrier Foil Heat Sealing Process',
    slug: 'aluminium-barrier-foil-heat-sealing',
    category: 'Industrial Packaging',
    description: 'Hermetic heat sealing of aluminium barrier foil for sub-zero moisture vapor transfer rate protection.',
    videoUrl: '/uploads/1780642013161-717563536.mov',
    thumbnailUrl: '/uploads/aluminium_foil_preservation.jpg',
    aspectRatio: '9:16',
    videoType: 'local',
    displayOrder: 5,
    isPublished: true,
    isFeatured: true,
    duration: '0:48',
    createdAt: new Date()
  },
  {
    _id: 'vid-6',
    title: 'Contract Packaging Operations in Action',
    slug: 'contract-packaging-operations',
    category: 'Contract Packaging',
    description: 'End-to-end B2B contract packing, palletizing, and cargo lashing for heavy industrial logistics.',
    videoUrl: '/uploads/1780642013161-717563536.mov',
    thumbnailUrl: '/uploads/odc_cargo_packing.jpg',
    aspectRatio: '9:16',
    videoType: 'local',
    displayOrder: 6,
    isPublished: true,
    isFeatured: true,
    duration: '0:55',
    createdAt: new Date()
  }
];

let inMemoryVideos = [...DEFAULT_VIDEOS];

// GET /api/videos (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    if (mongoose.connection.readyState === 1) {
      const query = { isPublished: true };
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const total = await Video.countDocuments(query);
      let videos = await Video.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (videos.length === 0 && !search && (!category || category === 'All')) {
        videos = DEFAULT_VIDEOS;
      }
      return res.json({ videos, total: total || videos.length });
    } else {
      let filtered = inMemoryVideos.filter(v => v.isPublished);
      if (category && category !== 'All') filtered = filtered.filter(v => v.category === category);
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(v => v.title.toLowerCase().includes(s) || v.description.toLowerCase().includes(s));
      }
      return res.json({ videos: filtered, total: filtered.length });
    }
  } catch (error) {
    res.json({ videos: DEFAULT_VIDEOS, total: DEFAULT_VIDEOS.length });
  }
});

// GET /api/videos/admin/all (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const videos = await Video.find().sort({ displayOrder: 1, createdAt: -1 });
      res.json(videos.length > 0 ? videos : DEFAULT_VIDEOS);
    } else {
      res.json(inMemoryVideos);
    }
  } catch (error) {
    res.json(inMemoryVideos);
  }
});

// POST /api/videos/admin (admin create)
router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const video = await Video.create(req.body);
      return res.status(201).json(video);
    } else {
      const newVid = {
        _id: 'vid-' + Date.now(),
        ...req.body,
        createdAt: new Date(),
        isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
        displayOrder: req.body.displayOrder || inMemoryVideos.length + 1
      };
      inMemoryVideos.unshift(newVid);
      return res.status(201).json(newVid);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating video', error: error.message });
  }
});

// PUT /api/videos/admin/reorder (admin batch update displayOrder)
router.put('/admin/reorder', protect, async (req, res) => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      if (mongoose.connection.readyState === 1) {
        const promises = items.map(item => 
          Video.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
        );
        await Promise.all(promises);
      } else {
        items.forEach(item => {
          const target = inMemoryVideos.find(v => v._id === item.id);
          if (target) target.displayOrder = item.displayOrder;
        });
        inMemoryVideos.sort((a, b) => a.displayOrder - b.displayOrder);
      }
    }
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reordering videos', error: error.message });
  }
});

// PUT /api/videos/admin/:id (admin update)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!video) return res.status(404).json({ message: 'Video not found' });
      return res.json(video);
    } else {
      const idx = inMemoryVideos.findIndex(v => v._id === req.params.id);
      if (idx !== -1) {
        inMemoryVideos[idx] = { ...inMemoryVideos[idx], ...req.body };
        return res.json(inMemoryVideos[idx]);
      }
      return res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating video', error: error.message });
  }
});

// DELETE /api/videos/admin/:id (admin delete)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Video.findByIdAndDelete(req.params.id);
    } else {
      inMemoryVideos = inMemoryVideos.filter(v => v._id !== req.params.id);
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
});

module.exports = router;
