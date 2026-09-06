require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const ProductCategory = require('../models/ProductCategory');
const Product = require('../models/Product');

const cats = [
  { name: 'Wooden Products', description: 'Wooden Pallets and Skids', order: 1 },
  { name: 'Wrapping', description: 'Shrink Wrapping Solutions', order: 2 },
  { name: 'Packing Materials', description: 'Industrial Packing Materials', order: 3 },
  { name: 'Plywood', description: 'Plywood for Packing', order: 4 },
  { name: 'Lashing', description: 'Lashing Materials', order: 5 },
  { name: 'Vacuum Packing', description: 'Vacuum Packing Solutions', order: 6 },
  { name: 'Corrugated', description: 'Corrugated Boxes', order: 7 },
  { name: 'Plastic', description: 'Plastic Pallets', order: 8 },
  { name: 'Tapes', description: 'Packaging Tapes', order: 9 },
];

const products = [
  { name: 'Wooden Pallets', slug: 'product-wooden-pallets', cat: 'Wooden Products', short: 'Durable wooden pallets crafted for heavy-duty industrial use with customizable dimensions.', features: ['Heat-treated & ISPM 15 certified', 'Load capacity up to 2000 kg', 'Eco-friendly & reusable'], applications: ['Export packaging', 'Heavy machinery', 'Warehouse storage'] },
  { name: 'Wooden Skid', slug: 'product-wooden-skid', cat: 'Wooden Products', short: 'Heavy-duty wooden skids designed for safe and efficient handling of industrial goods.', features: ['Strong and durable construction', 'Ideal for heavy load support', 'Reusable and eco-friendly'], applications: ['Machinery foundation', 'Industrial transport'] },
  { name: 'Shrink Wrapping', slug: 'product-shrink-wrapping', cat: 'Wrapping', short: 'Secure and protective shrink wrapping solutions for all cargo types.', features: ['Moisture and dust protection', 'Customizable thickness options', 'Cost-effective solution'], applications: ['Industrial equipment', 'Pallet loads'] },
  { name: 'Packing Materials', slug: 'product-packing-materials', cat: 'Packing Materials', short: 'Reliable packing solutions to protect and secure goods during storage and transportation.', features: ['High-quality & durable materials', 'Suitable for industrial and commercial use', 'Customizable options available'], applications: ['General cargo', 'Fragile items'] },
  { name: 'Plywood for Packing', slug: 'product-plywood', cat: 'Plywood', short: 'High-grade plywood sheets for heavy-duty packaging needs', features: ['Superior strength', 'Moisture resistant', 'Custom dimensions'], applications: ['Crate building', 'Box lining'] },
  { name: 'Lashing Materials', slug: 'product-lashing-materials', cat: 'Lashing', short: 'Professional cargo securing equipment and accessories', features: ['Heavy-duty straps', 'Certified quality', 'Various capacities'], applications: ['Container lashing', 'Flat rack securing'] },
  { name: 'Vacuum Packing', slug: 'product-vacuum-packing', cat: 'Vacuum Packing', short: 'Advanced vacuum packaging technology for moisture-sensitive goods', features: ['Moisture protection', 'Extended shelf life', 'Custom solutions'], applications: ['Electronics', 'Metal components'] },
  { name: 'Stretch Film', slug: 'product-stretch-film', cat: 'Wrapping', short: 'High-quality stretch films for securing palletized loads', features: ['Superior cling properties', 'Multiple thickness options', 'UV resistant variants'], applications: ['Pallet wrapping', 'Product bundling'] },
  { name: 'Corrugated Boxes', slug: 'product-corrugated-boxes', cat: 'Corrugated', short: 'Durable corrugated boxes for safe product transportation', features: ['Custom printing options', 'Various flute types', 'Eco-friendly materials'], applications: ['Retail packaging', 'Industrial use'] },
  { name: 'Plastic Pallets', slug: 'product-plastic-pallets', cat: 'Plastic', short: 'Lightweight, reusable pallets for hygiene and efficiency', features: ['Resistant to moisture and chemicals', 'Available in multiple sizes', 'Cost-effective & long-lasting'], applications: ['Food processing', 'Pharmaceuticals'] },
  { name: 'Bubble Wrap', slug: 'product-bubble-wrap', cat: 'Packing Materials', short: 'Protective bubble wrap for cushioning fragile items', features: ['Various bubble sizes', 'Antistatic options available', 'Recyclable materials'], applications: ['Fragile items', 'Electronics'] },
  { name: 'Packaging Tape', slug: 'product-packaging-tape', cat: 'Tapes', short: 'High-quality tapes for secure sealing of packages', features: ['Strong adhesive properties', 'Various width options', 'Printable surfaces'], applications: ['Carton sealing', 'Industrial use'] },
];

