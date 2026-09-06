import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSitemap, FaBox, FaCogs, FaBook, FaGlobeAsia } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import { PRODUCTS, SOLUTIONS, INDUSTRIES } from '../data/productsData';

export default function Sitemap() {
  const currentUrl = 'https://sharmapackagings.com/sitemap';

  const mainPages = [
    { title: 'Home Page', path: '/' },
    { title: 'About Us', path: '/about-us' },
    { title: 'All Products Catalog', path: '/products' },
    { title: 'Engineered Solutions', path: '/solutions' },
    { title: 'Sectors & Industries', path: '/industries' },
    { title: 'Packaging Services', path: '/services' },
    { title: 'Project Photo Gallery', path: '/gallery' },
    { title: 'Video Gallery in Action', path: '/video-gallery' },
    { title: 'Technical Blog & News', path: '/blog' },
    { title: 'Contact Us', path: '/contact-us' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
    { title: 'Terms & Conditions', path: '/terms-and-conditions' }
  ];

  const seoServices = [
    { title: 'Seaworthy Packing in Vadodara', path: '/seaworthy-packing-in-vadodara' },
    { title: 'VCI Packaging in Vadodara', path: '/vci-packaging-in-vadodara' },
    { title: 'VCI Packaging Manufacturer in Vadodara', path: '/vci-packaging-manufacturer-in-vadodara' },
    { title: 'Export Packaging in Vadodara', path: '/export-packaging-in-vadodara' },
    { title: 'Industrial Packaging Solutions in Vadodara', path: '/industrial-packaging-solutions-in-vadodara' },
    { title: 'Aluminium Barrier Foil Packing in Vadodara', path: '/aluminium-barrier-foil-packing-in-vadodara' },
    { title: 'Thermo Shrink Packing in Vadodara', path: '/thermo-shrink-packing-in-vadodara' },
    { title: 'ODC Cargo Packing in Vadodara', path: '/odc-cargo-packing-in-vadodara' },
    { title: 'Desiccant Supplier in Vadodara', path: '/desiccant-supplier-in-vadodara' },
    { title: 'Humidity Indicator Card Supplier in Vadodara', path: '/humidity-indicator-card-supplier-in-vadodara' },
    { title: 'Silpaulin Tarpaulin Cover Supplier in Vadodara', path: '/silpaulin-tarpaulin-cover-supplier-in-vadodara' },
    { title: 'LD/HM Liner Manufacturer in Vadodara', path: '/ld-hm-liner-manufacturer-in-vadodara' },
    { title: 'Packaging Consultancy in Vadodara', path: '/packaging-consultancy-in-vadodara' }
  ];

  const seoProducts = [
    { title: 'VCI Film Roll in Vadodara', path: '/vci-film-roll-in-vadodara' },
    { title: 'VCI Paper Supplier in Vadodara', path: '/vci-paper-supplier-in-vadodara' },
    { title: 'VCI Bags Manufacturer in Vadodara', path: '/vci-bags-manufacturer-in-vadodara' },
    { title: 'VCI Oil Supplier in Vadodara', path: '/vci-oil-supplier-in-vadodara' },
    { title: 'Humidity Indicator Card in Vadodara', path: '/humidity-indicator-card-in-vadodara' },
    { title: 'Desiccant Bags in Vadodara', path: '/desiccant-bags-in-vadodara' },
    { title: 'Seaworthy Wooden Box Packing in Vadodara', path: '/seaworthy-wooden-box-packing-in-vadodara' },
    { title: 'Aluminium Barrier Foil Rolls in Vadodara', path: '/aluminium-barrier-foil-rolls-in-vadodara' },
    { title: 'Aluminium Foil Packing for Preservation in Vadodara', path: '/aluminium-foil-packing-for-preservation-in-vadodara' },
    { title: 'Heavy Duty Protective Cover in Vadodara', path: '/heavy-duty-protective-cover-in-vadodara' },
    { title: 'Silpaulin Cover in Vadodara', path: '/silpaulin-cover-in-vadodara' },
    { title: 'Tarpaulin Rolls in Vadodara', path: '/tarpaulin-rolls-in-vadodara' },
    { title: 'ODC Cargo Packing Materials in Vadodara', path: '/odc-cargo-packing-materials-in-vadodara' },
    { title: 'Thermo Shrink Packing in Vadodara', path: '/thermo-shrink-packing-in-vadodara' },
    { title: 'LDPE Shrink Film in Vadodara', path: '/ldpe-shrink-film-in-vadodara' },
    { title: 'HDPE Roll Supplier in Vadodara', path: '/hdpe-roll-supplier-in-vadodara' },
    { title: 'LD/HM Liners in Vadodara', path: '/ld-hm-liners-in-vadodara' },
    { title: 'Disposable Aprons in Vadodara', path: '/disposable-aprons-in-vadodara' },
    { title: 'Carry Bags Manufacturer in Vadodara', path: '/carry-bags-manufacturer-in-vadodara' },
    { title: 'PP Tubing in Vadodara', path: '/pp-tubing-in-vadodara' },
    { title: 'Heavy Duty Liner Bags in Vadodara', path: '/heavy-duty-liner-bags-in-vadodara' },
    { title: 'Perforation Embossing Bags in Vadodara', path: '/perforation-embossing-bags-in-vadodara' },
    { title: 'Valve Type LD Bags in Vadodara', path: '/valve-type-ld-bags-in-vadodara' }
  ];

  const blogArticles = [
    { title: 'Seaworthy Packing in Vadodara Complete Guide', path: '/blog/seaworthy-packing-in-vadodara-complete-guide' },
    { title: 'VCI Packaging for Rust Prevention', path: '/blog/vci-packaging-for-rust-prevention' },
    { title: 'Export Packaging Guide for Manufacturers in Vadodara', path: '/blog/export-packaging-guide-for-manufacturers-in-vadodara' },
    { title: 'Aluminium Barrier Foil Packing for Moisture Protection', path: '/blog/aluminium-barrier-foil-packing-for-moisture-protection' },
    { title: 'How to Protect Metal Parts from Corrosion During Shipping', path: '/blog/how-to-protect-metal-parts-from-corrosion-during-shipping' }
  ];

  return (
    <>
      <SEOHead 
        title="HTML Sitemap & Full Site Directory | Sharma Packaging" 
        description="Comprehensive directory of all industrial packaging product pages, engineered solutions, priority export services, and technical guides from Sharma Packaging." 
        canonical={currentUrl}
      />
      
      {/* Hero Header */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(11,31,58,0.95), rgba(11,31,58,0.85)), url("/uploads/hero_bg.png")', padding: '60px 0', color: '#ffffff' }}>
        <div className="container text-center">
          <span className="eyebrow eyebrow-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <FaSitemap /> WEBSITE DIRECTORY
          </span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginTop: 8 }}>Website Sitemap</h1>
          <p style={{ maxWidth: 640, margin: '12px auto 0', color: 'rgba(255,255,255,0.85)' }}>
            Explore every product page, engineered solution, priority service, and technical guide on the Sharma Packaging platform.
          </p>
          <div className="breadcrumb" style={{ justifyContent: 'center', marginTop: 16 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link> / <span style={{ color: 'var(--white)' }}>Sitemap</span>
          </div>
        </div>
      </section>

      {/* XML Sitemap Callout */}
      <div style={{ background: '#EFF6FF', borderBottom: '1px solid #BFDBFE', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: '#1E40AF', fontWeight: 600, fontSize: '0.95rem' }}>
            🤖 Looking for Search Engine XML Crawl File?
          </span>
          <a 
            href="/sitemap.xml" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderColor: '#2563EB', color: '#2563EB' }}
          >
            View /sitemap.xml <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} />
          </a>
        </div>
      </div>

      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="container">
          
          <div className="grid grid-3" style={{ gap: '36px', alignItems: 'flex-start' }}>
            
            {/* COLUMN 1: Main Pages & Direct Product Pages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <h3 style={{ borderBottom: '3px solid var(--blue-royal)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaSitemap style={{ color: 'var(--blue-royal)' }} /> Primary Website Navigation
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {mainPages.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                      <Link to={item.path} style={{ color: 'var(--blue-royal)', fontWeight: 600, fontSize: '0.98rem', display: 'inline-block' }}>
                        → {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <h3 style={{ borderBottom: '3px solid var(--amber-accent)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaBox style={{ color: 'var(--amber-accent)' }} /> Industrial Products (Direct URLs)
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {PRODUCTS.map((prod) => (
                    <li key={prod.id} style={{ marginBottom: '10px' }}>
                      <Link to={`/${prod.slug}`} style={{ color: 'var(--navy-dark)', fontWeight: 500, fontSize: '0.94rem' }}>
                        • {prod.name} <span style={{ fontSize: '0.8rem', color: '#64748B' }}>({`/${prod.slug}`})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 2: Priority Services & Vadodara SEO Pages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <h3 style={{ borderBottom: '3px solid var(--blue-royal)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaCogs style={{ color: 'var(--blue-royal)' }} /> Priority Industrial Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {seoServices.map((s, idx) => (
                    <li key={idx} style={{ marginBottom: '10px' }}>
                      <Link to={s.path} style={{ color: 'var(--blue-royal)', fontSize: '0.93rem', fontWeight: 500 }}>
                        ✓ {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <h3 style={{ borderBottom: '3px solid var(--amber-accent)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaGlobeAsia style={{ color: 'var(--amber-accent)' }} /> Specialized Product Landing Pages
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {seoProducts.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <Link to={p.path} style={{ color: '#475569', fontSize: '0.88rem' }}>
                        • {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 3: Solutions, Industries & Technical Blog */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <h3 style={{ borderBottom: '3px solid var(--blue-royal)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaCogs style={{ color: 'var(--blue-royal)' }} /> Engineered Solutions
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {SOLUTIONS.map((sol) => (
                    <li key={sol.id} style={{ marginBottom: '10px' }}>
                      <Link to="/solutions" style={{ color: 'var(--navy-dark)', fontWeight: 600, fontSize: '0.93rem' }}>
                        • {sol.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <h3 style={{ borderBottom: '3px solid var(--amber-accent)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaGlobeAsia style={{ color: 'var(--amber-accent)' }} /> Industry Sectors
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {INDUSTRIES.map((ind, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <Link to="/industries" style={{ color: 'var(--navy-dark)', fontSize: '0.9rem' }}>
                        • {ind.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <h3 style={{ borderBottom: '3px solid var(--blue-royal)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--navy-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaBook style={{ color: 'var(--blue-royal)' }} /> Technical Knowledge Base
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {blogArticles.map((b, idx) => (
                    <li key={idx} style={{ marginBottom: '10px' }}>
                      <Link to={b.path} style={{ color: 'var(--blue-royal)', fontSize: '0.88rem', lineHeight: 1.4, display: 'block' }}>
                        📖 {b.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
