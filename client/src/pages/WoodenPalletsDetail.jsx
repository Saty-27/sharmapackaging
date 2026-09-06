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
  FaTruck, 
  FaIndustry, 
  FaQuestionCircle, 
  FaBoxes 
} from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import { PRODUCTS } from '../data/productsData';

export default function WoodenPalletsDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Wooden Pallets in Vadodara',
    'image': ['https://sharmapackagings.com/uploads/Wooden-Pallets.png'],
    'description': 'Heavy-duty ISPM 15 heat-treated wooden pallets manufactured in Vadodara (Waghodia Road). Custom sizes, 2-way and 4-way forklift entry, load capacity up to 2,000+ kg.',
    'sku': 'wooden-pallets',
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
      'url': 'https://sharmapackagings.com/wooden-pallets',
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
      'reviewCount': '142'
    }
  };

  const faqs = [
    {
      q: "Do you manufacture custom-size wooden pallets, or only standard sizes?",
      a: "Both. We keep standard 48×40\" and Euro 1200×800mm in regular production, but a large share of our orders are custom-built to match a specific machine footprint, drum size, or container loading pattern."
    },
    {
      q: "Are your export pallets ISPM 15 certified?",
      a: "Yes — every pallet built for export is heat-treated in-house and stamped with the IPPC mark, and we provide the supporting documentation your freight forwarder will need."
    },
    {
      q: "What's the minimum order quantity?",
      a: "We accommodate both single custom pallets for one-off heavy machinery shipments and bulk orders in the hundreds for regular dispatch — there's no fixed minimum, but pricing per unit improves at higher volumes."
    },
    {
      q: "How long does production take?",
      a: "Standard sizes typically ship the same week. Custom builds or large bulk orders depend on specification and quantity — we'll confirm a firm timeline at the quote stage."
    },
    {
      q: "Can you deliver outside Vadodara?",
      a: "Yes, we dispatch across Gujarat and pan-India. For export shipments, we coordinate directly with your container loading schedule where needed."
    },
    {
      q: "What's the difference between a two-way and four-way pallet, and which do I need?",
      a: "Two-way pallets can only be lifted from two sides; four-way (block-style) can be lifted from all four. If your forklift or pallet jack needs to approach from any direction, ask for four-way — it's a small cost difference but avoids handling headaches later."
    }
  ];

  const relatedProducts = PRODUCTS.filter(p => p.slug !== 'wooden-pallets').slice(0, 3);

  return (
    <div className="product-detail-page wooden-pallets-page">
      <SEOHead 
        title="Wooden Pallets in Vadodara — Built to Handle What Your Cargo Actually Weighs | Sharma Packaging" 
        description="Heavy-duty ISPM 15 heat-treated wooden pallets manufactured in Vadodara (Waghodia Road). Custom sizes, 2-way & 4-way forklift entry, load capacity up to 2,000+ kg."
        keywords="wooden pallets vadodara, ispm 15 heat treated wooden pallets, heavy duty wooden pallet manufacturer, 4-way wooden pallets waghodia road, euro pallets vadodara, pine wood pallets gujarat"
        canonical="https://sharmapackagings.com/wooden-pallets"
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
            <span className="current">Wooden Pallets</span>
          </div>
        </div>
        <style>{`
        .wooden-pallets-hero-grid {
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
          .wooden-pallets-hero-grid {
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
        <div className="container wooden-pallets-hero-grid">
          
          {/* Title Column */}
          <div className="hero-title-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="eyebrow eyebrow-amber" style={{ letterSpacing: '1px', fontWeight: 700, marginBottom: 8 }}>
              PRODUCTS / WOODEN PALLETS
            </span>
            <h1 className="p-title p-title-text" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.25, marginBottom: 8 }}>
              Wooden Pallets in Vadodara — Built to Handle What Your Cargo Actually Weighs
            </h1>
          </div>

          {/* Right Column Image */}
          <div className="hero-image-col">
            <div className="p-main-img-box" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)' }}>
              <img 
                src="/uploads/Wooden-Pallets.png" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/seaworthy_packing.jpg'; }}
                alt="Stacked heavy-duty wooden pallets at Sharma Packaging facility in Vadodara" 
                className="p-main-img" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <span className="p-cat-tag">Vadodara Facility Yard</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
              *Wooden pallets manufactured at our Waghodia Road facility, Vadodara — ready for dispatch across Gujarat and pan-India.*
            </p>
          </div>

          {/* Body Content Column */}
          <div className="hero-body-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="p-short-desc" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.65, marginBottom: 24 }}>
              If you've ever had a pallet crack under load mid-transit, you already know that not all wooden pallets are built the same. At Sharma Packagings, we manufacture heavy-duty wooden pallets out of our Waghodia Road facility in Vadodara — engineered for real industrial loads, not just warehouse stacking. Whether you're shipping machinery parts to Germany or moving raw material between your own plants in Gujarat, we build the pallet to match the job, not the other way around.
            </p>

            {/* Feature List */}
            <div className="p-benefits-box" style={{ background: '#F8FAFC', borderRadius: 16, padding: '24px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
              <ul className="p-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Custom sizing on every order</strong> — standard 48×40", Euro 1200×800mm, or your exact dimensions, no minimum redesign fee</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>ISPM 15 heat-treated</strong> — every export pallet comes stamped and compliant, so your shipment doesn't get held at customs</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Load capacity up to 2,000+ kg</strong> — reinforced stringers and block construction for heavy machinery, chemical drums, and palletized steel</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Hardwood and softwood options</strong> — Sal, Neem, and Pine depending on your budget and load requirements</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Same-week production</strong> for standard sizes, priority turnaround available for urgent export deadlines</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.95rem', color: 'var(--navy-dark)', lineHeight: 1.5 }}>
                  <FaCheckCircle className="b-check-icon" style={{ color: 'var(--blue-royal)', marginTop: 3, flexShrink: 0 }} />
                  <span><strong>Nail-pattern and block-style builds</strong> — two-way and four-way entry pallets depending on your forklift/handling setup</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="p-cta-box" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Request a Pallet Quote <FaArrowRight />
              </button>
              <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaFilePdf style={{ color: '#EF4444' }} /> Download Pallet Spec Sheet (PDF)
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
              Wooden Pallets in Vadodara: A Complete Guide for Buyers Who Actually Need to Know What They're Ordering
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              Most pallet pages online read like they were written to satisfy a search engine, not a buyer. You've probably clicked through three or four of them already looking for actual answers — what size do you need, whether wood or plastic makes sense for your load, whether a local Vadodara supplier can even match export-grade standards. We manufacture these pallets every day out of our facility on Waghodia Road, so this page is written from that side of the counter — the questions we actually get asked, and the honest answers, not a marketing script.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

            {/* Subsection 1 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Why Wooden Pallets Are Still the Default Choice for Indian Industry
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              There's a reason wood hasn't been replaced despite plastic and metal pallets being on the market for decades now. Cost is the obvious one — a standard wooden pallet runs a fraction of the price of an equivalent plastic or steel unit, and for single-use export shipments where the pallet isn't coming back, that math matters a lot. But cost isn't the only reason.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Wood also repairs easily. If a stringer cracks or a deck board splits, you replace that one board — you don't scrap the whole unit like you would with an injection-molded plastic pallet. For manufacturers in Vadodara's industrial belt who are cycling pallets through daily dispatch, that repairability keeps operating costs down over months and years, not just on the first purchase.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              And then there's compliance. Export shipments to the EU, US, Australia, and most of Southeast Asia require ISPM 15 heat-treatment certification for any wood packaging material — this isn't optional, and it isn't something plastic or metal pallets need to worry about because the regulation exists specifically to prevent the spread of wood-boring pests across borders. If you're an exporter working out of Gujarat's ports — Mundra, Pipavav, or shipping via Nhava Sheva — your freight forwarder will ask for ISPM 15 stamped pallets before your container even gets booked. We heat-treat and stamp every export pallet in-house, so that's one less delay in your shipping timeline.
            </p>

            {/* Subsection 2: Honest Comparison */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Wooden Pallets vs Plastic Pallets vs Metal Pallets — The Honest Comparison
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>
              We'll be straightforward here because half the pallet suppliers you'll talk to won't be: there isn't one "best" pallet type. It depends entirely on what you're moving, how often, and where it's going.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 28 }}>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '20px', borderRadius: 12 }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#92400E', marginBottom: 8 }}>Wooden Pallets</h4>
                <p style={{ fontSize: '0.92rem', color: '#78350F', lineHeight: 1.5, margin: 0 }}>
                  Win on upfront cost, repairability, and export compliance. They're heavier than plastic (which matters for air freight cost calculations), and they do absorb moisture over time if stored outdoors without protection — something to factor in if your pallets sit in an open yard through monsoon season in Gujarat.
                </p>
              </div>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '20px', borderRadius: 12 }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E40AF', marginBottom: 8 }}>Plastic Pallets</h4>
                <p style={{ fontSize: '0.92rem', color: '#1E3A8A', lineHeight: 1.5, margin: 0 }}>
                  Make sense for closed-loop systems — if you're a food or pharma company cycling pallets internally between your own warehouses and need something that won't harbor moisture or pests without needing ISPM 15 export compliance. The downside is upfront cost — often 3 to 5 times the price of wood — and if one cracks, you replace the whole unit.
                </p>
              </div>
              <div style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '20px', borderRadius: 12 }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155', marginBottom: 8 }}>Metal Pallets</h4>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  Steel or aluminium pallets are the right call for extremely heavy, high-value loads that get reused hundreds of times (automotive engine blocks or machine tooling). They're expensive and heavy, but for the right fixed loop application they outlast everything else by years.
                </p>
              </div>
            </div>

            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              If you're exporting, moving general industrial cargo, or need something cost-effective for one-way or limited-reuse shipping, wood is almost certainly the right call. If you're running a closed internal loop with hygiene requirements, look at plastic. If you're moving the same heavy load hundreds of times over years, metal earns its price tag.
            </p>

            {/* Subsection 3 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Euro Pallets — What They Are and When You Actually Need Them
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              "Euro pallet" gets used loosely, so let's be precise about it. A genuine EPAL Euro pallet is a specific standard: 1200mm × 800mm, built to an exact block-and-deck specification with a defined nail pattern, and licensed under the European Pallet Association. If you're shipping into the EU on a pallet exchange system — where your pallet gets swapped for an equivalent one at the destination dock — it needs to actually meet EPAL spec, not just be "Euro-sized."
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              We manufacture Euro-dimension pallets (1200×800mm) to the standard block construction most EU importers expect, heat-treated and stamped for export. If your buyer specifically requires EPAL-licensed and stamped pallets for a pallet-exchange arrangement, tell us at the time of order — we'll build to that exact specification rather than just matching the footprint. A lot of confusion (and rejected shipments at the port) comes from suppliers treating "Euro pallet" as just a size rather than a full specification, so it's worth being specific with whoever you're ordering from, us included.
            </p>

            {/* Subsection 4 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Hardwood vs Softwood — Which One Should You Actually Order
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              This is one of the most common questions we get, and the honest answer is: it depends on your load weight and how many times the pallet needs to survive handling.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
              <div style={{ borderLeft: '4px solid var(--amber-accent)', background: '#F8FAFC', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 6 }}>Hardwood Pallets (Sal / Dense Timber)</h4>
                <p style={{ fontSize: '0.93rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  Cost more per unit but hold up significantly better under heavy, repeated, or rough handling — forklift punctures, drops, uneven stacking. If you're moving machinery, metal components, or chemical drums in the multi-hundred-kilogram range, hardwood is worth the extra cost. It simply survives more abuse.
                </p>
              </div>
              <div style={{ borderLeft: '4px solid var(--blue-royal)', background: '#F8FAFC', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 6 }}>Softwood Pallets (Pine Timber)</h4>
                <p style={{ fontSize: '0.93rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  Lighter, cheaper, and perfectly adequate for lighter loads, single-use export shipments, or cargo that's handled carefully and doesn't get reused. If you're shipping moderate-weight cartons or goods that aren't repeatedly forklifted, softwood keeps your packaging cost down without adding real risk.
                </p>
              </div>
            </div>

            {/* Subsection 5 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Two-Way vs Four-Way Entry — A Detail That Actually Matters
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              Two-way pallets can only be lifted from two opposite sides — usually because the stringers run solid underneath with no notches. Four-way (or block-style) pallets can be lifted from all four sides, which matters a lot if your warehouse uses pallet jacks or forklifts that need to approach from whichever direction is convenient, not just the two ends. If you're working in a tight warehouse layout or your logistics partner's equipment needs four-way access, specify it up front — retrofitting notches into stringer-style pallets after the fact compromises the structural integrity. We build both types depending on your setup.
            </p>

            {/* Subsection 6 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Load Capacity — What "Heavy-Duty" Actually Means in Numbers
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              "Heavy-duty" is a phrase that gets thrown around without any actual number behind it, so here's ours: our reinforced block-construction pallets are built to handle static loads upward of 2,000 kg and dynamic (forklift-handled) loads appropriate to standard industrial racking systems. For context, that's enough for palletized steel coils, industrial machinery components, chemical drums, and most transformer or automotive parts shipments. If you're moving something with an irregular weight distribution, tell us the actual weight and dimensions — we engineer deck board spacing and stringer reinforcement around the actual load.
            </p>

            {/* Subsection 7 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Why Buy From a Vadodara-Based Manufacturer Instead of a Trader
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              There's a real difference between buying pallets from a local trader who's sourcing from three different small workshops, and buying from a manufacturer who controls timber selection, heat treatment, and build quality in-house. When you order from a trader, quality can vary batch to batch. When you order directly from us, the same team, the same treatment process, and the same quality checks apply to every pallet that leaves our Waghodia Road facility — whether it's your first order or your fiftieth. For businesses across Vadodara, Ankleshwar, Bharuch, and Gujarat, that also means faster same-week turnaround.
            </p>

            {/* Subsection 8 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              ISPM 15 Compliance — What It Actually Involves
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 28 }}>
              If you're exporting and this is your first time dealing with ISPM 15, here's what it actually means in practice: the wood has to be heat-treated to a core temperature of 56°C for a minimum of 30 minutes, which kills any pests or larvae inside the timber. Once treated, the pallet gets stamped with the official IPPC mark — showing country code, treatment facility registration number, and treatment method (HT). Customs officials check for this exact stamp; a missing or incorrect stamp can get your entire shipment held or rejected. We handle the full heat-treatment and stamping process in-house and provide official phytosanitary documentation.
            </p>

            {/* Subsection 9 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              Industries We Supply Across Gujarat
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Our wooden pallets go out to a genuinely wide mix of industries, and the pallet spec usually looks different for each one:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--blue-royal)', fontWeight: 700 }}>• Automotive Component Manufacturers:</strong> Around Vadodara and Halol needing pallets sized for engine parts, gearboxes, and metal assemblies with high point-loads.
              </li>
              <li style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--blue-royal)', fontWeight: 700 }}>• Chemical & Pharma Companies:</strong> In Ankleshwar-Panoli belt requiring drum-rated pallets that meet export documentation standards.
              </li>
              <li style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--blue-royal)', fontWeight: 700 }}>• Textile & Garment Exporters:</strong> Needing lighter, cost-effective softwood pallets for high-volume, lower-weight cartons.
              </li>
              <li style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--blue-royal)', fontWeight: 700 }}>• Heavy Machinery & Transformers:</strong> Requiring custom block pallets engineered around specific equipment footprints.
              </li>
              <li style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--blue-royal)', fontWeight: 700 }}>• General Trading & FMCG:</strong> Needing standard 48×40" or CP-format pallets for warehouse racking.
              </li>
            </ul>

            {/* Subsection 10 */}
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: 14 }}>
              How to Order — What We'll Actually Ask You
            </h3>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              When you reach out for a quote, expect us to ask: approximate load weight per pallet, whether the shipment is for export or domestic use (this determines if ISPM 15 treatment applies), preferred dimensions or whether standard sizing works, and quantity plus your timeline. The more specific you are upfront, the faster we can quote accurately — "I need pallets" gets a much slower response than "I need 200 four-way pallets, 1200×1000mm, rated for 800kg drums, ISPM 15 stamped, needed within 10 days."
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              For urgent requirements, WhatsApp us directly at <strong>+91 87091 55299</strong> — it's usually the fastest way to get a same-day quote, especially if you can send a photo of what you're loading so we can confirm the right spec on the first try.
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
              Wooden Pallets Buying FAQs
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
            Need Pallets That Match Your Actual Load, Not a Generic Size?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 32, lineHeight: 1.6 }}>
            Tell us the weight, the dimensions, and the deadline — we'll quote it properly the first time.
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
          <strong>Wooden Pallets Vadodara</strong>
          <span>Custom Sizes & ISPM 15 Certified</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Wooden Pallets"
      />
    </div>
  );
}