const imageMap = {
  'Wooden Pallets': '/uploads/Wooden-Pallets.jpg',
  'Wooden Skid': '/uploads/woodenskids.webp',
  'Shrink Wrapping': '/uploads/Shrink-Wrapping.jpeg',
  'Packing Materials': '/uploads/industrial-customized-protective-packing-materials-859.jpg',
  'Plywood for Packing': '/uploads/packing-grade-plywood-12mm-ply-500x500.webp',
  'Lashing Materials': '/uploads/LASHING-MATERIAL.jpg',
  'Vacuum Packing': '/uploads/vaccum-packing.jpg',
  'Stretch Film': '/uploads/machine-stretch-film-roll-500x500.jpg',
  'Corrugated Boxes': '/uploads/corrugated-box-500x500.webp',
  'Plastic Pallets': '/uploads/plastic.webp',
  'Bubble Wrap': '/uploads/bubblewrap.jpg',
  'Packaging Tape': '/uploads/3-65-heavy-duty-handheld-brown-packaging-tape-rolls-for-carton-original-imahcz9sswz2fvdg.webp',
};

const vocab = {
  'HDPE Roll': ['HDPE resin', 'extrusion process', 'tensile elongation', 'puncture resistance', 'tear propagation', 'high density film', 'wrapping applications', 'polyethylene wrapping'],
  'Aluminium Barrier Foil Rolls': ['aluminium foil lamination', 'oxygen transmission barrier', 'water vapor transmission rate (WVTR)', 'heat sealing temperature', 'vacuum packaging', 'barrier film structure', 'export packaging laminates', 'moisture barrier foil'],
  'VCI Film Roll': ['volatile corrosion inhibitor', 'sublimation process', 'monomolecular layer', 'electrochemical oxidation', 'rust prevention film', 'active VCI technology', 'metal part storage', 'multi-metal corrosion protection'],
  'Humidity Indicator': ['relative humidity level', 'color change chemistry', 'humidity indicator cards', 'cobalt-free chemistry', 'desiccant monitoring', 'sealed package ambient', 'reversible chemical reaction', 'moisture detection plugs'],
  'Thermo Shrink Packing': ['thermo shrink film', 'shrinkage ratio', 'LDPE shrink properties', 'heat gun application', 'machinery wrapping', 'tight conforming wrap', 'tamper evident packing', 'structural stabilization'],
  'Aluminium Foil Packing for Preservation': ['preservation packing', 'aluminium foil barrier', 'long term cargo storage', 'desiccant integration', 'hermetic sealing', 'oxidation barrier', 'military grade packaging', 'aerospace components preservation'],
  'Heavy Duty Protective Cover': ['heavy duty cover fabric', 'tear resistance', 'UV stabilization treatment', 'reinforced edge stitching', 'outdoor machinery storage', 'waterproof cover sheet', 'custom cover design', 'industrial protective tarp'],
  'Silpaulin Cover': ['cross-laminated film', 'silpaulin tarp sheets', 'high tensile strength cover', 'puncture endurance', 'weatherproof tarping', 'heavy cargo cover', 'agricultural storage tarp', 'reinforced grommets'],
  'LD/HM Liners': ['low-density liners', 'high-molecular liners', 'drum lining bags', 'container lining sheets', 'polyethylene liner bags', 'leak proof seams', 'gusseted bag design', 'industrial dust protection'],
  'LDPE Shrink Film': ['LDPE shrink film rolls', 'biaxial shrink properties', 'bundling shrink wrapping', 'pallet containment wrap', 'clarity and transparency', 'shrink oven processing', 'load stability', 'polyethylene bundling'],
  'Disposable Aprons': ['polyethylene aprons', 'disposable protection sleeves', 'food grade cleanliness', 'liquid splash barrier', 'industrial hygiene wear', 'lightweight apron sheet', 'tie-back straps design', 'chemical resistant apron'],
  'Carry Bags': ['polyethylene carry bags', 'die-cut handle bags', 'loop handle retail bags', 'printed commercial bags', 'load bearing capacity', 'HM-HDPE carry bags', 'retail shopping packaging', 'reusable plastic bags'],
  'PP Tubing': ['polypropylene tubing', 'tubing roll continuous', 'crystal clear packaging', 'heat seal tube packing', 'hardware component wrapping', 'rigid film structure', 'custom width tubing', 'layflat PP tubing'],
  'Heavy Duty Liner Bags': ['heavy duty liner bags', 'high gauge thick bags', 'chemical powder packing', 'bulk product storage', 'puncture safety liners', 'industrial waste disposal', 'sealing strength liners', 'reinforced bottom seal'],
  'Perforation / Embossing Bags': ['micro perforation holes', 'embossed surface grip', 'breathable produce bags', 'anti slip packing bags', 'ventilation packaging bags', 'plastic bag texturing', 'airflow preservation', 'grip patterned bags'],
  'Valve Type LD Bags': ['valve bag filling', 'self-closing valve opening', 'low density valve bags', 'powder packing bags', 'automatic bag filler', 'stackable bag storage', 'dust-free bag seal', 'industrial cement packaging'],
  'Desiccants': ['silica gel desiccant', 'bentonite clay absorption', 'moisture vapor absorption', 'relative humidity reduction', 'indicating desiccant gel', 'tyvek desiccant pouch', 'cargo container desiccants', 'adsorption capacity metrics'],
  'Tarpaulin Rolls': ['tarpaulin rolls continuous', 'canvas tarpaulin fabric', 'waterproof coating tarp', 'outdoor storage protection', 'reinforced tarpaulin fabric', 'UV degradation resistance', 'construction site tarping', 'woven HDPE laminate'],
  'ODC Cargo Packing': ['over-dimensional cargo packaging', 'heavy equipment cradling', 'project cargo securing', 'wooden crate reinforcement', 'shrink wrapping cargo', 'maritime transit securing', 'custom timber frames', 'center of gravity balancing'],
  'Seaworthy Packing': ['seaworthy wooden crating', 'ocean voyage preparation', 'salt spray resistance', 'ISPM-15 heat treatment', 'export shipping container packing', 'multi-barrier seaworthy packing', 'vacuum foil sealing cargo', 'transit vibration dampening'],
  'VCI Paper': ['VCI packaging paper', 'corrosion protection wrapper', 'anti rust wrapping paper', 'kraft VCI paper', 'ferrous metal packaging', 'metal parts preservation', 'VCI active barrier', 'industrial rust inhibitor'],
  'VCI Bags': ['VCI zip bags', 'VCI gusset bags', 'corrosion protection bags', 'anti rust packaging bags', 'heat seal VCI bags', 'metal storage bags', 'VCI active barrier', 'industrial plastic VCI bags'],
  'VCI Oil': ['VCI liquid inhibitor', 'corrosion preventive oil', 'anti rust oil spray', 'metal surface passivation', 'rust protection coating', 'VCI active liquid', 'machinery oil protection', 'industrial rust inhibitor'],
};

