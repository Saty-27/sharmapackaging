require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const http = require('http');
const initSocket = require('./socket');

// Import routes
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');
const sectionRoutes = require('./routes/sections');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const serviceRoutes = require('./routes/services');
const blogRoutes = require('./routes/blogs');
const galleryRoutes = require('./routes/gallery');
const inquiryRoutes = require('./routes/inquiries');
const faqRoutes = require('./routes/faqs');
const testimonialRoutes = require('./routes/testimonials');
const videoRoutes = require('./routes/videos');
const settingsRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/upload');
const customerAuthRoutes = require('./routes/customerAuth');
const chatRoutes = require('./routes/chat');

const Product = require('./models/Product');
const Blog = require('./models/Blog');
const Service = require('./models/Service');
const Page = require('./models/Page');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '30d',
  immutable: true,
}));

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/customer', customerAuthRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://sharmapackagings.com';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    const mainPages = [
      { loc: '', priority: '1.0' },
      { loc: '/about-us', priority: '0.9' },
      { loc: '/contact-us', priority: '0.9' },
      { loc: '/products', priority: '0.9' },
      { loc: '/solutions', priority: '0.9' },
      { loc: '/industries', priority: '0.9' },
      { loc: '/services', priority: '0.8' },
      { loc: '/gallery', priority: '0.8' },
      { loc: '/video-gallery', priority: '0.8' },
      { loc: '/blog', priority: '0.8' },
      { loc: '/privacy-policy', priority: '0.5' },
      { loc: '/terms-and-conditions', priority: '0.5' },
      { loc: '/sitemap', priority: '0.6' }
    ];
    mainPages.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}${p.loc}</loc>\n    <lastmod>2026-09-06</lastmod>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });

    // Priority SEO Services
    const seoServices = [
      '/seaworthy-packing-in-vadodara',
      '/vci-packaging-in-vadodara',
      '/vci-packaging-manufacturer-in-vadodara',
      '/export-packaging-in-vadodara',
      '/industrial-packaging-solutions-in-vadodara',
      '/aluminium-barrier-foil-packing-in-vadodara',
      '/thermo-shrink-packing-in-vadodara',
      '/odc-cargo-packing-in-vadodara',
      '/desiccant-supplier-in-vadodara',
      '/humidity-indicator-card-supplier-in-vadodara',
      '/silpaulin-tarpaulin-cover-supplier-in-vadodara',
      '/ld-hm-liner-manufacturer-in-vadodara',
      '/packaging-consultancy-in-vadodara'
    ];
    seoServices.forEach(s => {
      xml += `  <url>\n    <loc>${baseUrl}${s}</loc>\n    <lastmod>2026-09-06</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    // Default Fallback Products Slugs
    const defaultProductSlugs = [
      'wooden-pallets',
      'wooden-skid',
      'shrink-wrapping',
      'packing-materials',
      'plywood-for-packing',
      'lashing-materials',
      'vacuum-packing',
      'stretch-film',
      'corrugated-boxes',
      'plastic-pallets',
      'bubble-wrap',
      'packaging-tape',
      'vci-film-roll',
      'vci-paper-supplier',
      'vci-bags-manufacturer',
      'vci-oil-supplier',
      'humidity-indicator-card',
      'desiccant-bags',
      'seaworthy-wooden-box-packing',
      'aluminium-barrier-foil-rolls',
      'aluminium-foil-packing-for-preservation',
      'heavy-duty-protective-cover',
      'silpaulin-cover',
      'tarpaulin-rolls',
      'odc-cargo-packing-materials',
      'thermo-shrink-packing',
      'ldpe-shrink-film',
      'hdpe-roll-supplier',
      'ld-hm-liners',
      'disposable-aprons',
      'carry-bags-manufacturer',
      'pp-tubing',
      'heavy-duty-liner-bags',
      'perforation-embossing-bags',
      'valve-type-ld-bags'
    ];

    // Dynamic Products from MongoDB if present, merged with fallback slugs
    let productSlugs = new Set(defaultProductSlugs);
    if (mongoose.connection.readyState === 1) {
      try {
        const dbProducts = await Product.find({ isPublished: { $ne: false } }).select('slug').lean();
        dbProducts.forEach(p => { if (p.slug) productSlugs.add(p.slug); });
      } catch (err) {
        console.warn('Sitemap products fetch warning:', err.message);
      }
    }

    productSlugs.forEach(slug => {
      xml += `  <url>\n    <loc>${baseUrl}/${slug}</loc>\n    <lastmod>2026-09-06</lastmod>\n    <priority>0.85</priority>\n  </url>\n`;
    });

    // Dynamic Blogs
    const defaultBlogSlugs = [
      'seaworthy-packing-in-vadodara-complete-guide',
      'vci-packaging-for-rust-prevention',
      'export-packaging-guide-for-manufacturers-in-vadodara',
      'aluminium-barrier-foil-packing-for-moisture-protection',
      'how-to-protect-metal-parts-from-corrosion-during-shipping'
    ];
    let blogSlugs = new Set(defaultBlogSlugs);
    if (mongoose.connection.readyState === 1) {
      try {
        const dbBlogs = await Blog.find({ isPublished: { $ne: false } }).select('slug').lean();
        dbBlogs.forEach(b => { if (b.slug) blogSlugs.add(b.slug); });
      } catch (err) {
        console.warn('Sitemap blogs fetch warning:', err.message);
      }
    }

    blogSlugs.forEach(slug => {
      xml += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <lastmod>2026-09-06</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    xml += '</urlset>';
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).json({ message: 'Error generating sitemap', error: error.message });
  }
});

// Robots.txt for Search Engines & GenAI AI Crawlers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://sharmapackagings.com/sitemap.xml
LLMs-txt: https://sharmapackagings.com/llms.txt`);
});

