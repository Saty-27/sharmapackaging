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

export default function BubbleWrapDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Industrial Bubble Wrap in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/bubblewrap.jpg'],
    'description': 'Industrial polyethylene air bubble wrap rolls in Vadodara (Waghodia Road). Available in 10mm small bubble, 25-32mm large bubble, anti-static ESD pink wrap & custom pre-cut sheets.',
    'sku': 'bubble-wrap',
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
      'url': 'https://sharmapackagings.com/bubble-wrap',
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
      'reviewCount': '138'
    }
  };

  const faqs = [
    {
      q: "What bubble size should I use for heavier items?",
      a: "Larger-diameter bubbles (25-32mm+) provide more cushioning depth and are better suited to heavier products that need to absorb real impact, not just surface protection."
    },
    {
      q: "Do I need anti-static bubble wrap for all electronics?",
      a: "For circuit boards, semiconductors, and most static-sensitive components, yes — standard bubble wrap can generate static that damages these parts even without physical impact."
    },
    {
      q: "Is bubble wrap enough on its own for fragile shipments?",
      a: "For genuinely fragile or high-value items, we'd generally recommend combining bubble wrap with foam or void-fill for layered protection rather than relying on a single material."
    },
    {
      q: "Can you supply pre-cut bubble wrap sheets for a production line?",
      a: "Yes, custom pre-cut sheets sized to your product dimensions are available for high-volume packing operations."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'bubble-wrap').slice(0, 3);

  return (
    <div className="product-detail-page bubble-wrap-page">
      <SEOHead 
        title="Industrial Bubble Wrap in Vadodara — Cushioning Sized to the Product, Not the Roll | Sharma Packaging" 
        description="Air bubble wrap rolls supplier in Vadodara. Small & large bubble diameters, anti-static pink ESD wrap for electronics, heavy-duty film thickness & custom pre-cut sheets."
        keywords="bubble wrap vadodara, air bubble wrap rolls manufacturer, anti static bubble wrap waghodia road, esd pink bubble wrap gujarat, large bubble cushioning roll"
        canonical="https://sharmapackagings.com/bubble-wrap"
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
            <span className="current">Bubble Wrap</span>
          </div>
        </div>
        <style>{`
          .bubble-hero-grid {
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
            .bubble-hero-grid {
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
        <div className="container bubble-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / BUBBLE WRAP
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Industrial Bubble Wrap in Vadodara — Cushioning Sized to the Product, Not the Roll
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/bubblewrap.jpg" 
                alt="Industrial air bubble wrap rolls in various bubble sizes and anti-static grades at Sharma Packaging Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Cushioning Rolls</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Industrial bubble wrap rolls in small/large bubble diameters and anti-static ESD variants at Sharma Packaging Vadodara.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              Bubble wrap seems like the simplest packaging material there is, until the bubble size is wrong for the product weight and it flattens out halfway through transit, leaving nothing between your product and the box wall. We supply bubble wrap in multiple bubble diameters and film thicknesses, including anti-static variants for electronics, matched to what's actually being protected rather than a single generic roll used for everything.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Multiple bubble sizes</strong> — small diameter for light/delicate items, large diameter for heavier cushioning needs</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Anti-static bubble wrap</strong> for electronic components and sensitive equipment</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Heavy-duty film thickness options</strong> that resist popping under moderate handling pressure</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Bulk rolls for production-line packing</strong> operations</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Custom-cut sheets</strong> for high-volume packing lines needing pre-sized cushioning</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Combines with foam and void-fill</strong> for layered protection on fragile shipments</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request Bubble Wrap Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Bubble Spec Sheet (PDF)
              </button>
            </div>

            <div className="p-trust-callout" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>
              <FaShieldAlt className="t-icon" style={{ color: 'var(--amber-accent)', fontSize: '1.1rem' }} />
              <span>High Air Retention Film & ISO 9001:2015 Certified Supply</span>
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
              Bubble Wrap for Industrial and Fragile Goods Packing: Getting the Bubble Size Right
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              Bubble wrap gets treated as an afterthought — grab a roll, wrap the product, done. But the bubble diameter and film thickness genuinely matter for whether it actually protects what's inside, and using the wrong grade is one of the more common (and easily fixed) causes of damage claims on fragile shipments. This page covers what actually goes into choosing the right bubble wrap for your product.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Subsection 1 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Bubble Size — Why It's Not Just a Cosmetic Difference
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Small-diameter bubbles (generally around 10mm) provide a tighter, more form-fitting cushion suited to lighter, smaller, or more delicate items where the goal is close-contact protection against scratching and minor impact rather than absorbing significant shock. Large-diameter bubbles (25-32mm or larger) hold more air per bubble and provide significantly more cushioning depth, making them the right choice for heavier items or products that need to absorb a real impact — a drop or a hard knock during handling — rather than just surface protection.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Using small-diameter bubble wrap on a heavier item often results in the bubbles compressing flat almost immediately under the product's own weight, leaving little actual cushioning by the time the shipment reaches its destination. This is one of the simplest packaging mistakes to fix, and one of the most common we see when customers switch to us from a previous supplier who used one bubble size across every product regardless of weight.
            </p>

            {/* Subsection 2 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Film Thickness and Puncture Resistance
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Beyond bubble diameter, the film thickness itself determines how much handling and pressure the bubbles can withstand before popping. Thinner film is more cost-effective for lighter products with minimal handling risk, but for products with sharp edges, corners, or any risk of puncture during packing or transit, a heavier-gauge film resists popping and maintains its cushioning function for the full journey rather than failing partway through.
            </p>

            {/* Subsection 3 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Anti-Static Bubble Wrap for Electronics
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Standard bubble wrap can actually generate or hold a static charge, which is a real risk for sensitive electronic components — a static discharge during handling or unpacking can damage circuit boards or other static-sensitive parts even without any physical impact occurring. Anti-static (or pink) bubble wrap is treated to dissipate static charge rather than build it up, and is the standard requirement for packing circuit boards, semiconductors, and most electronic assemblies. If you're packing electronics and using standard clear bubble wrap, this is worth switching regardless of what else is in your packing process.
            </p>

            {/* Subsection 4 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Bubble Wrap vs Foam — When Each Makes More Sense
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Bubble wrap is faster to apply, more flexible around irregular shapes, and generally more cost-effective for moderate protection needs. Foam, particularly custom-cut foam inserts, provides more consistent and often higher-density cushioning for genuinely fragile or high-value items, and holds its shape and cushioning performance more reliably under sustained compression over a long transit period, where bubble wrap can gradually lose some of its cushioning as bubbles slowly deflate under continuous pressure. For lower-value or moderately fragile items, bubble wrap alone is usually sufficient; for high-value, precision, or genuinely fragile items, we often recommend combining bubble wrap with foam or using foam alone as the primary cushioning layer.
            </p>

            {/* Subsection 5 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Layering for Genuinely Fragile Shipments
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              For products with a real risk of transit damage, a single layer of any cushioning material is rarely the complete answer. A combination approach — an inner layer of bubble wrap directly against the product, surrounded by void-fill or foam within the outer box, with the box itself appropriately rated for the product weight — provides redundant protection where no single point of failure results in damage. We can advise on this layered approach for genuinely fragile or high-value shipments rather than just supplying a roll of bubble wrap and leaving the rest of the packing strategy to guesswork.
            </p>

            {/* Subsection 6 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Custom-Cut Sheets for Production Lines
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              For high-volume packing operations, pre-cut bubble wrap sheets sized to the exact product dimensions speed up the packing process significantly compared to staff cutting from a bulk roll for every unit. We supply custom pre-cut sheets for production-line packing operations where consistent sizing and packing speed matter as much as the protection itself.
            </p>

            {/* Subsection 7 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Industries We Supply
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Electronics manufacturers and assemblers rely on our anti-static bubble wrap for circuit boards and sensitive components. General manufacturing and export operations across Vadodara use standard bubble wrap as part of broader packing material supply for moderate-fragility goods. Precision instrument and equipment manufacturers often combine our bubble wrap with foam inserts for higher-value shipments.
            </p>

            {/* Subsection 8 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Ordering
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Tell us what you're packing, its approximate weight and fragility, and whether it's an electronic or static-sensitive component. We'll recommend the right bubble diameter and film thickness, and flag if anti-static film or a combined foam approach makes more sense for your product.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              For bulk rolls or pre-cut sheet supply, call/WhatsApp us directly at <strong>+91 87091 55299</strong> — we provide prompt roll delivery and bulk pricing across Vadodara and Gujarat.
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
              Bubble Wrap Buying FAQs
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
            Fragile Shipments Arriving Damaged Despite Being "Bubble Wrapped"?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 32, lineHeight: 1.6 }}>
            It's often the bubble size or film thickness, not the concept — let's get the spec right.
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
          <strong>Bubble Wrap Vadodara</strong>
          <span>Small/Large Bubble & Anti-Static ESD</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Bubble Wrap"
      />
    </div>
  );
}
