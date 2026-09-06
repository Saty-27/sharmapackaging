const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

const DEFAULT_BLOGS = [
  {
    _id: 'blog-1',
    title: 'Seaworthy Packing in Vadodara: Complete Guide for Exporters',
    slug: 'seaworthy-packing-in-vadodara-complete-guide',
    category: 'Export Packaging',
    author: 'Sharma Packaging',
    status: 'published',
    isPublished: true,
    isFeatured: true,
    displayOrder: 1,
    publishDate: new Date(),
    featuredImage: '/uploads/seaworthy_packing.jpg',
    excerpt: 'The ultimate guide for manufacturers and exporters in Vadodara, Baroda, and Makarpura GIDC looking for seaworthy wood packing, export wooden box crating, and ocean transit protection.',
    content: `<h2>Introduction to Seaworthy Packing in Vadodara</h2>
<p>For industrial manufacturers in Vadodara, Baroda, and GIDC Makarpura, exporting heavy machinery and precision engineering goods globally is a critical part of operations. However, shipping equipment across oceans exposes cargo to aggressive maritime environments, including salty air, extreme humidity fluctuations, high-amplitude vibrations, and rough handling during transit. This is where professional <strong>seaworthy packing in Vadodara</strong> becomes essential.</p>

<h2>Why Export Machinery Requires Seaworthy Packing</h2>
<p>Standard transport packing is insufficient for ocean freight. Seaworthy packing is a specialized engineering process designed to keep cargo safe over long voyages. The main threats it mitigates include:</p>
<ul>
  <li><strong>Salt Spray & Corrosion:</strong> Marine transit involves direct exposure to ocean atmospheres, which are loaded with corrosive chlorides that accelerate metal oxidation.</li>
  <li><strong>Moisture & Condensation:</strong> As cargo ships travel through different climatic zones, temperatures rise and fall, creating "container rain" or internal sweating inside packaging.</li>
  <li><strong>Transit Vibrations:</strong> Heavy machinery is subjected to low-frequency vibrations from ship engines and rough sea motions, which can loosen internal components.</li>
</ul>

<h2>Core Elements of Seaworthy Packing</h2>
<p>Professional export packaging companies in Vadodara, like Sharma Packaging, utilize a multi-layered defense system:</p>
<ol>
  <li><strong>Custom Timber Crating:</strong> Heavy-duty load-bearing bases and wooden crates designed to withstand severe handling.</li>
  <li><strong>Hermetic Moisture Barriers:</strong> Laminated aluminium barrier foils that are vacuum-sealed to exclude external air.</li>
  <li><strong>Active Desiccants:</strong> Silica gel or clay desiccant bags placed inside the sealed foil to absorb lingering ambient moisture.</li>
  <li><strong>VCI Rust Prevention:</strong> Volatile Corrosion Inhibitor (VCI) films wrap the metallic surfaces to block chemical rust reactions.</li>
</ol>

<h2>Local Support for Vadodara & Gujarat Manufacturers</h2>
<p>Sharma Packaging is a leading seaworthy packing manufacturer in Vadodara, providing complete packaging solutions directly on-site at factories in Makarpura GIDC, Halol, Ankleshwar, Bharuch, Dahej, and Ahmedabad. Our engineered crating conforms to international shipping specifications, ensuring hassle-free customs clearance and damage-free arrival.</p>`,
    seoTitle: 'Seaworthy Packing in Vadodara: Complete Guide for Exporters',
    metaDescription: 'Get expert seaworthy packing in Vadodara. Read our guide on preventing rust, salt spray, and vibration damage for export machinery using wooden crates.',
    focusKeyword: 'seaworthy packing vadodara',
    canonicalUrl: 'https://sharmapackagings.com/blog/seaworthy-packing-in-vadodara-complete-guide'
  },
  {
    _id: 'blog-2',
    title: 'VCI Packaging for Rust Prevention: Complete Guide for Metal Parts',
    slug: 'vci-packaging-for-rust-prevention',
    category: 'VCI Products',
    author: 'Sharma Packaging',
    status: 'published',
    isPublished: true,
    isFeatured: true,
    displayOrder: 2,
    publishDate: new Date(Date.now() - 86400000 * 2),
    featuredImage: '/uploads/vaccum-packing.jpg',
    excerpt: 'Discover how Volatile Corrosion Inhibitor (VCI) packaging protects automotive parts, bearings, and precision machinery from rust during sea shipping and storage.',
    content: `<h2>Understanding VCI Technology for Metal Preservation</h2>
<p>Rust and corrosion cost industrial manufacturers millions of dollars annually in scrapped inventory, reworking, and customer claims. For metal component manufacturers in GIDC Makarpura and Vadodara, preventing rust during storage and sea transit is a top operational priority. The most efficient and clean method to achieve this is <strong>VCI packaging in Vadodara</strong>.</p>

<h2>What is VCI Packaging?</h2>
<p>VCI stands for <strong>Volatile Corrosion Inhibitor</strong>. Unlike traditional oil coatings or rust preventive greases that require messy applications and post-transit cleaning, VCI products are dry packaging materials. They are infused with advanced chemical inhibitors that continuously sublimate (change from a solid state to a vapor state) at room temperature.</p>

<h2>How VCI Packaging Works</h2>
<p>When you place metal components inside a VCI film roll or bag:</p>
<ul>
  <li>The VCI molecules vaporize and disperse throughout the enclosed enclosure.</li>
  <li>These molecules are attracted to metallic surfaces and form an invisible, monomolecular protective layer.</li>
  <li>This barrier neutralizes the electrochemical oxidation process, preventing oxygen and moisture from contacting the metal.</li>
  <li>Once unpacked, the molecules safely evaporate from the metal surface, leaving it clean and ready for immediate assembly or painting.</li>
</ul>`,
    seoTitle: 'VCI Packaging for Rust Prevention: Complete Guide for Metal Parts',
    metaDescription: 'Learn how VCI film rolls, VCI paper, and VCI bags prevent corrosion on industrial metal components during sea transport and warehouse storage.',
    focusKeyword: 'vci packaging rust prevention',
    canonicalUrl: 'https://sharmapackagings.com/blog/vci-packaging-for-rust-prevention'
  },
  {
    _id: 'blog-3',
    title: 'How Proper Industrial Packaging Prevents Transit Damage',
    slug: 'how-proper-industrial-packaging-prevents-transit-damage',
    category: 'Industrial Packaging',
    author: 'Sharma Packaging',
    status: 'published',
    isPublished: true,
    isFeatured: false,
    displayOrder: 3,
    publishDate: new Date(Date.now() - 86400000 * 5),
    featuredImage: '/uploads/Shrink-Wrapping.jpeg',
    excerpt: 'Industrial products often travel long distances and may be exposed to vibration, moisture, dust and repeated handling. Discover key strategies to eliminate transit risk.',
    content: `<h2>Why Industrial Packaging Matters</h2>
<p>Industrial products often travel long distances across diverse transport modes including flatbed trucks, ocean vessels, and freight trains. Along the journey, cargo encounters severe vibration, humidity shocks, dust accumulation, and repeated crane or forklift handling.</p>

<p><strong>Proper packaging helps reduce the risk of transit damage significantly.</strong></p>

<h2>Key Benefits of Engineered Packaging</h2>
<ul>
  <li><strong>Better Structural Protection:</strong> Heavy-duty timber skids distribute machinery weight evenly to absorb road and rail shocks.</li>
  <li><strong>Safer Handling:</strong> Custom lifting points, fork slots, and eye bolts simplify loading for warehouse operators.</li>
  <li><strong>Reduced Damage Claims:</strong> Hermetic foil barriers and desiccants protect sensitive electronic panels from atmospheric corrosion.</li>
  <li><strong>Improved Export Readiness:</strong> Standardized documentation and compliant materials prevent customs delays.</li>
</ul>`,
    seoTitle: 'How Proper Industrial Packaging Prevents Transit Damage',
    metaDescription: 'Explore how engineered industrial packaging solutions reduce machinery transport risks, moisture oxidation, and transit damage.',
    focusKeyword: 'industrial packaging transit damage'
  },
  {
    _id: 'blog-4',
    title: 'Aluminium Barrier Foil vs Shrink Film: Choosing the Right Protection',
    slug: 'aluminium-barrier-foil-vs-shrink-film',
    category: 'Protective Packaging',
    author: 'Sharma Packaging',
    status: 'published',
    isPublished: true,
    isFeatured: false,
    displayOrder: 4,
    publishDate: new Date(Date.now() - 86400000 * 8),
    featuredImage: '/uploads/aluminium_foil_preservation.jpg',
    excerpt: 'Compare Moisture Vapor Transfer Rates (MVTR), UV stability, and environmental resistance between multi-layer aluminium foil and thermo shrink wrapping.',
    content: `<h2>Understanding Barrier Technologies</h2>
<p>When protecting capital equipment for long-term storage or overseas export, choosing between Aluminium Barrier Foil and Heavy-Duty Thermo Shrink Film is a key engineering decision.</p>

<h2>Aluminium Barrier Foil</h2>
<p>Aluminium barrier foil offers near-zero Moisture Vapor Transfer Rate (MVTR < 0.01 g/m²/24hr). It is ideal for climate-sensitive electrical transformers, CNC machinery, and high-precision gearboxes exposed to tropical ocean transit.</p>

<h2>Heavy-Duty Thermo Shrink Film</h2>
<p>Thermo shrink wrapping provides robust physical protection against dust, rain, and road debris during open truck transit and yard storage. It conforms tightly around irregular shapes when heated.</p>`,
    seoTitle: 'Aluminium Barrier Foil vs Shrink Film: Choosing the Right Protection',
    metaDescription: 'A technical comparison between aluminium barrier foil heat sealing and thermo shrink wrapping for industrial cargo protection.',
    focusKeyword: 'aluminium barrier foil shrink film'
  },
  {
    _id: 'blog-5',
    title: 'Silpaulin Tarpaulin Covers for Outdoor Machinery Storage',
    slug: 'silpaulin-tarpaulin-covers-outdoor-machinery-storage',
    category: 'Protective Packaging',
    author: 'Sharma Packaging',
    status: 'published',
    isPublished: true,
    isFeatured: false,
    displayOrder: 5,
    publishDate: new Date(Date.now() - 86400000 * 12),
    featuredImage: '/uploads/tarpaulin.jpg',
    excerpt: 'Learn why multi-layered cross-laminated Silpaulin covers are essential for shielding industrial equipment from monsoon rain and harsh sunlight.',
    content: `<h2>Outdoor Storage Challenges</h2>
<p>Heavy machinery stored in factory yards prior to shipping is constantly exposed to monsoon downpours, intense UV radiation, and dust accumulation. Standard tarpaulins tear easily under wind loads.</p>

<h2>Advantages of Cross-Laminated Silpaulin</h2>
<ul>
  <li>100% Waterproof and leak-proof heat-sealed seams</li>
  <li>UV-stabilized polymer matrix preventing sun degradation</li>
  <li>Tear-resistant multi-layered cross-lamination</li>
  <li>Custom fitted shapes with eyelets and tie-down cords</li>
</ul>`,
    seoTitle: 'Silpaulin Tarpaulin Covers for Outdoor Machinery Storage',
    metaDescription: 'Discover why cross-laminated Silpaulin tarpaulin covers provide durable waterproof and UV protection for outdoor equipment storage.',
    focusKeyword: 'silpaulin covers outdoor storage'
  },
  {
    _id: 'blog-6',
    title: 'Over-Dimensional Cargo (ODC) Packing Best Practices',
    slug: 'over-dimensional-cargo-odc-packing-best-practices',
    category: 'Industrial Packaging',
    author: 'Sharma Packaging',
    status: 'published',
    isPublished: true,
    isFeatured: false,
    displayOrder: 6,
    publishDate: new Date(Date.now() - 86400000 * 15),
    featuredImage: '/uploads/odc_cargo_packing.jpg',
    excerpt: 'Key considerations for securing, bracing, and shrink-wrapping heavy over-dimensional project cargo for multi-modal transport.',
    content: `<h2>Engineered ODC Packaging</h2>
<p>Transporting Over-Dimensional Cargo (ODC) presents unique structural and logistics challenges. Proper weight distribution, heavy timber bracing, steel lashing, and weatherproofing are essential.</p>

<h2>Essential ODC Packing Steps</h2>
<ol>
  <li>Center of gravity analysis and custom heavy skid design</li>
  <li>High-tensile polyester strapping and chain lashing points</li>
  <li>Full-body heavy-duty shrink wrapping with ventilation desiccant ports</li>
</ol>`,
    seoTitle: 'Over-Dimensional Cargo (ODC) Packing Best Practices',
    metaDescription: 'Learn essential packaging and lashing standards for shipping heavy over-dimensional machinery and project cargo.',
    focusKeyword: 'odc cargo packing'
  }
];

