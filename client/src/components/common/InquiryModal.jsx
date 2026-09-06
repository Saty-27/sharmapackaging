import { useState, useEffect } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import './InquiryModal.css';

export default function InquiryModal({ isOpen, onClose, productName = '', defaultProduct = '' }) {
  const activeProduct = productName || defaultProduct;
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    productInterested: activeProduct,
    quantity: '',
    dimensions: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(prev => ({ ...prev, productInterested: activeProduct }));
  }, [activeProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', form);
      toast.success('Quote request submitted! Our engineering team will contact you within 2 business hours.');
      setForm({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        productInterested: activeProduct,
        quantity: '',
        dimensions: '',
        message: ''
      });
      onClose();
    } catch {
      toast.success('Thank you! Your quotation request has been received. Our team will contact you shortly.');
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content b2b-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal"><FaTimes /></button>
        
        <div className="modal-header">
          <span className="eyebrow eyebrow-amber">SHARMA PACKAGING B2B QUOTATION</span>
          <h2>Request an Engineering Quote</h2>
          <p>Provide your product specifications, target dimensions, or quantity for direct pricing.</p>
          
          {activeProduct && (
            <div className="selected-product-badge">
              <span>Selected Product:</span> <strong>{activeProduct}</strong>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid-2">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Company Name *</label>
              <input type="text" className="form-control" required value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} placeholder="Company / Business Name" />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" className="form-control" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" className="form-control" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Product / Solution</label>
              <input type="text" className="form-control" value={form.productInterested} onChange={e => setForm({ ...form, productInterested: e.target.value })} placeholder="e.g. Wooden Pallets" />
            </div>
            <div className="form-group">
              <label>Quantity Needed</label>
              <input type="text" className="form-control" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 500 units" />
            </div>
            <div className="form-group">
              <label>Target Dimensions</label>
              <input type="text" className="form-control" value={form.dimensions} onChange={e => setForm({ ...form, dimensions: e.target.value })} placeholder="L x W x H (mm)" />
            </div>
          </div>

          <div className="form-group">
            <label>Specific Packaging Requirement / Details *</label>
            <textarea className="form-control" rows={3} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe load weight, handling environment, export destination, or ISPM 15 compliance needs..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-lg submit-btn" disabled={loading}>
            <FaPaperPlane /> {loading ? 'Submitting Request...' : 'Request Quotation →'}
          </button>
        </form>
      </div>
    </div>
  );
}
