import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SEOHead from '../components/common/SEOHead';
import { PRODUCTS } from '../data/productsData';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    product: 'Wooden Pallets',
    quantity: '',
    dimensions: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Thank you! Your quote request has been sent to our engineering team.');
      setForm({
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        product: 'Wooden Pallets',
        quantity: '',
        dimensions: '',
        message: ''
      });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="contact-page">
      <SEOHead title="Contact Us & Request a Quote | Sharma Packaging" />

      {/* Hero */}
      <section className="contact-hero section-dark text-center">
        <div className="container">
          <span className="eyebrow eyebrow-amber">GET IN TOUCH</span>
          <h1>Let's Protect Your Next Shipment.</h1>
          <p className="contact-hero-sub">
            Speak directly with our technical team in Vadodara or submit your load specifications for a fast quotation.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section section-contact-main">
        <div className="container contact-main-grid">
          {/* Details Side */}
          <div className="contact-info-col">
            <span className="eyebrow">DIRECT CONTACT</span>
            <h2>Packaging Engineering Support</h2>
            <p>Our engineers calculate timber load ratings, moisture vapor transfer barrier thickness, and phytosanitary compliance for domestic and export shipments.</p>

            <div className="c-info-list">
              <div className="c-info-card">
                <FaPhoneAlt className="cic-icon" />
                <div>
                  <strong>Direct Phone Line</strong>
                  <p><a href="tel:+918709155299">+91 87091 55299</a></p>
                </div>
              </div>

              <div className="c-info-card">
                <FaEnvelope className="cic-icon" />
                <div>
                  <strong>Sales & Quotation Email</strong>
                  <p><a href="mailto:info@sharmapackagings.com">info@sharmapackagings.com</a></p>
                  <p><a href="mailto:sharmapackagings5@gmail.com">sharmapackagings5@gmail.com</a></p>
                </div>
              </div>

              <div className="c-info-card">
                <FaMapMarkerAlt className="cic-icon" />
                <div>
                  <strong>Vadodara HQ & Plant</strong>
                  <p>Ground Floor, Shop No. 4, 5, 6, Prime Plaza, Amodar, Waghodia Road, Vadodara, Gujarat 390019</p>
                </div>
              </div>

              <div className="c-info-card">
                <FaClock className="cic-icon" />
                <div>
                  <strong>Business Working Hours</strong>
                  <p>Monday – Saturday: 9:00 AM – 7:00 PM (IST)</p>
                </div>
              </div>
            </div>

            <div className="wa-banner card">
              <FaWhatsapp className="wa-big-icon" />
              <div>
                <strong>Need Instant WhatsApp Assistance?</strong>
                <p>Send your drawings or dimensions directly to our team.</p>
                <a href="https://wa.me/918709155299" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ marginTop: '10px' }}>
                  Chat on WhatsApp Now
                </a>
              </div>
            </div>
          </div>

          {/* Quotation Form */}
          <div className="contact-form-col card">
            <h2>Request an Engineering Quote</h2>
            <p className="f-sub">Provide your shipment details for an accurate pricing proposal.</p>

            <form onSubmit={handleSubmit} className="c-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required className="form-control" placeholder="John Doe" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input type="text" required className="form-control" placeholder="Company Name" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" required className="form-control" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" required className="form-control" placeholder="john@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Product / Solution</label>
                  <select className="form-control" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Custom Packaging">Custom Packaging Solution</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="text" className="form-control" placeholder="e.g. 50 units" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Target Dimensions</label>
                  <input type="text" className="form-control" placeholder="L x W x H (mm)" value={form.dimensions} onChange={e => setForm({ ...form, dimensions: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label>Specific Requirements & Message *</label>
                <textarea rows={4} required className="form-control" placeholder="Detail machine weight, load points, transport mode, or export destination..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg submit-btn" disabled={loading}>
                <FaPaperPlane /> {loading ? 'Submitting...' : 'Request a Quote →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="section-sm map-section">
        <div className="container">
          <div className="map-frame card" style={{ padding: 0, overflow: 'hidden' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.6732959827055!2d73.18944111538356!3d22.252467985346083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5e3b5e4a8f9%3A0x6b8641151df1c7e9!2sSharma%20Packaging!5e0!3m2!1sen!2sin!4v1684562417482!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Sharma Packaging Vadodara Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
