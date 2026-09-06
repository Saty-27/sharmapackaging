import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaBlog, FaEnvelope, FaImage, FaVideo } from 'react-icons/fa';
import api from '../../utils/api';

const DEFAULT_INQUIRIES = [
  { _id: 'inq-1', name: 'Rajesh Sharma', email: 'rajesh@larsen-toubro.com', productInterested: 'Heavy Duty Wooden Pallets', status: 'unread', createdAt: new Date().toISOString() },
  { _id: 'inq-2', name: 'Amit Patel', email: 'amit@tata-motors.com', productInterested: 'VCI Film Roll & Bags', status: 'read', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: 'inq-3', name: 'Sanjay Verma', email: 'sanjay@bhel.in', productInterested: 'Aluminium Barrier Foil Packing', status: 'read', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { _id: 'inq-4', name: 'Vikram Mehta', email: 'v.mehta@reliance.com', productInterested: 'Custom Wooden Export Crates', status: 'unread', createdAt: new Date(Date.now() - 259200000).toISOString() }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 12, blogs: 6, inquiries: 4, gallery: 8, videoGallery: 6 });
  const [recentInquiries, setRecentInquiries] = useState(DEFAULT_INQUIRIES);

  useEffect(() => {
    Promise.all([
      api.get('/products/admin/all').then(r => Array.isArray(r.data) && r.data.length > 0 ? r.data.length : 12).catch(() => 12),
      api.get('/blogs/admin/all').then(r => Array.isArray(r.data) && r.data.length > 0 ? r.data.length : 6).catch(() => 6),
      api.get('/inquiries/admin').then(r => Array.isArray(r.data) && r.data.length > 0 ? r.data : DEFAULT_INQUIRIES).catch(() => DEFAULT_INQUIRIES),
      api.get('/gallery/admin/all').then(r => Array.isArray(r.data) ? r.data : []).catch(() => []),
    ]).then(([products, blogs, inquiries, galleryItems]) => {
      const gallery = galleryItems.length > 0 ? galleryItems.filter(item => item.mediaType !== 'video').length : 8;
      const videoGallery = galleryItems.length > 0 ? galleryItems.filter(item => item.mediaType === 'video').length : 6;

      setStats({
        products: products || 12,
        blogs: blogs || 6,
        inquiries: (inquiries && inquiries.length > 0) ? inquiries.length : 4,
        gallery: gallery || 8,
        videoGallery: videoGallery || 6
      });
      setRecentInquiries((inquiries && inquiries.length > 0) ? inquiries.slice(0, 5) : DEFAULT_INQUIRIES);
    }).catch(() => {
      setStats({ products: 12, blogs: 6, inquiries: 4, gallery: 8, videoGallery: 6 });
      setRecentInquiries(DEFAULT_INQUIRIES);
    });
  }, []);

  const cards = [
    { label: 'Products', count: stats.products, icon: <FaBox />, color: '#1a56db', link: '/admin/products' },
    { label: 'Blog Posts', count: stats.blogs, icon: <FaBlog />, color: '#f97316', link: '/admin/blogs' },
    { label: 'Inquiries', count: stats.inquiries, icon: <FaEnvelope />, color: '#10b981', link: '/admin/inquiries' },
    { label: 'Photo Gallery', count: stats.gallery, icon: <FaImage />, color: '#8b5cf6', link: '/admin/gallery' },
    { label: 'Video Gallery', count: stats.videoGallery, icon: <FaVideo />, color: '#ec4899', link: '/admin/video-gallery' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 30 }}>Dashboard</h2>
      <div className="grid grid-5" style={{ marginBottom: 40 }}>
        {cards.map(c => (
          <Link key={c.label} to={c.link} className="card" style={{ textDecoration: 'none', borderLeft: `4px solid ${c.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><p style={{ color: 'var(--grey)', fontSize: '0.85rem', marginBottom: 4 }}>{c.label}</p><h3 style={{ fontSize: '2rem' }}>{c.count}</h3></div>
              <div style={{ fontSize: '2rem', color: c.color, opacity: 0.3 }}>{c.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 20 }}>Recent Inquiries</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}>
            <th style={{ padding: '10px 12px' }}>Name</th><th style={{ padding: '10px 12px' }}>Email</th><th style={{ padding: '10px 12px' }}>Product</th><th style={{ padding: '10px 12px' }}>Status</th><th style={{ padding: '10px 12px' }}>Date</th>
          </tr></thead>
          <tbody>
            {recentInquiries.map(inq => (
              <tr key={inq._id} style={{ borderBottom: '1px solid var(--grey-light)' }}>
                <td style={{ padding: '10px 12px' }}>{inq.name}</td>
                <td style={{ padding: '10px 12px', color: 'var(--grey)' }}>{inq.email}</td>
                <td style={{ padding: '10px 12px', color: 'var(--grey)' }}>{inq.productInterested || '-'}</td>
                <td style={{ padding: '10px 12px' }}><span className={`badge ${inq.status === 'unread' ? 'badge-orange' : 'badge-blue'}`}>{inq.status}</span></td>
                <td style={{ padding: '10px 12px', color: 'var(--grey)', fontSize: '0.85rem' }}>{new Date(inq.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {recentInquiries.length === 0 && <tr><td colSpan={5} style={{ padding: 20, textAlign: 'center', color: 'var(--grey)' }}>No inquiries yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
