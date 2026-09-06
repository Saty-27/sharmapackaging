import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaGlobe, FaLock } from 'react-icons/fa';

export default function ChatAuthModal() {
  const { authModalOpen, setAuthModalOpen, loginCustomer, registerCustomer, loading } = useChat();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    country: 'India',
    inquiryType: 'Product Enquiry',
    password: ''
  });

  if (!authModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('Please provide your email and password.');
        return;
      }
      const res = await loginCustomer(formData.email, formData.password);
      if (!res.success) setError(res.message);
    } else {
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Please fill in all required fields (Full Name, Email, and Mobile Number).');
        return;
      }
      const dataToSend = {
        ...formData,
        companyName: formData.companyName.trim() || 'Individual Customer',
        password: formData.password || 'Customer@123'
      };
      const res = await registerCustomer(dataToSend);
      if (!res.success) setError(res.message);
    }
  };

  return (
    <div className="chat-auth-overlay">
      <div className="chat-auth-modal">
        <button className="chat-auth-close" onClick={() => setAuthModalOpen(false)} aria-label="Close">
          <FaTimes />
        </button>

        <div className="chat-auth-header">
          <div className="chat-auth-badge">SHARMA PACKAGING SUPPORT</div>
          <h2>{isLogin ? 'Welcome Back' : "Let's get you connected"}</h2>
          <p>
            {isLogin
              ? 'Sign in to access your packaging inquiry & support history.'
              : 'Provide your contact details to start a real-time conversation with our engineering support team.'}
          </p>
        </div>

        {error && <div className="chat-auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="chat-auth-form">
          {!isLogin ? (
            <>
              <div className="chat-form-group">
                <label>Full Name *</label>
                <div className="input-with-icon">
                  <FaUser className="field-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="chat-form-grid">
                <div className="chat-form-group">
                  <label>Email Address *</label>
                  <div className="input-with-icon">
                    <FaEnvelope className="field-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="chat-form-group">
                  <label>Mobile Number *</label>
                  <div className="input-with-icon">
                    <FaPhone className="field-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="chat-form-group">
                <label>Company Name (Optional)</label>
                <div className="input-with-icon">
                  <FaBuilding className="field-icon" />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="e.g. Apex Engineering Pvt Ltd (Optional)"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="chat-form-grid">
                <div className="chat-form-group">
                  <label>Country</label>
                  <div className="input-with-icon">
                    <FaGlobe className="field-icon" />
                    <input
                      type="text"
                      name="country"
                      placeholder="India"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="chat-form-group">
                  <label>Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="chat-select">
                    <option value="Product Enquiry">Product Enquiry</option>
                    <option value="Request a Quote">Request a Quote</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Order Assistance">Order Assistance</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
              </div>

              <div className="chat-form-group">
                <label>Password (Optional - for future sign in)</label>
                <div className="input-with-icon">
                  <FaLock className="field-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password (Optional)"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="chat-form-group">
                <label>Email Address *</label>
                <div className="input-with-icon">
                  <FaEnvelope className="field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="chat-form-group">
                <label>Password *</label>
                <div className="input-with-icon">
                  <FaLock className="field-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="chat-privacy-notice">
            By continuing, you agree to our <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a> and consent to Sharma Packaging using your details to respond to your enquiry.
          </div>

          <button type="submit" className="btn btn-secondary chat-auth-submit" disabled={loading}>
            {loading ? (isLogin ? 'Signing In...' : 'Connecting...') : (isLogin ? 'Sign In to Chat' : 'Continue to Chat')}
          </button>
        </form>

        <div className="chat-auth-footer-toggle">
          {isLogin ? (
            <span>Don't have an account? <button type="button" onClick={() => { setIsLogin(false); setError(''); }}>Register Now</button></span>
          ) : (
            <span>Already have an account? <button type="button" onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button></span>
          )}
        </div>
      </div>
    </div>
  );
}
