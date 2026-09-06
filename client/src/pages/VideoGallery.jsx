import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTimes, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import api, { getMediaUrl, isYouTubeUrl, getYouTubeEmbedUrl } from '../utils/api';

const DEFAULT_VIDEOS = [
  {
    _id: 'vid-1',
    title: 'Heavy Machinery Shrink Cover Application',
    category: 'Shrink Wrapping',
    description: 'Watch our technical packaging team apply heavy-duty thermo shrink film over large industrial gearboxes.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-factory-worker-welding-metal-parts-42998-large.mp4',
    thumbnailUrl: '/uploads/Shrink-Wrapping.jpeg',
    aspectRatio: '9:16'
  },
  {
    _id: 'vid-2',
    title: 'ISPM 15 Certified Export Wooden Box Fabrication',
    category: 'Wooden Packaging',
    description: 'On-site wooden crate assembly and load securing for heavy export shipments.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-industrial-crane-lifting-a-heavy-load-in-a-factory-42995-large.mp4',
    thumbnailUrl: '/uploads/seaworthy_packing.jpg',
    aspectRatio: '9:16'
  },
  {
    _id: 'vid-3',
    title: 'VCI Film Vacuum Packing for Precision Metal Parts',
    category: 'VCI Packaging',
    description: 'Sealing automotive components inside anti-rust VCI film bags and vacuum extraction.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-mechanic-fixing-an-engine-42994-large.mp4',
    thumbnailUrl: '/uploads/vaccum-packing.jpg',
    aspectRatio: '9:16'
  },
  {
    _id: 'vid-4',
    title: 'Silpaulin Heavy Duty Protective Cover Installation',
    category: 'Protective Packaging',
    description: 'Custom tailored Silpaulin tarpaulin covers securing outdoor machinery against rain and sunlight.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-worker-using-a-drill-on-a-wooden-board-43000-large.mp4',
    thumbnailUrl: '/uploads/tarpaulin.jpg',
    aspectRatio: '9:16'
  },
  {
    _id: 'vid-5',
    title: 'Aluminium Barrier Foil Heat Sealing Process',
    category: 'Industrial Packaging',
    description: 'Hermetic heat sealing of aluminium barrier foil for sub-zero moisture vapor transfer rate protection.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-sparking-welding-torch-42997-large.mp4',
    thumbnailUrl: '/uploads/aluminium_foil_preservation.jpg',
    aspectRatio: '9:16'
  },
  {
    _id: 'vid-6',
    title: 'Contract Packaging Operations in Action',
    category: 'Contract Packaging',
    description: 'End-to-end B2B contract packing, palletizing, and cargo lashing for heavy industrial logistics.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-automated-robotic-arm-moving-in-a-factory-42999-large.mp4',
    thumbnailUrl: '/uploads/odc_cargo_packing.jpg',
    aspectRatio: '9:16'
  }
];

export default function VideoGallery() {
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightbox, setLightbox] = useState(null);

  const categories = [
    'All',
    'Industrial Packaging',
    'Wooden Packaging',
    'Shrink Wrapping',
    'VCI Packaging',
    'Protective Packaging',
    'Contract Packaging'
  ];

  useEffect(() => {
    api.get('/videos')
      .then(res => {
        if (res.data && res.data.videos && res.data.videos.length > 0) {
          setVideos(res.data.videos);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = videos.filter(v => {
    const matchesCat = activeCategory === 'All' || v.category === activeCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (v.description && v.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Packaging in Action Video Gallery | Sharma Packaging"
        description="Watch real industrial videos of Sharma Packaging processes including seaworthy crating, VCI vacuum packaging, shrink wrapping, and Silpaulin protective covering."
      />

      {/* Hero Header */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(11,31,58,0.92), rgba(11,31,58,0.85)), url("/uploads/hero_bg.png")' }}>
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow eyebrow-amber">PACKAGING IN ACTION</span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--white)', marginTop: 8 }}>Video Gallery</h1>
            <p style={{ maxWidth: 640, margin: '12px auto 0', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
              Explore our packaging processes, products and industrial solutions through real videos from Sharma Packaging.
            </p>
            <div className="breadcrumb" style={{ justifyContent: 'center', marginTop: 16 }}>
              <Link to="/">Home</Link> / <span>Video Gallery</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Video Listing Section */}
      <section className="section">
        <div className="container">
          {/* Controls: Search & Category Filter */}
          <div style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
              <FaSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search packaging videos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: 44, height: 48, borderRadius: 24, fontSize: '0.98rem' }}
              />
            </div>

            <div className="category-filter-wrap" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.map(c => (
                <button
                  key={c}
                  className={`filter-pill ${activeCategory === c ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 5-Column Grid */}
          <div className="video-5col-grid">
            {filtered.map((video, idx) => (
              <motion.div 
                key={video._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="vertical-video-card"
                onClick={() => setLightbox(video)}
              >
                <div className="video-thumb-container">
                  <img 
                    src={getMediaUrl(video.thumbnailUrl) || '/uploads/hero_bg.png'} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/hero_bg.png'; }}
                    alt={video.title} 
                    className="video-poster-img"
                  />
                  <div className="video-overlay-gradient"></div>
                  <div className="video-play-btn-circle">
                    <FaPlay className="play-icon" />
                  </div>
                  {video.category && (
                    <span className="video-cat-badge">{video.category}</span>
                  )}
                </div>

                <div className="video-card-content">
                  <h3 className="video-card-title">{video.title}</h3>
                  {video.description && (
                    <p className="video-card-desc">{video.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center" style={{ padding: '60px 20px', background: 'var(--bg-light)', borderRadius: 16 }}>
              <h3>No videos found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try selecting another category or clear your search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Video Player Modal */}
      {lightbox && (
        <div className="video-modal-overlay" onClick={() => setLightbox(null)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setLightbox(null)} aria-label="Close Video">
              <FaTimes />
            </button>
            <div className="video-player-wrapper">
              {isYouTubeUrl(lightbox.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(lightbox.videoUrl)}
                  title={lightbox.title}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  src={getMediaUrl(lightbox.videoUrl)} 
                  poster={getMediaUrl(lightbox.thumbnailUrl)} 
                  controls 
                  autoPlay 
                  playsInline
                  className="modal-vertical-video"
                ></video>
              )}
            </div>
            <div className="video-modal-meta">
              <span className="v-modal-category">{lightbox.category}</span>
              <h3 className="v-modal-title">{lightbox.title}</h3>
              {lightbox.description && <p className="v-modal-desc">{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
