import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, FaArrowRight, FaShieldAlt, FaTruck, FaGlobe, FaBox, FaCogs, 
  FaIndustry, FaAward, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp,
  FaChevronDown, FaSearchPlus, FaTimes, FaWarehouse, FaCheckCircle,
  FaSearch, FaHammer, FaChevronLeft, FaChevronRight, FaLayerGroup, FaCube,
  FaWeightHanging, FaStopwatch, FaCertificate, FaHeadset
} from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import VideoGallerySection from '../components/home/VideoGallerySection';
import BlogSection from '../components/home/BlogSection';
import { PRODUCTS, CATEGORIES, SOLUTIONS, INDUSTRIES } from '../data/productsData';
import './Home.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

function AnimatedCounter({ to, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (hasAnimated) return;
        setHasAnimated(true);
        let startTime;
        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(easeProgress * to));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  );
}

const CAROUSEL_SOLUTIONS = [
  {
    id: 'shrink-cover',
    category: 'PROTECTIVE PACKAGING',
    title: 'Shrink Cover',
    headline: 'Reliable Protection for Industrial Cargo',
    description: 'Heavy-duty shrink cover solutions designed to protect industrial goods, machinery and cargo from moisture, dust and external exposure during storage and transportation.',
    benefits: [
      'Moisture & dust protection',
      'Secure cargo coverage',
      'Customizable sizes and thicknesses',
      'Suitable for industrial applications'
    ],
    cta: 'Get a Quote',
    image: '/uploads/Shrink-Wrapping.jpeg',
    alt: 'Industrial machinery protected with shrink cover'
  },
  {
    id: 'silpaulin-cover',
    category: 'PROTECTIVE COVERING',
    title: 'Silpaulin Cover',
    headline: 'Heavy-Duty Covering for Industrial Protection',
    description: 'Durable Silpaulin covers designed to protect machinery, materials and cargo from rain, dust, sunlight and harsh outdoor conditions.',
    benefits: [
      'Waterproof protection',
      'UV-resistant options',
      'Heavy-duty material',
      'Suitable for outdoor storage and transportation'
    ],
    cta: 'Get a Quote',
    image: '/uploads/tarpaulin.jpg',
    alt: 'Heavy-duty Silpaulin cover protecting industrial equipment'
  },
  {
    id: 'aluminium-cover',
    category: 'SPECIALIZED PROTECTION',
    title: 'Aluminium Cover',
    headline: 'Advanced Protection Against Heat & Environment',
    description: 'Aluminium-coated protective covers designed to provide enhanced protection against heat, moisture, dust and environmental exposure for sensitive industrial goods.',
    benefits: [
      'Heat-reflective protection',
      'Moisture and dust resistance',
      'Suitable for sensitive equipment',
      'Custom sizes available'
    ],
    cta: 'Get a Quote',
    image: '/uploads/aluminium_foil_preservation.jpg',
    alt: 'Industrial equipment wrapped with aluminium barrier protection'
  },
  {
    id: 'vci-cover',
    category: 'CORROSION PROTECTION',
    title: 'VCI Cover',
    headline: 'Corrosion Protection for Metal Components',
    description: 'VCI cover solutions designed to protect metal components, machinery and equipment from corrosion during storage, handling and transportation.',
    benefits: [
      'Corrosion protection',
      'Ideal for metal components',
      'Suitable for long-distance transportation',
      'Custom packaging solutions'
    ],
    cta: 'Get a Quote',
    image: '/uploads/vci_cover.jpg',
    alt: 'VCI anti-corrosion protective packaging on metal machinery'
  },
  {
    id: 'contract-packaging',
    category: 'PACKAGING SERVICES',
    title: 'Contract Packaging',
    headline: 'Packaging Support When You Need It',
    description: 'Flexible contract packaging services for businesses that need reliable packaging, packing and preparation support without managing every packaging operation internally.',
    benefits: [
      'Professional packaging support',
      'Customized requirements',
      'Suitable for bulk operations',
      'Reliable handling and preparation'
    ],
    cta: 'Discuss Your Requirement',
    image: '/uploads/contract_packaging.jpg',
    alt: 'Professional B2B contract packaging operation'
  },
  {
    id: 'wooden-boxes',
    category: 'WOODEN PACKAGING',
    title: 'Wooden Boxes',
    headline: 'Heavy-Duty Protection for Valuable Cargo',
    description: 'Strong wooden boxes and crates designed to protect machinery, equipment and industrial goods during handling, storage and transportation.',
    benefits: [
      'Strong wooden construction',
      'Custom dimensions',
      'Heavy-duty protection',
      'Suitable for industrial and export packaging'
    ],
    cta: 'Get a Quote',
    image: '/uploads/wooden_boxes.jpg',
    alt: 'Heavy-duty wooden export crate for industrial machinery'
  }
];

