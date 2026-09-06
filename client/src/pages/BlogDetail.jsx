import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowRight, FaTag, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import api from '../utils/api';

const DEFAULT_BLOG = {
  title: 'Seaworthy Packing in Vadodara: Complete Guide for Exporters',
  slug: 'seaworthy-packing-in-vadodara-complete-guide',
  category: 'Export Packaging',
  author: 'Sharma Packaging',
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
  metaDescription: 'Get expert seaworthy packing in Vadodara. Read our guide on preventing rust, salt spray, and vibration damage for export machinery using wooden crates.'
};

const DEFAULT_RELATED = [
  {
    _id: 'rel-1',
    title: 'VCI Packaging for Rust Prevention: Complete Guide for Metal Parts',
    slug: 'vci-packaging-for-rust-prevention',
    category: 'VCI Products',
    publishDate: new Date(Date.now() - 86400000 * 2),
    featuredImage: '/uploads/vaccum-packing.jpg',
    excerpt: 'Discover how Volatile Corrosion Inhibitor (VCI) packaging protects automotive parts, bearings, and precision machinery from rust during sea shipping.'
  },
  {
    _id: 'rel-2',
    title: 'How Proper Industrial Packaging Prevents Transit Damage',
    slug: 'how-proper-industrial-packaging-prevents-transit-damage',
    category: 'Industrial Packaging',
    publishDate: new Date(Date.now() - 86400000 * 5),
    featuredImage: '/uploads/Shrink-Wrapping.jpeg',
    excerpt: 'Industrial products often travel long distances and may be exposed to vibration, moisture, dust and repeated handling.'
  },
  {
    _id: 'rel-3',
    title: 'Aluminium Barrier Foil vs Shrink Film: Choosing the Right Protection',
    slug: 'aluminium-barrier-foil-vs-shrink-film',
    category: 'Protective Packaging',
    publishDate: new Date(Date.now() - 86400000 * 8),
    featuredImage: '/uploads/aluminium_foil_preservation.jpg',
    excerpt: 'Compare Moisture Vapor Transfer Rates (MVTR), UV stability, and environmental resistance between aluminium foil and shrink wrapping.'
  }
];

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(DEFAULT_BLOG);
  const [related, setRelated] = useState(DEFAULT_RELATED);
  const [loading, setLoading] = useState(true);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/blogs/${slug}`)
      .then(res => {
        if (res.data && res.data.blog) {
          setBlog(res.data.blog);
          if (res.data.related && res.data.related.length > 0) {
            setRelated(res.data.related);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="loading" style={{ minHeight: '60vh' }}><div className="spinner" /></div>;
  }

  return (
    <>
      <SEOHead
        title={blog.seoTitle || `${blog.title} | Sharma Packaging Blog`}
        description={blog.metaDescription || blog.excerpt}
        canonical={blog.canonicalUrl}
      />

      {/* Article Detail Section */}
      <article className="section section-blog-detail">
        <div className="container">
          {/* Editorial Reading Container (Max 760px) */}
          <div className="article-editorial-wrapper">
            {/* Breadcrumbs */}
            <div className="article-breadcrumb">
              <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>{blog.title}</span>
            </div>

            {/* Category & Meta */}
            <span className="blog-detail-category">{blog.category || 'Packaging Insights'}</span>
            
            <h1 className="article-main-title">{blog.title}</h1>

            <div className="article-meta-row">
              <span className="meta-item"><FaUser className="m-icon" /> {blog.author || 'Sharma Packaging'}</span>
              <span className="meta-divider">•</span>
              <span className="meta-item"><FaCalendarAlt className="m-icon" /> {new Date(blog.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="article-featured-img-wrap">
                <img 
                  src={blog.featuredImage} 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/seaworthy_packing.jpg'; }}
                  alt={blog.title} 
                  className="article-featured-img" 
                />
              </div>
            )}

            {/* Article Rendered Body */}
            <div 
              className="article-html-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            {/* Article Callout Quote CTA Card */}
            <div className="article-cta-box">
              <div className="cta-box-content">
                <h3>Need a Specialized Packaging Solution?</h3>
                <p>Consult with Sharma Packaging engineering experts for custom export crating, VCI anti-rust protection, or heavy machinery logistics.</p>
              </div>
              <button onClick={() => setQuoteOpen(true)} className="btn btn-accent btn-lg">
                Get a Quote <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Related Articles Section */}
          {related.length > 0 && (
            <div className="related-articles-section">
              <h2 className="related-heading">Related Insights</h2>
              <div className="blog-3col-grid">
                {related.map((rel, idx) => (
                  <article key={rel._id || idx} className="blog-card">
                    <Link to={`/blog/${rel.slug}`} className="blog-card-img-link">
                      <img 
                        src={rel.featuredImage || '/uploads/seaworthy_packing.jpg'} 
                        onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/seaworthy_packing.jpg'; }}
                        alt={rel.title} 
                        className="blog-card-img" 
                      />
                      <span className="blog-card-category">{rel.category}</span>
                    </Link>
                    <div className="blog-card-body">
                      <h3 className="blog-card-title">
                        <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                      <p className="blog-card-excerpt">{rel.excerpt}</p>
                      <div className="blog-card-footer">
                        <Link to={`/blog/${rel.slug}`} className="blog-read-more">
                          Read More <FaArrowRight className="read-more-arrow" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <InquiryModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
