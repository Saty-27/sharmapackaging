import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaTimes, FaUpload, 
  FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaQuoteRight, 
  FaLink, FaImage, FaHeading, FaMinus, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import api from '../../utils/api';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [showSeoAccordion, setShowSeoAccordion] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Packaging Insights',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Sharma Packaging',
    status: 'published',
    isFeatured: false,
    displayOrder: 0,
    seoTitle: '',
    metaDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });

  const categories = [
    'Packaging Insights',
    'Industrial Packaging',
    'Wooden Packaging',
    'Export Packaging',
    'VCI Products',
    'Protective Packaging',
    'Logistics',
    'Company Updates'
  ];

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/blogs/admin/all');
      if (Array.isArray(data) && data.length > 0) {
        setBlogs(data);
      } else {
        setBlogs(DEFAULT_BLOGS);
      }
    } catch {
      setBlogs(DEFAULT_BLOGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      slug: '',
      category: 'Packaging Insights',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'Sharma Packaging',
      status: 'published',
      isFeatured: false,
      displayOrder: blogs.length + 1,
      seoTitle: '',
      metaDescription: '',
      focusKeyword: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: ''
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleTitleChange = (val) => {
    const slugified = val.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    setForm(prev => ({
      ...prev,
      title: val,
      slug: prev.slug && editing ? prev.slug : slugified,
      seoTitle: prev.seoTitle ? prev.seoTitle : val
    }));
  };

  const handleEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || 'Packaging Insights',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      featuredImage: blog.featuredImage || '',
      author: blog.author || 'Sharma Packaging',
      status: blog.status || (blog.isPublished ? 'published' : 'draft'),
      isFeatured: blog.isFeatured || false,
      displayOrder: blog.displayOrder || 0,
      seoTitle: blog.seoTitle || '',
      metaDescription: blog.metaDescription || '',
      focusKeyword: blog.focusKeyword || '',
      canonicalUrl: blog.canonicalUrl || '',
      ogTitle: blog.ogTitle || '',
      ogDescription: blog.ogDescription || '',
      ogImage: blog.ogImage || ''
    });
    setShowForm(true);
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    setUploadingImage(true);

    try {
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({ ...prev, featuredImage: data.url }));
      toast.success('Featured image uploaded');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const insertFormatting = (tag, wrap = true) => {
    const textarea = document.getElementById('blog-content-editor');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    let replacement = '';

    if (tag === 'h2') replacement = `<h2>${selected || 'Heading 2'}</h2>`;
    else if (tag === 'h3') replacement = `<h3>${selected || 'Heading 3'}</h3>`;
    else if (tag === 'b') replacement = `<strong>${selected || 'bold text'}</strong>`;
    else if (tag === 'i') replacement = `<em>${selected || 'italic text'}</em>`;
    else if (tag === 'ul') replacement = `<ul>\n  <li>${selected || 'Bullet item 1'}</li>\n  <li>Bullet item 2</li>\n</ul>`;
    else if (tag === 'ol') replacement = `<ol>\n  <li>${selected || 'Step 1'}</li>\n  <li>Step 2</li>\n</ol>`;
    else if (tag === 'blockquote') replacement = `<blockquote>"${selected || 'Important packaging highlight quote...'}"</blockquote>`;
    else if (tag === 'hr') replacement = `<hr />`;
    else if (tag === 'img') {
      const url = prompt('Enter Image URL:', '/uploads/seaworthy_packing.jpg');
      if (url) replacement = `<figure><img src="${url}" alt="Packaging Image" /><figcaption>Industrial packaging process</figcaption></figure>`;
    } else if (tag === 'a') {
      const url = prompt('Enter Link URL:', 'https://');
      if (url) replacement = `<a href="${url}" target="_blank">${selected || 'Click here'}</a>`;
    }

    if (replacement) {
      const updated = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
      setForm(prev => ({ ...prev, content: updated }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and Article Content are required');
      return;
    }

    try {
      if (editing) {
        await api.put(`/blogs/admin/${editing._id}`, form);
        toast.success('Blog article updated successfully');
      } else {
        await api.post('/blogs/admin', form);
        toast.success('Blog article created successfully');
      }
      resetForm();
      loadBlogs();
    } catch {
      toast.error('Failed to save article');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/blogs/admin/${deleteModal._id}`);
      toast.success('Blog article deleted');
      setDeleteModal(null);
      loadBlogs();
    } catch {
      toast.error('Delete failed');
    }
  };

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (b.excerpt && b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || b.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="admin-page-container" style={{ padding: 30 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy-dark)', margin: 0 }}>
            Blog & Insights Management
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.95rem' }}>
            Create and edit rich-text B2B packaging articles, manage categories, and optimize SEO meta tags.
          </p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <FaPlus /> Create Blog Article
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'var(--white)', padding: 18, borderRadius: 12, marginBottom: 24, boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search blog titles & excerpts..."
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

      {/* Editor Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--white)', borderRadius: 16, width: '100%', maxWidth: 900, maxHeight: '92vh', overflowY: 'auto', padding: 32, position: 'relative' }}>
            <button 
              onClick={resetForm} 
              style={{ position: 'absolute', top: 20, right: 20, border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <FaTimes />
            </button>
            <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: '1.5rem', color: 'var(--navy-dark)' }}>
              {editing ? 'Edit Blog Article' : 'Create New Blog Article'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Article Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={form.title} 
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="e.g. Seaworthy Packing in Vadodara: Complete Guide for Exporters" 
                  required 
                  style={{ fontSize: '1.1rem', fontWeight: 600 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>URL Slug *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={form.slug} 
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    placeholder="seaworthy-packing-in-vadodara" 
                    required 
                  />
                </div>
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
              </div>

              <div className="form-group" style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Featured Image (16:9 Aspect Ratio)</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={form.featuredImage} 
                    onChange={e => setForm({ ...form, featuredImage: e.target.value })}
                    placeholder="/uploads/seaworthy_packing.jpg" 
                    style={{ flex: 1 }}
                  />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', flexShrink: 0 }}>
                    <FaUpload /> {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={handleFeaturedImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Short Excerpt (2-3 lines for Card Preview) *</label>
                <textarea 
                  className="form-control" 
                  rows={2} 
                  value={form.excerpt} 
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="A short summary explaining the key insights of this packaging article..."
                  required
                ></textarea>
              </div>

              {/* RICH TEXT EDITOR TOOLBAR */}
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Article Content (Rich Text Editorial Format) *</label>
                
                <div style={{ background: '#F8FAFC', border: '1px solid var(--border-color)', borderBottom: 'none', borderTopLeftRadius: 8, borderTopRightRadius: 8, padding: '8px 12px', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button type="button" onClick={() => insertFormatting('h2')} className="btn btn-outline btn-sm" title="Heading 2"><FaHeading /> H2</button>
                  <button type="button" onClick={() => insertFormatting('h3')} className="btn btn-outline btn-sm" title="Heading 3"><FaHeading /> H3</button>
                  <span style={{ width: 1, height: 20, background: '#CBD5E1', margin: '0 4px' }}></span>
                  <button type="button" onClick={() => insertFormatting('b')} className="btn btn-outline btn-sm" title="Bold"><FaBold /></button>
                  <button type="button" onClick={() => insertFormatting('i')} className="btn btn-outline btn-sm" title="Italic"><FaItalic /></button>
                  <span style={{ width: 1, height: 20, background: '#CBD5E1', margin: '0 4px' }}></span>
                  <button type="button" onClick={() => insertFormatting('ul')} className="btn btn-outline btn-sm" title="Bullet List"><FaListUl /></button>
                  <button type="button" onClick={() => insertFormatting('ol')} className="btn btn-outline btn-sm" title="Numbered List"><FaListOl /></button>
                  <button type="button" onClick={() => insertFormatting('blockquote')} className="btn btn-outline btn-sm" title="Quote"><FaQuoteRight /></button>
                  <button type="button" onClick={() => insertFormatting('hr')} className="btn btn-outline btn-sm" title="Divider"><FaMinus /></button>
                  <span style={{ width: 1, height: 20, background: '#CBD5E1', margin: '0 4px' }}></span>
                  <button type="button" onClick={() => insertFormatting('a')} className="btn btn-outline btn-sm" title="Link"><FaLink /></button>
                  <button type="button" onClick={() => insertFormatting('img')} className="btn btn-outline btn-sm" title="Insert Image"><FaImage /></button>
                </div>

                <textarea 
                  id="blog-content-editor"
                  className="form-control" 
                  rows={12} 
                  value={form.content} 
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your article content here in clean HTML format..."
                  style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, fontFamily: 'monospace', fontSize: '0.95rem' }}
                  required
                ></textarea>
              </div>

              {/* SEO METADATA ACCORDION */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 20, overflow: 'hidden' }}>
                <button 
                  type="button" 
                  onClick={() => setShowSeoAccordion(!showSeoAccordion)}
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-light)', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: 'var(--navy-dark)', cursor: 'pointer' }}
                >
                  <span>SEO & Meta Tags Settings</span>
                  {showSeoAccordion ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {showSeoAccordion && (
                  <div style={{ padding: 18, background: 'var(--white)' }}>
                    <div className="form-group" style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem' }}>
                        SEO Title (Recommended: 50-60 characters) — Current: {form.seoTitle.length} chars
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={form.seoTitle} 
                        onChange={e => setForm({ ...form, seoTitle: e.target.value })}
                        placeholder="SEO optimized title for search engines" 
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem' }}>
                        Meta Description (Recommended: 140-160 characters) — Current: {form.metaDescription.length} chars
                      </label>
                      <textarea 
                        className="form-control" 
                        rows={2} 
                        value={form.metaDescription} 
                        onChange={e => setForm({ ...form, metaDescription: e.target.value })}
                        placeholder="Search engine result snippet description..." 
                      ></textarea>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem' }}>Focus Keyword</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={form.focusKeyword} 
                          onChange={e => setForm({ ...form, focusKeyword: e.target.value })}
                          placeholder="e.g. seaworthy packing vadodara" 
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem' }}>Canonical URL</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={form.canonicalUrl} 
                          onChange={e => setForm({ ...form, canonicalUrl: e.target.value })}
                          placeholder="https://sharmapackagings.com/blog/slug" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Publication Status</label>
                  <select 
                    className="form-control" 
                    value={form.status} 
                    onChange={e => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Display Order</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={form.displayOrder} 
                    onChange={e => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 26 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600 }}>
                    <input 
                      type="checkbox" 
                      checked={form.isFeatured} 
                      onChange={e => setForm({ ...form, isFeatured: e.target.checked })} 
                    />
                    Featured Article
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" onClick={resetForm} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Save Changes' : 'Publish Article'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'var(--white)', borderRadius: 16, padding: 28, maxWidth: 420, width: '100%', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, color: 'var(--navy-dark)' }}>Delete Blog Article?</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Are you sure you want to delete <strong>"{deleteModal.title}"</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
              <button onClick={() => setDeleteModal(null)} className="btn btn-outline">Cancel</button>
              <button onClick={handleDeleteConfirm} className="btn btn-danger" style={{ background: '#DC2626', color: '#FFF' }}>
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Preview Modal */}
      {showPreview && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 760, maxHeight: '90vh', overflowY: 'auto', background: '#FFF', borderRadius: 16, padding: 36, boxShadow: 'var(--shadow-xl)' }}>
            <button 
              onClick={() => setShowPreview(null)} 
              style={{ position: 'absolute', top: 20, right: 20, border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <FaTimes />
            </button>

            <span className="badge badge-amber" style={{ textTransform: 'uppercase', marginBottom: 12, display: 'inline-block' }}>{showPreview.category}</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--navy-dark)', lineHeight: 1.2, margin: '8px 0 16px' }}>{showPreview.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>By {showPreview.author} • {new Date(showPreview.publishDate || Date.now()).toLocaleDateString()}</p>

            {showPreview.featuredImage && (
              <img src={showPreview.featuredImage} alt={showPreview.title} style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }} />
            )}

            <div dangerouslySetInnerHTML={{ __html: showPreview.content }} style={{ lineHeight: 1.7, color: 'var(--text-dark)' }}></div>
          </div>
        </div>
      )}

      {/* Blogs List Table */}
      <div style={{ background: 'var(--white)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--navy-dark)' }}>
              <th style={{ padding: '14px 18px', textAlign: 'left' }}>Article</th>
              <th style={{ padding: '14px 18px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '14px 18px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                  No blog articles found. Click "+ Create Blog Article" to add one.
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr key={blog._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <img 
                        src={blog.featuredImage || '/uploads/seaworthy_packing.jpg'} 
                        alt={blog.title} 
                        style={{ width: 64, height: 44, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--navy-dark)', fontSize: '0.95rem' }}>{blog.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>/{blog.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span className="badge badge-navy" style={{ fontSize: '0.75rem' }}>{blog.category}</span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <span 
                      style={{ 
                        display: 'inline-block', 
                        padding: '4px 12px', 
                        borderRadius: 20, 
                        fontSize: '0.75rem', 
                        fontWeight: 600, 
                        background: blog.status === 'published' ? '#DEF7EC' : '#FEF08A', 
                        color: blog.status === 'published' ? '#03543F' : '#854D0E' 
                      }}
                    >
                      {blog.status || 'published'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(blog.publishDate || Date.now()).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button onClick={() => setShowPreview(blog)} className="btn btn-outline btn-sm" title="Preview Article">
                        <FaEye />
                      </button>
                      <button onClick={() => handleEdit(blog)} className="btn btn-outline btn-sm" title="Edit Article">
                        <FaEdit />
                      </button>
                      <button onClick={() => setDeleteModal(blog)} className="btn btn-outline btn-sm" style={{ color: '#DC2626' }} title="Delete Article">
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
