import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaVideo, FaSearch, 
  FaTimes, FaUpload, FaArrowsAlt, FaPlay, FaExclamationTriangle
} from 'react-icons/fa';
import api, { getMediaUrl, isYouTubeUrl, getYouTubeEmbedUrl } from '../../utils/api';

const DEFAULT_VIDEOS = [
  { _id: 'vid-1', title: 'Heavy Machinery Shrink Cover Application', category: 'Shrink Wrapping', description: 'Watch our technical packaging team apply protective shrink cover to industrial machinery.', videoUrl: '/uploads/1780642013161-717563536.mov', thumbnailUrl: '/uploads/Shrink-Wrapping.jpeg', aspectRatio: '16:10', isPublished: true, isFeatured: true, displayOrder: 1 },
  { _id: 'vid-2', title: 'ISPM 15 Certified Export Wooden Box Fabrication', category: 'Wooden Packaging', description: 'On-site wooden crate assembly and load securing for heavy export shipments.', videoUrl: '/uploads/1780642013161-717563536.mov', thumbnailUrl: '/uploads/seaworthy_packing.jpg', aspectRatio: '16:10', isPublished: true, isFeatured: false, displayOrder: 2 },
  { _id: 'vid-3', title: 'VCI Film Vacuum Packing for Precision Metal Parts', category: 'VCI Packaging', description: 'Sealing automotive components inside anti-rust VCI film bags and vacuum extraction.', videoUrl: '/uploads/1780642013161-717563536.mov', thumbnailUrl: '/uploads/vaccum-packing.jpg', aspectRatio: '16:10', isPublished: true, isFeatured: false, displayOrder: 3 },
  { _id: 'vid-4', title: 'Silpaulin Heavy Duty Protective Cover Installation', category: 'Protective Packaging', description: 'Custom tailored Silpaulin tarpaulin covers securing outdoor machinery against rain and sunlight.', videoUrl: '/uploads/1780642013161-717563536.mov', thumbnailUrl: '/uploads/tarpaulin.jpg', aspectRatio: '16:10', isPublished: true, isFeatured: false, displayOrder: 4 },
  { _id: 'vid-5', title: 'Aluminium Barrier Foil Heat Sealing Process', category: 'Industrial Packaging', description: 'Hermetic heat sealing of aluminium barrier foil for sub-zero moisture vapor transfer rate protection.', videoUrl: '/uploads/1780642013161-717563536.mov', thumbnailUrl: '/uploads/aluminium_foil_preservation.jpg', aspectRatio: '16:10', isPublished: true, isFeatured: false, displayOrder: 5 },
  { _id: 'vid-6', title: 'Contract Packaging Operations in Action', category: 'Contract Packaging', description: 'End-to-end B2B contract packing, palletizing, and cargo lashing for heavy industrial logistics.', videoUrl: '/uploads/1780642013161-717563536.mov', thumbnailUrl: '/uploads/odc_cargo_packing.jpg', aspectRatio: '16:10', isPublished: true, isFeatured: false, displayOrder: 6 }
];

