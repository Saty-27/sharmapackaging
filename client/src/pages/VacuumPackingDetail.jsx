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

export default function VacuumPackingDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Vacuum Barrier Packing in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/vaccum-packing.jpg'],
    'description': 'Hermetically sealed multi-layer aluminium barrier foil vacuum packaging combined with VCI & desiccants in Vadodara (Waghodia Road). 100% rust-free ocean shipping & long-term storage.',
    'sku': 'vacuum-packing',
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
      'url': 'https://sharmapackagings.com/vacuum-packing',
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
      'reviewCount': '146'
    }
  };

  const faqs = [
    {
      q: "Is vacuum packing the same as just wrapping something in plastic?",
      a: "No — vacuum packing removes the air entirely before sealing, which is what actually prevents the moisture and oxygen buildup that causes corrosion. A loose plastic wrap doesn't do this."
    },
    {
      q: "Do I need VCI barrier film, or is vacuum sealing alone enough?",
      a: "Vacuum sealing alone helps, but VCI barrier film provides an active corrosion-inhibiting layer that protects against the residual moisture and air that's almost always present even after evacuation — for genuine long-term protection, we'd recommend both together."
    },
    {
      q: "Can vacuum packing be used alongside wooden crating?",
      a: "Yes, and for most industrial shipments it should be — vacuum/VCI packing handles environmental corrosion protection while the crate handles structural and impact protection."
    },
    {
      q: "How much desiccant do I need inside a vacuum-sealed package?",
      a: "It depends on the package's internal air volume and the expected storage or transit duration — tell us both and we'll calculate the right quantity."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'vacuum-packing' && p.slug !== 'vaccum-packing').slice(0, 3);

  return (
    <div className="product-detail-page vacuum-packing-page">
      <SEOHead 
        title="Vacuum Barrier Packing in Vadodara — Airtight Protection for Machinery & Metal Components | Sharma Packaging" 
        description="Vacuum barrier foil packing in Vadodara. VCI corrosion inhibitors, full air evacuation, silica gel desiccants & 3D custom bags for long-term machinery storage & sea freight."
        keywords="vacuum packing vadodara, aluminium barrier foil vacuum packing waghodia road, vci vacuum packaging gujarat, rust free export packing baroda, machinery vacuum sealing"
        canonical="https://sharmapackagings.com/vacuum-packing"
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
            <span className="current">Vacuum Packing</span>
          </div>
        </div>
        <style>{`
          .vacuum-hero-grid {
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
            .vacuum-hero-grid {
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
        <div className="container vacuum-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / VACUUM PACKING
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Vacuum Barrier Packing in Vadodara — Airtight Protection for Machinery and Metal Components
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/vaccum-packing.jpg" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/vaccum_packaging.jpg'; }}
                alt="Precision machinery component inside a vacuum-sealed VCI barrier bag showing tight air evacuation at Sharma Packaging Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Airtight Protection</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Precision machinery component inside a vacuum-sealed VCI barrier bag showing tight air evacuation at Sharma Packaging Vadodara.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              Rust doesn't need much to start — trapped humidity inside a sealed box is often enough. For metal components, precision machinery, and electronics headed into long-term storage or overseas shipment, vacuum packing combined with a proper VCI (vapor corrosion inhibitor) barrier removes that risk entirely by eliminating the air and moisture that corrosion needs to take hold. We handle vacuum barrier packing for industrial components at our Vadodara facility, sized for everything from small precision parts to full machinery assemblies.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>VCI barrier film</strong> that actively prevents corrosion on metal surfaces</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Full air evacuation</strong> for a true airtight seal, not just a loose wrap</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Desiccant integration</strong> to manage any residual internal humidity</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Custom bag and barrier sizing</strong> for machinery, components, and irregular shapes</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Suitable for long-term storage & extended sea freight</strong> where humidity exposure spans weeks</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Combines with wooden crating</strong> for full structural and environmental protection</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request Vacuum Packing Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Vacuum Spec Sheet (PDF)
              </button>
            </div>

            <div className="p-trust-callout" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>
              <FaShieldAlt className="t-icon" style={{ color: 'var(--amber-accent)', fontSize: '1.1rem' }} />
              <span>MIL-PRF-131K Class 1 Barrier Foil & ISO 9001:2015 Certified Sealing</span>
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
              Vacuum Packing and VCI Barriers: Real Corrosion Protection for Metal Components
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              If you've ever opened a container after a long sea voyage and found rust spots on parts that were supposedly protected, the problem almost certainly wasn't the crate — it was the absence of a proper vacuum and VCI barrier inside it. This page explains what vacuum packing actually does, why it's different from just wrapping something in plastic, and when it's worth specifying for your shipment.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Subsection 1 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Why Trapped Air Is the Actual Enemy
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Corrosion needs three things: metal, oxygen, and moisture. A sealed package that still contains air also contains oxygen and, almost always, some amount of trapped humidity — even in a dry climate, ambient air carries moisture, and temperature fluctuations during a long journey cause that moisture to condense on cooler metal surfaces inside the package. This is why a part that looked dry when it was packed can develop surface rust weeks later without ever being exposed to external water.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Vacuum packing solves this at the source by evacuating the air entirely before sealing, dramatically reducing the oxygen and moisture available to cause corrosion in the first place. Combined with a VCI barrier film, which releases a protective vapor that forms a molecular-level protective layer on exposed metal surfaces, the combination addresses both the air/moisture problem and any residual risk from the small amount of air that remains in practice.
            </p>

            {/* Subsection 2 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              What VCI Actually Does
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Vapor corrosion inhibitor material — whether as a barrier film, paper, or emitter packet — releases a corrosion-inhibiting vapor inside the sealed environment that settles on metal surfaces and forms a temporary protective layer, without requiring oil, grease, or wax coatings that would need to be cleaned off before the part can be used or installed. This is a significant practical advantage over traditional rust prevention methods for parts that need to go straight into use at the destination without an additional cleaning step.
            </p>

            {/* Subsection 3 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              When Vacuum Packing Is Worth Specifying
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Not every shipment needs this level of protection — for domestic shipments with a short transit time and no extended storage period, standard packaging is often perfectly adequate. Vacuum packing with VCI becomes genuinely important when: the shipment involves a long sea voyage where the package will experience weeks of temperature and humidity fluctuation, the components are precision-machined parts where even light surface corrosion would affect fit or function, or the equipment is going into extended storage before installation or use, sometimes for months after arrival.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              We'd rather tell a customer honestly that their shipment doesn't need this level of protection than sell an unnecessary service — a short domestic delivery of robust components generally doesn't justify the cost, while an export shipment of precision bearings heading for three weeks at sea almost certainly does.
            </p>

            {/* Subsection 4 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Combining Vacuum Packing With Structural Crating
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Vacuum packing protects against environmental corrosion, but it doesn't provide impact or crush protection the way a wooden crate does. For most industrial shipments, the right approach combines both — the component goes into a vacuum-sealed VCI barrier first, then that sealed package goes inside a properly built wooden crate for structural protection during handling and transit. Doing one without the other leaves a gap: a crate alone doesn't stop corrosion, and a vacuum bag alone doesn't stop crushing or impact damage during rough handling.
            </p>

            {/* Subsection 5 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Desiccant's Role Alongside Vacuum and VCI
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Even with air evacuation and VCI barrier film, some residual moisture is nearly always present, particularly for parts that weren't in a fully controlled environment before packing. Desiccant packs placed inside the sealed package absorb this residual moisture over the storage or transit period, providing a third layer of protection alongside the vacuum seal and the VCI barrier. For longer voyages or extended storage periods, we calculate desiccant quantity based on the package's internal volume and expected duration rather than using a fixed amount regardless of the shipment specifics.
            </p>

            {/* Subsection 6 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Custom Sizing for Irregular Components
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Standard vacuum bags work fine for regularly shaped, smaller components, but machinery parts are frequently irregular — housings with protruding fittings, assemblies with multiple components at different heights, parts with sharp edges that can puncture a standard bag if not accounted for. We size and, where necessary, reinforce the barrier film around the actual shape and edge profile of what's being packed, rather than forcing an irregular part into an ill-fitting standard bag that risks tearing during the vacuum process itself.
            </p>

            {/* Subsection 7 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Industries We Serve
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Precision machinery and tooling manufacturers, automotive component producers, and electronics manufacturers across Vadodara and Gujarat's industrial belt are our primary vacuum packing customers — anywhere metal or electronic components face genuine corrosion risk during storage or long-distance shipment.
            </p>

            {/* Subsection 8 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Ordering
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Tell us what's being packed, its approximate dimensions and shape, and the expected transit or storage duration. We'll recommend the right combination of vacuum sealing, VCI barrier type, and desiccant quantity, and let you know whether it also needs to go inside a structural crate for handling protection.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              For export machinery vacuum packing or on-site packaging service, call/WhatsApp us directly at <strong>+91 87091 55299</strong> — we provide same-day site visits and quotes across Vadodara and Gujarat.
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
              Vacuum Packing FAQs
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
            Shipping Metal Components on a Long Voyage or Into Storage?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 32, lineHeight: 1.6 }}>
            Don't let trapped humidity undo good packaging — let's get it properly vacuum-sealed.
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
          <strong>Vacuum Packing Vadodara</strong>
          <span>VCI Barrier Foil, Air Evacuation & Desiccants</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Vacuum Packing"
      />
    </div>
  );
}
