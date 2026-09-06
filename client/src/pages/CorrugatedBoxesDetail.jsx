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

export default function CorrugatedBoxesDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Corrugated Boxes in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/corrugated-box-500x500.webp'],
    'description': 'Heavy-duty 3-ply, 5-ply, and 7-ply single, double, and triple-wall corrugated shipping boxes manufactured in Vadodara (Waghodia Road). High ECT & bursting strength, moisture-resistant coating, custom printing.',
    'sku': 'corrugated-boxes',
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
      'url': 'https://sharmapackagings.com/corrugated-boxes',
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
      'reviewCount': '152'
    }
  };

  const faqs = [
    {
      q: "What's the difference between single, double, and triple-wall corrugated boxes?",
      a: "It's the number of fluted layers — more layers means higher compression and puncture resistance, at a higher cost. Single-wall suits lighter, shorter-transit goods; double and triple-wall suit heavier products or longer, more demanding transit."
    },
    {
      q: "Do export shipments need a specific box strength rating?",
      a: "Many international buyers and carriers specify a minimum edge crush test (ECT) rating — check your buyer's requirements, and we'll spec the box to meet it."
    },
    {
      q: "Can corrugated boxes handle humid storage conditions?",
      a: "Standard board weakens significantly when it absorbs moisture; for humid conditions or long sea transit, moisture-resistant coated board holds its strength much better."
    },
    {
      q: "Can you print custom branding and handling labels directly on the boxes?",
      a: "Yes, custom printing is available as part of the same production run as box manufacturing."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'corrugated-boxes').slice(0, 3);

  return (
    <div className="product-detail-page corrugated-boxes-page">
      <SEOHead 
        title="Corrugated Boxes in Vadodara — Built for the Weight You're Actually Shipping | Sharma Packaging" 
        description="Single, double & triple-wall corrugated box manufacturer in Vadodara. Custom sizes, high ECT compression strength, export-grade bursting strength & moisture resistance."
        keywords="corrugated boxes vadodara, 3 ply 5 ply 7 ply box manufacturer, double wall corrugated cartons waghodia road, export corrugated boxes gujarat, custom printed shipping boxes"
        canonical="https://sharmapackagings.com/corrugated-boxes"
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
            <span className="current">Corrugated Boxes</span>
          </div>
        </div>
        <style>{`
          .corrugated-hero-grid {
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
            .corrugated-hero-grid {
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
        <div className="container corrugated-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / CORRUGATED BOXES
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Corrugated Boxes in Vadodara — Built for the Weight You're Actually Shipping
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/corrugated-box-500x500.webp" 
                alt="Stacked heavy-duty corrugated shipping boxes manufactured at Sharma Packaging Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Heavy Duty Cartons</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Stacked single, double, and triple-wall corrugated boxes manufactured at Sharma Packaging Vadodara.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              A box that collapses under stacking weight or splits at the seams during transit usually wasn't wrong for the product — it was wrong for the load. We manufacture corrugated boxes across single, double, and triple-wall constructions at our Vadodara facility, sized and specified to match your actual product weight and shipping conditions, not a generic size pulled off a shelf.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Single, double, and triple-wall options</strong> matched to load weight and stacking requirements</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Custom sizes and printing</strong> — no forced fit into standard box dimensions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Export-grade bursting strength</strong> for international shipping requirements</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Moisture-resistant coating options</strong> for humid storage and transit conditions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Bulk production for regular dispatch</strong> and production-line packing needs</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Fast turnaround</strong> on standard sizes, custom die-cut available for specialized products</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request Corrugated Box Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Box Spec Sheet (PDF)
              </button>
            </div>

            <div className="p-trust-callout" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>
              <FaShieldAlt className="t-icon" style={{ color: 'var(--amber-accent)', fontSize: '1.1rem' }} />
              <span>High ECT Tested Board & ISO 9001:2015 Certified Box Manufacturing</span>
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
              Corrugated Boxes: Why the Wall Type and Grade Matter More Than the Size
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              Most people choosing a corrugated box focus entirely on the outer dimensions and forget the part that actually determines whether the box survives shipping: the wall construction and the paper grade. This page covers what those specifications actually mean, and how to pick the right one instead of guessing or defaulting to whatever a supplier has in stock.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Subsection 1 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Single Wall vs Double Wall vs Triple Wall
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Single-wall corrugated board — one layer of fluted paper between two flat liners — is the standard choice for lighter products and shorter shipping distances, where the box's main job is containing the product rather than bearing significant stacking weight. It's cost-effective and perfectly adequate for the majority of standard retail and light industrial shipping.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Double-wall board adds a second fluted layer, roughly doubling the compression and puncture resistance, and is the right call for heavier products, export shipments where boxes get stacked multiple layers high in a container for weeks, or products with sharper edges that risk puncturing a single-wall box during handling.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Triple-wall board is reserved for genuinely heavy industrial products or situations requiring very high stacking strength — think heavy machinery components or bulk industrial goods that need a corrugated solution rather than a full wooden crate, but still face substantial compression load from stacking. It's a significant cost step up from double-wall, so we'd only recommend it when the load genuinely requires that level of structural strength.
            </p>

            {/* Subsection 2 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Bursting Strength and Edge Crush Test — What the Numbers Actually Mean
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Corrugated board is rated using two main measures: bursting strength (how much pressure the board withstands before rupturing) and edge crush test or ECT (how much compressive force the board withstands along its edge, which is the direction stacking weight is applied). For export shipments specifically, many international buyers and freight carriers specify a minimum ECT rating as part of their shipping requirements — a box that looks fine but doesn't meet the buyer's specified ECT rating can create delays or rejected shipments at the destination, similar to how ISPM 15 compliance works for wooden packaging.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              We spec boxes to the strength rating your shipment actually needs — a heavier or longer-transit shipment gets a higher ECT rating regardless of whether the box "looks" strong enough at a glance, since visual inspection alone doesn't tell you the actual compression rating.
            </p>

            {/* Subsection 3 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Moisture Resistance — When Standard Board Isn't Enough
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Standard corrugated board absorbs moisture readily, which significantly weakens its structural strength — a box that's rated for a certain stacking weight when dry can fail well below that rating if it's absorbed humidity during a long transit or storage period. For shipments facing genuine humidity exposure — coastal warehousing, monsoon-season storage, or extended sea freight — moisture-resistant coatings or wax-treated board maintain structural strength under conditions that would otherwise compromise standard board significantly.
            </p>

            {/* Subsection 4 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Custom Sizing vs Standard Sizes
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Standard box sizes work fine for products that fit them well, but forcing an oddly-proportioned product into the nearest standard size usually means either wasted void space (which then needs extra void-fill material to prevent shifting) or a box that's genuinely too tight and stresses the product or the box seams. Custom-sized boxes, cut and scored to match your product's actual dimensions, eliminate that mismatch — for regular production-line packing, this also speeds up the packing process since staff aren't working around awkward extra space or a too-tight fit.
            </p>

            {/* Subsection 5 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Printing and Branding
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Custom printing on export cartons serves two purposes beyond branding: proper labeling for customs and handling instructions (fragile markings, stacking orientation arrows, handling icons), and clear identification for warehouse and logistics staff at the destination. We handle custom printing alongside box production, so branding and functional labeling can be built into the same production run rather than added as a separate step.
            </p>

            {/* Subsection 6 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Industries We Supply
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              FMCG and consumer goods companies use standard and custom-printed single or double-wall boxes for regular retail distribution. Automotive and industrial component manufacturers rely on double and triple-wall board for heavier parts shipments. Export-focused manufacturers across Vadodara and Gujarat specify higher ECT ratings and moisture-resistant coatings for goods facing extended sea freight.
            </p>

            {/* Subsection 7 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Ordering
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Tell us your product weight, dimensions, and shipping conditions (domestic short-haul vs export with extended transit and possible humidity exposure). We'll recommend the right wall construction and strength rating, and can produce custom sizes with printing built into the same production run.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              For custom box manufacturing or bulk orders, call/WhatsApp us directly at <strong>+91 87091 55299</strong> — we provide custom box samples and same-day estimates.
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
              Corrugated Boxes Buying FAQs
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
            Boxes Collapsing Under Stacking Weight or Failing in Transit?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 32, lineHeight: 1.6 }}>
            It's usually the wall construction, not the box design — let's get the spec right.
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
          <strong>Corrugated Boxes Vadodara</strong>
          <span>Single, Double & Triple Wall Options</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Corrugated Boxes"
      />
    </div>
  );
}