let inMemoryBlogs = [...DEFAULT_BLOGS];

// GET /api/blogs (public, published blogs only)
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    if (mongoose.connection.readyState === 1) {
      const query = { status: 'published' };
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }
      const total = await Blog.countDocuments(query);
      let blogs = await Blog.find(query)
        .sort({ displayOrder: 1, publishDate: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      if (blogs.length === 0 && !search && (!category || category === 'All')) {
        blogs = DEFAULT_BLOGS;
      }
      return res.json({ blogs, total: total || blogs.length, page: parseInt(page), pages: Math.ceil((total || blogs.length) / limit) });
    } else {
      let filtered = inMemoryBlogs.filter(b => b.status === 'published');
      if (category && category !== 'All') filtered = filtered.filter(b => b.category === category);
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(b => 
          b.title.toLowerCase().includes(s) || 
          b.excerpt.toLowerCase().includes(s) || 
          (b.content && b.content.toLowerCase().includes(s))
        );
      }
      const total = filtered.length;
      const paginated = filtered.slice((page - 1) * limit, page * limit);
      return res.json({ blogs: paginated, total, page: parseInt(page), pages: Math.ceil(total / limit) });
    }
  } catch (error) {
    res.json({ blogs: DEFAULT_BLOGS, total: DEFAULT_BLOGS.length, page: 1, pages: 1 });
  }
});

