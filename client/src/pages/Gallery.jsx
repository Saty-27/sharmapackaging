import { useState } from 'react';
import { FaSearchPlus, FaTimes } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import './Gallery.css';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ['All', 'Wooden Packaging', 'Export Packaging', 'Heavy Machinery', 'Protective Packaging', 'Industrial'];

  const items = [
    { title: 'Seaworthy Wooden Box', category: 'Wooden Packaging', img: '/uploads/seaworthy_wooden_box.png' },
    { title: 'Silpaulin Packing', category: 'Export Packaging', img: '/uploads/silpaulin_packing.jpg' },
    { title: 'Export Packing', category: 'Wooden Packaging', img: '/uploads/export_packing.jpg' },
    { title: 'Vaccum Packaging', category: 'Protective Packaging', img: '/uploads/vaccum_packaging.jpg' },
    { title: 'Wooden Pallets', category: 'Wooden Packaging', img: '/uploads/Wooden-Pallets.png' },
    { title: 'Shrink Wrapping', category: 'Protective Packaging', img: '/uploads/Shrink-Wrapping.jpeg' }
  ];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(i => i.category === activeCategory);

  return (
    <div className="gallery-page">
      <SEOHead title="Project Portfolio & Packaging Gallery | Sharma Packaging" />

      {/* Hero */}
      <section className="gallery-hero section-dark text-center">
        <div className="container">
          <span className="eyebrow eyebrow-amber">PROJECT PORTFOLIO</span>
          <h1>Our Packaging in Action</h1>
          <p className="gallery-hero-sub">
            Explore our real-world execution of heavy-duty wooden skids, seaworthy export crating, shrink wrapping, and cargo protection.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section section-gallery-main">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="gallery-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Asymmetric Portfolio Grid */}
          <div className="portfolio-grid">
            {filteredItems.map((item, idx) => (
              <div 
                key={idx} 
                className="portfolio-card"
                onClick={() => setLightboxImg(item)}
              >
                <img src={item.img} alt={item.title} className="portfolio-img" />
                <div className="portfolio-overlay">
                  <FaSearchPlus className="zoom-icon" />
                  <h3>{item.title}</h3>
                  <span className="p-category">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark text-center gallery-cta">
        <div className="container">
          <h2>Have Similar Industrial Cargo to Pack?</h2>
          <p>Request a custom engineering proposal for your equipment today.</p>
          <button onClick={() => setModalOpen(true)} className="btn btn-accent btn-lg">
            Request Project Quotation →
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}><FaTimes /></button>
            <img src={lightboxImg.img} alt={lightboxImg.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3>{lightboxImg.title}</h3>
              <span>{lightboxImg.category}</span>
            </div>
          </div>
        </div>
      )}

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Portfolio Project Inquiry"
      />
    </div>
  );
}