function ProductSolutionsCarousel({ onOpenQuote }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const total = CAROUSEL_SOLUTIONS.length;

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = (intervalTime / 4000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % total);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  };

  const handleSelectSlide = (idx) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const current = CAROUSEL_SOLUTIONS[currentIndex];

  return (
    <section className="section section-carousel-solution section-bg-light">
      <div className="container">
        {/* Section Intro Header */}
        <div className="section-header text-center">
          <span className="eyebrow eyebrow-amber">OUR PACKAGING SOLUTIONS</span>
          <h2>Protection Designed Around Your Cargo</h2>
          <p>
            From protective covers to specialized industrial packaging, we provide solutions designed to keep your products secure through storage, handling and transportation.
          </p>
        </div>

        {/* Featured Solution Carousel Card Container */}
        <div 
          className="solution-carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="carousel-slide-grid"
            >
              {/* Left Image Column (55%) */}
              <div className="carousel-img-col">
                <img 
                  src={current.image} 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/hero_bg.png'; }} 
                  alt={current.alt} 
                  className="carousel-img" 
                />
              </div>

              {/* Right Content Column (45%) */}
              <div className="carousel-content-col">
                <span className="carousel-category">{current.category}</span>
                <h3 className="carousel-title">{current.title}</h3>
                <h4 className="carousel-headline">{current.headline}</h4>
                <p className="carousel-desc">{current.description}</p>

                <div className="carousel-benefits">
                  {current.benefits.map((b, i) => (
                    <div key={i} className="carousel-b-item">
                      <FaCheckCircle className="carousel-b-icon" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="carousel-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button 
                    onClick={() => onOpenQuote(current.title)} 
                    className="btn btn-primary btn-lg carousel-cta-btn"
                  >
                    {current.cta} <FaArrowRight />
                  </button>
                  <a 
                    href={`mailto:info@sharmapackagings.com?subject=${encodeURIComponent('Inquiry for ' + current.title)}&body=${encodeURIComponent('Hello Sharma Packaging,\n\nI am interested in ' + current.title + '.\n\nThank you!')}`}
                    className="btn btn-outline btn-lg"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                  >
                    <FaEnvelope /> Email Us
                  </a>
                </div>

                {/* Carousel Navigation Footer */}
                <div className="carousel-nav-footer">
                  <div className="carousel-progress-info">
                    <span className="nav-counter">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                    <div className="carousel-progress-track">
                      <div 
                        className="carousel-progress-bar" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="carousel-controls">
                    {/* Navigation Dots */}
                    <div className="carousel-dots">
                      {CAROUSEL_SOLUTIONS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectSlide(idx)}
                          className={`carousel-dot ${currentIndex === idx ? 'is-active' : ''}`}
                          aria-label={`Go to slide ${idx + 1}`}
                        ></button>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="carousel-arrows">
                      <button 
                        onClick={handlePrev} 
                        className="carousel-arrow-btn" 
                        aria-label="Previous Slide"
                      >
                        <FaChevronLeft />
                      </button>
                      <button 
                        onClick={handleNext} 
                        className="carousel-arrow-btn" 
                        aria-label="Next Slide"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [activeFaq, setActiveFaq] = useState(0);
  const [galleryCategory, setGalleryCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  // Form state for section 16 contact form
  const [contactForm, setContactForm] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    product: 'Wooden Pallets',
    quantity: '',
    dimensions: '',
    message: ''
  });

  const handleOpenQuote = (prodName = '') => {
    setSelectedProduct(prodName);
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleOpenQuote(contactForm.product || 'General Requirement');
  };

  const filteredProducts = activeCategory === 'All Products' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const galleryItems = [
    { title: 'Seaworthy Wooden Box', category: 'Wooden Packaging', img: '/uploads/seaworthy_wooden_box.png' },
    { title: 'Silpaulin Packing', category: 'Export Packaging', img: '/uploads/silpaulin_packing.jpg' },
    { title: 'Export Packing', category: 'Wooden Packaging', img: '/uploads/export_packing.jpg' },
    { title: 'Vaccum Packaging', category: 'Protective Packaging', img: '/uploads/vaccum_packaging.jpg' },
    { title: 'Wooden Pallets', category: 'Wooden Packaging', img: '/uploads/Wooden-Pallets.png' },
    { title: 'Shrink Wrapping', category: 'Protective Packaging', img: '/uploads/Shrink-Wrapping.jpeg' }
  ];

  const filteredGallery = galleryCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(g => g.category === galleryCategory);

  const faqs = [
    {
      q: 'What types of packaging products do you provide?',
      a: 'We manufacture and supply heavy-duty wooden pallets, wooden skids, export crating, shrink wrapping, vacuum packaging, aluminium barrier foil, lashing materials, stretch film, corrugated boxes, plastic pallets, bubble wrap, and packaging consumables.'
    },
    {
      q: 'Can you manufacture custom-size wooden pallets and skids?',
      a: 'Yes. Every wooden pallet and skid can be custom-engineered to your exact product dimensions, load weight distribution, and handling preferences up to 15+ Tons.'
    },
    {
      q: 'Are your wooden pallets and crates ISPM 15 certified for export?',
      a: 'Absolutely. All our wooden packaging undergoes certified heat treatment (HT) and carries the official ISPM 15 stamp required for phytosanitary international customs clearance.'
    },
    {
      q: 'Do you provide packaging for heavy machinery and over-dimensional cargo?',
      a: 'Yes. We specialize in ODC and heavy machinery packing. Our team can also perform on-site packaging at your factory floor or manufacturing facility.'
    },
    {
      q: 'Can you provide export packaging and ocean freight protection?',
      a: 'Yes, we design seaworthy export packaging combining vacuum barrier foil, VCI anti-corrosion films, desiccants, and container lashing to prevent corrosion and transit damage.'
    },
    {
      q: 'What information do you need for a packaging quotation?',
      a: 'We typically need product dimensions (L x W x H), total weight, shipping mode (sea, road, air), storage duration, and any specific compliance requirements.'
    },
    {
      q: 'Do you accept bulk orders for industrial manufacturers?',
      a: 'Yes, we supply bulk recurring orders for leading industrial, automotive, electrical, and pharmaceutical manufacturers across Gujarat and pan-India.'
    },
    {
      q: 'How can I request a fast quote?',
      a: 'You can click any "Get Quote" button, call us directly at +91 87091 55299, or fill out the quotation form at the bottom of this page.'
    }
  ];

  return (
    <div className="home-page-redesign">
      <SEOHead title="Sharma Packagings - Strong Packaging. Stronger Protection." />

      {/* SECTION 1: HERO BANNER */}
      <section className="official-hero-banner-section">
        <div className="container official-hero-container">
          <div className="banner-image-wrapper" onClick={() => handleOpenQuote()}>
            <picture>
              <source media="(max-width: 768px)" srcset="/uploads/hero_banner_mobile.jpg" />
              <img 
                src="/uploads/hero_banner.jpg" 
                alt="Sharma Packagings - Strong Packaging. Stronger Protection." 
                className="official-hero-img"
              />
            </picture>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); handleOpenQuote(); }} 
              className="hero-banner-get-touch-trigger"
              aria-label="Get in Touch"
              title="Get in Touch"
            ></button>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US & ABOUT SHARMA PACKAGING */}
      <section className="section section-about">
        <div className="container about-grid">
          <div className="about-visual">
            <img 
              src="/uploads/about_us_facility.jpg" 
              onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/hero_bg.png'; }} 
              alt="Sharma Packaging - Heavy-Duty Industrial Packaging, Wooden Crating & ISPM 15 Certified Export Protection" 
              title="Sharma Packaging - Engineered Industrial Protection"
              className="about-img" 
            />
          </div>

          <div className="about-content">
            <span className="eyebrow">ABOUT US</span>
            <h2>Protecting Cargo With Industrial Precision & Certified Reliability.</h2>
            
            <p className="about-paragraph">
              Sharma Packaging provides engineered heavy-duty packaging solutions for industrial equipment, export cargo, and high-value machinery.
            </p>
            <p className="about-paragraph secondary-p">
              Our solutions combine ISPM 15 heat-treated timbers, VCI anti-corrosion barriers, and custom dimensions to ensure zero damage during storage, handling, and global transit.
            </p>

            <div className="about-features-list">
              <div className="feature-row">
                <div className="f-num">01</div>
                <div>
                  <h4>Industrial Engineering</h4>
                  <p>Custom structural design for heavy machinery, automotive components, and transformers up to 15+ tons.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="f-num">02</div>
                <div>
                  <h4>ISPM 15 Export Certified</h4>
                  <p>100% compliant heat-treated wooden crates and pallets for hassle-free international customs clearance.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="f-num">03</div>
                <div>
                  <h4>Turnkey Protection</h4>
                  <p>On-site factory wrapping, vacuum barrier sealing, and heavy cargo container lashing services.</p>
                </div>
              </div>
            </div>

            <Link to="/about-us" className="btn btn-primary about-cta">
              Learn About Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: 6 REASONS INDUSTRIAL LEADERS PARTNER WITH US */}
      <section className="section section-why section-why-enhanced">
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">OUR CORE STRENGTHS</span>
            <h2>6 Reasons Industrial Leaders Partner With Us</h2>
            <p>Engineered for safety, compliance, and seamless execution.</p>
          </div>

          <div className="why-grid">
            {[
              { 
                n: '01', 
                icon: <FaLayerGroup />, 
                title: 'Industrial-Grade Materials', 
                desc: 'High-density timber, heavy barrier foils, and certified hardware built for severe transit environments.',
                isHighlight: true
              },
              { 
                n: '02', 
                icon: <FaCube />, 
                title: 'Custom Geometry & CAD Fit', 
                desc: 'Every box, skid, and liner is designed around exact equipment load distribution and anchor points.' 
              },
              { 
                n: '03', 
                icon: <FaWeightHanging />, 
                title: 'Heavy-Duty Load Protection', 
                desc: 'Tested structural integrity engineered to support multi-ton heavy machinery cargo.',
                isHighlight: true
              },
              { 
                n: '04', 
                icon: <FaStopwatch />, 
                title: 'Rapid Production Turnaround', 
                desc: 'Streamlined manufacturing workflows ensuring your shipping schedules stay strictly on target.' 
              },
              { 
                n: '05', 
                icon: <FaCertificate />, 
                title: 'Complete Export Compliance', 
                desc: 'Official ISPM 15 stamps, heat-treatment logs, and phytosanitary export documentation.' 
              },
              { 
                n: '06', 
                icon: <FaHeadset />, 
                title: 'Dedicated Technical Support', 
                desc: 'Direct consultation from packaging engineers from quotation through final delivery.' 
              }
            ].map((w, idx) => (
              <div 
                key={idx} 
                className={`why-card-enhanced ${w.isHighlight ? 'is-highlighted-card' : ''}`}
              >
                <div className="why-card-header">
                  <div className="why-icon-badge">
                    {w.icon}
                  </div>
                  <span className="why-step-pill">0{idx + 1}</span>
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <div className="why-watermark-bg">{w.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: QUANTIFIED STATS BAR */}
      <section className="section-dark stats-band-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">
                <AnimatedCounter to={1000} suffix="+" duration={2.2} />
              </div>
              <div className="stat-label">Projects / Shipments Delivered</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                <AnimatedCounter to={100} suffix="+" duration={1.8} />
              </div>
              <div className="stat-label">Industrial Clients Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                <AnimatedCounter to={100} suffix="%" duration={1.8} />
              </div>
              <div className="stat-label">Quality & Compliance Commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: UNIFIED FILTERABLE PRODUCT CATALOG GRID */}
      <ProductSolutionsCarousel onOpenQuote={handleOpenQuote} />

      <section className="section section-products">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">PRODUCT CATALOG</span>
            <h2>Industrial Packaging Products Built for Performance</h2>
            <p>Filter our comprehensive range of wooden, protective, wrapping, and cargo securing solutions.</p>
          </div>

          {/* Filter Pills */}
          <div className="product-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid (6 Featured Cards) */}
          <div className="products-grid">
            {filteredProducts.slice(0, 6).map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="card-img-wrapper">
                  <img src={prod.image} alt={prod.name} className="product-img" />
                  <span className="category-badge">{prod.category}</span>
                </div>

                <div className="card-body">
                  <h3 className="product-name">{prod.name}</h3>
                  <p className="product-desc">{prod.description}</p>

                  <div className="benefits-list">
                    {prod.benefits.map((b, idx) => (
                      <div key={idx} className="b-item">
                        <FaCheck className="b-icon" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-actions">
                    <button onClick={() => handleOpenQuote(prod.name)} className="btn btn-accent btn-sm">
                      Get Quote
                    </button>
                    <Link to={`/${prod.slug}`} className="btn btn-outline btn-sm">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-products-wrapper">
      <Link to="/products" className="btn btn-secondary btn-lg">
              Explore Full Product Catalog <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROCESS STEP-TRACKER (HIGH-IMPACT ENGINEERING PIPELINE) */}
      <section className="section section-process section-process-light">
        <div className="container">
          <div className="section-header text-center">
            <span className="eyebrow">ENGINEERING EXCELLENCE</span>
            <h2>5-Step Engineering Workflow</h2>
            <p>From requirement analysis to ready-to-ship protection, ensuring zero transit damage.</p>
          </div>

          <div className="process-pipeline-wrapper">
            <div className="process-connector-track">
              <div className="process-connector-line"></div>
            </div>

            <div className="process-timeline">
              {[
                { 
                  step: '01', 
                  phase: 'PHASE 01: AUDIT',
                  title: 'Understand', 
                  icon: <FaSearch />, 
                  desc: 'Analyze weight, dimensions, center of gravity, fragility, and transit environment.',
                  tag: '✓ Site Audit'
                },
                { 
                  step: '02', 
                  phase: 'PHASE 02: CAD DESIGN',
                  title: 'Design', 
                  icon: <FaCogs />, 
                  desc: 'Engineered structural load points, material selection, and ISPM 15 compliance.',
                  tag: '✓ CAD Spec'
                },
                { 
                  step: '03', 
                  phase: 'PHASE 03: FABRICATION',
                  title: 'Build', 
                  icon: <FaHammer />, 
                  desc: 'Precision fabrication of heat-treated crates, skids, and moisture barrier liners.',
                  tag: '✓ Precision Cut'
                },
                { 
                  step: '04', 
                  phase: 'PHASE 04: SEAL & LASH',
                  title: 'Protect', 
                  icon: <FaShieldAlt />, 
                  desc: 'On-site or factory wrapping, vacuum sealing, and container lashing execution.',
                  tag: '✓ Barrier Seal'
                },
                { 
                  step: '05', 
                  phase: 'PHASE 05: DISPATCH',
                  title: 'Deliver', 
                  icon: <FaTruck />, 
                  desc: 'Final quality release ready for safe domestic or international export transit.',
                  tag: '✓ Transit Ready'
                }
              ].map((p, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="process-step-card"
                >
                  <div className="step-watermark">{p.step}</div>
                  <div className="step-header">
                    <span className="step-phase-badge">{p.phase}</span>
                    <span className="step-badge-num">{p.step}</span>
                  </div>
                  <div className="step-icon-glow">
                    {p.icon}
                  </div>
                  <h3 className="step-title">{p.title}</h3>
                  <p className="step-desc">{p.desc}</p>
                  <div className="step-tag-pill">
                    {p.tag}
                  </div>
                  {idx < 4 && <div className="step-flow-arrow"><FaChevronRight /></div>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PACKAGING IN ACTION (VIDEO & PHOTO PORTFOLIO) */}
      <VideoGallerySection />

      <section className="section section-gallery">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">PROJECT PORTFOLIO</span>
            <h2>Our Packaging in Action</h2>
            <p>Real-world packaging projects executed for leading manufacturing clients.</p>
          </div>

          <div className="gallery-filter-tabs">
            {['All', 'Wooden Packaging', 'Export Packaging', 'Heavy Machinery', 'Protective Packaging', 'Industrial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryCategory(cat)}
                className={`filter-pill ${galleryCategory === cat ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredGallery.map((item, idx) => (
              <div 
                key={idx} 
                className="gallery-card"
                onClick={() => setLightboxImg(item)}
              >
                <img src={item.img} alt={item.title} className="gallery-img" />
                <div className="gallery-card-overlay">
                  <FaSearchPlus className="zoom-icon" />
                  <h4>{item.title}</h4>
                  <span className="g-cat">{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-footer-cta">
            <Link to="/gallery" className="btn btn-outline">
              View Full Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: INSIGHTS & PACKAGING KNOWLEDGE */}
      <BlogSection />

      {/* SECTION 9: TRUSTED PARTNERS */}
      <section className="section section-clients section-bg-light">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">TRUSTED PARTNERS</span>
            <h2>Trusted by Industrial Manufacturers Across India</h2>
            <p>Leading enterprises depend on Sharma Packaging for reliable cargo protection.</p>
          </div>

          <div className="client-carousel-wrapper">
            <div className="client-carousel-track">
              {[
                { name: 'Amod Stamping Pvt Ltd' },
                { name: 'Safari' },
                { name: 'Sun Pharma' },
                { name: 'Vardhaman Agrochemicals Pvt Ltd' },
                { name: 'ABB India' },
                { name: 'Rotec by Adcom Processing' },
                { name: 'Adcomp Processing Technology Pvt Ltd' },
                { name: 'Enpay Transformer Components' },
                { name: 'Shree Ishan Equipment Pvt Ltd' },
                { name: 'Anupam Industries Ltd' },
                { name: 'Apex Steel Fabricators' },
                { name: 'Baroda Equipment & Vessels Pvt Ltd' },
                { name: 'Cryogas Equipment Pvt Ltd' },
                { name: 'Fast Forward Logistics India Pvt Ltd' },
                { name: 'Isgec Heavy Engineering Ltd' },
                { name: 'Kanungo Enterprises' },
                { name: 'Kodan Solutions Pvt Ltd' },
                { name: 'Natural Storage Solutions Pvt Ltd' },
                { name: 'Prime Insulation' },
                { name: 'R S Instrumentation & Services' },
                { name: 'Shree Ram Industries' },
                { name: 'AFG Combustion Pvt Ltd' },
                { name: 'Aquatech Systems Pvt Ltd' },
                { name: 'Bestall Machining & Fabrication Pvt Ltd' },
                { name: 'Cerec Metalform Pvt Ltd' },
                { name: 'Chintamani Transport Services' },
                { name: 'Deepak Chem Tech Ltd' },
                { name: 'Gautam Stainless Pvt Ltd' },
                { name: 'Goldcoin Foam Pvt Ltd' },
                { name: 'Incryo Systems Pvt Ltd' },
                { name: 'Indutch Composites Technology Pvt Ltd' },
                { name: 'Septechnik Engineers' },
                { name: 'Nikkiso Cosmodyne India Pvt Ltd' },
                { name: 'Pharma Chem Industries (Guj) Pvt Ltd' },
                { name: 'Sukan Enterprise' },
                { name: 'Vcare Engineering Pvt Ltd' }
              ].concat([
                { name: 'Amod Stamping Pvt Ltd' },
                { name: 'Safari' },
                { name: 'Sun Pharma' },
                { name: 'Vardhaman Agrochemicals Pvt Ltd' },
                { name: 'ABB India' },
                { name: 'Rotec by Adcom Processing' },
                { name: 'Adcomp Processing Technology Pvt Ltd' },
                { name: 'Enpay Transformer Components' },
                { name: 'Shree Ishan Equipment Pvt Ltd' },
                { name: 'Anupam Industries Ltd' },
                { name: 'Apex Steel Fabricators' },
                { name: 'Baroda Equipment & Vessels Pvt Ltd' },
                { name: 'Cryogas Equipment Pvt Ltd' },
                { name: 'Fast Forward Logistics India Pvt Ltd' },
                { name: 'Isgec Heavy Engineering Ltd' },
                { name: 'Kanungo Enterprises' },
                { name: 'Kodan Solutions Pvt Ltd' },
                { name: 'Natural Storage Solutions Pvt Ltd' },
                { name: 'Prime Insulation' },
                { name: 'R S Instrumentation & Services' },
                { name: 'Shree Ram Industries' },
                { name: 'AFG Combustion Pvt Ltd' },
                { name: 'Aquatech Systems Pvt Ltd' },
                { name: 'Bestall Machining & Fabrication Pvt Ltd' },
                { name: 'Cerec Metalform Pvt Ltd' },
                { name: 'Chintamani Transport Services' },
                { name: 'Deepak Chem Tech Ltd' },
                { name: 'Gautam Stainless Pvt Ltd' },
                { name: 'Goldcoin Foam Pvt Ltd' },
                { name: 'Incryo Systems Pvt Ltd' },
                { name: 'Indutch Composites Technology Pvt Ltd' },
                { name: 'Septechnik Engineers' },
                { name: 'Nikkiso Cosmodyne India Pvt Ltd' },
                { name: 'Pharma Chem Industries (Guj) Pvt Ltd' },
                { name: 'Sukan Enterprise' },
                { name: 'Vcare Engineering Pvt Ltd' }
              ]).map((client, idx) => (
                <div key={idx} className="client-box-card">
                  <span className="client-name">{client.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: CUSTOM REQUIREMENT CTA */}
      <section className="section-dark custom-cta-section">
        <div className="container text-center">
          <span className="eyebrow eyebrow-amber">TAILORED PACKAGING ENGINEERING</span>
          <h2>Have a Packaging Requirement That Doesn't Fit a Standard Product?</h2>
          <p className="cta-sub">Tell us what you're shipping. We'll help you determine the right structural design, materials, and protection barrier.</p>
          
          <div className="custom-cta-buttons">
            <button onClick={() => handleOpenQuote('Custom Packaging Requirement')} className="btn btn-accent btn-lg">
              Request Custom Solution
            </button>
            <a href="tel:+918709155299" className="btn btn-outline-dark btn-lg">
              <FaPhoneAlt /> Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 11: ACCORDION FAQ */}
      <section className="section section-faq section-bg-light">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">COMMON QUESTIONS</span>
            <h2>Packaging FAQ</h2>
            <p>Everything you need to know about our compliance, materials, and quotation process.</p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`faq-card ${isOpen ? 'is-open' : ''}`}>
                  <div className="faq-question" onClick={() => setActiveFaq(isOpen ? null : idx)}>
                    <h3>{faq.q}</h3>
                    <FaChevronDown className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 12: FINAL CONTACT & QUOTATION FORM */}
      <section className="section section-contact" id="quote-section">
        <div className="container">
          <div className="contact-main-grid">
            <div className="contact-info-side">
              <span className="eyebrow">GET IN TOUCH</span>
              <h2>Let's Protect Your Next Shipment.</h2>
              <p>Contact our packaging engineers directly or submit your shipment dimensions for a fast technical quotation.</p>

              <div className="contact-details-list">
                <div className="c-detail-item">
                  <FaPhoneAlt className="cd-icon" />
                  <div>
                    <strong>Direct Sales Line</strong>
                    <p><a href="tel:+918709155299">+91 87091 55299</a></p>
                  </div>
                </div>

                <div className="c-detail-item">
                  <FaEnvelope className="cd-icon" />
                  <div>
                    <strong>Email Support</strong>
                    <p><a href="mailto:info@sharmapackagings.com">info@sharmapackagings.com</a></p>
                  </div>
                </div>

                <div className="c-detail-item">
                  <FaMapMarkerAlt className="cd-icon" />
                  <div>
                    <strong>Head Office & Factory</strong>
                    <p>Ground Floor, Shop No. 4, 5, 6, Prime Plaza, Amodar, Waghodia Road, Vadodara, Gujarat 390019</p>
                  </div>
                </div>
              </div>

              <div className="whatsapp-callout-box">
                <FaWhatsapp className="wa-icon" />
                <div>
                  <strong>Need Immediate Assistance?</strong>
                  <p>Chat directly with our packaging team on WhatsApp.</p>
                  <a href="https://wa.me/918709155299" target="_blank" rel="noreferrer" className="wa-link">
                    Start WhatsApp Chat →
                  </a>
                </div>
              </div>
            </div>

            {/* Quotation Form */}
            <div className="contact-form-side card">
              <h3>Request a Quotation</h3>
              <p className="form-sub">Fill in details below for a customized pricing proposal.</p>

              <form onSubmit={handleFormSubmit} className="main-quote-form">
                <div className="form-row-2">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input type="text" required className="form-control" placeholder="John Doe" value={contactForm.fullName} onChange={e => setContactForm({ ...contactForm, fullName: e.target.value })} />
                  </div>
                  <div className="form-field">
                    <label>Company Name *</label>
                    <input type="text" required className="form-control" placeholder="Company Name" value={contactForm.companyName} onChange={e => setContactForm({ ...contactForm, companyName: e.target.value })} />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Phone Number *</label>
                    <input type="tel" required className="form-control" placeholder="+91 XXXXX XXXXX" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} />
                  </div>
                  <div className="form-field">
                    <label>Email Address *</label>
                    <input type="email" required className="form-control" placeholder="email@company.com" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Product / Requirement</label>
                    <select className="form-control" value={contactForm.product} onChange={e => setContactForm({ ...contactForm, product: e.target.value })}>
                      {PRODUCTS.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                      <option value="Custom Requirement">Custom Packaging Requirement</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Quantity</label>
                    <input type="text" className="form-control" placeholder="e.g. 200 units" value={contactForm.quantity} onChange={e => setContactForm({ ...contactForm, quantity: e.target.value })} />
                  </div>
                </div>

                <div className="form-field">
                  <label>Message / Specifications *</label>
                  <textarea rows={3} required className="form-control" placeholder="Specify load dimensions, weight, export requirements..." value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}></textarea>
                </div>

                <button type="submit" className="btn btn-accent btn-lg submit-btn">
                  Request a Quote →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}><FaTimes /></button>
            <img src={lightboxImg.img} alt={lightboxImg.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3>{lightboxImg.title}</h3>
              <span>{lightboxImg.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* General Quote Modal */}
      <InquiryModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        productName={selectedProduct} 
      />
    </div>
  );
}
