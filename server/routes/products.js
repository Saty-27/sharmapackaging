const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const DEFAULT_PRODUCTS = [
  {
    _id: 'prod-1',
    name: 'Wooden Pallets',
    slug: 'wooden-pallets',
    category: { _id: 'cat-1', name: 'Wooden Packaging', slug: 'wooden-packaging' },
    shortDescription: 'ISPM-15 certified heavy-duty 2-way and 4-way entry wooden pallets engineered for export machinery, warehouse storage, and logistics.',
    images: ['/uploads/Wooden-Pallets.png'],
    features: [
      'Heat-treated & ISPM 15 certified with HT phytosanitary stamp for global export',
      'Dynamic load capacity up to 5,000 kg & static load capacity up to 10,000 kg',
      '2-way & 4-way forklift entry options for easy warehouse handling',
      'Custom-cut dimensions engineered for machinery & project cargo',
      'Kiln-dried hardwood & pine timber with moisture content under 18%'
    ],
    benefits: [
      'Heat-treated & ISPM 15 certified with HT phytosanitary stamp for global export',
      'Dynamic load capacity up to 5,000 kg & static load capacity up to 10,000 kg',
      '2-way & 4-way forklift entry options for easy warehouse handling',
      'Custom-cut dimensions engineered for machinery & project cargo',
      'Kiln-dried hardwood & pine timber with moisture content under 18%'
    ],
    keywords: ['wooden pallets', 'ispm 15 pallets', 'heavy duty pallet', 'timber skids'],
    isPublished: true,
    metaTitle: 'ISPM 15 Wooden Pallets Manufacturer Vadodara | Sharma Packaging',
    metaDescription: 'Buy ISPM 15 certified wooden pallets & heavy duty 4-way timber skids in Vadodara, GIDC Makarpura.',
    createdAt: new Date()
  },
  {
    _id: 'prod-2',
    name: 'Wooden Skid',
    slug: 'wooden-skid',
    category: { _id: 'cat-1', name: 'Wooden Packaging', slug: 'wooden-packaging' },
    shortDescription: 'Custom-engineered heavy-duty wooden skids built for safe handling, structural load support, and crane hoisting of heavy machinery.',
    images: ['/uploads/seaworthy_packing.jpg'],
    features: [
      'Heavy-duty timber runners engineered for extreme multi-ton industrial loads',
      'Designed for crane hoisting, forklift handling & flatbed transportation',
      'Custom structural load calculations tailored to equipment dimensions',
      'Heat-treated ISPM 15 compliance for hassle-free international export',
      'Reusable, high-density timber construction for maximum durability'
    ],
    benefits: [
      'Heavy-duty timber runners engineered for extreme multi-ton industrial loads',
      'Designed for crane hoisting, forklift handling & flatbed transportation',
      'Custom structural load calculations tailored to equipment dimensions',
      'Heat-treated ISPM 15 compliance for hassle-free international export',
      'Reusable, high-density timber construction for maximum durability'
    ],
    keywords: ['wooden skid', 'heavy machinery skid', 'timber runner'],
    isPublished: true,
    metaTitle: 'Wooden Skid Manufacturer Vadodara',
    metaDescription: 'Heavy-duty wooden skids for machinery and industrial cargo in Vadodara.',
    createdAt: new Date()
  },
  {
    _id: 'prod-3',
    name: 'Shrink Wrapping',
    slug: 'shrink-wrapping',
    category: { _id: 'cat-2', name: 'Wrapping & Films', slug: 'wrapping-films' },
    shortDescription: 'Heavy-duty thermo-shrink wrapping film solutions designed to tightly seal industrial equipment, machinery, and cargo against severe transit environments.',
    images: ['/uploads/Shrink-Wrapping.jpeg'],
    features: [
      'Complete protection against monsoon rain, sea spray, dust, and humidity',
      'Heavy-duty 200 to 300 micron LDPE thermo-shrink film options',
      'UV-inhibited formulations for up to 12 months of outdoor storage',
      'Tightly conforms to complex equipment geometries and sharp contours',
      'On-site application service by trained technical packing crews'
    ],
    benefits: [
      'Complete protection against monsoon rain, sea spray, dust, and humidity',
      'Heavy-duty 200 to 300 micron LDPE thermo-shrink film options',
      'UV-inhibited formulations for up to 12 months of outdoor storage',
      'Tightly conforms to complex equipment geometries and sharp contours',
      'On-site application service by trained technical packing crews'
    ],
    keywords: ['shrink wrapping', 'thermo shrink film', 'machinery wrap'],
    isPublished: true,
    metaTitle: 'Shrink Wrapping Services & Materials Vadodara',
    metaDescription: 'Industrial shrink wrapping solutions for cargo protection.',
    createdAt: new Date()
  },
  {
    _id: 'prod-4',
    name: 'Industrial Packing Materials',
    slug: 'packing-materials',
    category: { _id: 'cat-3', name: 'Packaging Materials', slug: 'packaging-materials' },
    shortDescription: 'Comprehensive range of industrial protective packaging consumables engineered to shield products from abrasion, shock, and transit impact.',
    images: ['/uploads/industrial-customized-protective-packing-materials-859.jpg'],
    features: [
      'High-density edge protectors, corner guards & protective wrapping rolls',
      'Heavy-duty materials suitable for rigorous factory & logistics use',
      'Protects surfaces against scratches, impacts, and handling friction',
      'Available in bulk supply and custom-cut specifications',
      'Compatible with automated packaging lines and manual wrapping'
    ],
    benefits: [
      'High-density edge protectors, corner guards & protective wrapping rolls',
      'Heavy-duty materials suitable for rigorous factory & logistics use',
      'Protects surfaces against scratches, impacts, and handling friction',
      'Available in bulk supply and custom-cut specifications',
      'Compatible with automated packaging lines and manual wrapping'
    ],
    keywords: ['packing materials', 'protective packing', 'industrial supplies'],
    isPublished: true,
    metaTitle: 'Industrial Packing Materials Vadodara',
    metaDescription: 'High quality industrial protective packing materials.',
    createdAt: new Date()
  },
  {
    _id: 'prod-5',
    name: 'Plywood for Packing',
    slug: 'plywood-for-packing',
    category: { _id: 'cat-1', name: 'Wooden Packaging', slug: 'wooden-packaging' },
    shortDescription: 'High-grade calibrated industrial plywood sheets engineered for export crating, box fabrication, and smooth pest-free cargo enclosure.',
    images: ['/uploads/odc_cargo_packing.jpg'],
    features: [
      'Calibrated MR & BWR export grade plywood for structural strength',
      'Naturally pest-free, exempt from phytosanitary quarantine restrictions',
      'Smooth, splinter-free outer finish ideal for custom shipping marks',
      'Available in 6mm to 19mm thickness suited for diverse load weights',
      'Moisture-resistant adhesive bonding for ocean container transport'
    ],
    benefits: [
      'Calibrated MR & BWR export grade plywood for structural strength',
      'Naturally pest-free, exempt from phytosanitary quarantine restrictions',
      'Smooth, splinter-free outer finish ideal for custom shipping marks',
      'Available in 6mm to 19mm thickness suited for diverse load weights',
      'Moisture-resistant adhesive bonding for ocean container transport'
    ],
    keywords: ['plywood packing', 'export plywood box', 'packing grade plywood'],
    isPublished: true,
    metaTitle: 'Plywood for Packing Manufacturer Vadodara',
    metaDescription: 'High grade plywood sheets for export packing.',
    createdAt: new Date()
  },
  {
    _id: 'prod-6',
    name: 'Lashing Materials',
    slug: 'lashing-materials',
    category: { _id: 'cat-4', name: 'Cargo Securing', slug: 'cargo-securing' },
    shortDescription: 'Certified heavy-duty cargo securing equipment, ratchet tie-down straps, and container lashing accessories designed to eliminate load movement.',
    images: ['/uploads/lashing_materials.jpg'],
    features: [
      '100% high-tenacity polyester lashing webbing with high break-strength',
      'Ratchet tie-down assemblies with breaking strength up to 10 Tons',
      'EN 12195-2 certified quality for international shipping safety',
      'Weatherproof & UV-stabilized webbing for long-distance transport',
      'Includes container choking hardware, dunnage bags & edge guards'
    ],
    benefits: [
      '100% high-tenacity polyester lashing webbing with high break-strength',
      'Ratchet tie-down assemblies with breaking strength up to 10 Tons',
      'EN 12195-2 certified quality for international shipping safety',
      'Weatherproof & UV-stabilized webbing for long-distance transport',
      'Includes container choking hardware, dunnage bags & edge guards'
    ],
    keywords: ['lashing materials', 'container lashing', 'cargo straps'],
    isPublished: true,
    metaTitle: 'Cargo Lashing Materials Supplier Vadodara',
    metaDescription: 'Container lashing and cargo securing equipment.',
    createdAt: new Date()
  },
  {
    _id: 'prod-7',
    name: 'Aluminium Barrier Vacuum Packing',
    slug: 'vacuum-packing',
    category: { _id: 'cat-5', name: 'Protective Packaging', slug: 'protective-packaging' },
    shortDescription: 'Hermetically sealed multi-layer aluminium barrier foil vacuum packaging combined with desiccants for 100% rust and oxidation prevention.',
    images: ['/uploads/vaccum-packing.jpg'],
    features: [
      'Ultra-low Moisture Vapor Transfer Rate (MVTR < 0.005 g/m²/24hr)',
      'Eliminates corrosion, oxidation, and mold formation on metal parts',
      'MIL-PRF-131K Class 1 compliant multi-layer barrier foil structure',
      'Custom 3D bag fabrication tailored to exact equipment geometry',
      'Includes calibrated silica gel desiccants & humidity indicator cards'
    ],
    benefits: [
      'Ultra-low Moisture Vapor Transfer Rate (MVTR < 0.005 g/m²/24hr)',
      'Eliminates corrosion, oxidation, and mold formation on metal parts',
      'MIL-PRF-131K Class 1 compliant multi-layer barrier foil structure',
      'Custom 3D bag fabrication tailored to exact equipment geometry',
      'Includes calibrated silica gel desiccants & humidity indicator cards'
    ],
    keywords: ['vacuum packing', 'aluminium foil barrier', 'moisture proof packing'],
    isPublished: true,
    metaTitle: 'Vacuum Packing Solutions Vadodara',
    metaDescription: 'Aluminium barrier foil vacuum packing for zero moisture shipment.',
    createdAt: new Date()
  },
  {
    _id: 'prod-8',
    name: 'High Tensile Stretch Film',
    slug: 'stretch-film',
    category: { _id: 'cat-2', name: 'Wrapping & Films', slug: 'wrapping-films' },
    shortDescription: 'High-tensile LLDPE stretch film rolls designed to unitize pallet loads, lock cargo in place, and provide dust-proof protective wrapping.',
    images: ['/uploads/machine-stretch-film-roll-500x500.jpg'],
    features: [
      'High-tensile LLDPE stretch wrap with up to 300% pre-stretch capacity',
      'Superior puncture & tear resistance against sharp pallet corners',
      'Available in hand-wrap rolls and high-speed machine stretch rolls',
      'Cling properties hold loads tightly without adhesive residue',
      'UV-resistant and opaque black options for security & outdoor storage'
    ],
    benefits: [
      'High-tensile LLDPE stretch wrap with up to 300% pre-stretch capacity',
      'Superior puncture & tear resistance against sharp pallet corners',
      'Available in hand-wrap rolls and high-speed machine stretch rolls',
      'Cling properties hold loads tightly without adhesive residue',
      'UV-resistant and opaque black options for security & outdoor storage'
    ],
    keywords: ['stretch film', 'pallet wrap', 'LLDPE stretch film'],
    isPublished: true,
    metaTitle: 'Stretch Film Roll Supplier Vadodara',
    metaDescription: 'Hand and machine stretch wrap film rolls in Vadodara.',
    createdAt: new Date()
  },
  {
    _id: 'prod-9',
    name: 'Heavy Duty Corrugated Boxes',
    slug: 'corrugated-boxes',
    category: { _id: 'cat-3', name: 'Packaging Materials', slug: 'packaging-materials' },
    shortDescription: 'Heavy-duty 3-ply, 5-ply, and 7-ply corrugated shipping boxes engineered for industrial component packaging, distribution, and export shipping.',
    images: ['/uploads/corrugated-box-500x500.webp'],
    features: [
      'Heavy-duty 3-ply, 5-ply & 7-ply construction with high ECT strength',
      'Engineered to withstand heavy stacking pressure and rough handling',
      'Custom box dimensions and high-quality logo printing options',
      'Eco-friendly, 100% recyclable, and biodegradable paperboard',
      'Ideal for automotive parts, electrical components & commercial goods'
    ],
    benefits: [
      'Heavy-duty 3-ply, 5-ply & 7-ply construction with high ECT strength',
      'Engineered to withstand heavy stacking pressure and rough handling',
      'Custom box dimensions and high-quality logo printing options',
      'Eco-friendly, 100% recyclable, and biodegradable paperboard',
      'Ideal for automotive parts, electrical components & commercial goods'
    ],
    keywords: ['corrugated box', 'shipping box', 'carton box'],
    isPublished: true,
    metaTitle: 'Corrugated Boxes Manufacturer Vadodara',
    metaDescription: 'Heavy-duty 3-ply, 5-ply, 7-ply corrugated shipping boxes.',
    createdAt: new Date()
  },
  {
    _id: 'prod-10',
    name: 'Industrial Plastic Pallets',
    slug: 'plastic-pallets',
    category: { _id: 'cat-1', name: 'Wooden Packaging', slug: 'wooden-packaging' },
    shortDescription: 'Heavy-duty HDPE/PP industrial plastic pallets engineered for cleanroom environments, pharmaceutical export, and long-term reusable logistics.',
    images: ['/uploads/Wooden-skid.webp'],
    features: [
      '100% resistant to moisture, acids, oils, chemicals, and fungi growth',
      'Hygiene-compliant smooth surfaces ideal for pharma & food export',
      'Dynamic load capacity up to 1,500 kg & static load up to 5,000 kg',
      '4-way forklift and pallet truck entry for rapid warehouse handling',
      'Durable, shatter-proof construction with long reusable lifespan'
    ],
    benefits: [
      '100% resistant to moisture, acids, oils, chemicals, and fungi growth',
      'Hygiene-compliant smooth surfaces ideal for pharma & food export',
      'Dynamic load capacity up to 1,500 kg & static load up to 5,000 kg',
      '4-way forklift and pallet truck entry for rapid warehouse handling',
      'Durable, shatter-proof construction with long reusable lifespan'
    ],
    keywords: ['plastic pallets', 'HDPE pallet', 'hygienic pallet'],
    isPublished: true,
    metaTitle: 'Plastic Pallets Supplier Vadodara',
    metaDescription: 'HDPE reusable plastic pallets for cleanroom and logistics.',
    createdAt: new Date()
  },
  {
    _id: 'prod-11',
    name: 'Protective Bubble Wrap Rolls',
    slug: 'bubble-wrap',
    category: { _id: 'cat-5', name: 'Protective Packaging', slug: 'protective-packaging' },
    shortDescription: 'High-cushioning polyethylene air bubble wrap rolls designed to absorb shock, dampen vibration, and protect fragile industrial parts.',
    images: ['/uploads/bubblewrap.jpg'],
    features: [
      'Superior air-retention bubble technology for maximum impact absorption',
      'Available in 10mm standard bubbles & 28mm heavy-duty jumbo bubbles',
      'Anti-static pink variant available for sensitive electronic circuit boards',
      'Flexible, lightweight wrapping material that reduces freight volume',
      'Perforated rolls & custom-cut pouch sizes available upon request'
    ],
    benefits: [
      'Superior air-retention bubble technology for maximum impact absorption',
      'Available in 10mm standard bubbles & 28mm heavy-duty jumbo bubbles',
      'Anti-static pink variant available for sensitive electronic circuit boards',
      'Flexible, lightweight wrapping material that reduces freight volume',
      'Perforated rolls & custom-cut pouch sizes available upon request'
    ],
    keywords: ['bubble wrap', 'cushioning roll', 'air bubble roll'],
    isPublished: true,
    metaTitle: 'Air Bubble Wrap Roll Manufacturer Vadodara',
    metaDescription: 'Protective air bubble wrap rolls and pouches.',
    createdAt: new Date()
  },
  {
    _id: 'prod-12',
    name: 'Carton Sealing Packaging Tape',
    slug: 'packaging-tape',
    category: { _id: 'cat-3', name: 'Packaging Materials', slug: 'packaging-materials' },
    shortDescription: 'Heavy-duty BOPP self-adhesive carton sealing tape engineered for high shear strength, instant tack, and reliable box closure.',
    images: ['/uploads/3-65-heavy-duty-handheld-brown-packaging-tape-rolls-for-carton-original-imahcz9sswz2fvdg.webp'],
    features: [
      'High shear strength acrylic & hot-melt adhesive for heavy cartons',
      'Puncture-resistant BOPP backing film suitable for extreme temperatures',
      'Available in standard 48mm & 72mm widths and 40 to 50 micron thickness',
      'Custom logo printing options for brand identification & anti-tampering',
      'Smooth unwinding performance for manual dispensers & automatic sealers'
    ],
    benefits: [
      'High shear strength acrylic & hot-melt adhesive for heavy cartons',
      'Puncture-resistant BOPP backing film suitable for extreme temperatures',
      'Available in standard 48mm & 72mm widths and 40 to 50 micron thickness',
      'Custom logo printing options for brand identification & anti-tampering',
      'Smooth unwinding performance for manual dispensers & automatic sealers'
    ],
    keywords: ['packaging tape', 'BOPP tape', 'carton sealing tape'],
    isPublished: true,
    metaTitle: 'Packaging Tape Manufacturer Vadodara',
    metaDescription: 'BOPP self adhesive carton sealing tape in Vadodara.',
    createdAt: new Date()
  }
];

