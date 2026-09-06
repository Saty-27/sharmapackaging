import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTimes, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api, { getMediaUrl, isYouTubeUrl, getYouTubeEmbedUrl } from '../../utils/api';

const DEFAULT_VIDEOS = [
  {
    _id: 'vid-1',
    title: 'Heavy Machinery Shrink Cover Application',
    category: 'Shrink Wrapping',
    description: 'Watch our technical packaging team apply protective shrink cover to industrial machinery.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-factory-worker-welding-metal-parts-42998-large.mp4',
    thumbnailUrl: '/uploads/Shrink-Wrapping.jpeg',
    aspectRatio: '16:10'
  },
  {
    _id: 'vid-2',
    title: 'ISPM 15 Certified Export Wooden Box Fabrication',
    category: 'Wooden Packaging',
    description: 'On-site wooden crate assembly and load securing for heavy export shipments.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-industrial-crane-lifting-a-heavy-load-in-a-factory-42995-large.mp4',
    thumbnailUrl: '/uploads/seaworthy_packing.jpg',
    aspectRatio: '16:10'
  },
  {
    _id: 'vid-3',
    title: 'VCI Film Vacuum Packing for Precision Metal Parts',
    category: 'VCI Packaging',
    description: 'Sealing automotive components inside anti-rust VCI film bags and vacuum extraction.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-mechanic-fixing-an-engine-42994-large.mp4',
    thumbnailUrl: '/uploads/vaccum-packing.jpg',
    aspectRatio: '16:10'
  },
  {
    _id: 'vid-4',
    title: 'Silpaulin Heavy Duty Protective Cover Installation',
    category: 'Protective Packaging',
    description: 'Custom tailored Silpaulin tarpaulin covers securing outdoor machinery against rain and sunlight.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-worker-using-a-drill-on-a-wooden-board-43000-large.mp4',
    thumbnailUrl: '/uploads/tarpaulin.jpg',
    aspectRatio: '16:10'
  },
  {
    _id: 'vid-5',
    title: 'Aluminium Barrier Foil Heat Sealing Process',
    category: 'Industrial Packaging',
    description: 'Hermetic heat sealing of aluminium barrier foil for sub-zero moisture vapor transfer rate protection.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-sparking-welding-torch-42997-large.mp4',
    thumbnailUrl: '/uploads/aluminium_foil_preservation.jpg',
    aspectRatio: '16:10'
  },
  {
    _id: 'vid-6',
    title: 'Contract Packaging Operations in Action',
    category: 'Contract Packaging',
    description: 'End-to-end B2B contract packing, palletizing, and cargo lashing for heavy industrial logistics.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-automated-robotic-arm-moving-in-a-factory-42999-large.mp4',
    thumbnailUrl: '/uploads/odc_cargo_packing.jpg',
    aspectRatio: '16:10'
  }
];

