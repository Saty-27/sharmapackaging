import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaShieldAlt, FaPhoneAlt, FaFileAlt } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import { PRODUCTS } from '../data/productsData';
import WoodenPalletsDetail from './WoodenPalletsDetail';
import WoodenSkidDetail from './WoodenSkidDetail';
import PackingMaterialsDetail from './PackingMaterialsDetail';
import PlywoodForPackingDetail from './PlywoodForPackingDetail';
import LashingMaterialsDetail from './LashingMaterialsDetail';
import VacuumPackingDetail from './VacuumPackingDetail';
import CorrugatedBoxesDetail from './CorrugatedBoxesDetail';
import PlasticPalletsDetail from './PlasticPalletsDetail';
import BubbleWrapDetail from './BubbleWrapDetail';
import PackagingTapeDetail from './PackagingTapeDetail';
import './ProductDetail.css';

export default function ProductDetail({ seoSlug }) {
  const { slug } = useParams();
  const activeSlug = slug || seoSlug || 'wooden-pallets';
  
  if (activeSlug === 'wooden-pallets') {
    return <WoodenPalletsDetail />;
  }

  if (activeSlug === 'wooden-skid' || activeSlug === 'wooden-skids') {
    return <WoodenSkidDetail />;
  }

  if (activeSlug === 'packing-materials' || activeSlug === 'industrial-packing-materials') {
    return <PackingMaterialsDetail />;
  }

  if (activeSlug === 'plywood-for-packing' || activeSlug === 'plywood') {
    return <PlywoodForPackingDetail />;
  }

  if (activeSlug === 'lashing-materials' || activeSlug === 'cargo-lashing') {
    return <LashingMaterialsDetail />;
  }

  if (activeSlug === 'vacuum-packing' || activeSlug === 'vaccum-packing') {
    return <VacuumPackingDetail />;
  }

  if (activeSlug === 'corrugated-boxes' || activeSlug === 'corrugated-box') {
    return <CorrugatedBoxesDetail />;
  }

  if (activeSlug === 'plastic-pallets' || activeSlug === 'plastic-pallet') {
    return <PlasticPalletsDetail />;
  }

  if (activeSlug === 'bubble-wrap' || activeSlug === 'air-bubble-wrap') {
    return <BubbleWrapDetail />;
  }

  if (activeSlug === 'packaging-tape' || activeSlug === 'packaging-tapes') {
    return <PackagingTapeDetail />;
  }

  // Find product by slug or default to first product
  const product = PRODUCTS.find(p => p.slug === activeSlug || p.id === activeSlug) || PRODUCTS[0];
  const [activeImg, setActiveImg] = useState(product.image);
  const [modalOpen, setModalOpen] = useState(false);

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': [
      `https://sharmapackagings.com${product.image}`
    ],
    'description': product.fullDescription || product.description,
    'sku': product.id,
    'brand': {
      '@type': 'Brand',
      'name': 'Sharma Packaging'
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': 'Sharma Packaging',
      'logo': 'https://sharmapackagings.com/logo.png',
      'url': 'https://sharmapackagings.com'
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://sharmapackagings.com/${product.slug}`,
      'priceCurrency': 'INR',
      'price': '0.00',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Sharma Packaging'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '142'
    }
  };

  return (
    <div className="product-detail-page">
      <SEOHead 
        title={product.metaTitle || `${product.name} | Sharma Packaging`} 
        description={product.metaDescription || product.description}
        keywords={product.keywords}
        ogImage={`https://sharmapackagings.com${product.image}`}
        schema={productSchema}
      />

      {/* Breadcrumb Header */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="breadcrumb-trail">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/products">Products</Link>
            <span className="sep">/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Overview Grid */}
      <section className="section product-main-section">
        <div className="container product-main-grid">
          {/* Gallery Col */}
          <div className="p-gallery-col">
            <div className="p-main-img-box">
              <img 
                src={activeImg || product.image} 
                onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/prod_1.png'; }}
                alt={product.name} 
                className="p-main-img" 
              />
              <span className="p-cat-tag">{product.category}</span>
            </div>
            
            {product.gallery && product.gallery.length > 1 && (
              <div className="p-thumbs-row">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`thumb-btn ${activeImg === img ? 'is-active' : ''}`}
                  >
                    <img 
                      src={img} 
                      onError={(e) => { e.target.onerror = null; e.target.src = '/uploads/prod_1.png'; }}
                      alt={`${product.name} thumb ${idx}`} 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Col */}
          <div className="p-details-col">
            <span className="eyebrow">{product.category}</span>
            <h1 className="p-title">{product.name}</h1>
            <p className="p-short-desc">{product.description}</p>

            <div className="p-benefits-box">
              <h4>Key Industrial Benefits:</h4>
              <ul className="p-benefits-list">
                {product.benefits.map((b, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="b-check-icon" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-cta-box">
              <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg">
                Get a Quote for {product.name} →
              </button>
              <a href="tel:+918709155299" className="btn btn-outline btn-lg">
                <FaPhoneAlt /> Talk to Engineer
              </a>
            </div>

            <div className="p-trust-callout">
              <FaShieldAlt className="t-icon" />
              <span>ISO 9001:2015 Certified & Industrial Load Tested</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Specifications Tabs/Sections */}
      <section className="section section-bg-light p-specs-section">
        <div className="container p-specs-grid">
          {/* Overview */}
          <div className="p-spec-block card">
            <h3>Product Overview</h3>
            <p>{product.fullDescription || product.description}</p>

            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Recommended Applications</h4>
            <ul className="app-list">
              <li>Heavy Machinery & Industrial Equipment Shipping</li>
              <li>Overseas Maritime Ocean Container Export</li>
              <li>Long-term Warehouse Stacking & Storage</li>
              <li>Factory-to-Factory Component Transit</li>
            </ul>
          </div>

          {/* Specs Table */}
          <div className="p-spec-block card">
            <h3>Technical Specifications</h3>
            {product.specs ? (
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Custom specs available upon request.</p>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section section-related">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">EXPLORE MORE</span>
            <h2>Related Packaging Products</h2>
          </div>

          <div className="products-grid">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="product-card">
                <div className="card-img-wrapper">
                  <img src={rel.image} alt={rel.name} className="product-img" />
                  <span className="category-badge">{rel.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="product-name">{rel.name}</h3>
                  <p className="product-desc">{rel.description}</p>
                  <div className="card-actions">
                    <Link to={`/${rel.slug}`} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                      View Product →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Quote CTA */}
      <div className="sticky-mobile-cta">
        <div>
          <strong>{product.name}</strong>
          <span>Custom Pricing Available</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
          Get Quote
        </button>
      </div>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
