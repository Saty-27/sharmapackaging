import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheck, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import InquiryModal from '../components/common/InquiryModal';
import { PRODUCTS, CATEGORIES } from '../data/productsData';
import api from '../utils/api';
import './Products.css';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Products';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productsList, setProductsList] = useState(PRODUCTS);

  useEffect(() => {
    if (searchParams.get('category')) {
      setActiveCategory(searchParams.get('category'));
    }
  }, [searchParams]);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const fetched = res.data?.products;
        if (Array.isArray(fetched) && fetched.length > 0) {
          const normalized = fetched.map(p => {
            const defaultMatch = PRODUCTS.find(sp => sp.slug === p.slug || sp.id === p.id) || {};
            const imgPath = p.images && p.images[0] ? p.images[0] : (defaultMatch.image || '/uploads/Wooden-Pallets.png');
            const benefitsList = (p.benefits && p.benefits.length > 0) 
              ? p.benefits 
              : ((p.features && p.features.length > 0) ? p.features : (defaultMatch.benefits || ['High-quality industrial grade', 'Export & storage compliant']));

            return {
              id: p._id || p.id || p.slug,
              slug: p.slug || defaultMatch.slug || 'product',
              name: p.name || defaultMatch.name,
              category: p.category?.name || p.category || defaultMatch.category || 'Packaging Materials',
              description: p.shortDescription || p.description || defaultMatch.description,
              benefits: benefitsList,
              image: imgPath
            };
          });
          setProductsList(normalized);
        }
      })
      .catch(err => {
        console.warn('API products fetch fallback to static:', err);
      });
  }, []);

  const handleOpenQuote = (prodName) => {
    setSelectedProduct(prodName);
    setModalOpen(true);
  };

  const filteredProducts = activeCategory === 'All Products'
    ? productsList
    : productsList.filter(p => p.category === activeCategory);

  return (
    <div className="products-page">
      <SEOHead title="Industrial Packaging Products Catalog | Sharma Packaging" />

      {/* Hero Banner */}
      <section className="products-hero section-dark">
        <div className="container text-center">
          <span className="eyebrow eyebrow-amber">COMPLETE INDUSTRIAL CATALOG</span>
          <h1>Packaging Products Built for Industrial Protection</h1>
          <p className="hero-p">
            Explore our comprehensive range of custom wooden pallets, skids, export packaging, protective films, and cargo lashing systems.
          </p>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="section section-catalog">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="product-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 12-Product Desktop 3-Column Grid */}
          <div className="products-grid">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="card-img-wrapper">
                  <img 
                    src={prod.image} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/Wooden-Pallets.png'; }}
                    alt={prod.name} 
                    className="product-img" 
                  />
                  <span className="category-badge">{prod.category}</span>
                </div>

                <div className="card-body">
                  <h3 className="product-name">{prod.name}</h3>
                  <p className="product-desc">{prod.description}</p>

                  <div className="benefits-list">
                    {prod.benefits.map((b, idx) => (
                      <div key={idx} className="b-item">
                        <FaCheck className="b-icon" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-actions">
                    <button onClick={() => handleOpenQuote(prod.name)} className="btn btn-primary btn-sm">
                      Get Quote
                    </button>
                    <Link to={`/${prod.slug}`} className="btn btn-outline btn-sm">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Requirement Strip */}
      <section className="section-dark custom-strip">
        <div className="container text-center">
          <h2>Need Custom Dimensions or Special Timber Treatment?</h2>
          <p>We manufacture custom wooden crates, skids, and barrier bags for unique industrial loads.</p>
          <button onClick={() => handleOpenQuote('Custom Industrial Requirement')} className="btn btn-accent btn-lg">
            Request Custom Quotation
          </button>
        </div>
      </section>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
}
