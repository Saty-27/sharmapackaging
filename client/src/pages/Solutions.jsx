import { useState } from 'react';
import { FaCheckCircle, FaArrowRight, FaCogs, FaEnvelope } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import { SOLUTIONS } from '../data/productsData';
import './Solutions.css';

export default function Solutions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState('');

  const handleOpenQuote = (solTitle) => {
    setSelectedSolution(solTitle);
    setModalOpen(true);
  };

  return (
    <div className="solutions-page">
      <SEOHead title="Industrial Packaging Solutions | Sharma Packaging" />

      {/* Hero Banner */}
      <section className="solutions-hero section-dark text-center">
        <div className="container">
          <span className="eyebrow eyebrow-amber">ENGINEERED CAPABILITIES</span>
          <h1>Packaging Solutions for Every Shipping Challenge</h1>
          <p className="hero-sub">
            From heavy multi-ton machinery skids to ocean export corrosion barriers, our custom packaging solutions keep your shipments safe across global supply chains.
          </p>
        </div>
      </section>

      {/* Solutions Cards Grid */}
      <section className="section section-solutions-list">
        <div className="container">
          <div className="solutions-cards-stack">
            {SOLUTIONS.map((sol, idx) => (
              <div key={sol.id} className="sol-detail-card card">
                <div className="sol-card-header">
                  <span className="sol-badge">SOLUTION {idx + 1}</span>
                  <div className="sol-detail-img-box">
                    <img 
                      src={sol.image} 
                      onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/hero_bg.png'; }} 
                      alt={sol.title} 
                      className="sol-detail-img" 
                    />
                  </div>
                </div>

                <div className="sol-card-body">
                  <h2>{sol.title}</h2>
                  <p className="sol-main-desc">{sol.description}</p>

                  <div className="sol-benefits-grid">
                    <h4>Engineered Key Benefits:</h4>
                    <div className="b-grid">
                      {sol.benefits.map((b, i) => (
                        <div key={i} className="b-check">
                          <FaCheckCircle className="bc-icon" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sol-action-row">
                    <button onClick={() => handleOpenQuote(sol.title)} className="btn btn-primary">
                      Request Solution Quote <FaArrowRight />
                    </button>
                    <a 
                      href={`mailto:info@sharmapackagings.com?subject=${encodeURIComponent('Inquiry for ' + sol.title)}&body=${encodeURIComponent('Hello Sharma Packaging,\n\nI am interested in getting a quote and details for ' + sol.title + '.\n\nThank you!')}`}
                      className="btn btn-outline"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      <FaEnvelope /> Email Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-dark custom-solution-cta text-center">
        <div className="container">
          <h2>Need an On-Site Packaging Team at Your Plant?</h2>
          <p>Our experienced packaging technicians deploy directly to your manufacturing facility for heavy machinery packing.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => handleOpenQuote('On-site Plant Packaging')} className="btn btn-accent btn-lg">
              Schedule On-Site Consultation
            </button>
            <a 
              href="mailto:info@sharmapackagings.com?subject=On-site%20Plant%20Packaging%20Consultation" 
              className="btn btn-outline btn-lg" 
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <FaEnvelope /> Email Us Directly
            </a>
          </div>
        </div>
      </section>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={selectedSolution}
      />
    </div>
  );
}