const subjects = [
  "The physical integration of ${productName} within the manufacturing cycle",
  "Specifically, the macromolecular structure of ${productName}",
  "Under sustained hydrostatic pressure, the behavior of ${productName}",
  "When subjected to cyclic mechanical stress, the structural matrix of ${productName}",
  "By analyzing the thermodynamic stability of ${productName}, we find the structure",
  "From the perspective of material science and engineering, ${productName}",
  "In terms of interfacial adhesion properties, the laminated structure of ${productName}",
  "Regarding the degradation kinetics of ${productName} under UV exposure, the material",
  "Through continuous rheological assessment of ${productName}, the compound",
  "To address the critical requirements of industrial logistics, the formulation of ${productName}",
  "In compliance with global ISO and ASTM packaging guidelines, the design of ${productName}",
  "From a lifecycle assessment standpoint, the environmental profile of ${productName}",
  "During multi-modal transit across high-humidity regions, the protective barrier of ${productName}",
  "Under extreme temperature fluctuations, the dimensional stability of ${productName}",
  "By optimizing the cross-linking density within ${productName}, the polymer matrix",
  "The electrochemical passivation layer generated by ${productName}",
  "With respect to the mechanical load distribution, the reinforcing layer of ${productName}",
  "During the high-speed automated sealing process, the thermal profile of ${productName}",
  "In comparison to legacy alternatives within the ${categoryName} category, ${productName}",
  "By evaluating the vapor pressure equilibrium of ${productName}, the system",
  "To mitigate the risk of stress-crack propagation, the polymer blend of ${productName}",
  "Through systematic spectroscopic analysis, the chemical distribution within ${productName}",
  "When deployed in long-term outdoor storage conditions, the outer surface of ${productName}",
  "Under sustained tensile forces, the molecular alignment of ${productName}",
  "The optimization of polymer chain slip agents in ${productName}",
  "To prevent oxygen transmission during overseas export, the barrier layer of ${productName}",
  "Through continuous mechanical shear testing, the boundary layer of ${productName}",
  "With the addition of advanced processing stabilizers, the thermal resilience of ${productName}",
  "In order to optimize overall packaging line throughput, the coefficient of friction in ${productName}",
  "According to dynamic mechanical thermal analysis, the viscoelastic response of ${productName}"
];

