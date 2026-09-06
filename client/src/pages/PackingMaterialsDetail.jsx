import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaArrowRight, 
  FaFilePdf, 
  FaPhoneAlt, 
  FaShieldAlt, 
  FaChevronDown, 
  FaChevronUp, 
  FaQuestionCircle 
} from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import { PRODUCTS } from '../data/productsData';

export default function PackingMaterialsDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Industrial Packing Materials in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/packing-materials.jpg'],
    'description': 'Full range of industrial protective packing consumables in Vadodara (Waghodia Road). Foam cushioning, VCI paper/film, desiccant bags, void-fill, edge boards & corner guards in bulk.',
    'sku': 'packing-materials',
    'brand': {
      '@type': 'Brand',
      'name': 'Sharma Packaging'
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': 'Sharma Packaging',
      'logo': 'https://sharmapackagings.com/sharma_packaging_logo.png',
      'url': 'https://sharmapackagings.com'
    },
    'offers': {
      '@type': 'Offer',
      'url': 'https://sharmapackagings.com/packing-materials',
      'priceCurrency': 'INR',
      'price': '0.00',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Sharma Packaging'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '135'
    }
  };

  const faqs = [
    {
      q: "Can I buy packing materials without using your full crating service?",
      a: "Yes, materials are available separately in bulk for customers handling their own in-house packing."
    },
    {
      q: "How do I know how much desiccant I need?",
      a: "It depends on the sealed package's internal volume and the expected storage or transit duration — tell us both and we'll recommend the right quantity."
    },
    {
      q: "Do you supply anti-static foam for electronics?",
      a: "Yes, anti-static and ESD-safe foam is available for sensitive electronic components."
    },
    {
      q: "Can materials be custom-cut to fit an irregular-shaped product?",
      a: "Yes, custom-cut foam inserts matched to your product's exact shape are one of our most requested items for fragile or oddly-shaped components."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'packing-materials').slice(0, 3);

  return (
    <div className="product-detail-page packing-materials-page">
      <SEOHead 
        title="Industrial Packing Materials in Vadodara — Everything Between the Product and the Damage | Sharma Packaging" 
        description="Full range of industrial protective packaging consumables in Vadodara. Foam cushioning, void fill, VCI paper/film, desiccant packs, edge boards & corner guards in bulk supply."
        keywords="industrial packing materials vadodara, packaging consumables supplier waghodia road, vci paper film gujarat, desiccant packs silica gel, edge board corner guards, cushioning foam inserts"
        canonical="https://sharmapackagings.com/packing-materials"
        schema={productSchema}
      />

      {/* Breadcrumb Header */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="breadcrumb-trail">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/products">Products</Link>
            <span className="sep">/</span>
            <span className="current">Packing Materials</span>
          </div>
        </div>
        <style>{`
          .packing-mat-hero-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            grid-template-areas:
              "title image"
              "body image";
            gap: 20px 48px;
            align-items: start;
          }

          .hero-title-col { grid-area: title; }
          .hero-image-col { grid-area: image; }
          .hero-body-col { grid-area: body; }

          .seo-guide-card {
            background: #FFFFFF;
            padding: 40px 44px;
            border-radius: 20px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          }

          @media (max-width: 992px) {
            .packing-mat-hero-grid {
              display: flex !important;
              flex-direction: column !important;
              gap: 24px !important;
            }
            .hero-title-col { order: 1 !important; }
            .hero-image-col { order: 2 !important; }
            .hero-body-col { order: 3 !important; }

            .seo-guide-card {
              padding: 24px 16px !important;
              border-radius: 16px !important;
            }

            .p-title-text {
              font-size: 1.75rem !important;
            }
          }
        `}</style>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO (TWO COLUMN: LEFT CONTENT / RIGHT IMAGE) */}
      {/* ========================================================================= */}
      <section className="section product-main-section" style={{ padding: '40px 0 64px', background: '#FFFFFF' }}>
        <div className="container packing-mat-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / PACKING MATERIALS
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Industrial Packing Materials in Vadodara — Everything Between the Product and the Damage
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/packing-materials.jpg" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/industrial_packing_materials.jpg'; }}
                alt="Assortment of industrial packing materials including foam, VCI paper, desiccants, and edge protectors at Sharma Packaging Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Consumables & Fillers</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Assortment of industrial packing materials — foam sheets, VCI paper rolls, desiccant packs, and edge protectors at Sharma Packaging Vadodara.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              A crate or a pallet only does half the job. What goes inside — the cushioning, the void fill, the moisture barriers, the corner protection — is usually what actually determines whether your product arrives the way it left the factory. We supply the full range of packing materials used across our own crating and export work, available separately for customers who handle their own packing in-house but need reliable material sourced from one supplier instead of five.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Cushioning foam and corner protectors</strong> for fragile or edge-vulnerable products</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Void-fill materials</strong> to stop movement inside boxes and crates during transit</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>VCI (vapor corrosion inhibitor) paper and film</strong> for metal components</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Desiccant packs and moisture absorbers</strong> for humidity-sensitive cargo</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Edge boards and corner guards</strong> for palletized carton stability</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Bulk supply available</strong> for regular production-line packing needs</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request Packing Materials Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Materials Catalog (PDF)
              </button>
            </div>

            <div className="p-trust-callout" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>
              <FaShieldAlt className="t-icon" style={{ color: 'var(--amber-accent)', fontSize: '1.1rem' }} />
              <span>Tested Industrial Protection & ISO 9001:2015 Certified Supply</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — FULL SEO CONTENT (BELOW THE FOLD) */}
      {/* ========================================================================= */}
      <section className="section section-bg-light" style={{ padding: '64px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: 1040, margin: '0 auto' }}>
          
          <div className="seo-guide-card">
            
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--navy-dark)', marginBottom: 20, lineHeight: 1.3 }}>
              Packing Materials: The Part of the Shipment Nobody Notices Until Something Breaks
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              Most damage claims we see aren't caused by a failed crate or a collapsed pallet — they're caused by what was (or wasn't) inside the box. A product that shifts three inches inside a carton during a rough truck ride, a metal part that picks up surface rust because there was no moisture barrier, a fragile edge that wasn't cushioned before the crate lid went on. This page covers the actual materials that prevent those problems, and when each one is worth using.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Subsection 1 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Cushioning Foam — Matching Density to the Actual Risk
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Foam cushioning isn't one product — density and thickness need to match the weight of what's being protected and how fragile it is. Too soft a foam under a heavy component compresses flat under load and stops cushioning anything after the first few hours of transit vibration; too rigid a foam on a delicate edge doesn't absorb impact the way it needs to. We supply foam sheets and custom-cut inserts sized to the actual product, rather than generic sheets that get cut down roughly on-site and leave gaps.
            </p>

            {/* Subsection 2 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Void Fill — Why Empty Space Is the Enemy
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Any gap between the product and the box wall is room for the product to shift, and shifting during transit is one of the most common causes of damage that has nothing to do with the outer packaging failing. Void fill material — whether that's foam blocks, paper-based fill, or engineered inserts — exists purely to eliminate that movement. For irregular-shaped products, custom-cut foam inserts that match the product's exact silhouette do a far better job than loose fill material, since loose fill can compress and settle over a long journey, leaving gaps that weren't there when the box was first packed.
            </p>

            {/* Subsection 3 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              VCI Paper and Film — Rust Prevention for Metal Components
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Vapor corrosion inhibitor (VCI) material releases a protective vapor inside a sealed package that forms an invisible layer on metal surfaces, preventing oxidation without needing oil or grease coatings that have to be cleaned off later. This is standard practice for machined parts, tooling, bearings, and any metal component that's going into storage or long-distance shipment where humidity exposure is a risk. We supply VCI paper for wrapping individual components and VCI film for larger sealed packaging, both compatible with our vacuum packing service for combined moisture and corrosion protection.
            </p>

            {/* Subsection 4 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Desiccants — Managing Humidity Inside Sealed Packaging
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Once a package is sealed — inside a vacuum bag, a shrink-wrapped crate, or a moisture-barrier box — any humidity already trapped inside needs somewhere to go, or it condenses on the product itself. Desiccant packs (typically silica gel) absorb that trapped moisture over the shipment or storage period. The right quantity depends on the package's internal volume and expected storage duration — under-packing desiccant for a long sea voyage is a common mistake that leads to condensation damage that shows up only when the container is opened at the destination.
            </p>

            {/* Subsection 5 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Edge Boards and Corner Protectors — Protecting Palletized Cartons
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              When cartons are strapped or stretch-wrapped onto a pallet, the strapping tension alone can crush carton edges and corners if there's nothing reinforcing them. Edge boards (also called edge protectors) run along the vertical corners of a palletized stack, spreading the strapping pressure across a wider surface instead of concentrating it on the carton's actual corner. This is a small, inexpensive addition that prevents a surprisingly common form of damage — crushed corners that compromise the whole carton's structural integrity even when the contents inside are untouched.
            </p>

            {/* Subsection 6 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Buying Packing Materials Separately vs Through Our Crating Service
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Some customers handle their own in-house packing and just need reliable material sourced consistently — for these customers, we supply foam, VCI material, desiccants, and edge protection in bulk, sized to your specifications. Other customers prefer we handle the full crating and packing process end-to-end, in which case these materials are already built into that service. Either way, the material specification doesn't change — we use the same quality internally that we sell separately, since we're the ones who have to stand behind the shipment either way.
            </p>

            {/* Subsection 7 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Industries We Supply
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Automotive component manufacturers use VCI paper and foam cushioning heavily for machined parts shipments. Electronics and precision equipment manufacturers rely on anti-static foam and moisture control for sensitive components. Export-focused manufacturers across Gujarat's industrial belt use desiccants and VCI film together for long sea-freight journeys where humidity exposure over weeks, not days, is the real risk.
            </p>

            {/* Subsection 8 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Ordering
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Tell us what you're packing, roughly how fragile or moisture-sensitive it is, and whether you need one-off quantities or a recurring bulk supply arrangement for regular production packing. For recurring orders, we can set up standing supply so your packing line doesn't run short mid-production.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              For fast assistance or standing orders, call/WhatsApp us directly at <strong>+91 87091 55299</strong> — we can review your packing requirements and send a customized quote on the same day.
            </p>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="section" style={{ padding: '64px 0', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-header text-center" style={{ marginBottom: 40 }}>
            <span className="eyebrow eyebrow-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <FaQuestionCircle /> FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--navy-dark)', marginTop: 6 }}>
              Packing Materials Buying FAQs
            </h2>
          </div>

          <div className="faq-accordion-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="faq-item-card"
                style={{ 
                  borderRadius: 14, 
                  border: '1px solid #E2E8F0', 
                  overflow: 'hidden',
                  background: openFaqIndex === idx ? '#F8FAFC' : '#FFFFFF',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--navy-dark)',
                    fontWeight: 700,
                    fontSize: '1.05rem'
                  }}
                >
                  <span>Q: {faq.q}</span>
                  {openFaqIndex === idx ? <FaChevronUp style={{ color: 'var(--blue-royal)', flexShrink: 0 }} /> : <FaChevronDown style={{ color: '#94A3B8', flexShrink: 0 }} />}
                </button>

                {openFaqIndex === idx && (
                  <div style={{ padding: '0 24px 22px', fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, borderTop: '1px dashed #E2E8F0', paddingTop: 16 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — CLOSING CTA BAND */}
      {/* ========================================================================= */}
      <section className="section-dark text-center" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1456D9 100%)', padding: '64px 0', color: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 12, color: '#FFFFFF' }}>
            Sourcing Packing Materials From Multiple Suppliers?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 32, lineHeight: 1.6 }}>
            Get foam, VCI, desiccants, and edge protection from one reliable source instead.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setModalOpen(true)} className="btn btn-accent btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Request a Quote <FaArrowRight />
            </button>
            <a href="tel:+918709155299" className="btn btn-outline btn-lg" style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <FaPhoneAlt /> Call +91 87091 55299
            </a>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section section-related" style={{ background: '#F8FAFC', padding: '64px 0' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: 36 }}>
            <span className="eyebrow">EXPLORE MORE</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy-dark)' }}>Related Packaging Solutions</h2>
          </div>

          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="product-card card" style={{ background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <div className="card-img-wrapper" style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img src={rel.image} alt={rel.name} className="product-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="category-badge" style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(11,31,58,0.85)', color: '#fff', fontSize: '0.75rem', padding: '4px 10px', borderRadius: 12 }}>{rel.category}</span>
                </div>
                <div className="card-body" style={{ padding: 20 }}>
                  <h3 className="product-name" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 8 }}>{rel.name}</h3>
                  <p className="product-desc" style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, marginBottom: 16 }}>{rel.description}</p>
                  <div className="card-actions">
                    <Link to={`/${rel.slug}`} className="btn btn-outline btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                      View Product →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Quote CTA */}
      <div className="sticky-mobile-cta">
        <div>
          <strong>Packing Materials Vadodara</strong>
          <span>Bulk Foam, VCI, Desiccants & Edge Protection</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Industrial Packing Materials"
      />
    </div>
  );
}
