import type { Shoe } from './types';

export const shoes: Shoe[] = [
  // --- Oxfords ---
  {
    id: 'll-oxford-001',
    name: 'The Classic Oxford',
    slug: 'classic-oxford',
    price: 3800,
    images: ['/images/shoe-black.svg', '/images/shoe-black.svg', '/images/shoe-black.svg', '/images/shoe-black.svg'],
    description: 'A timeless staple for any gentleman\'s wardrobe. The Classic Oxford is the epitome of formal elegance, perfect for business meetings or special occasions.',
    details: ['Full-grain calfskin leather', 'Closed lacing system (5 eyelets)', 'Leather sole and lining', 'Hand-polished finish'],
    category: 'Oxford',
    stock: 20
  },
  {
    id: 'll-brogue-001',
    name: 'The Wingtip Brogue',
    slug: 'wingtip-brogue',
    price: 3750,
    images: ['/images/shoe-brown.svg', '/images/shoe-brown.svg', '/images/shoe-brown.svg', '/images/shoe-brown.svg'],
    description: 'A statement of heritage and style. The Wingtip Brogue features decorative perforations, adding character to both formal and smart-casual outfits.',
    details: ['Full-grain leather with brogue detailing', 'W-shaped toe cap (wingtip)', 'Durable Goodyear welt', 'Versatile for formal or casual wear'],
    category: 'Oxford',
    stock: 15
  },
  {
    id: 'll-wholecut-001',
    name: 'The Sleek Wholecut',
    slug: 'sleek-wholecut',
    price: 3800,
    images: ['/images/shoe-black.svg', '/images/shoe-black.svg', '/images/shoe-black.svg', '/images/shoe-black.svg'],
    description: 'The pinnacle of minimalist elegance. Crafted from a single, flawless piece of leather, the Wholecut is a clean, sophisticated choice for the most formal events.',
    details: ['Single-piece full-grain leather upper', 'Clean, uninterrupted lines', 'Closed lacing system', 'Ideal for black-tie and formal wear'],
    category: 'Oxford',
    stock: 10
  },

  // --- Derbies ---
  {
    id: 'll-derby-001',
    name: 'The Versatile Derby',
    slug: 'versatile-derby',
    price: 3500,
    images: ['/images/shoe-brown.svg', '/images/shoe-brown.svg', '/images/shoe-brown.svg', '/images/shoe-brown.svg'],
    description: 'Bridging the gap between formal and casual, the Derby shoe features an open lacing system for a comfortable fit and a relaxed yet sophisticated look.',
    details: ['Suede or box calf leather options', 'Open lacing system (quarters sewn on top)', 'Dainite rubber sole for durability', 'Storm welt construction'],
    category: 'Derby',
    stock: 25
  },

  // --- Loafers & Slip-ons ---
  {
    id: 'll-penny-loafer-001',
    name: 'The Penny Loafer',
    slug: 'penny-loafer',
    price: 3250,
    images: ['/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg'],
    description: 'An icon of preppy style. The Penny Loafer is a versatile slip-on, perfect for smart-casual occasions, featuring a distinctive leather strap across the vamp.',
    details: ['Polished calfskin leather', 'Signature diamond-shaped cutout', 'Moc-toe construction', 'Leather sole for flexibility'],
    category: 'Loafer',
    stock: 30
  },
  {
    id: 'll-tassel-loafer-001',
    name: 'The Tassel Loafer',
    slug: 'tassel-loafer',
    price: 3300,
    images: ['/images/shoe-suede.svg', '/images/shoe-suede.svg', '/images/shoe-suede.svg', '/images/shoe-suede.svg'],
    description: 'A sophisticated slip-on with a dash of flair. The Tassel Loafer adds a touch of personality to your look, suitable for both suits and chinos.',
    details: ['Soft, premium suede', 'Decorative leather tassels', 'Blake stitch construction for a sleek profile', 'Unlined for maximum comfort'],
    category: 'Loafer',
    stock: 18
  },
  {
    id: 'll-driving-moc-001',
    name: 'The Driving Moccasin',
    slug: 'driving-moccasin',
    price: 3200,
    images: ['/images/shoe-brown.svg', '/images/shoe-brown.svg', '/images/shoe-brown.svg', '/images/shoe-brown.svg'],
    description: 'Engineered for comfort behind the wheel and style on the street. Our Driving Moccasin features a flexible sole with signature rubber pebbles for grip.',
    details: ['Pebbled calfskin leather', 'Iconic rubber grommet sole', 'Extremely flexible and lightweight', 'Perfect for travel and casual weekends'],
    category: 'Moccasin',
    stock: 22
  },

  // --- Boots ---
  {
    id: 'll-chelsea-boot-001',
    name: 'The Chelsea Boot',
    slug: 'chelsea-boot',
    price: 4100,
    images: ['/images/shoe-suede.svg', '/images/shoe-suede.svg', '/images/shoe-suede.svg', '/images/shoe-suede.svg'],
    description: 'Sleek, modern, and effortlessly cool. The Chelsea Boot\'s elastic side panel and clean silhouette make it a versatile choice for any contemporary wardrobe.',
    details: ['Smooth calfskin or suede leather', 'Elastic side gores for easy entry', 'Pull tab at the heel', 'Slim profile leather sole'],
    category: 'Boot',
    stock: 12
  },
  {
    id: 'll-chukka-boot-001',
    name: 'The Chukka Boot',
    slug: 'chukka-boot',
    price: 3900,
    images: ['/images/shoe-suede.svg', '/images/shoe-suede.svg', '/images/shoe-suede.svg', '/images/shoe-suede.svg'],
    description: 'The definitive smart-casual boot. With its ankle-high cut and minimal lacing, the Chukka Boot is a comfortable and stylish option for any season.',
    details: ['Soft suede upper', 'Two or three lacing eyelets', 'Crepe or leather sole options', 'Unstructured for a relaxed fit'],
    category: 'Boot',
    stock: 16
  },
  {
    id: 'll-jodhpur-boot-001',
    name: 'The Jodhpur Boot',
    slug: 'jodhpur-boot',
    price: 4200,
    images: ['/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg'],
    description: 'With equestrian roots, the Jodhpur Boot is defined by its strap-and-buckle fastening. It offers a unique and elegant alternative to traditional boots.',
    details: ['Full-grain leather', 'Ankle strap and buckle closure', 'Rounded toe', 'Low heel and leather sole'],
    category: 'Boot',
    stock: 8
  },

  // --- Monk Straps ---
  {
    id: 'll-double-monk-001',
    name: 'The Double Monk Strap',
    slug: 'double-monk-strap',
    price: 3700,
    images: ['/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg', '/images/shoe-burgundy.svg'],
    description: 'A sophisticated alternative to laced shoes. The Double Monk Strap makes a confident statement with its distinctive double-buckle fastening.',
    details: ['Museum calf leather', 'Polished silver-tone buckles', 'Chiseled toe shape', 'Hand-burnished patina'],
    category: 'Monk Strap',
    stock: 14
  },
  {
    id: 'll-single-monk-001',
    name: 'The Single Monk Strap',
    slug: 'single-monk-strap',
    price: 3650,
    images: ['/images/shoe-black.svg', '/images/shoe-black.svg', '/images/shoe-black.svg', '/images/shoe-black.svg'],
    description: 'Clean and understated, the Single Monk Strap offers a refined look with a single, elegant buckle. A versatile shoe for the modern professional.',
    details: ['Hand-polished calfskin', 'Single buckle closure', 'Goodyear welted construction', 'Perfect with tailored suits'],
    category: 'Monk Strap',
    stock: 11
  },
];


export const getShoes = (): Shoe[] => shoes;

export const getShoeBySlug = (slug: string): Shoe | undefined => {
  // In a real app, this would check localStorage first
  const storedShoesRaw = typeof window !== 'undefined' ? localStorage.getItem('shoes') : null;
  if (storedShoesRaw) {
    const storedShoes: Shoe[] = JSON.parse(storedShoesRaw);
    return storedShoes.find((shoe) => shoe.slug === slug);
  }
  return shoes.find((shoe) => shoe.slug === slug);
};

export const getFeaturedShoes = (count: number): Shoe[] => {
  // Shuffle array to get random featured shoes
  const shuffled = [...shoes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const shoeSizes = Array.from({ length: 9 }, (_, i) => 39 + i); // 39 to 47