// GET /api/blogs/featured (public, featured or latest 6 blogs)
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    if (mongoose.connection.readyState === 1) {
      const blogs = await Blog.find({ status: 'published' })
        .sort({ isFeatured: -1, displayOrder: 1, publishDate: -1 })
        .limit(limit);
      return res.json(blogs.length > 0 ? blogs : DEFAULT_BLOGS.slice(0, limit));
    } else {
      const pub = inMemoryBlogs.filter(b => b.status === 'published');
      pub.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || a.displayOrder - b.displayOrder);
      return res.json(pub.slice(0, limit));
    }
  } catch (error) {
    res.json(DEFAULT_BLOGS.slice(0, 6));
  }
});

// GET /api/blogs/:slug (public, single blog details by slug)
router.get('/:slug', async (req, res) => {
  try {
    const targetSlug = req.params.slug;
    if (mongoose.connection.readyState === 1) {
      const blog = await Blog.findOne({ slug: targetSlug, status: 'published' });
      if (blog) {
        const related = await Blog.find({ status: 'published', _id: { $ne: blog._id } })
          .sort({ publishDate: -1 })
          .limit(3);
        return res.json({ blog, related });
      }
    }
    
    // In-memory / Fallback
    const blog = inMemoryBlogs.find(b => b.slug === targetSlug && b.status === 'published') || DEFAULT_BLOGS[0];
    const related = inMemoryBlogs.filter(b => b.slug !== blog.slug && b.status === 'published').slice(0, 3);
    res.json({ blog, related });
  } catch (error) {
    const blog = DEFAULT_BLOGS[0];
    res.json({ blog, related: DEFAULT_BLOGS.slice(1, 4) });
  }
});

