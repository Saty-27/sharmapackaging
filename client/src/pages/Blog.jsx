import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import api from '../utils/api';

const DEFAULT_BLOGS = [
  {
    _id: 'b-1',
    title: 'Seaworthy Packing in Vadodara: Complete Guide for Exporters',
    slug: 'seaworthy-packing-in-vadodara-complete-guide',
    category: 'Export Packaging',
    publishDate: new Date(),
    featuredImage: '/uploads/seaworthy_packing.jpg',
    excerpt: 'The ultimate guide for manufacturers and exporters in Vadodara, Baroda, and Makarpura GIDC looking for seaworthy wood packing, export wooden box crating, and ocean transit protection.'
  },
  {
    _id: 'b-2',
    title: 'VCI Packaging for Rust Prevention: Complete Guide for Metal Parts',
    slug: 'vci-packaging-for-rust-prevention',
    category: 'VCI Products',
    publishDate: new Date(Date.now() - 86400000 * 2),
    featuredImage: '/uploads/vaccum-packing.jpg',
    excerpt: 'Discover how Volatile Corrosion Inhibitor (VCI) packaging protects automotive parts, bearings, and precision machinery from rust during sea shipping and storage.'
  },
  {
    _id: 'b-3',
    title: 'How Proper Industrial Packaging Prevents Transit Damage',
    slug: 'how-proper-industrial-packaging-prevents-transit-damage',
    category: 'Industrial Packaging',
    publishDate: new Date(Date.now() - 86400000 * 5),
    featuredImage: '/uploads/Shrink-Wrapping.jpeg',
    excerpt: 'Industrial products often travel long distances and may be exposed to vibration, moisture, dust and repeated handling. Discover key strategies to eliminate transit risk.'
  },
  {
    _id: 'b-4',
    title: 'Aluminium Barrier Foil vs Shrink Film: Choosing the Right Protection',
    slug: 'aluminium-barrier-foil-vs-shrink-film',
    category: 'Protective Packaging',
    publishDate: new Date(Date.now() - 86400000 * 8),
    featuredImage: '/uploads/aluminium_foil_preservation.jpg',
    excerpt: 'Compare Moisture Vapor Transfer Rates (MVTR), UV stability, and environmental resistance between multi-layer aluminium foil and thermo shrink wrapping.'
  },
  {
    _id: 'b-5',
    title: 'Silpaulin Tarpaulin Covers for Outdoor Machinery Storage',
    slug: 'silpaulin-tarpaulin-covers-outdoor-machinery-storage',
    category: 'Protective Packaging',
    publishDate: new Date(Date.now() - 86400000 * 12),
    featuredImage: '/uploads/tarpaulin.jpg',
    excerpt: 'Learn why multi-layered cross-laminated Silpaulin covers are essential for shielding industrial equipment from monsoon rain and harsh sunlight.'
  },
  {
    _id: 'b-6',
    title: 'Over-Dimensional Cargo (ODC) Packing Best Practices',
    slug: 'over-dimensional-cargo-odc-packing-best-practices',
    category: 'Industrial Packaging',
    publishDate: new Date(Date.now() - 86400000 * 15),
    featuredImage: '/uploads/odc_cargo_packing.jpg',
    excerpt: 'Key considerations for securing, bracing, and shrink-wrapping heavy over-dimensional project cargo for multi-modal transport.'
  }
];

export default function Blog() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Packaging Insights',
    'Industrial Packaging',
    'Wooden Packaging',
    'Export Packaging',
    'VCI Products',
    'Protective Packaging'
  ];

  useEffect(() => {
    api.get('/blogs')
      .then(res => {
        if (res.data && res.data.blogs && res.data.blogs.length > 0) {
          setBlogs(res.data.blogs);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = blogs.filter(b => {
    const matchesCat = activeCategory === 'All' || b.category === activeCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (b.excerpt && b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Industrial Packaging Insights & Blog | Sharma Packaging"
        description="Practical insights, packaging knowledge and industry updates on seaworthy packing, VCI corrosion protection, export crating, and cargo securing."
      />

      {/* Hero Header */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(11,31,58,0.92), rgba(11,31,58,0.85)), url("/uploads/seaworthy_packing.jpg")' }}>
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow eyebrow-amber">FROM OUR BLOG</span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--white)', marginTop: 8 }}>Insights & Packaging Knowledge</h1>
            <p style={{ maxWidth: 640, margin: '12px auto 0', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
              Practical insights, packaging knowledge and industry updates from Sharma Packaging.
            </p>
            <div className="breadcrumb" style={{ justifyContent: 'center', marginTop: 16 }}>
              <Link to="/">Home</Link> / <span>Blog</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="section">
        <div className="container">
          {/* Controls: Search & Category Filter */}
          <div style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
              <FaSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search packaging articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: 44, height: 48, borderRadius: 24, fontSize: '0.98rem' }}
              />
            </div>

            <div className="category-filter-wrap" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.map(c => (
                <button
                  key={c}
                  className={`filter-pill ${activeCategory === c ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Desktop Grid */}
          <div className="blog-3col-grid">
            {filtered.map((blog, idx) => (
              <motion.article 
                key={blog._id || idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="blog-card"
              >
                <Link to={`/blog/${blog.slug}`} className="blog-card-img-link">
                  <img 
                    src={blog.featuredImage || '/uploads/seaworthy_packing.jpg'} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/seaworthy_packing.jpg'; }}
                    alt={blog.title} 
                    className="blog-card-img" 
                  />
                  <span className="blog-card-category">{blog.category}</span>
                </Link>

                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-date">
                      <FaCalendarAlt style={{ marginRight: 5 }} />
                      {new Date(blog.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="blog-card-title">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p className="blog-card-excerpt">
                    {blog.excerpt}
                  </p>

                  <div className="blog-card-footer">
                    <Link to={`/blog/${blog.slug}`} className="blog-read-more">
                      Read More <FaArrowRight className="read-more-arrow" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center" style={{ padding: '60px 20px', background: 'var(--bg-light)', borderRadius: 16 }}>
              <h3>No articles found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try selecting another category or clear your search query.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