export default function VideoGallerySection() {
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);

  const viewportRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch videos dynamically from backend API
  useEffect(() => {
    setLoading(true);
    api.get('/videos')
      .then(res => {
        if (res.data && res.data.videos && res.data.videos.length > 0) {
          const published = res.data.videos.filter(v => v.isPublished !== false);
          if (published.length > 0) {
            setVideos(published);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Update viewport width for responsive scroll limit calculations
  useEffect(() => {
    const updateDimensions = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      } else {
        setViewportWidth(window.innerWidth);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const cardWidth = viewportWidth < 480 ? Math.min(280, viewportWidth - 32) : 300;
  const gap = viewportWidth < 768 ? 16 : 24;
  const step = cardWidth + gap;

  // Calculate total track width
  const totalTrackWidth = videos.length > 0
    ? (videos.length * cardWidth) + ((videos.length - 1) * gap)
    : 0;

  // Calculate maximum translate offset so the last card aligns perfectly at the right edge
  const maxTranslateX = Math.max(0, totalTrackWidth - viewportWidth);

  // Is track small enough to be centered without scrolling?
  const isCentered = totalTrackWidth <= viewportWidth;

  // Calculate maximum scroll index steps
  const maxIndex = maxTranslateX > 0 ? Math.ceil(maxTranslateX / step) : 0;

  // Clamped index
  const safeIndex = Math.min(currentCardIndex, maxIndex);

  // Exact translation capped strictly at maxTranslateX
  const rawTx = safeIndex * step;
  const translateXValue = isCentered ? 0 : -Math.min(rawTx, maxTranslateX);

  const totalPages = maxIndex > 0 ? maxIndex + 1 : 1;
  const currentPageDisplay = safeIndex + 1;

  // 4-Second Autoplay
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(() => {
      setCurrentCardIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentCardIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentCardIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  if (!loading && videos.length === 0) {
    return (
      <section className="section-video-gallery-redesign">
        <div className="video-gallery-container text-center" style={{ padding: '60px 24px' }}>
          <span className="vg-eyebrow">VIDEO GALLERY</span>
          <h2 className="vg-main-heading">See Our Packaging Solutions in Action</h2>
          <p className="vg-subdescription" style={{ marginTop: 16 }}>
            Packaging videos will appear here soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-video-gallery-redesign">
      <div className="video-gallery-container">
        
        {/* EDITORIAL HEADER (CENTERED) */}
        <div className="vg-header-block">
          <span className="vg-eyebrow">VIDEO GALLERY</span>
          <h2 className="vg-main-heading">See Our Packaging Solutions in Action</h2>
          <p className="vg-subdescription">
            Explore our packaging processes, products and industrial solutions through real videos from Sharma Packaging.
          </p>
        </div>

        {/* CAROUSEL VIEWPORT & HORIZONTAL TRACK */}
        <div 
          className="video-gallery-viewport"
          ref={viewportRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {loading ? (
            /* Skeleton Loading Cards matching cardWidth */
            <div className="video-gallery-track" style={{ transform: 'none', justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="vg-video-card vg-skeleton-card" style={{ width: cardWidth, minWidth: cardWidth, flex: `0 0 ${cardWidth}px` }}>
                  <div className="vg-thumb-box vg-skeleton-box"></div>
                  <div className="vg-card-content">
                    <div className="vg-skeleton-line" style={{ width: '40%', height: 12, marginBottom: 8 }}></div>
                    <div className="vg-skeleton-line" style={{ width: '90%', height: 18, marginBottom: 8 }}></div>
                    <div className="vg-skeleton-line" style={{ width: '70%', height: 14 }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Continuous Track with Deterministic Capped Cards */
            <div 
              className={`video-gallery-track ${isCentered ? 'is-centered' : ''}`}
              style={{ 
                transform: isCentered ? 'none' : `translateX(${translateXValue}px)`,
                gap: `${gap}px`
              }}
            >
              {videos.map((video, idx) => {
                const thumbnailSrc = getMediaUrl(video.thumbnailUrl || video.posterUrl) || '/uploads/seaworthy_packing.jpg';
                return (
                  <div 
                    key={video._id || idx}
                    className="vg-video-card"
                    style={{ width: cardWidth, minWidth: cardWidth, flex: `0 0 ${cardWidth}px` }}
                    onClick={() => setLightbox(video)}
                  >
                    {/* AREA 1: COMPACT THUMBNAIL BOX */}
                    <div className="vg-thumb-box">
                      <img 
                        src={thumbnailSrc} 
                        onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/seaworthy_packing.jpg'; }}
                        alt={video.title} 
                        className="vg-thumb-img"
                      />
                      <div className="vg-overlay"></div>
                      
                      {/* CENTERED ROYAL BLUE PLAY BUTTON */}
                      <button 
                        className="vg-play-btn" 
                        aria-label={`Play ${video.title}`}
                      >
                        <FaPlay className="vg-play-icon" />
                      </button>
                    </div>

                    {/* AREA 2: CONTENT */}
                    <div className="vg-card-content">
                      <span className="vg-card-category">{video.category || 'Packaging Solution'}</span>
                      <h3 className="vg-card-title">{video.title}</h3>
                      <p className="vg-card-description">
                        {video.description || 'Professional industrial packaging in action.'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CAROUSEL CONTROLS BELOW VIDEO CARDS */}
        {!isCentered && maxIndex > 0 && (
          <div className="vg-controls-row">
            <button 
              onClick={handlePrev} 
              className="vg-arrow-btn" 
              aria-label="Previous videos"
            >
              <FaChevronLeft />
            </button>

            <div className="vg-page-indicator-wrap">
              <span className="vg-page-number">
                {String(currentPageDisplay).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
              </span>
              <div className="vg-progress-bar-bg">
                <div 
                  className="vg-progress-bar-fill"
                  style={{ width: `${(currentPageDisplay / totalPages) * 100}%` }}
                ></div>
              </div>
            </div>

            <button 
              onClick={handleNext} 
              className="vg-arrow-btn" 
              aria-label="Next videos"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* PROMINENT BLUE VIEW ALL VIDEOS BUTTON */}
        <div className="vg-cta-wrapper">
          <Link to="/video-gallery" className="vg-view-all-btn">
            <span>View All Videos</span>
            <FaArrowRight className="vg-btn-arrow" />
          </Link>
        </div>

      </div>

      {/* LIGHTBOX VIDEO PLAYER MODAL */}
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
    </section>
  );
}