const verbs = [
  "actively neutralizes",
  "significantly mitigates",
  "systematically optimizes",
  "substantially enhances",
  "dynamically suppresses",
  "continuously prevents",
  "profoundly influences",
  "directly regulates",
  "effectively stabilizes",
  "rapidly accelerates",
  "comprehensively reinforces",
  "consistently reduces",
  "efficiently coordinates",
  "decisively limits",
  "strategically transforms",
  "consistently maintains",
  "actively retards",
  "powerfully resists",
  "seamlessly integrates",
  "directly correlates with",
  "completely eliminates",
  "greatly improves",
  "safely secures",
  "precisely controls",
  "optimally distributes",
  "readily facilitates",
  "actively standardizes",
  "strongly reinforces",
  "directly minimizes",
  "reliably protects"
];

const concepts = [
  "the moisture vapor transmission rate (WVTR)",
  "interfacial shear strength propagation",
  "microstructural crystalline boundary alignment",
  "thermo-oxidative degradation pathways",
  "electrochemical galvanic corrosion processes",
  "gaseous permeation dynamics",
  "tensile deformation and fracture toughness",
  "ultraviolet light degradation susceptibility",
  "hydrostatic rupture pressure thresholds",
  "molecular weight distribution parameters",
  "viscoelastic creep deformation kinetics",
  "heat seal joint structural efficiency",
  "surface energy wetting behavior",
  "polymer chain entanglement density",
  "vapor phase inhibitor concentration levels",
  "delamination shear stress concentrations",
  "impact energy absorption characteristics",
  "hygroscopic adsorption isotherm profiles",
  "thermal expansion coefficient disparities",
  "tear propagation resistance vectors",
  "abrasive wear rate characteristics",
  "static charge dissipation kinetics",
  "crystallization temperature transition ranges",
  "corrosive electrolyte permeation barrier",
  "cross-link density optimization profiles",
  "polymeric antioxidant consumption rates",
  "slip additive concentration gradients",
  "gas transmission rate (GTR) benchmarks",
  "oxygen induction time (OIT) values",
  "flex-crack resistance levels"
];