let inMemoryProducts = [...DEFAULT_PRODUCTS];

// GET /api/products (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, suggest } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const maxLimit = suggest ? 8 : 60;
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), maxLimit);

    if (mongoose.connection.readyState === 1) {
      try {
        const query = { isPublished: true };
        if (category) query.category = category;
        const normalizedSearch = search?.trim();
        if (normalizedSearch) {
          const safeSearch = escapeRegex(normalizedSearch);
          query.$or = [
            { name: { $regex: safeSearch, $options: 'i' } },
            { shortDescription: { $regex: safeSearch, $options: 'i' } },
            { keywords: { $regex: safeSearch, $options: 'i' } },
          ];
        }
        const products = await Product.find(query)
          .select('name slug category shortDescription images features keywords metaTitle metaDescription createdAt')
          .populate('category', 'name slug')
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean();
        const total = suggest ? products.length : await Product.countDocuments(query);
        return res.json({ products: products.length > 0 ? products : DEFAULT_PRODUCTS, total: total || DEFAULT_PRODUCTS.length, page, pages: Math.ceil((total || DEFAULT_PRODUCTS.length) / limit) });
      } catch (err) {
        console.warn('DB products query failed, using in-memory fallbacks:', err.message);
      }
    }

    // In-memory fallback
    let filtered = inMemoryProducts.filter(p => p.isPublished !== false);
    if (category) {
      filtered = filtered.filter(p => p.category?.name === category || p.category?.slug === category || p.category === category);
    }
    if (search?.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.shortDescription.toLowerCase().includes(s));
    }
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return res.json({ products: paginated, total, page, pages: Math.ceil(total / limit) || 1 });
  } catch (error) {
    res.json({ products: DEFAULT_PRODUCTS, total: DEFAULT_PRODUCTS.length, page: 1, pages: 1 });
  }
});

