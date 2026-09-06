import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaArrowUp, FaCheckCircle } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand-logo">
              <img src="/sharma_packaging_logo.png" alt="Sharma Packaging" className="footer-logo-img" />
            </Link>
            <p className="footer-desc">
              Sharma Packaging is a specialized industrial packaging manufacturer and engineering partner delivering custom wooden pallets, skids, export crating, and heavy-duty cargo protection across India.
            </p>
            <div className="footer-trust-badge">
              <FaCheckCircle className="badge-icon" />
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/video-gallery">Video Gallery</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="footer-col">
            <h4 className="footer-title">Top Products</h4>
            <ul className="footer-links">
              <li><Link to="/wooden-pallets">Wooden Pallets</Link></li>
              <li><Link to="/wooden-skid">Wooden Skids</Link></li>
              <li><Link to="/shrink-wrapping">Shrink Wrapping</Link></li>
              <li><Link to="/plywood-for-packing">Plywood for Packing</Link></li>
              <li><Link to="/lashing-materials">Lashing Materials</Link></li>
              <li><Link to="/vacuum-packing">Vacuum Barrier Packing</Link></li>
              <li><Link to="/stretch-film">High Tensile Stretch Film</Link></li>
              <li><Link to="/corrugated-boxes">Corrugated Boxes</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col contact-col">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <FaMapMarkerAlt className="c-icon" />
                <span>Ground Floor, Shop No. 4, 5, 6, Prime Plaza, Amodar, Waghodia Road, Vadodara, Gujarat 390019</span>
              </li>
              <li>
                <FaPhone className="c-icon" />
                <a href="tel:+918709155299">+91 87091 55299</a>
              </li>
              <li>
                <FaEnvelope className="c-icon" />
                <a href="mailto:info@sharmapackagings.com">info@sharmapackagings.com</a>
              </li>
              <li>
                <FaWhatsapp className="c-icon whatsapp" />
                <a href="https://wa.me/918709155299" target="_blank" rel="noreferrer">WhatsApp Instant Chat</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>© {new Date().getFullYear()} Sharma Packaging. All Rights Reserved.</p>
          <div className="bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="dot">•</span>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <span className="dot">•</span>
            <Link to="/sitemap">HTML Sitemap</Link>
            <span className="dot">•</span>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer">XML Sitemap</a>
          </div>
        </div>
      </div>

      {/* Floating Scroll Top & WhatsApp */}
      <button onClick={scrollToTop} className="float-scroll-top" aria-label="Scroll to top">
        <FaArrowUp />
      </button>

      <a href="https://wa.me/918709155299" target="_blank" rel="noreferrer" className="float-whatsapp" aria-label="Chat on WhatsApp">
        <FaWhatsapp />
      </a>
    </footer>
  );
}