const prepositions = [
  "across wide thermodynamic temperature bands",
  "during high-stress multi-modal maritime transport",
  "under continuous mechanical loading conditions",
  "in strict compliance with ISO quality standards",
  "within high relative humidity ambient conditions",
  "during rapid thermal sealing operations",
  "under aggressive saline environment conditions",
  "in industrial warehousing storage spaces",
  "across long-term preservation schedules",
  "during dynamic automated packaging routines",
  "in high-latitude and tropical climates",
  "under sustained load-bearing stress states",
  "in compatibility with secondary packaging materials",
  "during volatile phase emission stages",
  "under severe environmental weathering profiles",
  "in chemical processing plant atmospheres",
  "across varying thickness dimensions",
  "during physical handling and loading stages",
  "in direct contact with metallic surfaces",
  "under low pressure vacuum packing conditions",
  "during heavy industrial cargo operations",
  "across complex structural geometry interfaces",
  "in multi-layer co-extrusion manufacturing setups",
  "during long-distance overseas export shipping",
  "under dynamic tensile stress variations",
  "in dry packaging desiccated container systems",
  "during thermal shrink oven heating cycles",
  "under harsh solar radiation exposures",
  "in challenging logistical storage situations",
  "across high-velocity distribution conveyor networks"
];

const conclusions = [
  "thereby ensuring that the enclosed products remain completely free from degradation.",
  "which represents a major benchmark in high-performance materials engineering.",
  "ultimately reducing product failure rates during overseas export.",
  "which is essential for maintaining product reliability and client satisfaction.",
  "resulting in a significant increase in the operational lifespan of the packaging.",
  "which directly validates the rigorous design specifications set during prototyping.",
  "leading to superior preservation performance in challenging industrial environments.",
  "thereby optimizing overall packaging efficiency and lowering overhead costs.",
  "which represents an innovative milestone for industrial packaging technology.",
  "thus maintaining the physical and chemical characteristics of protected goods.",
  "thereby preventing unexpected downtime and material losses for manufacturers.",
  "which provides an excellent advantage over standard packaging designs.",
  "consequently reinforcing the physical strength of the entire packaging system.",
  "ensuring compliance with modern ecological and commercial requirements.",
  "which serves to strengthen the competitive advantage of industrial exporters.",
  "thereby achieving a perfect balance between material cost and protective performance.",
  "which ensures that moisture levels are kept well below critical oxidation limits.",
  "resulting in zero corrosion reports across multi-destination shipments.",
  "which establishes a highly reliable layer of safety for high-value machinery.",
  "thereby eliminating the need for oily rust preventatives and post-transit cleaning.",
  "which effectively maintains structural load distribution during stacking.",
  "thereby optimizing transport cube utilization and overall storage density.",
  "which minimizes the overall carbon footprint of the industrial shipping cycle.",
  "resulting in exceptional tear and puncture resistance characteristics.",
  "which guarantees stable protection even during multi-year storage cycles.",
  "thereby ensuring safe cargo handling for riggers and transport teams.",
  "which confirms the material’s structural integrity under extreme load scenarios.",
  "resulting in a durable, hermetic seal that prevents dust and moisture ingress.",
  "which greatly simplifies the unpacking and assembly processes for end-users.",
  "thereby establishing new performance benchmarks for protective industrial packaging."
];