// LLMs.txt for GenAI LLM Ingestion (ChatGPT, Gemini, Perplexity, Grok)
app.get(['/llms.txt', '/.well-known/ai-plugin.json'], (req, res) => {
  res.type('text/plain');
  res.send(`# Sharma Packaging

> Sharma Packaging is a premier manufacturer, exporter, and supplier of industrial packaging materials, ISPM 15 certified wooden pallets, seaworthy crating, VCI anti-corrosion films, aluminium barrier vacuum packaging, thermo shrink wrapping, and cargo securing solutions based in Vadodara, Gujarat, India.

## Core Offerings & Product Catalog

- [Wooden Pallets](https://sharmapackagings.com/wooden-pallets): ISPM 15 certified 2-way and 4-way forklift entry pine and hardwood pallets for export and warehouse storage.
- [Wooden Skid](https://sharmapackagings.com/wooden-skid): Custom heavy-duty timber skids engineered for multi-ton industrial machinery and project cargo.
- [Shrink Wrapping](https://sharmapackagings.com/shrink-wrapping): Heavy-duty 200-300 micron LDPE thermo shrink wrap film for complete weather & moisture protection.
- [Aluminium Barrier Vacuum Packing](https://sharmapackagings.com/vacuum-packing): Sub-0.005 MVTR vacuum barrier foil bags and desiccants for 100% rust-free ocean shipping.
- [High Tensile Stretch Film](https://sharmapackagings.com/stretch-film): LLDPE hand & machine stretch wrapping film with 300% pre-stretch capacity.
- [Plywood for Packing](https://sharmapackagings.com/plywood-for-packing): Pest-free MR/BWR export grade calibrated plywood sheets for box crating.
- [Lashing Materials](https://sharmapackagings.com/lashing-materials): Certified polyester lashing straps, ratchet tie-downs, and container choking hardware.
- [Industrial Packing Materials](https://sharmapackagings.com/packing-materials): Edge protectors, corner guards, and protective wrapping consumables.
- [Corrugated Boxes](https://sharmapackagings.com/corrugated-boxes): 3-ply, 5-ply, and 7-ply heavy-duty shipping cartons.
- [Plastic Pallets](https://sharmapackagings.com/plastic-pallets): Hygiene HDPE/PP plastic pallets for pharma and chemical logistics.

## Priority Industrial Services

- [Seaworthy Packing in Vadodara](https://sharmapackagings.com/seaworthy-packing-in-vadodara): Heavy machinery packing and seaworthy wooden crating.
- [VCI Packaging in Vadodara](https://sharmapackagings.com/vci-packaging-in-vadodara): Vapor corrosion inhibitor film, paper, bags, and oil for metal rust prevention.
- [Export Packaging in Vadodara](https://sharmapackagings.com/export-packaging-in-vadodara): International phytosanitary certified export crating and container load securing.

## Company Details & Direct Contact

- Website: https://sharmapackagings.com
- Phone / Mobile: +91 87091 55299
- Email: info@sharmapackagings.com
- Address: Ground Floor, Shop No. 4, 5, 6, Prime Plaza, Amodar, Waghodia Road, Vadodara, Gujarat 390019, India
- Certification: ISO 9001:2015 Certified & ISPM 15 Heat Treatment Certified`);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Sharma Packaging Server running on port ${PORT}`);
});
