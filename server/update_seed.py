import re

file_path = '/Users/satyangupta/Desktop/SharmapackagingWebsite/server/seed/seedProducts.js'

with open(file_path, 'r') as f:
    content = f.read()

# Replace cats
new_cats = """const cats = [
  { name: 'Wooden Products', description: 'Wooden Pallets and Skids', order: 1 },
  { name: 'Wrapping', description: 'Shrink Wrapping Solutions', order: 2 },
  { name: 'Packing Materials', description: 'Industrial Packing Materials', order: 3 },
  { name: 'Plywood', description: 'Plywood for Packing', order: 4 },
  { name: 'Lashing', description: 'Lashing Materials', order: 5 },
  { name: 'Vacuum Packing', description: 'Vacuum Packing Solutions', order: 6 },
  { name: 'Corrugated', description: 'Corrugated Boxes', order: 7 },
  { name: 'Plastic', description: 'Plastic Pallets', order: 8 },
  { name: 'Tapes', description: 'Packaging Tapes', order: 9 },
];"""
content = re.sub(r'const cats = \[.*?\];', new_cats, content, flags=re.DOTALL)

# Replace products
new_products = """const products = [
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
];"""
content = re.sub(r'const products = \[.*?\];', new_products, content, flags=re.DOTALL)

# Replace imageMap
new_imageMap = """const imageMap = {
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
};"""
content = re.sub(r'const imageMap = \{.*?\};', new_imageMap, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated seedProducts.js")