const subHeadings = [
  [
    "Polymer Matrix and Chemical Composition",
    "Additive Stabilization and UV Protection Methods",
    "Spectroscopic Quality Validation and Characterization"
  ],
  [
    "Co-Extrusion and Blown Film Extrusion Processing",
    "Crystalline Boundary and Orientation Alignment Dynamics",
    "Thermal Profiling and Temperature Control Calibration"
  ],
  [
    "Tensile Modulus and Load Deformation Endurance Limits",
    "Tear Propagation and Outer Layer Puncture Resistance",
    "Viscoelastic Creep and Long-Term Load Fatigue Prevention"
  ],
  [
    "Water Vapor Transmission Rate (WVTR) Prevention Parameters",
    "Oxygen Permeability Limits and Hermetic Joint Sealing",
    "Thermodynamic Insulation Shielding under Extreme Weather"
  ],
  [
    "Volatile Corrosion Inhibition (VCI) Emission Dynamics",
    "Electrochemical Metal Oxidation and Rust Ingress Prevention",
    "Galvanic Boundary Passivation and Structural Stabilization"
  ],
  [
    "Heavy Machinery Cargo Storage and Warehouse Layouts",
    "Marine Voyage Export and Salt-Spray Containment Safeguards",
    "Military Equipment Storage and Aerospace preservation Case Studies"
  ],
  [
    "ASTM Standards and ISO Compliance Testing Protocols",
    "Hydrostatic Bursting Strength and Dart Impact Endurance Verification",
    "Spectrophotometric Density Inspection and Thickness Calibration Checks"
  ],
  [
    "Safe Unpacking Procedures and Product Surface Contact Protocols",
    "High-Speed Automatic Sealing Machine Calibration Controls",
    "Multi-Layer Pallet Stacking Safety and Static Coefficient Mitigation"
  ],
  [
    "Polymer Resins Upcyclability and Recyclable Waste Pathways",
    "Life Cycle Assessment (LCA) Impact Calculations and Footprints",
    "Bio-Degradable Corrosion Mitigation Alternatives and Environment"
  ],
  [
    "Dimensional Sheet Customization and Custom Gauge Profiles",
    "Bulk Wholesale Procurement and Freight Shipment Lead Times",
    "OEM Engineering Specifications and Custom Brand Logo Printing Options"
  ]
];

function getSectionTitle(productName, index) {
  const titles = [
    `${productName} Material Formulation and Chemical Analysis`,
    `Advanced Manufacturing and Processing of ${productName}`,
    `Mechanical Strength and Durability Characteristics of ${productName}`,
    `Environmental Barrier Performance of ${productName}`,
    `Corrosion Prevention and Chemical Stability of ${productName}`,
    `Industrial Applications and Case Studies of ${productName}`,
    `Quality Control Standards and Testing Methods for ${productName}`,
    `Operational Integration and Handling Guidelines for ${productName}`,
    `Sustainability, Life Cycle, and Recycling of ${productName}`,
    `Custom Ordering Options and Procurement Parameters of ${productName}`
  ];
  return titles[index];
}

function buildDetailedText(product, categoryName, sIndex, subIndex, blockId, targetWords) {
  let sentences = [];
  let currentWords = 0;
  let sIndexLocal = 0;
  const productVocab = vocab[product.name] || ['industrial packaging', 'protective solution', 'durability', 'performance', 'quality', 'safety', 'standard', 'efficiency'];
  const seedValue = product.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  while (currentWords < targetWords) {
    const openIdx = (seedValue + sIndex * 7 + subIndex * 11 + blockId * 13 + sIndexLocal * 19) % subjects.length;
    const verbIdx = (seedValue + sIndex * 3 + subIndex * 13 + blockId * 17 + sIndexLocal * 23) % verbs.length;
    const conceptIdx = (seedValue + sIndex * 11 + subIndex * 17 + blockId * 19 + sIndexLocal * 29) % concepts.length;
    const prepIdx = (seedValue + sIndex * 5 + subIndex * 19 + blockId * 23 + sIndexLocal * 31) % prepositions.length;
    const conclIdx = (seedValue + sIndex * 13 + subIndex * 23 + blockId * 29 + sIndexLocal * 37) % conclusions.length;

    let sentence = subjects[openIdx].replace('${productName}', product.name).replace('${categoryName}', categoryName);
    sentence += ' ' + verbs[verbIdx];
    sentence += ' ' + concepts[conceptIdx];
    sentence += ' ' + prepositions[prepIdx];
    sentence += ' ' + conclusions[conclIdx];

    // Inject vocab word
    if (sIndexLocal % 2 === 0) {
      const w1 = productVocab[(sIndexLocal + blockId * 2) % productVocab.length];
      const w2 = productVocab[(sIndexLocal + blockId * 2 + 1) % productVocab.length];
      const w3 = productVocab[(sIndexLocal + blockId * 2 + 2) % productVocab.length];
      sentence += ` Specifically, the implementation of ${product.name} leverages ${w1} to govern the action of ${w2}, resulting in a noticeable improvement in ${w3} parameters.`;
    }

    sentences.push(sentence);
    currentWords += sentence.split(/\s+/).filter(w => w.length > 0).length;
    sIndexLocal++;
  }

  return sentences.join(' ');
}

