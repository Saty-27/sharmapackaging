export const fallbackProducts = [
  { _id: 'fallback-1', name: 'Wooden Pallets', slug: 'wooden-pallets', category: { name: 'Wooden Packaging' }, images: ['/uploads/prod_1.png'], isPublished: true },
  { _id: 'fallback-2', name: 'Wooden Skid', slug: 'wooden-skid', category: { name: 'Wooden Packaging' }, images: ['/uploads/seaworthy_packing.jpg'], isPublished: true },
  { _id: 'fallback-3', name: 'Shrink Wrapping', slug: 'shrink-wrapping', category: { name: 'Wrapping & Films' }, images: ['/uploads/Shrink-Wrapping.jpeg'], isPublished: true },
  { _id: 'fallback-4', name: 'Packing Materials', slug: 'packing-materials', category: { name: 'Packaging Materials' }, images: ['/uploads/industrial-customized-protective-packing-materials-859.jpg'], isPublished: true },
  { _id: 'fallback-5', name: 'Plywood for Packing', slug: 'plywood-for-packing', category: { name: 'Wooden Packaging' }, images: ['/uploads/odc_cargo_packing.jpg'], isPublished: true },
  { _id: 'fallback-6', name: 'Lashing Materials', slug: 'lashing-materials', category: { name: 'Cargo Securing' }, images: ['/uploads/tarpaulin.jpg'], isPublished: true },
  { _id: 'fallback-7', name: 'Vacuum Packing', slug: 'vacuum-packing', category: { name: 'Protective Packaging' }, images: ['/uploads/vaccum-packing.jpg'], isPublished: true },
  { _id: 'fallback-8', name: 'Stretch Film', slug: 'stretch-film', category: { name: 'Wrapping & Films' }, images: ['/uploads/machine-stretch-film-roll-500x500.jpg'], isPublished: true },
  { _id: 'fallback-9', name: 'Corrugated Boxes', slug: 'corrugated-boxes', category: { name: 'Packaging Materials' }, images: ['/uploads/corrugated-box-500x500.webp'], isPublished: true },
  { _id: 'fallback-10', name: 'Plastic Pallets', slug: 'plastic-pallets', category: { name: 'Wooden Packaging' }, images: ['/uploads/Wooden-skid.webp'], isPublished: true },
  { _id: 'fallback-11', name: 'Bubble Wrap', slug: 'bubble-wrap', category: { name: 'Protective Packaging' }, images: ['/uploads/bubblewrap.jpg'], isPublished: true },
  { _id: 'fallback-12', name: 'Packaging Tape', slug: 'packaging-tape', category: { name: 'Packaging Materials' }, images: ['/uploads/3-65-heavy-duty-handheld-brown-packaging-tape-rolls-for-carton-original-imahcz9sswz2fvdg.webp'], isPublished: true }
];

export const FALLBACK_PRODUCTS = fallbackProducts;

export const formatProductTitle = (slug = '') => (
  slug
    .split('-')
    .filter(Boolean)
    .map(word => {
      const upper = word.toUpperCase();
      if (['VCI', 'HDPE', 'LDPE', 'PP', 'ODC', 'ISPM'].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ') || 'Product Details'
);

export const getFallbackProduct = (slug) => {
  const product = fallbackProducts.find(item => item.slug === slug);
  if (!product) return null;

  return {
    ...product,
    metaTitle: `${product.name} | Sharma Packaging`,
    metaDescription: `${product.name} industrial packaging solutions in Vadodara, Gujarat.`,
    longDescription: `
      <h2>Overview</h2>
      <p>High-performance ${product.name} engineered for export, warehousing, and transit protection by Sharma Packaging.</p>
      <h2>Industrial Features</h2>
      <p>Custom dimensions, heavy load ratings, and phytosanitary compliance for machinery and freight shipping.</p>
    `,
  };
};