export default function AdminVideoGallery() {
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Industrial Packaging',
    videoType: 'local',
    videoUrl: '',
    thumbnailUrl: '',
    aspectRatio: '9:16',
    displayOrder: 0,
    isPublished: true,
    isFeatured: false
  });

  const categories = [
    'Industrial Packaging',
    'Wooden Packaging',
    'Shrink Wrapping',
    'VCI Packaging',
    'Protective Packaging',
    'Contract Packaging',
    'General'
  ];

  const loadVideos = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/videos/admin/all');
      if (Array.isArray(data) && data.length > 0) {
        setVideos(data);
      } else {
        setVideos(DEFAULT_VIDEOS);
      }
    } catch {
      setVideos(DEFAULT_VIDEOS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: 'Industrial Packaging',
      videoType: 'local',
      videoUrl: '',
      thumbnailUrl: '',
      aspectRatio: '9:16',
      displayOrder: videos.length + 1,
      isPublished: true,
      isFeatured: false
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (vid) => {
    setEditing(vid);
    setForm({
      title: vid.title || '',
      description: vid.description || '',
      category: vid.category || 'Industrial Packaging',
      videoType: vid.videoType || 'local',
      videoUrl: vid.videoUrl || '',
      thumbnailUrl: vid.thumbnailUrl || '',
      aspectRatio: vid.aspectRatio || '9:16',
      displayOrder: vid.displayOrder || 0,
      isPublished: vid.isPublished !== undefined ? vid.isPublished : true,
      isFeatured: vid.isFeatured || false
    });
    setShowForm(true);
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    setUploadingImage(true);

    try {
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({ ...prev, thumbnailUrl: data.url }));
      toast.success('Thumbnail uploaded');
    } catch {
      toast.error('Thumbnail upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    setUploadingVideo(true);

    try {
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({ ...prev, videoUrl: data.url, videoType: 'local' }));
      toast.success('Video uploaded successfully');
    } catch {
      toast.error('Video upload failed');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.videoUrl.trim()) {
      toast.error('Title and Video URL/File are required');
      return;
    }

    try {
      if (editing) {
        await api.put(`/videos/admin/${editing._id}`, form);
        toast.success('Video updated successfully');
      } else {
        await api.post('/videos/admin', form);
        toast.success('Video created successfully');
      }
      resetForm();
      loadVideos();
    } catch (err) {
      console.error('Failed to save video:', err);
      toast.error(err.response?.data?.message || 'Failed to save video');
    }
  };

  const handleToggleStatus = async (vid) => {
    try {
      await api.put(`/videos/admin/${vid._id}`, { isPublished: !vid.isPublished });
      toast.success(`Video ${vid.isPublished ? 'unpublished' : 'published'}`);
      loadVideos();
    } catch {
      toast.error('Status update failed');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/videos/admin/${deleteModal._id}`);
      toast.success('Video deleted');
      setDeleteModal(null);
      loadVideos();
    } catch {
      toast.error('Delete failed');
    }
  };

  const filteredVideos = videos.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (v.description && v.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || v.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || 
                          (statusFilter === 'Published' && v.isPublished) ||
                          (statusFilter === 'Draft' && !v.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="admin-page-container" style={{ padding: 30 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy-dark)', margin: 0 }}>
            Video Gallery Management
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.95rem' }}>
            Manage vertical 9:16 videos, video categories, display ordering, and public visibility.
          </p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <FaPlus /> Add Video
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'var(--white)', padding: 18, borderRadius: 12, marginBottom: 24, boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search videos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ paddingLeft: 36 }}
          />
        </div>
        <select 
          value={categoryFilter} 
          onChange={e => setCategoryFilter(e.target.value)}
          className="form-control"
          style={{ width: 200 }}
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          className="form-control"
          style={{ width: 160 }}
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Add / Edit Video Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--white)', borderRadius: 16, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', padding: 28, position: 'relative' }}>
            <button 
              onClick={resetForm} 
              style={{ position: 'absolute', top: 20, right: 20, border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <FaTimes />
            </button>
            <h2 style={{ marginTop: 0, marginBottom: 20, fontSize: '1.4rem', color: 'var(--navy-dark)' }}>
              {editing ? 'Edit Video' : 'Add New Video'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Video Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={form.title} 
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Heavy Machinery Shrink Cover Application" 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Category</label>
                  <select 
                    className="form-control" 
                    value={form.category} 
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Aspect Ratio</label>
                  <select 
                    className="form-control" 
                    value={form.aspectRatio} 
                    onChange={e => setForm({ ...form, aspectRatio: e.target.value })}
                  >
                    <option value="9:16">Vertical 9:16 (Recommended)</option>
                    <option value="9:12">Vertical 9:12</option>
                    <option value="16:9">Landscape 16:9</option>
                  </select>
                </div>
              </div>

              {form.aspectRatio !== '9:16' && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', padding: 10, borderRadius: 8, marginBottom: 16, fontSize: '0.85rem', color: '#92400E', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaExclamationTriangle />
                  <span>Warning: Recommended format for social video reels is Vertical 9:16.</span>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Video Source</label>
                <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="videoType" 
                      value="local" 
                      checked={form.videoType === 'local'} 
                      onChange={e => setForm({ ...form, videoType: 'local' })} 
                    />
                    Upload MP4 File
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="videoType" 
                      value="url" 
                      checked={form.videoType === 'url'} 
                      onChange={e => setForm({ ...form, videoType: 'url' })} 
                    />
                    Video URL / Link
                  </label>
                </div>

                {form.videoType === 'local' ? (
                  <div style={{ border: '2px dashed var(--border-color)', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                    <input 
                      type="file" 
                      accept="video/mp4,video/webm,video/mov" 
                      onChange={handleVideoFileUpload} 
                      id="video-upload-input"
                      style={{ display: 'none' }} 
                    />
                    <label htmlFor="video-upload-input" className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                      <FaUpload /> {uploadingVideo ? 'Uploading Video...' : 'Choose MP4 Video File'}
                    </label>
                    {form.videoUrl && (
                      <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--blue-royal)' }}>
                        ✓ Video File Selected: {form.videoUrl}
                      </p>
                    )}
                  </div>
                ) : (
                  <input 
                    type="text" 
                    className="form-control" 
                    value={form.videoUrl} 
                    onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                    placeholder="https://example.com/video.mp4 or YouTube URL" 
                  />
                )}
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Thumbnail / Poster Image</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={form.thumbnailUrl} 
                    onChange={e => setForm({ ...form, thumbnailUrl: e.target.value })}
                    placeholder="/uploads/poster.jpg" 
                    style={{ flex: 1 }}
                  />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', flexShrink: 0 }}>
                    <FaUpload /> {uploadingImage ? 'Uploading...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={handleThumbnailUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Short Description</label>
                <textarea 
                  className="form-control" 
                  rows={3} 
                  value={form.description} 
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the packaging process shown in the video..."
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Display Order</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={form.displayOrder} 
                    onChange={e => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 26 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600 }}>
                    <input 
                      type="checkbox" 
                      checked={form.isPublished} 
                      onChange={e => setForm({ ...form, isPublished: e.target.checked })} 
                    />
                    Published
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600 }}>
                    <input 
                      type="checkbox" 
                      checked={form.isFeatured} 
                      onChange={e => setForm({ ...form, isFeatured: e.target.checked })} 
                    />
                    Featured
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" onClick={resetForm} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Save Changes' : 'Create Video'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--white)', borderRadius: 16, padding: 28, maxWidth: 420, width: '100%', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, color: 'var(--navy-dark)' }}>Delete Video?</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Are you sure you want to delete <strong>"{deleteModal.title}"</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
              <button onClick={() => setDeleteModal(null)} className="btn btn-outline">Cancel</button>
              <button onClick={handleDeleteConfirm} className="btn btn-danger" style={{ background: '#DC2626', color: '#FFF' }}>
                Delete Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {showPreview && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 360, background: '#000', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <button 
              onClick={() => setShowPreview(null)} 
              style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(0,0,0,0.6)', color: '#FFF', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FaTimes />
            </button>
            <div style={{ width: '100%', aspectRatio: '9/16', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isYouTubeUrl(showPreview.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(showPreview.videoUrl)}
                  title={showPreview.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  controls 
                  autoPlay 
                  playsInline
                  preload="metadata"
                  poster={getMediaUrl(showPreview.thumbnailUrl)} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  <source src={getMediaUrl(showPreview.videoUrl)} type="video/mp4" />
                  <source src={getMediaUrl(showPreview.videoUrl)} type="video/quicktime" />
                  <source src={getMediaUrl(showPreview.videoUrl)} />
                  Your browser does not support video playback.
                </video>
              )}
            </div>
            <div style={{ padding: 16, background: 'var(--navy-dark)', color: '#FFF' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--amber-accent)', textTransform: 'uppercase', fontWeight: 600 }}>{showPreview.category}</span>
              <h4 style={{ margin: '4px 0 6px', fontSize: '1rem' }}>{showPreview.title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{showPreview.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Videos List Table */}
      <div style={{ background: 'var(--white)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--navy-dark)' }}>
              <th style={{ padding: '14px 18px', textAlign: 'left' }}>Order</th>
              <th style={{ padding: '14px 18px', textAlign: 'left' }}>Video</th>
              <th style={{ padding: '14px 18px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '14px 18px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                  No videos published yet. Click "+ Add Video" to get started.
                </td>
              </tr>
            ) : (
              filteredVideos.map((vid, idx) => (
                <tr key={vid._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--navy-dark)' }}>
                    #{vid.displayOrder || idx + 1}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 44, height: 72, borderRadius: 8, background: '#000', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        {vid.thumbnailUrl ? (
                          <img 
                            src={getMediaUrl(vid.thumbnailUrl)} 
                            alt={vid.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <video 
                            src={`${getMediaUrl(vid.videoUrl)}#t=0.5`} 
                            preload="metadata" 
                            muted 
                            playsInline 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        )}
                        <FaPlay style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#FFF', fontSize: '0.8rem', opacity: 0.9 }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--navy-dark)', fontSize: '0.95rem' }}>{vid.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{vid.description?.slice(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span className="badge badge-navy" style={{ fontSize: '0.75rem' }}>{vid.category}</span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleToggleStatus(vid)}
                      style={{ border: 'none', background: vid.isPublished ? '#DEF7EC' : '#F3F4F6', color: vid.isPublished ? '#03543F' : '#374151', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      {vid.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button onClick={() => setShowPreview(vid)} className="btn btn-outline btn-sm" title="Preview Video">
                        <FaEye />
                      </button>
                      <button onClick={() => handleEdit(vid)} className="btn btn-outline btn-sm" title="Edit Video">
                        <FaEdit />
                      </button>
                      <button onClick={() => setDeleteModal(vid)} className="btn btn-outline btn-sm" style={{ color: '#DC2626' }} title="Delete Video">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
