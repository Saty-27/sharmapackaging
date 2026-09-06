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

export default function PackagingTapeDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Industrial Packaging Tape in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/3-65-heavy-duty-handheld-brown-packaging-tape-rolls-for-carton-original-imahcz9sswz2fvdg.webp'],
    'description': 'Industrial BOPP and heavy-duty packaging tape supplier in Vadodara (Waghodia Road). Available in multiple micron thickness grades, acrylic & hot-melt adhesives, filament reinforced tape & custom printed tamper-evident tape.',
    'sku': 'packaging-tape',
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
      'url': 'https://sharmapackagings.com/packaging-tape',
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
      'reviewCount': '145'
    }
  };

  const faqs = [
    {
      q: "What micron thickness tape do I need?",
      a: "It depends on carton weight and transit conditions — lighter, short-distance shipments can use lower micron tape, while heavier cartons or longer, multi-handling transit need a higher micron for reliable sealing."
    },
    {
      q: "Does regular tape work for cold storage or refrigerated shipping?",
      a: "Standard adhesive can lose tack significantly at low temperatures — for cold chain applications, cold-temperature-rated adhesive tape is the more reliable option."
    },
    {
      q: "What's the benefit of filament (reinforced) tape over standard BOPP tape?",
      a: "Filament tape has embedded fiberglass strands that provide much higher tensile strength, making it the better choice for heavy cartons or high-stress sealing applications."
    },
    {
      q: "Can you supply custom-printed tape with our branding?",
      a: "Yes, custom printing is available and also serves as a basic tamper-evidence measure across your outgoing shipments."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'packaging-tape' && p.slug !== 'packaging-tapes').slice(0, 3);

  return (
    <div className="product-detail-page packaging-tape-page">
      <SEOHead 
        title="Industrial Packaging Tape in Vadodara — The Seal That Holds Under Real Shipping Conditions | Sharma Packaging" 
        description="Industrial BOPP packaging tape manufacturer & supplier in Vadodara. High micron grades, custom printed tape, filament reinforced tape, hot-melt & cold storage adhesive rolls."
        keywords="packaging tape vadodara, bopp tape supplier waghodia road, custom printed packaging tape gujarat, heavy duty brown packing tape, filament reinforced tape"
        canonical="https://sharmapackagings.com/packaging-tape"
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
            <span className="current">Packaging Tape</span>
          </div>
        </div>
        <style>{`
          .tape-hero-grid {
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
            .tape-hero-grid {
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
        <div className="container tape-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / PACKAGING TAPE
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Industrial Packaging Tape in Vadodara — The Seal That Holds Under Real Shipping Conditions
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/3-65-heavy-duty-handheld-brown-packaging-tape-rolls-for-carton-original-imahcz9sswz2fvdg.webp" 
                alt="Industrial heavy-duty brown packaging tape rolls and BOPP sealing tape at Sharma Packaging Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Sealing Tapes</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Industrial packaging tape rolls, BOPP micron grades, and custom-printed tape at Sharma Packaging Vadodara.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              A box seam that opens mid-transit usually isn't a box design failure — it's tape that wasn't rated for the weight, the temperature, or the handling the shipment actually went through. We supply BOPP and industrial-grade packaging tape in multiple widths and thicknesses, including custom-printed options, for production lines that need consistent, reliable sealing across every carton that goes out.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>BOPP tape in multiple thickness (micron) grades</strong> for light cartons through heavy export packaging</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Custom-printed tape</strong> for branding and tamper-evidence on outgoing shipments</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>High-tack adhesive options</strong> for cold storage and humid environment sealing</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Machine-compatible rolls</strong> sized for automatic taping machines</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Bulk supply for production-line packing</strong> operations</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Reinforced/filament tape available</strong> for heavier cartons needing higher tensile strength</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request Packaging Tape Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Tape Spec Sheet (PDF)
              </button>
            </div>

            <div className="p-trust-callout" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#64748B', fontWeight: 600 }}>
              <FaShieldAlt className="t-icon" style={{ color: 'var(--amber-accent)', fontSize: '1.1rem' }} />
              <span>High-Tack Acrylic Adhesion & ISO 9001:2015 Certified Quality</span>
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
              Packaging Tape: Why "It Held in the Warehouse" Isn't the Same as "It'll Hold in Transit"
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              Tape is the cheapest item on most packing lists, and it's also one of the most common points of failure we see in damage and product-loss claims — not because tape is inherently unreliable, but because the wrong grade or thickness gets used across every carton regardless of weight, distance, or storage conditions. This page covers what actually separates tape that holds from tape that peels open somewhere between the warehouse and the delivery dock.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Sub-section 1 */}
            <div className="guide-subsection" style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                BOPP Tape and Why Micron Thickness Matters
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                Most industrial packaging tape is BOPP (biaxially oriented polypropylene) film with an acrylic or hot-melt adhesive backing. The micron thickness of the film — commonly ranging from around 40 microns for light-duty use up to 60 microns or higher for heavy-duty sealing — determines how much tensile stress and puncture resistance the tape can handle. Lighter cartons with a short transit distance and minimal handling stress can use a lower micron tape without issue. Heavier cartons, cartons that will be handled multiple times through a longer supply chain, or export cartons facing weeks of transit and multiple loading/unloading cycles need a higher micron thickness that won't stretch, tear, or lose adhesion under that cumulative stress.
              </p>
            </div>

            {/* Sub-section 2 */}
            <div className="guide-subsection" style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                Adhesive Type — Acrylic vs Hot-Melt
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                Acrylic adhesive tape offers good general-purpose performance and holds up reasonably well across a range of temperatures, making it a solid default for most standard packing applications. Hot-melt adhesive tape typically provides stronger initial tack and bond strength, which matters for cartons that need to be sealed and immediately handled or stacked without waiting for the adhesive to fully set. For cold storage or refrigerated shipping specifically, standard adhesives can lose tack significantly in low temperatures — a tape rated for cold-temperature application is worth specifying if your cartons are going into or through a cold chain, since standard tape seals that look fine at room temperature can fail once the carton is in refrigerated storage.
              </p>
            </div>

            {/* Sub-section 3 */}
            <div className="guide-subsection" style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                Reinforced and Filament Tape for Heavy Cartons
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                For genuinely heavy cartons, or cartons where the tape itself needs to bear real structural tension rather than just sealing the flaps closed, filament (reinforced) tape — embedded with fiberglass strands running through the adhesive film — provides substantially higher tensile strength than standard BOPP tape. This is the right choice for heavy carton sealing where standard tape would stretch or tear under the combined weight and handling stress, particularly for export cartons that get strapped, stacked, and handled multiple times before reaching their final destination.
              </p>
            </div>

            {/* Sub-section 4 */}
            <div className="guide-subsection" style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                Custom Printed Tape — More Than Just Branding
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                Custom-printed tape serves a genuine functional purpose beyond brand visibility. Printed with your company name and logo across every seam, it also acts as a basic tamper-evidence measure — a carton resealed with plain tape after being opened is immediately noticeable against custom-printed tape, which is a small but real deterrent against pilferage during a long supply chain, and useful evidence if a damage or tampering claim needs to be investigated. We handle custom tape printing alongside supply, so this can be built into your regular tape order rather than sourced separately.
              </p>
            </div>

            {/* Sub-section 5 */}
            <div className="guide-subsection" style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                Machine-Compatible Tape for Automated Taping Lines
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                For higher-volume packing operations using automatic case taping machines, tape needs to be sized and wound correctly for the specific machine model in use — inconsistent roll diameter or core size causes jams and inconsistent sealing on automated lines. We supply tape in standard machine-compatible roll sizes as well as manual hand-dispenser rolls, so switching between manual and automated packing lines doesn't require sourcing from a different supplier.
              </p>
            </div>

            {/* Sub-section 6 */}
            <div className="guide-subsection" style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                Getting Sealing Pattern Right, Not Just Tape Quality
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                Even good tape fails if the sealing pattern is inadequate — a single strip across the top seam without reinforcing the bottom or side seams is a common shortcut that works fine for light handling but fails under real transit stress. For cartons with any real weight or facing a longer supply chain, an H-pattern seal (taping both the top and bottom seams, plus reinforcing the side seams for heavier cartons) provides significantly more reliable sealing than a single top strip, regardless of how strong the tape itself is.
              </p>
            </div>

            {/* Sub-section 7 */}
            <div className="guide-subsection" style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                Industries We Supply
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                FMCG and consumer goods companies use our standard and custom-printed BOPP tape for high-volume retail carton sealing. Export-focused manufacturers across Vadodara and Gujarat rely on higher-micron and filament tape for cartons facing extended transit and multiple handling cycles. Cold-chain and food storage operations use our cold-temperature-rated adhesive tape for refrigerated shipping applications.
              </p>
            </div>

            {/* Sub-section 8 */}
            <div className="guide-subsection" style={{ marginBottom: 0 }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 12 }}>
                Ordering
              </h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                Tell us your typical carton weight, transit distance and handling conditions, and whether you're hand-sealing or using automated taping equipment. We'll recommend the right micron thickness and adhesive type, and can include custom printing in the same production run if you need branded or tamper-evident sealing.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="section faq-section" style={{ padding: '64px 0', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: 860, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700 }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--navy-dark)', marginTop: 8 }}>
              Common Questions About Packaging Tape
            </h2>
          </div>

          <div className="faq-accordion" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}
                style={{ 
                  background: openFaqIndex === idx ? '#F8FAFC' : '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
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
                    gap: 16,
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '1.08rem', fontWeight: 700, color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FaQuestionCircle style={{ color: 'var(--blue-royal)', flexShrink: 0 }} />
                    {faq.q}
                  </span>
                  {openFaqIndex === idx ? (
                    <FaChevronUp style={{ color: 'var(--blue-royal)', flexShrink: 0 }} />
                  ) : (
                    <FaChevronDown style={{ color: '#94A3B8', flexShrink: 0 }} />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div style={{ padding: '0 24px 24px 52px', fontSize: '1rem', color: '#475569', lineHeight: 1.65 }}>
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
      <section className="section cta-band-section" style={{ padding: '64px 0', background: 'linear-gradient(135deg, var(--navy-dark) 0%, #0F2A4A 100%)', color: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 14, lineHeight: 1.25 }}>
            Seams Opening or Tape Failing Before Cartons Reach Their Destination?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', marginBottom: 32, maxWidth: 720, margin: '0 auto 32px' }}>
            It's usually the grade or the seal pattern, not the concept — let's get it specified properly.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setModalOpen(true)} className="btn btn-amber btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Request a Quote <FaArrowRight />
            </button>
            <a href="tel:+919825132805" className="btn btn-outline-light btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <FaPhoneAlt /> Call +91 98251 32805
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* RELATED PRODUCTS */}
      {/* ========================================================================= */}
      <section className="section" style={{ padding: '64px 0', background: '#F8FAFC' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-dark)', marginBottom: 24, textAlign: 'center' }}>
            Other Protective & Packaging Materials
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {relatedProducts.map(rel => (
              <Link key={rel.id} to={`/${rel.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', padding: 20, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <img src={rel.image} alt={rel.title} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 8 }}>{rel.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, flexGrow: 1 }}>{rel.shortDesc}</p>
                  <span style={{ color: 'var(--blue-royal)', fontWeight: 700, fontSize: '0.9rem', marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    View Product Details <FaArrowRight style={{ fontSize: '0.8rem' }} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        productName="Industrial Packaging Tape" 
      />
    </div>
  );
}
