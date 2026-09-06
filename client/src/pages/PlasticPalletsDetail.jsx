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

export default function PlasticPalletsDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Plastic Pallets in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/plastic.webp'],
    'description': 'Heavy-duty HDPE/PP hygiene plastic pallets supplied in Vadodara (Waghodia Road). Ideal for closed-loop warehouse logistics, food, pharma, cold storage, nestable & rackable builds.',
    'sku': 'plastic-pallets',
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
      'url': 'https://sharmapackagings.com/plastic-pallets',
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
      'reviewCount': '112'
    }
  };

  const faqs = [
    {
      q: "Are plastic pallets always better than wooden pallets?",
      a: "No — for one-way or export shipments, wood is generally more cost-effective since the pallet's cost isn't recovered through repeated reuse. Plastic makes the most sense for closed-loop internal logistics or hygiene-regulated environments."
    },
    {
      q: "Do plastic pallets need ISPM 15 certification?",
      a: "No, ISPM 15 applies specifically to solid wood packaging material and doesn't apply to plastic pallets."
    },
    {
      q: "Can plastic pallets be repaired if damaged?",
      a: "Generally no — unlike wood, where a single damaged board can be replaced, a cracked or structurally damaged plastic pallet usually needs to be replaced entirely."
    },
    {
      q: "What's the difference between nestable and rackable plastic pallets?",
      a: "Nestable pallets stack inside each other when empty to save storage space; rackable pallets prioritize load-bearing strength for warehouse racking systems."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'plastic-pallets').slice(0, 3);

  return (
    <div className="product-detail-page plastic-pallets-page">
      <SEOHead 
        title="Plastic Pallets in Vadodara — Built for Closed-Loop Systems That Wood Can't Handle | Sharma Packaging" 
        description="Heavy-duty HDPE/PP plastic pallets in Vadodara. Non-porous hygiene pallets for food, pharma, and cold storage. Nestable and rackable options for closed-loop internal logistics."
        keywords="plastic pallets vadodara, hdpe plastic pallet manufacturer, hygiene plastic pallets food pharma waghodia road, rackable plastic pallets gujarat, nestable plastic pallets"
        canonical="https://sharmapackagings.com/plastic-pallets"
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
            <span className="current">Plastic Pallets</span>
          </div>
        </div>
        <style>{`
          .plastic-hero-grid {
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
            .plastic-hero-grid {
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
        <div className="container plastic-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / PLASTIC PALLETS
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Plastic Pallets in Vadodara — Built for Closed-Loop Systems That Wood Can't Handle
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/plastic.webp" 
                alt="Stacked heavy-duty plastic pallets in a clean warehouse setting at Sharma Packaging Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Closed-Loop Hygienic</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Stacked heavy-duty plastic pallets in a clean warehouse environment at Sharma Packaging Vadodara.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              Not every operation needs an export-compliant wooden pallet. If you're cycling pallets internally between your own warehouses, working in a food, pharma, or hygiene-sensitive environment, or dealing with wet or cold storage conditions, plastic pallets solve problems that wood simply isn't built for. We supply plastic pallets alongside our wooden range so you get an honest recommendation based on your actual operation, not a one-size-fits-all answer.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Moisture and hygiene resistant</strong> — doesn't absorb water, ideal for food, pharma, and cold storage</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>No ISPM 15 treatment needed</strong> — not required for domestic closed-loop or non-wood-regulated shipments</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Long service life</strong> for repeated internal cycling between warehouses or facilities</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Consistent weight and dimensions</strong> — no variation from batch to batch the way natural timber can have</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Washable and easy to sanitize</strong> for regulated industries</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Nestable and rackable options</strong> depending on your storage and handling setup</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request Plastic Pallet Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Plastic Pallet Spec Sheet (PDF)
              </button>
            </div>

            <div className="p-trust-callout" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>
              <FaShieldAlt className="t-icon" style={{ color: 'var(--amber-accent)', fontSize: '1.1rem' }} />
              <span>ISPM 15 Exempt Virgin HDPE/PP & ISO 9001:2015 Certified Supply</span>
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
              Plastic Pallets: When They're Actually Worth the Higher Cost Over Wood
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              We sell far more wooden pallets than plastic ones, and we'll say that upfront rather than pretending otherwise — for most general industrial and export shipping, wood is the more cost-effective and practical choice. But there are specific situations where plastic pallets genuinely solve a problem wood can't, and this page is about being honest regarding exactly when that's true.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Subsection 1 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              The Core Difference: Closed-Loop vs One-Way Shipping
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              The single biggest factor in choosing plastic over wood is whether the pallet is coming back. Plastic pallets cost significantly more upfront than an equivalent wooden pallet — often three to five times as much — which only makes financial sense if the pallet gets reused many times over its service life. This is why plastic pallets are almost always associated with closed-loop internal logistics: a company cycling pallets between its own warehouses, or a manufacturer supplying a retailer under a pallet-pooling arrangement where the same pallets circulate repeatedly rather than being shipped once and discarded or exported.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              For one-way export shipments, where the pallet stays with the buyer or gets discarded at the destination, that upfront cost never gets recovered through reuse — which is exactly why wood remains the standard for export packaging despite plastic's other advantages.
            </p>

            {/* Subsection 2 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Hygiene and Moisture — Where Plastic Genuinely Wins
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Wood is porous. It absorbs moisture, and in food, pharmaceutical, and certain chemical handling environments, that porosity creates a genuine hygiene concern — wood can harbor bacteria, absorb spills, and is difficult to fully sanitize between uses. Plastic pallets solve this directly: they're non-porous, washable, and can be properly sanitized between cycles, which matters significantly for operations under food safety or pharmaceutical handling regulations where pallet hygiene is actually inspected and audited.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Plastic also doesn't degrade, swell, or develop splinters from repeated wet exposure the way wood does, which makes it the more practical choice for cold storage, wet-process manufacturing environments, or any operation where pallets are regularly exposed to water or cleaning chemicals as part of routine operations.
            </p>

            {/* Subsection 3 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              No ISPM 15 Requirement — A Genuine Advantage for Certain Shipments
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Since ISPM 15 regulations specifically target solid wood packaging material to prevent the international spread of wood-boring pests, plastic pallets are exempt from that entire compliance requirement. For domestic closed-loop operations, this is largely irrelevant since ISPM 15 only applies to international shipments anyway — but for companies that do occasionally need to ship internationally and want to avoid the heat-treatment and stamping process altogether, plastic pallets remove that step from the equation entirely.
            </p>

            {/* Subsection 4 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Consistency — Why Some Operations Prefer It
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Natural timber has inherent variation — moisture content, grain density, and minor dimensional differences between individual pieces of wood. For most applications this variation doesn't matter, but for automated warehouse systems, conveyor-based handling, or precision racking setups where consistent pallet dimensions matter for equipment compatibility, plastic pallets' molded, uniform construction removes that variability entirely. Every plastic pallet from the same mold is dimensionally identical in a way that's genuinely difficult to guarantee with natural timber.
            </p>

            {/* Subsection 5 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Where Wood Still Wins, Even for Repeat-Use Applications
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              It's worth being direct about the tradeoffs. Plastic pallets, once cracked or structurally damaged, generally can't be repaired the way a wooden pallet can — you replace the entire unit rather than swapping a single board. For operations with rough handling conditions or a higher rate of pallet damage, that all-or-nothing failure mode can actually work against the long-term cost advantage that repeated reuse is supposed to provide. Wood's repairability is a real advantage in operations where pallets take a beating regularly.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Wood is also generally more resistant to certain chemical exposures and doesn't become brittle in the way some plastics can under prolonged UV exposure or extreme temperature cycling, depending on the plastic grade used.
            </p>

            {/* Subsection 6 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Nestable vs Rackable Plastic Pallets
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Nestable plastic pallets are designed to stack inside one another when empty, saving significant storage space during return transport or empty storage — useful for operations shipping pallets back and forth regularly where empty-pallet storage space is limited. Rackable pallets are designed for stronger load-bearing performance when stored on warehouse racking systems, prioritizing structural strength over space-saving when empty. Which one makes sense depends on your storage setup and whether space efficiency or load capacity is the bigger priority for your operation.
            </p>

            {/* Subsection 7 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Industries That Benefit Most From Plastic Pallets
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Food processing and packaging companies needing washable, hygienic pallets for regulated environments are among our most consistent plastic pallet customers. Pharmaceutical and cold-chain logistics operations also frequently specify plastic due to hygiene requirements and moisture resistance in refrigerated environments. Companies running closed-loop internal logistics between multiple facilities, where the same pallets circulate for years, also benefit from the long-term reuse economics that plastic offers.
            </p>

            {/* Subsection 8 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Making the Right Call for Your Operation
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Tell us whether your pallets are staying in a closed internal loop or going out as part of a shipment that won't come back, whether hygiene or moisture resistance is a genuine operational requirement, and roughly how many cycles you expect a pallet to go through. We'll give you a straight answer on whether plastic's higher upfront cost actually pays off for your situation, rather than defaulting to whichever product has a better margin.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              For plastic pallet sizing, nestable/rackable recommendations, or bulk quotes, call/WhatsApp us directly at <strong>+91 87091 55299</strong> — we provide quick consultation and quotes across Vadodara and Gujarat.
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
              Plastic Pallets Buying FAQs
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
            Not Sure If Plastic or Wood Is Right for Your Operation?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 32, lineHeight: 1.6 }}>
            Tell us how your pallets are actually being used — we'll give you a straight recommendation.
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
          <strong>Plastic Pallets Vadodara</strong>
          <span>Closed-Loop Hygiene & Nestable/Rackable</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Plastic Pallets"
      />
    </div>
  );
}
