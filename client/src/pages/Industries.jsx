import { useState } from 'react';
import { FaArrowRight, FaIndustry, FaCheckCircle } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import { INDUSTRIES } from '../data/productsData';
import './Industries.css';

export default function Industries() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInd, setSelectedInd] = useState('');

  const handleOpenQuote = (indName) => {
    setSelectedInd(`Industry Solution: ${indName}`);
    setModalOpen(true);
  };

  return (
    <div className="industries-page">
      <SEOHead title="Packaging Solutions Across Industries | Sharma Packaging" />

      {/* Hero Banner */}
      <section className="industries-hero section-dark text-center">
        <div className="container">
          <span className="eyebrow eyebrow-amber">SECTOR SECTORIAL EXPERTISE</span>
          <h1>Packaging Solutions Across Industries</h1>
          <p className="ind-hero-p">
            Engineered cargo protection tailored for heavy machinery, automotive OEMs, electrical transformers, pharmaceutical export, and chemical manufacturing.
          </p>
        </div>
      </section>

      {/* Industries Showcase Grid */}
      <section className="section section-ind-showcase">
        <div className="container">
          <div className="ind-cards-stack">
            {INDUSTRIES.map((ind, idx) => (
              <div key={idx} className="ind-big-card card">
                <div className="ind-card-img-box">
                  <img src={ind.image} onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/hero_bg.png'; }} alt={ind.name} className="ind-big-img" />
                </div>

                <div className="ind-card-details">
                  <span className="eyebrow">SECTOR {idx + 1}</span>
                  <h2>{ind.name}</h2>
                  <p className="ind-p-desc">{ind.desc}</p>

                  <div className="ind-specs-box">
                    <h4>Tailored Packaging Compliance:</h4>
                    <div className="ind-spec-tags">
                      <span className="badge badge-navy">✓ Heavy-Duty Skids</span>
                      <span className="badge badge-blue">✓ Seaworthy Moisture Barrier</span>
                      <span className="badge badge-amber">✓ ISO 9001:2015 Certified</span>
                    </div>
                  </div>

                  <button onClick={() => handleOpenQuote(ind.name)} className="btn btn-primary">
                    Get Industry Quotation <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-dark text-center custom-ind-cta">
        <div className="container">
          <h2>Shipping Specialized Industrial Cargo?</h2>
          <p>Talk directly to our packaging engineers for custom load calculations and timber recommendations.</p>
          <button onClick={() => handleOpenQuote('Specialized Cargo')} className="btn btn-accent btn-lg">
            Talk to an Industrial Engineer
          </button>
        </div>
      </section>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={selectedInd}
      />
    </div>
  );
}
