import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash, FaDownload, FaEye } from 'react-icons/fa';
import api, { API_URL } from '../../utils/api';

const DEFAULT_INQUIRIES = [
  { _id: 'inq-1', name: 'Rajesh Sharma', companyName: 'Larsen & Toubro Heavy Engineering', companyGst: '24AAACL1234A1Z1', email: 'rajesh@larsen-toubro.com', phone: '+91 98765 43210', productInterested: 'Heavy Duty Wooden Pallets', status: 'unread', createdAt: new Date().toISOString() },
  { _id: 'inq-2', name: 'Amit Patel', companyName: 'Tata Motors Commercial Vehicles', companyGst: '24AAACT5678B1Z2', email: 'amit@tata-motors.com', phone: '+91 98250 11223', productInterested: 'VCI Film Roll & Bags', status: 'read', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: 'inq-3', name: 'Sanjay Verma', companyName: 'BHEL Electricals', companyGst: '24AAACB9012C1Z3', email: 'sanjay@bhel.in', phone: '+91 94120 44556', productInterested: 'Aluminium Barrier Foil Packing', status: 'read', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { _id: 'inq-4', name: 'Vikram Mehta', companyName: 'Reliance Industries Logistics', companyGst: '24AAACR3456D1Z4', email: 'v.mehta@reliance.com', phone: '+91 99090 77889', productInterested: 'Custom Wooden Export Crates', status: 'unread', createdAt: new Date(Date.now() - 259200000).toISOString() }
];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState(DEFAULT_INQUIRIES);
  const load = () => { 
    api.get('/inquiries/admin')
      .then(r => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          setInquiries(r.data);
        } else {
          setInquiries(DEFAULT_INQUIRIES);
        }
      })
      .catch(() => setInquiries(DEFAULT_INQUIRIES)); 
  };
  useEffect(() => { load(); }, []);

  const markRead = async (id, status) => { await api.put(`/inquiries/admin/${id}`, { status }); toast.success('Status updated'); load(); };
  const deleteInq = async (id) => { if (!window.confirm('Delete this inquiry?')) return; await api.delete(`/inquiries/admin/${id}`); toast.success('Deleted'); load(); };
  const exportCSV = async () => {
    try {
      const response = await api.get('/inquiries/admin/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch {
      toast.error('Failed to export CSV');
    }
  };

  return (<div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}><h2>Inquiries ({inquiries.length})</h2><button className="btn btn-secondary" onClick={exportCSV}><FaDownload /> Export CSV</button></div>
    <div className="card"><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr style={{ borderBottom: '2px solid var(--grey-light)', textAlign: 'left' }}><th style={{ padding: 10 }}>Name</th><th style={{ padding: 10 }}>Company</th><th style={{ padding: 10 }}>Email</th><th style={{ padding: 10 }}>Phone</th><th style={{ padding: 10 }}>Product</th><th style={{ padding: 10 }}>Status</th><th style={{ padding: 10 }}>Date</th><th style={{ padding: 10 }}>Actions</th></tr></thead><tbody>
      {inquiries.map(i => <tr key={i._id} style={{ borderBottom: '1px solid var(--grey-light)', background: i.status === 'unread' ? 'rgba(249,115,22,0.03)' : 'transparent' }}><td style={{ padding: 10, fontWeight: i.status === 'unread' ? 700 : 400 }}>{i.name}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.companyName || '-'}{i.companyGst && <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--orange)' }}>GST: {i.companyGst}</span>}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.email}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.phone || '-'}</td><td style={{ padding: 10, color: 'var(--grey)' }}>{i.productInterested || '-'}</td><td style={{ padding: 10 }}><span className={`badge ${i.status === 'unread' ? 'badge-orange' : 'badge-blue'}`}>{i.status}</span></td><td style={{ padding: 10, fontSize: '0.85rem', color: 'var(--grey)' }}>{new Date(i.createdAt).toLocaleDateString()}</td><td style={{ padding: 10 }}><div style={{ display: 'flex', gap: 6 }}><button onClick={() => markRead(i._id, i.status === 'unread' ? 'read' : 'unread')} className="btn btn-sm btn-outline-dark"><FaEye /></button><button onClick={() => deleteInq(i._id)} className="btn btn-sm" style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}><FaTrash /></button></div></td></tr>)}
    </tbody></table>{inquiries.length === 0 && <p style={{ textAlign: 'center', padding: 40, color: 'var(--grey)' }}>No inquiries yet</p>}</div>
  </div>);
}