function generateProductDescription(product, categoryName) {
  const sectionsHtml = [];

  for (let sIndex = 0; sIndex < 10; sIndex++) {
    const title = getSectionTitle(product.name, sIndex);
    let sectionText = `<h2>${sIndex + 1}. ${title}</h2>\n`;
    
    // Section Intro: ~200 words
    const sectionIntro = buildDetailedText(product, categoryName, sIndex, 0, 100, 200);
    sectionText += `<p>${sectionIntro}</p>\n\n`;

    // 3 Sub-sections
    for (let subIdx = 0; subIdx < 3; subIdx++) {
      const subHead = subHeadings[sIndex][subIdx];
      sectionText += `<h3>${sIndex + 1}.${subIdx + 1} ${product.name} ${subHead}</h3>\n`;

      // Sub-section Intro: ~200 words
      const subIntro = buildDetailedText(product, categoryName, sIndex, subIdx, 200, 200);
      sectionText += `<p>${subIntro}</p>\n\n`;

      // Bullet List of 5 items, each item is a <li> with detailed content (approx 120 words each, total 600 words)
      sectionText += `<ul>\n`;
      const bulletTitles = [
        `System Integration Details`,
        `Quality Compliance Parameters`,
        `Operational Safety Standards`,
        `Material Performance Metrics`,
        `Lifecycle Durability Benchmarks`
      ];
      for (let bIdx = 0; bIdx < 5; bIdx++) {
        const bulletDetail = buildDetailedText(product, categoryName, sIndex, subIdx, 300 + bIdx, 120);
        sectionText += `  <li><strong>${bulletTitles[bIdx]}:</strong> ${bulletDetail}</li>\n`;
      }
      sectionText += `</ul>\n\n`;

      // Sub-section Conclusion: ~200 words
      const subOutro = buildDetailedText(product, categoryName, sIndex, subIdx, 400, 200);
      sectionText += `<p>${subOutro}</p>\n\n`;
    }

    sectionsHtml.push(sectionText);
  }

  return sectionsHtml.join('\n');
}

async function seedProducts() {
  await connectDB();
  await ProductCategory.deleteMany({});
  await Product.deleteMany({});

  const savedCats = {};
  for (const c of cats) {
    const saved = await ProductCategory.create(c);
    savedCats[c.name] = saved._id;
  }
  console.log('✅ Categories seeded');

  for (const p of products) {
    const localImage = imageMap[p.name] || '/uploads/product_placeholder.png';
    const longDesc = generateProductDescription(p, p.cat);
    
    await Product.create({
      name: p.name,
      slug: p.slug,
      category: savedCats[p.cat],
      shortDescription: p.short,
      longDescription: longDesc,
      features: p.features,
      applications: p.applications,
      benefits: ['Cost effective solution', 'Premium quality material', 'Custom sizing available', 'Reliable performance'],
      metaTitle: `${p.name} - Sharma Packaging`,
      metaDescription: `Buy premium ${p.name} from Sharma Packaging. ${p.short}`,
      keywords: `${p.name}, ${p.cat}, packaging, export packaging`,
      images: [localImage],
    });
  }
  console.log('✅ Products seeded with structured 30,000+ words each');
  process.exit(0);
}

seedProducts().catch(e => {
  console.error(e);
  process.exit(1);
});
