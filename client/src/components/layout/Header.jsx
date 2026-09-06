import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhone, FaBars, FaTimes, FaArrowRight, FaChevronDown, FaImages, FaVideo, FaNewspaper } from 'react-icons/fa';
import './Header.css';

export default function Header({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMediaDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about-us' },
    { label: 'Products', path: '/products' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Industries', path: '/industries' },
    { 
      label: 'Media', 
      isDropdown: true,
      items: [
        { label: 'Photo Gallery', path: '/gallery', icon: <FaImages /> },
        { label: 'Video Gallery', path: '/video-gallery', icon: <FaVideo /> },
        { label: 'Blog & Insights', path: '/blog', icon: <FaNewspaper /> }
      ]
    },
    { label: 'Contact', path: '/contact-us' }
  ];

  const isMediaActive = location.pathname.startsWith('/gallery') || 
                        location.pathname.startsWith('/video-gallery') || 
                        location.pathname.startsWith('/blog');

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-container">
          <Link to="/" className="header-brand">
            <img src="/sharma_packaging_logo.png" alt="Sharma Packaging Logo" className="brand-logo-img" />
          </Link>

          <div className="header-right-group">
            <nav className="desktop-nav">
              <ul className="nav-list">
                {navLinks.map((link) => {
                  if (link.isDropdown) {
                    return (
                      <li 
                        key="media-dropdown" 
                        className="nav-item nav-dropdown-item"
                        onMouseEnter={() => setMediaDropdownOpen(true)}
                        onMouseLeave={() => setMediaDropdownOpen(false)}
                      >
                        <button 
                          className={`nav-link dropdown-toggle-btn ${isMediaActive ? 'active' : ''}`}
                          onClick={() => setMediaDropdownOpen(!mediaDropdownOpen)}
                        >
                          Media <FaChevronDown style={{ fontSize: '0.75rem', marginLeft: 4 }} />
                        </button>

                        {mediaDropdownOpen && (
                          <ul className="nav-dropdown-menu">
                            {link.items.map((sub) => (
                              <li key={sub.path}>
                                <Link 
                                  to={sub.path} 
                                  className={`dropdown-menu-link ${location.pathname.startsWith(sub.path) ? 'is-active' : ''}`}
                                >
                                  <span className="sub-icon">{sub.icon}</span>
                                  <span>{sub.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <li key={link.path} className="nav-item">
                      <Link to={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="header-actions">
              <a href="tel:+918709155299" className="header-phone-link">
                <FaPhone className="phone-icon" />
                <span>+91 87091 55299</span>
              </a>
              <button onClick={() => onOpenQuote ? onOpenQuote() : null} className="btn btn-secondary header-cta">
                Get a Quote
              </button>
              <button 
                className="mobile-toggle-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <img src="/logo.png" alt="Sharma Packaging" className="mobile-brand-logo" />
            <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <ul className="mobile-nav-list">
            <li><Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}><span>Home</span><FaArrowRight className="arrow-icon" /></Link></li>
            <li><Link to="/about-us" className={`mobile-nav-link ${location.pathname === '/about-us' ? 'active' : ''}`}><span>About</span><FaArrowRight className="arrow-icon" /></Link></li>
            <li><Link to="/products" className={`mobile-nav-link ${location.pathname === '/products' ? 'active' : ''}`}><span>Products</span><FaArrowRight className="arrow-icon" /></Link></li>
            <li><Link to="/solutions" className={`mobile-nav-link ${location.pathname === '/solutions' ? 'active' : ''}`}><span>Solutions</span><FaArrowRight className="arrow-icon" /></Link></li>
            <li><Link to="/industries" className={`mobile-nav-link ${location.pathname === '/industries' ? 'active' : ''}`}><span>Industries</span><FaArrowRight className="arrow-icon" /></Link></li>
            
            {/* Mobile Media Submenu */}
            <li style={{ background: 'var(--bg-light)', padding: '14px 16px', borderRadius: 12, margin: '8px 0' }}>
              <div style={{ fontWeight: 700, color: 'var(--navy-dark)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Media Hub</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><Link to="/gallery" style={{ color: 'var(--navy-dark)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}><FaImages style={{ color: 'var(--blue-royal)' }} /> Photo Gallery</Link></li>
                <li><Link to="/video-gallery" style={{ color: 'var(--navy-dark)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}><FaVideo style={{ color: 'var(--blue-royal)' }} /> Video Gallery</Link></li>
                <li><Link to="/blog" style={{ color: 'var(--navy-dark)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}><FaNewspaper style={{ color: 'var(--blue-royal)' }} /> Blog & Insights</Link></li>
              </ul>
            </li>

            <li><Link to="/contact-us" className={`mobile-nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`}><span>Contact</span><FaArrowRight className="arrow-icon" /></Link></li>
          </ul>

          <div className="mobile-drawer-footer">
            <div className="mobile-contact-info">
              <p><strong>Call Direct:</strong> +91 87091 55299</p>
              <p><strong>Email:</strong> info@sharmapackagings.com</p>
            </div>
            <button 
              onClick={() => { setMobileMenuOpen(false); if (onOpenQuote) onOpenQuote(); }} 
              className="btn btn-secondary w-full"
            >
              Request Quotation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
