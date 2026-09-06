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

export default function WoodenSkidDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Wooden Skids in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/woodenskids.png'],
    'description': 'Heavy-duty timber skids with solid runner construction manufactured in Vadodara (Waghodia Road). ISPM 15 heat-treated for export, custom runner spacing, load capacity up to 10,000+ kg.',
    'sku': 'wooden-skid',
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
      'url': 'https://sharmapackagings.com/wooden-skid',
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
      'reviewCount': '118'
    }
  };

  const faqs = [
    {
      q: "Is a skid cheaper than a pallet?",
      a: "Generally yes, since it uses less timber and skips the full deck construction — but the actual savings depend on your load size and specification."
    },
    {
      q: "Can skids be used for export shipments?",
      a: "Yes, we heat-treat and ISPM 15 stamp export skids the same way we do pallets."
    },
    {
      q: "Will a skid work for stacking in a warehouse?",
      a: "Not usually — skids are built for single loads with their own structural support, not for racking or repeated stacking the way full pallets are."
    },
    {
      q: "Can you build custom runner spacing for an odd-shaped load?",
      a: "Yes, this is actually the most common request we get for skids — send us the load footprint and we'll build to match."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'wooden-skid').slice(0, 3);

  return (
    <div className="product-detail-page wooden-skid-page">
      <SEOHead 
        title="Wooden Skids in Vadodara — A Simpler, Lighter Base for Loads That Don't Need a Full Pallet | Sharma Packaging" 
        description="Heavy-duty timber skids manufactured in Vadodara (Waghodia Road). Lower weight and cost than full pallets, solid runner construction, ISPM 15 heat-treated for export cargo."
        keywords="wooden skids vadodara, heavy duty timber skid manufacturer, runner style wooden skid waghodia road, export wooden skids gujarat, machinery skid base vadodara"
        canonical="https://sharmapackagings.com/wooden-skid"
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
            <span className="current">Wooden Skid</span>
          </div>
        </div>
        <style>{`
          .wooden-skid-hero-grid {
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
            .wooden-skid-hero-grid {
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
        <div className="container wooden-skid-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / WOODEN SKID
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Wooden Skids in Vadodara — A Simpler, Lighter Base for Loads That Don't Need a Full Pallet
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/woodenskids.png" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/Wooden-skid.webp'; }}
                alt="Loaded heavy-duty wooden skid showing solid runner construction at Sharma Packaging Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Runner Construction</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Heavy-duty wooden skid manufactured at our Waghodia Road facility in Vadodara — engineered with solid timber runners for forklift access.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              Not every load needs a full deck-and-block pallet underneath it. If you're moving machinery components, drums, or crates that only need to sit off the floor for forklift access — without the weight and cost of a complete pallet structure — a wooden skid does the job at a lower price point and lower shipping weight. We build skids at our Waghodia Road facility in Vadodara for exactly this use case: functional, load-bearing, and priced right for what it actually needs to do.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Runner-style construction</strong> — solid timber runners support the load without a full bottom deck</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Lower material cost than a full pallet</strong> — same forklift compatibility, less timber used</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Custom lengths and runner spacing</strong> — built around your specific crate or drum footprint</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>ISPM 15 heat-treated available</strong> for international export shipments</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Suitable for one-way & single-use shipping</strong> where a full pallet would be overkill</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Load ratings matched to your cargo</strong> — from light electronics packaging to mid-weight machinery bases</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request a Skid Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Skid Spec Sheet (PDF)
              </button>
            </div>

            <div className="p-trust-callout" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>
              <FaShieldAlt className="t-icon" style={{ color: 'var(--amber-accent)', fontSize: '1.1rem' }} />
              <span>ISPM 15 HT Stamped & ISO 9001:2015 Certified Manufacturing</span>
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
              Wooden Skids: What They Are, When to Use Them, and Why They're Not Just "Cheap Pallets"
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              A lot of people ask us for a "skid" and mean a pallet, and a lot of people ask for a "pallet" when a skid would actually be the smarter, cheaper choice. The confusion is understandable — both sit under a load, both get lifted by forklift — but the construction and the use case are genuinely different, and picking the right one saves you money without compromising your shipment.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Subsection 1 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              What Actually Makes a Skid Different From a Pallet
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              A standard pallet has a full deck — top boards, sometimes bottom boards too, running across a set of stringers or blocks — designed to distribute weight evenly across a wide surface and support repeated stacking and handling. A skid strips that down to the essentials: runners (the load-bearing timber rails) with the load sitting directly on or fixed to them, often without a full deck surface at all.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              That means less timber, less weight, and a lower cost — which matters a lot when you're shipping internationally and every kilogram affects freight cost, or when you're producing hundreds of units and the pallet cost adds up fast across a production run. The tradeoff is that skids generally aren't meant for repeated heavy-duty warehouse racking or long-term reuse the way a full pallet is. They're built for a specific job: get this one load off the floor, onto a forklift, and to its destination.
            </p>

            {/* Subsection 2 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              When a Skid Is the Right Call
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              If you're crating a single piece of machinery, a large drum, or an odd-shaped industrial component that already has its own rigid base or is being built directly into a crate structure, a skid underneath is often all you need — the crate or the equipment's own frame does the structural work, and the skid just needs to lift it and keep it stable. We see this constantly with transformer bases, pump housings, and large valve assemblies where the customer's engineering team has already designed load points into the equipment itself.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              It's also the right call for one-way export shipments where the pallet or skid isn't coming back and doesn't need to survive years of reuse — you're paying for one trip, so there's no reason to overbuild it into a full reusable pallet.
            </p>

            {/* Subsection 3 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              When You Should Ask for a Pallet Instead
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              If your load needs to be stacked in a warehouse, moved repeatedly through a supply chain, or doesn't have its own structural base to sit on a simple runner system, a full pallet is worth the extra material cost. Loose cartons, bagged material, or anything that needs a flat, even surface to sit on and be racked will perform badly on a skid — there's nothing under the middle of the load to support it evenly.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              We'll usually ask what the load looks like and how it's being handled downstream before recommending one over the other. If you tell us "it's a single 400kg pump unit going into an export crate, one-way shipment," a skid is almost certainly the answer. If you tell us "it's 200 cartons that need to be warehouse-racked and reused," that's a pallet conversation.
            </p>

            {/* Subsection 4 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Materials and Build Options
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              We build skids in the same timber options as our pallets — Sal and similar hardwood for heavier, higher-load applications, and Pine or comparable softwood for lighter loads where cost matters more than repeated-handling durability. Runner spacing and length are built to your specific load footprint rather than forced into a standard size, since the whole point of a skid is a tighter, purpose-built fit rather than a generic platform.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              For export shipments, we heat-treat and ISPM 15 stamp skids exactly as we do pallets — the certification requirement applies to any solid wood packaging material crossing an international border, skid or pallet, so that part of the compliance conversation doesn't change.
            </p>

            {/* Subsection 5 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Industries That Use Skids Most
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Machinery and equipment manufacturers across the Vadodara-Halol industrial corridor are our most frequent skid customers — anything with its own rigid base or frame that just needs lift points benefits from this lighter-weight approach. Drum and container shipments (chemical, industrial oil, bulk material) are another common use, where the drum's own base provides most of the structural support and the skid just needs to raise it and keep it stable for forklift handling.
            </p>

            {/* Subsection 6 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Ordering
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Tell us the load weight, the footprint dimensions, whether the load has its own structural base or needs full support, and whether it's for domestic or export shipment. We'll confirm whether a skid actually fits the job or whether we'd recommend a full pallet instead — we'd rather tell you honestly than sell you the more expensive option when it's not needed.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              For urgent requests, WhatsApp us directly at <strong>+91 87091 55299</strong> — send over your equipment dimensions or a quick photo for an immediate recommendation and same-day quote.
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
              Wooden Skids Buying FAQs
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
            Not Sure If You Need a Skid or a Full Pallet?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 32, lineHeight: 1.6 }}>
            Tell us what you're shipping — we'll recommend the right one, not just the pricier one.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setModalOpen(true)} className="btn btn-accent btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Get a Quote <FaArrowRight />
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
          <strong>Wooden Skids Vadodara</strong>
          <span>Custom Runner Spacing & ISPM 15 Certified</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Wooden Skid"
      />
    </div>
  );
}
