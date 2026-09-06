import { useState } from 'react';
import { FaShieldAlt, FaAward, FaCogs, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import './About.css';

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="about-page">
      <SEOHead title="About Sharma Packaging | Packaging Expertise Built Around Your Business" />

      {/* Hero */}
      <section className="about-hero section-dark text-center">
        <div className="container">
          <span className="eyebrow eyebrow-amber">ABOUT SHARMA PACKAGING</span>
          <h1>Packaging Expertise Built Around Your Business</h1>
          <p className="about-hero-sub">
            For over two decades, Sharma Packaging has delivered heavy-duty wooden skids, pallets, export crating, and advanced cargo protection for India's leading manufacturers.
          </p>
        </div>
      </section>

      {/* Story & Approach */}
      <section className="section section-story">
        <div className="container story-grid">
          <div className="story-content">
            <span className="eyebrow">OUR STORY & VISION</span>
            <h2>Protecting Industrial Products From Factory to Global Destination</h2>
            <p className="lead-p">
              Sharma Packaging was established with a singular mission: to eliminate transit damage and moisture oxidation for heavy industrial shipments.
            </p>
            <p>
              We understand that damaged equipment during sea freight or road transit means delayed project commissioning, costly insurance claims, and compromised client trust. That’s why we approach packaging as an engineering discipline — specifying exact load ratings, timber moisture content, ISPM 15 heat treatment, and sub-zero moisture vapor transfer barrier systems.
            </p>
          </div>

          <div className="story-img-wrapper">
            <img src="/uploads/about_us_facility.jpg" alt="Packaging Facility" className="story-img" />
          </div>
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="section section-pillars section-bg-light">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">OUR CORE VALUES</span>
            <h2>Engineering Pillars That Define Our Capability</h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card card">
              <FaShieldAlt className="p-icon" />
              <h3>Uncompromising Protection</h3>
              <p>We specify heavy-duty hardwood timber, multi-ply barrier foils, and VCI technology built to withstand rough ocean freight and storage environments.</p>
            </div>

            <div className="pillar-card card">
              <FaCogs className="p-icon" />
              <h3>Custom Engineering</h3>
              <p>Every wooden crate, skid, and vacuum bag is designed around the exact dimensions, weight distribution, and handling requirements of your machinery.</p>
            </div>

            <div className="pillar-card card">
              <FaAward className="p-icon" />
              <h3>ISO 9001:2015 Quality</h3>
              <p>Full ISO 9001:2015 quality management certification ensuring rigorous manufacturing and packaging standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment CTA */}
      <section className="section-dark text-center about-bottom-cta">
        <div className="container">
          <h2>Ready to Secure Your Industrial Cargo?</h2>
          <p>Talk directly to our packaging engineers for custom dimensioning and quotation proposals.</p>
          <button onClick={() => setModalOpen(true)} className="btn btn-accent btn-lg">
            Request Engineering Quotation <FaArrowRight />
          </button>
        </div>
      </section>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="General Corporate Inquiry"
      />
    </div>
  );
}