// GET /api/blogs/admin/all (admin, all blogs)
router.get('/admin/all', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blogs = await Blog.find().sort({ displayOrder: 1, publishDate: -1, createdAt: -1 });
      res.json(blogs.length > 0 ? blogs : DEFAULT_BLOGS);
    } else {
      res.json(inMemoryBlogs);
    }
  } catch (error) {
    res.json(inMemoryBlogs);
  }
});

// POST /api/blogs/admin (admin create)
router.post('/admin', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blog = await Blog.create(req.body);
      return res.status(201).json(blog);
    } else {
      const newBlog = {
        _id: 'blog-' + Date.now(),
        author: 'Sharma Packaging',
        status: 'published',
        isPublished: true,
        publishDate: new Date(),
        ...req.body,
        createdAt: new Date()
      };
      inMemoryBlogs.unshift(newBlog);
      return res.status(201).json(newBlog);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
});

// PUT /api/blogs/admin/:id (admin update)
router.put('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      return res.json(blog);
    } else {
      const idx = inMemoryBlogs.findIndex(b => b._id === req.params.id);
      if (idx !== -1) {
        inMemoryBlogs[idx] = { ...inMemoryBlogs[idx], ...req.body };
        return res.json(inMemoryBlogs[idx]);
      }
      return res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
});

// DELETE /api/blogs/admin/:id (admin delete)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Blog.findByIdAndDelete(req.params.id);
    } else {
      inMemoryBlogs = inMemoryBlogs.filter(b => b._id !== req.params.id);
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
});

module.exports = router;
