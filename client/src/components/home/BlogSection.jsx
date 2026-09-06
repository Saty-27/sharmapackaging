import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../../utils/api';

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

export default function BlogSection() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);

  useEffect(() => {
    api.get('/blogs/featured?limit=6')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setBlogs(res.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section section-blog section-bg-light">
      <div className="container">
        {/* Section Intro Header */}
        <div className="section-header text-center">
          <span className="eyebrow eyebrow-amber">FROM OUR BLOG</span>
          <h2>Insights & Packaging Knowledge</h2>
          <p>
            Practical insights, packaging knowledge and industry updates from Sharma Packaging.
          </p>
        </div>

        {/* 3x2 Desktop Blog Grid */}
        <div className="blog-3col-grid">
          {blogs.slice(0, 6).map((blog, idx) => (
            <motion.article 
              key={blog._id || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
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

        {/* View All Insights CTA */}
        <div className="text-center" style={{ marginTop: 48 }}>
          <Link to="/blog" className="btn btn-outline btn-lg">
            View All Insights <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