// GET /api/products/admin/all (admin - includes unpublished)
router.get('/admin/all', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const products = await Product.find()
          .populate('category', 'name slug')
          .sort({ createdAt: -1 });
        return res.json(products.length > 0 ? products : inMemoryProducts);
      } catch (err) {
        console.warn('DB products admin query failed, using in-memory:', err.message);
      }
    }
    res.json(inMemoryProducts);
  } catch (error) {
    res.json(inMemoryProducts);
  }
});

// GET /api/products/:slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Product.findOne({ slug, isPublished: true })
          .populate('category', 'name slug')
          .populate('relatedProducts', 'name slug images shortDescription')
          .lean();
        if (product) return res.json(product);
      } catch (err) {
        console.warn('DB single product query failed:', err.message);
      }
    }

    const item = inMemoryProducts.find(p => p.slug === slug) || DEFAULT_PRODUCTS.find(p => p.slug === slug) || DEFAULT_PRODUCTS[0];
    res.json(item);
  } catch (error) {
    res.json(DEFAULT_PRODUCTS[0]);
  }
});

// POST /api/products/admin (admin)
router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
      } catch (err) {
        console.warn('DB product create failed, using in-memory:', err.message);
      }
    }

    const newProd = {
      _id: 'prod-' + Date.now(),
      isPublished: true,
      ...req.body,
      createdAt: new Date()
    };
    inMemoryProducts.unshift(newProd);
    res.status(201).json(newProd);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT /api/products/admin/:id (admin)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (product) return res.json(product);
      } catch (err) {
        console.warn('DB product update failed, using in-memory:', err.message);
      }
    }

    const idx = inMemoryProducts.findIndex(p => p._id === req.params.id);
    if (idx !== -1) {
      inMemoryProducts[idx] = { ...inMemoryProducts[idx], ...req.body };
      return res.json(inMemoryProducts[idx]);
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE /api/products/admin/:id (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await Product.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB product delete failed, using in-memory:', err.message);
      }
    }
    inMemoryProducts = inMemoryProducts.filter(p => p._id !== req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
