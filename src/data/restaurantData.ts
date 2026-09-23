import { MenuItem, GalleryItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'SAI DATTA RESTAURANT',
  shortName: 'Sai Datta',
  tagline: 'Flavours That Bring Everyone Together',
  cuisineSubtitle: 'AUTHENTIC INDIAN • CHINESE • BIRYANI',
  description:
    'Discover comforting Indian favourites, aromatic biryanis, flavorful curries and delicious Chinese specialties at Sai Datta Restaurant.',
  storyParagraph:
    'Sai Datta Restaurant brings together a wide selection of Indian, Chinese, vegetarian and non-vegetarian favourites in a welcoming dining environment.',
  address: 'Rice Mill Road, House 9-38/1, Muthangi, Patancheru, Hyderabad, Telangana 502300, India',
  shortLocation: 'Rice Mill Rd, Muthangi, Patancheru',
  coordinates: {
    lat: 17.5374,
    lng: 78.2265,
    formatted: '17.5374° N, 78.2265° E',
    rawString: '17.5374, 78.2265',
  },
  phone: '+91 98668 82999',
  phoneRaw: '+919866882999',
  hours: '11:00 AM – 11:00 PM',
  orderTimeNotice: 'Each order will take at least 10–15 minutes.',
  policyNotice: 'Alcohol & Smoking Is Not Allowed',
  swiggyUrl: 'https://www.swiggy.com/menu/628163?source=sharing',
  zomatoUrl: 'https://zomato.onelink.me/xqzv/p2a4e1so',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sai+Datta+Restaurant+Rice+Mill+Road+Muthangi+Telangana+502300',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Sai+Datta+Restaurant,+Rice+Mill+Road,+Muthangi,+Patancheru,+Telangana+502300&travelmode=driving',
  appleMapsDirectionsUrl:
    'https://maps.apple.com/?daddr=Sai+Datta+Restaurant,+Rice+Mill+Road,+Muthangi,+Patancheru,+Telangana+502300&dirflg=d&q=Sai+Datta+Restaurant',
  wazeDirectionsUrl:
    'https://waze.com/ul?q=Sai+Datta+Restaurant+Muthangi+Patancheru+Hyderabad&ll=17.5374,78.2265&navigate=yes',
  geoIntentUrl:
    'geo:0,0?q=Sai+Datta+Restaurant,+Rice+Mill+Road,+Muthangi,+Patancheru,+Telangana+502300',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Sai+Datta+Restaurant,+Rice+Mill+Road,+Muthangi,+Telangana+502300&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export const MENU_CATEGORIES = [
  'ALL',
  'SOUPS',
  'VEG SNACKS',
  'NON-VEG SNACKS',
  'NOODLES',
  'ROTIS',
  'VEG CURRIES',
  'NON-VEG CURRIES',
  'BIRYANI',
  'FRIED RICE',
  'FISH',
  'COOL DRINKS',
] as const;

export function computeItemTag(item: Partial<MenuItem> & { name: string; type: MenuItem['type']; category: MenuItem['category'] }): string {
  if (item.tag) return item.tag;
  if (item.type === 'veg') return 'veg';
  if (item.category === 'COOL DRINKS' || item.type === 'beverage') return 'beverage';
  const name = item.name.toLowerCase();
  if (item.category === 'FISH' || name.includes('fish') || name.includes('prawn')) return 'seafood';
  if (name.includes('egg') || name.includes('omelette') || name.includes('burji')) return 'egg';
  return 'non-veg';
}

function computeDefaultTags(item: Partial<MenuItem> & { name: string; type: MenuItem['type']; category: MenuItem['category'] }): string[] {
  if (item.tags && item.tags.length > 0) {
    return item.tags;
  }
  const tags: string[] = [item.type];
  const name = item.name.toLowerCase();
  const isSpicy =
    item.spiceLevel === 'spicy' ||
    item.spiceLevel === 'extra-spicy' ||
    name.includes('chilli') ||
    name.includes('schezwan') ||
    name.includes('hot & sour') ||
    name.includes('pepper') ||
    name.includes('65') ||
    name.includes('biryani') ||
    name.includes('majestic') ||
    name.includes('lollipop') ||
    name.includes('kadai') ||
    name.includes('kolhapuri') ||
    name.includes('masala') ||
    name.includes('roast') ||
    name.includes('burani') ||
    name.includes('sukka') ||
    name.includes('fish') ||
    name.includes('pakoda') ||
    name.includes('dragon') ||
    name.includes('malaysian') ||
    item.category === 'BIRYANI' ||
    item.category === 'NON-VEG CURRIES';

  if (isSpicy) {
    tags.push('spicy');
  }
  if (item.isSpecial) {
    tags.push('special');
  }
  return tags;
}

export const SIGNATURE_PICKS: MenuItem[] = [
  {
    id: 'sig-1',
    name: 'Sai Datta Special Chicken Biryani',
    category: 'BIRYANI',
    type: 'non-veg',
    price: 240,
    isSpecial: true,
    description: 'Chef signature long-grain basmati biryani with spiced succulent chicken',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    tags: ['non-veg', 'spicy', 'special', 'bestseller'],
  },
  {
    id: 'sig-2',
    name: 'Sai Datta Special Chicken Curry',
    category: 'NON-VEG CURRIES',
    type: 'non-veg',
    price: 270,
    isSpecial: true,
    description: 'Signature rich slow-simmered chicken curry in aromatic house masala',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
    tags: ['non-veg', 'spicy', 'special'],
  },
  {
    id: 'sig-3',
    name: 'Sai Datta Special Chicken Dry',
    category: 'NON-VEG SNACKS',
    type: 'non-veg',
    price: 250,
    isSpecial: true,
    description: 'Tender chicken roasted with crushed spices, curry leaves and green chillies',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop',
    tags: ['non-veg', 'spicy', 'special'],
  },
];

const RAW_MENU_ITEMS: MenuItem[] = [
  // SOUPS
  { id: 'sp-1', name: 'Tomato Soup', category: 'SOUPS', type: 'veg', price: 80 },
  { id: 'sp-2', name: 'Veg Corn Soup', category: 'SOUPS', type: 'veg', price: 80 },
  { id: 'sp-3', name: 'Chicken Corn Soup', category: 'SOUPS', type: 'non-veg', price: 100 },
  { id: 'sp-4', name: 'Chicken Sweet & Sour Soup', category: 'SOUPS', type: 'non-veg', price: 120 },
  { id: 'sp-5', name: 'Chicken Hot & Sour Soup', category: 'SOUPS', type: 'non-veg', price: 120 },

  // VEG SNACKS
  { id: 'vs-1', name: 'Veg Manchurian', category: 'VEG SNACKS', type: 'veg', price: 80 },
  { id: 'vs-2', name: 'Paneer 65', category: 'VEG SNACKS', type: 'veg', price: 180 },
  { id: 'vs-3', name: 'Gobi Manchurian', category: 'VEG SNACKS', type: 'veg', price: 100 },
  { id: 'vs-4', name: 'Paneer Manchurian', category: 'VEG SNACKS', type: 'veg', price: 180 },
  { id: 'vs-5', name: 'Finger Chips', category: 'VEG SNACKS', type: 'veg', price: 100 },
  { id: 'vs-6', name: 'Green Peas Fry', category: 'VEG SNACKS', type: 'veg', price: 120 },
  { id: 'vs-7', name: 'Green Peas Roast', category: 'VEG SNACKS', type: 'veg', price: 120 },
  { id: 'vs-8', name: 'Veg Malaysian', category: 'VEG SNACKS', type: 'veg', price: 120 },

  // NON-VEG SNACKS
  { id: 'nvs-1', name: 'Chicken 65', category: 'NON-VEG SNACKS', type: 'non-veg', price: 180 },
  { id: 'nvs-2', name: 'Chicken Manchurian', category: 'NON-VEG SNACKS', type: 'non-veg', price: 180 },
  { id: 'nvs-3', name: 'Chicken Burani', category: 'NON-VEG SNACKS', type: 'non-veg', price: 220 },
  { id: 'nvs-4', name: 'Kaju Chicken Dry', category: 'NON-VEG SNACKS', type: 'non-veg', price: 220 },
  { id: 'nvs-5', name: 'Chicken Lollipop 4 Pc', category: 'NON-VEG SNACKS', type: 'non-veg', price: 180 },
  { id: 'nvs-6', name: 'Chicken Drumstick', category: 'NON-VEG SNACKS', type: 'non-veg', price: 180 },
  { id: 'nvs-7', name: 'Chicken Majestic', category: 'NON-VEG SNACKS', type: 'non-veg', price: 220 },
  { id: 'nvs-8', name: 'Egg Manchurian', category: 'NON-VEG SNACKS', type: 'non-veg', price: 120 },
  { id: 'nvs-9', name: 'Chicken Lollipop Wet', category: 'NON-VEG SNACKS', type: 'non-veg', price: 200 },
  { id: 'nvs-10', name: 'Chicken Pakoda', category: 'NON-VEG SNACKS', type: 'non-veg', price: 220 },
  { id: 'nvs-11', name: 'Chicken Roast', category: 'NON-VEG SNACKS', type: 'non-veg', price: 200 },
  { id: 'nvs-12', name: 'Chilli Chicken', category: 'NON-VEG SNACKS', type: 'non-veg', price: 200 },
  { id: 'nvs-13', name: 'Pepper Chicken', category: 'NON-VEG SNACKS', type: 'non-veg', price: 200 },
  { id: 'nvs-14', name: 'Sai Datta Special Chicken Dry', category: 'NON-VEG SNACKS', type: 'non-veg', price: 250, isSpecial: true },
  { id: 'nvs-15', name: 'Chilli Egg', category: 'NON-VEG SNACKS', type: 'non-veg', price: 130 },
  { id: 'nvs-16', name: 'Egg 65', category: 'NON-VEG SNACKS', type: 'non-veg', price: 130 },
  { id: 'nvs-17', name: 'Boiled Egg', category: 'NON-VEG SNACKS', type: 'non-veg', price: 20 },
  { id: 'nvs-18', name: 'Half Boiled Egg 2 Egg', category: 'NON-VEG SNACKS', type: 'non-veg', price: 80 },
  { id: 'nvs-19', name: 'Fry Boiled Egg 2 Pc', category: 'NON-VEG SNACKS', type: 'non-veg', price: 80 },

  // NOODLES
  { id: 'nd-1', name: 'Veg Noodles', category: 'NOODLES', type: 'veg', price: 80 },
  { id: 'nd-2', name: 'Egg Noodles', category: 'NOODLES', type: 'non-veg', price: 80 },
  { id: 'nd-3', name: 'Chicken Noodles', category: 'NOODLES', type: 'non-veg', price: 90 },
  { id: 'nd-4', name: 'Mix Noodles', category: 'NOODLES', type: 'non-veg', price: 100 },
  { id: 'nd-5', name: 'Manchurian Noodles', category: 'NOODLES', type: 'veg', price: 100 },

  // ROTIS
  { id: 'rt-1', name: 'Tandoori Roti', category: 'ROTIS', type: 'veg', price: 15 },
  { id: 'rt-2', name: 'Butter Roti', category: 'ROTIS', type: 'veg', price: 20 },
  { id: 'rt-3', name: 'Butter Naan', category: 'ROTIS', type: 'veg', price: 30 },
  { id: 'rt-4', name: 'Plain Naan', category: 'ROTIS', type: 'veg', price: 25 },
  { id: 'rt-5', name: 'Kulcha', category: 'ROTIS', type: 'veg', price: 35 },
  { id: 'rt-6', name: 'Butter Kulcha', category: 'ROTIS', type: 'veg', price: 40 },
  { id: 'rt-7', name: 'Paratha', category: 'ROTIS', type: 'veg', price: 35 },
  { id: 'rt-8', name: 'Aloo Stuff Paratha', category: 'ROTIS', type: 'veg', price: 50 },

  // VEG CURRIES
  {
    id: 'vc-1',
    name: 'Dal Fry',
    category: 'VEG CURRIES',
    type: 'veg',
    price: 50,
    priceOptions: [
      { label: 'Small', price: 50 },
      { label: 'Full', price: 80 },
    ],
  },
  {
    id: 'vc-2',
    name: 'Dal Tadka',
    category: 'VEG CURRIES',
    type: 'veg',
    price: 70,
    priceOptions: [
      { label: 'Small', price: 70 },
      { label: 'Full', price: 100 },
    ],
  },
  { id: 'vc-3', name: 'Tomato Curry', category: 'VEG CURRIES', type: 'veg', price: 100 },
  { id: 'vc-4', name: 'Sava Tomato', category: 'VEG CURRIES', type: 'veg', price: 100 },
  { id: 'vc-5', name: 'Mix Veg Curry', category: 'VEG CURRIES', type: 'veg', price: 120 },
  { id: 'vc-6', name: 'Kadai Veg', category: 'VEG CURRIES', type: 'veg', price: 140 },
  { id: 'vc-7', name: 'Kaju Paneer', category: 'VEG CURRIES', type: 'veg', price: 200 },
  { id: 'vc-8', name: 'Paneer Shahi Kurma', category: 'VEG CURRIES', type: 'veg', price: 200 },
  {
    id: 'vc-9',
    name: 'Paneer Butter Masala',
    category: 'VEG CURRIES',
    type: 'veg',
    price: 100,
    priceOptions: [
      { label: 'Small', price: 100 },
      { label: 'Full', price: 170 },
    ],
  },
  { id: 'vc-10', name: 'Aloo Palak', category: 'VEG CURRIES', type: 'veg', price: 120 },
  { id: 'vc-11', name: 'Veg Kolhapuri', category: 'VEG CURRIES', type: 'veg', price: 150 },
  { id: 'vc-12', name: 'Paneer Manchurian Wet', category: 'VEG CURRIES', type: 'veg', price: 180 },
  {
    id: 'vc-13',
    name: 'Palak Paneer',
    category: 'VEG CURRIES',
    type: 'veg',
    price: 100,
    priceOptions: [
      { label: 'Small', price: 100 },
      { label: 'Full', price: 170 },
    ],
  },
  { id: 'vc-14', name: 'Plain Palak', category: 'VEG CURRIES', type: 'veg', price: 100 },
  { id: 'vc-15', name: 'Aloo Gobi Masala', category: 'VEG CURRIES', type: 'veg', price: 100 },
  { id: 'vc-16', name: 'Kadai Paneer', category: 'VEG CURRIES', type: 'veg', price: 200 },
  { id: 'vc-17', name: 'Mushroom Butter Masala', category: 'VEG CURRIES', type: 'veg', price: 200 },
  { id: 'vc-18', name: 'Paneer Tikka Masala', category: 'VEG CURRIES', type: 'veg', price: 220 },
  { id: 'vc-19', name: 'Chana Masala', category: 'VEG CURRIES', type: 'veg', price: 100 },
  { id: 'vc-20', name: 'Dal Palak', category: 'VEG CURRIES', type: 'veg', price: 120 },

  // NON-VEG CURRIES
  {
    id: 'nvc-1',
    name: 'Chicken Curry',
    category: 'NON-VEG CURRIES',
    type: 'non-veg',
    price: 100,
    priceOptions: [
      { label: 'Small', price: 100 },
      { label: 'Full', price: 170 },
    ],
  },
  { id: 'nvc-2', name: 'Chicken Fry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 200 },
  { id: 'nvc-3', name: 'Butter Chicken', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-4', name: 'Kadai Chicken', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-5', name: 'Andhra Chicken', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-6', name: 'Chicken Kolhapuri', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-7', name: 'Sai Datta Special Chicken Curry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 270, isSpecial: true },
  { id: 'nvc-8', name: 'Chicken Tikka Masala', category: 'NON-VEG CURRIES', type: 'non-veg', price: 240 },
  { id: 'nvc-9', name: 'Handi Chicken', category: 'NON-VEG CURRIES', type: 'non-veg', price: 300 },
  { id: 'nvc-10', name: 'Punjabi Chicken', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-11', name: 'Hyderabadi Chicken', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-12', name: 'Chicken Mughlai', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-13', name: 'Egg Curry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 80 },
  { id: 'nvc-14', name: 'Egg Burji', category: 'NON-VEG CURRIES', type: 'non-veg', price: 80 },
  { id: 'nvc-15', name: 'Egg Burji Curry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 120 },
  { id: 'nvc-16', name: 'Egg Tadka', category: 'NON-VEG CURRIES', type: 'non-veg', price: 120 },
  { id: 'nvc-17', name: 'Egg Masala', category: 'NON-VEG CURRIES', type: 'non-veg', price: 90 },
  { id: 'nvc-18', name: 'Egg Omelette', category: 'NON-VEG CURRIES', type: 'non-veg', price: 60 },
  { id: 'nvc-19', name: 'Egg Fry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 100 },
  { id: 'nvc-20', name: 'Egg Keema Curry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 120 },
  { id: 'nvc-21', name: 'Gravy Fry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 50 },
  { id: 'nvc-22', name: 'Botti Curry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },
  { id: 'nvc-23', name: 'Botti Fry', category: 'NON-VEG CURRIES', type: 'non-veg', price: 220 },

  // BIRYANI
  { id: 'by-1', name: 'Chicken Biryani', category: 'BIRYANI', type: 'non-veg', price: 140 },
  { id: 'by-2', name: 'Chicken Handi Biryani', category: 'BIRYANI', type: 'non-veg', price: 240 },
  { id: 'by-3', name: 'Chicken Biryani Family Pack', category: 'BIRYANI', type: 'non-veg', price: 500 },
  { id: 'by-4', name: 'Fish Biryani', category: 'BIRYANI', type: 'non-veg', price: 170 },
  { id: 'by-5', name: 'Sai Datta Special Chicken Biryani', category: 'BIRYANI', type: 'non-veg', price: 240, isSpecial: true },
  { id: 'by-6', name: 'Panner Biryani', category: 'BIRYANI', type: 'veg', price: 220 },
  { id: 'by-7', name: 'Veg Biryani', category: 'BIRYANI', type: 'veg', price: 130 },
  { id: 'by-8', name: 'Veg Biryani Family Pack', category: 'BIRYANI', type: 'veg', price: 380 },
  { id: 'by-9', name: 'Egg Biryani', category: 'BIRYANI', type: 'non-veg', price: 130 },
  { id: 'by-10', name: 'Handi Biryani', category: 'BIRYANI', type: 'non-veg', price: 240 },

  // FRIED RICE
  {
    id: 'fr-1',
    name: 'Veg Fried Rice',
    category: 'FRIED RICE',
    type: 'veg',
    price: 80,
    priceOptions: [
      { label: 'Small', price: 80 },
      { label: 'Full', price: 150 },
    ],
  },
  {
    id: 'fr-2',
    name: 'Jeera Fried Rice',
    category: 'FRIED RICE',
    type: 'veg',
    price: 80,
    priceOptions: [
      { label: 'Small', price: 80 },
      { label: 'Full', price: 150 },
    ],
  },
  {
    id: 'fr-3',
    name: 'Tomato Rice',
    category: 'FRIED RICE',
    type: 'veg',
    price: 90,
    priceOptions: [
      { label: 'Small', price: 90 },
      { label: 'Full', price: 160 },
    ],
  },
  {
    id: 'fr-4',
    name: 'Masala Rice',
    category: 'FRIED RICE',
    type: 'veg',
    price: 90,
    priceOptions: [
      { label: 'Small', price: 90 },
      { label: 'Full', price: 160 },
    ],
  },
  { id: 'fr-5', name: 'Lemon Rice', category: 'FRIED RICE', type: 'veg', price: 90 },
  {
    id: 'fr-6',
    name: 'Chicken Fried Rice',
    category: 'FRIED RICE',
    type: 'non-veg',
    price: 90,
    priceOptions: [
      { label: 'Small', price: 90 },
      { label: 'Full', price: 160 },
    ],
  },
  {
    id: 'fr-7',
    name: 'Egg Fried Rice',
    category: 'FRIED RICE',
    type: 'non-veg',
    price: 80,
    priceOptions: [
      { label: 'Small', price: 80 },
      { label: 'Full', price: 150 },
    ],
  },
  { id: 'fr-8', name: 'Mix Fried Rice', category: 'FRIED RICE', type: 'non-veg', price: 120 },
  { id: 'fr-9', name: 'Manchurian Fried Rice', category: 'FRIED RICE', type: 'veg', price: 120 },
  { id: 'fr-10', name: 'Curd Rice', category: 'FRIED RICE', type: 'veg', price: 100 },
  {
    id: 'fr-11',
    name: 'Meals',
    category: 'FRIED RICE',
    type: 'veg',
    price: 80,
    priceOptions: [
      { label: 'Small', price: 80 },
      { label: 'Full', price: 100 },
    ],
  },
  { id: 'fr-12', name: 'White Rice', category: 'FRIED RICE', type: 'veg', price: 50 },
  { id: 'fr-13', name: 'Boti Rice', category: 'FRIED RICE', type: 'non-veg', price: 200 },

  // FISH
  {
    id: 'fs-1',
    name: 'Fish Chilli (With Bone)',
    category: 'FISH',
    type: 'non-veg',
    price: 120,
    priceOptions: [
      { label: 'Small', price: 120 },
      { label: 'Large', price: 200 },
    ],
  },
  {
    id: 'fs-2',
    name: 'Fish Roast',
    category: 'FISH',
    type: 'non-veg',
    price: 120,
    priceOptions: [
      { label: 'Small', price: 120 },
      { label: 'Large', price: 200 },
    ],
  },
  {
    id: 'fs-3',
    name: 'Fish Curry',
    category: 'FISH',
    type: 'non-veg',
    price: 120,
    priceOptions: [
      { label: 'Small', price: 120 },
      { label: 'Large', price: 200 },
    ],
  },
  { id: 'fs-4', name: 'Apollo Fish Bone', category: 'FISH', type: 'non-veg', price: 250 },
  { id: 'fs-5', name: 'Apollo Prawns', category: 'FISH', type: 'non-veg', price: 250 },
  { id: 'fs-6', name: 'Prawns Fry', category: 'FISH', type: 'non-veg', price: 250 },
  { id: 'fs-7', name: 'Prawns Masala', category: 'FISH', type: 'non-veg', price: 250 },

  // COOL DRINKS
  { id: 'cd-1', name: 'Thumbs Up', category: 'COOL DRINKS', type: 'beverage', price: 0, priceNote: 'Price available at restaurant' },
  { id: 'cd-2', name: 'Sprite', category: 'COOL DRINKS', type: 'beverage', price: 0, priceNote: 'Price available at restaurant' },
  { id: 'cd-3', name: 'Pulpi Orange', category: 'COOL DRINKS', type: 'beverage', price: 0, priceNote: 'Price available at restaurant' },
  { id: 'cd-4', name: 'Maaza', category: 'COOL DRINKS', type: 'beverage', price: 0, priceNote: 'Price available at restaurant' },
  { id: 'cd-5', name: 'Mineral Water 1 Litre', category: 'COOL DRINKS', type: 'beverage', price: 0, priceNote: 'Price available at restaurant' },
  { id: 'cd-6', name: 'Mineral Water 2 Litre', category: 'COOL DRINKS', type: 'beverage', price: 0, priceNote: 'Price available at restaurant' },
];

export const MENU_ITEMS: MenuItem[] = RAW_MENU_ITEMS.map((item) => ({
  ...item,
  tag: computeItemTag(item),
  tags: computeDefaultTags(item),
}));

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sai Datta Special Hyderabadi Chicken Biryani',
    category: 'BIRYANI',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    aspect: 'large',
    caption: 'Long-grain fragrant basmati rice slow-dum cooked with marinated chicken and royal spices.',
    relatedDish: 'Sai Datta Special Chicken Biryani',
  },
  {
    id: 'gal-2',
    title: 'Crispy Andhra Chicken 65',
    category: 'STARTERS',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Deep-fried chicken pieces tossed in curry leaves, green chillies, and signature spicy masala.',
    relatedDish: 'Chicken 65',
  },
  {
    id: 'gal-3',
    title: 'Rich Butter Chicken in Copper Handi',
    category: 'CURRIES',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'Tender chicken simmered in a velvety tomato-butter gravy finished with fresh cream.',
    relatedDish: 'Butter Chicken',
  },
  {
    id: 'gal-4',
    title: 'Fresh Paneer Tikka Masala',
    category: 'VEG',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
    aspect: 'small',
    caption: 'Char-grilled cottage cheese cubes immersed in a robust onion-tomato masala gravy.',
    relatedDish: 'Paneer Tikka Masala',
  },
  {
    id: 'gal-5',
    title: 'Tandoori Naan & Butter Rotis',
    category: 'BREADS',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Freshly baked in our clay tandoor, brushed generously with melted butter.',
    relatedDish: 'Butter Naan',
  },
  {
    id: 'gal-6',
    title: 'Wok-Tossed Chicken Hakka Noodles',
    category: 'CHINESE',
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'Stir-fried noodles loaded with shredded chicken, crunchy bell peppers, and scallions.',
    relatedDish: 'Chicken Noodles',
  },
  {
    id: 'gal-7',
    title: 'Golden Apollo Fish & Prawns Fry',
    category: 'STARTERS',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'Fresh coastal fish fillets tempered with southern spice blends and golden fried crisp.',
    relatedDish: 'Apollo Fish Bone',
  },
  {
    id: 'gal-8',
    title: 'Clay Handi Biryani Pot',
    category: 'BIRYANI',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Sealed dough dum-cooking locked with aromatic saffron, fried onions, and marinated meat.',
    relatedDish: 'Chicken Handi Biryani',
  },
  {
    id: 'gal-9',
    title: 'Dal Tadka with Desi Ghee Tempering',
    category: 'CURRIES',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    aspect: 'small',
    caption: 'Yellow lentils cooked till creamy, tempered with cumin, whole red chillies, and garlic.',
    relatedDish: 'Dal Tadka',
  },
  {
    id: 'gal-10',
    title: 'Crispy Veg Manchurian & Paneer 65',
    category: 'VEG',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1000&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'Crisp vegetable dumplings in tangy oriental glaze alongside soft paneer 65 bites.',
    relatedDish: 'Paneer 65',
  },
  {
    id: 'gal-11',
    title: 'Schezwan Fried Rice with Veggies',
    category: 'CHINESE',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop',
    aspect: 'small',
    caption: 'High-heat tossed long-grain rice with seasonal vegetables, ginger, garlic, and soya sauce.',
    relatedDish: 'Veg Fried Rice',
  },
  {
    id: 'gal-12',
    title: 'Stuffed Aloo Paratha with White Butter',
    category: 'BREADS',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Golden whole wheat flatbread loaded with spiced mashed potato filling and butter.',
    relatedDish: 'Aloo Stuff Paratha',
  },
  {
    id: 'gal-13',
    title: 'Spicy Chicken Lollipop Roast',
    category: 'STARTERS',
    imageUrl: 'https://images.unsplash.com/photo-1527477378696-6134a413d71c?q=80&w=800&auto=format&fit=crop',
    aspect: 'small',
    caption: 'Frenched chicken winglets tossed in fiery Schezwan-garlic reduction sauce.',
    relatedDish: 'Chicken Lollipop 4 Pc',
  },
  {
    id: 'gal-14',
    title: 'Authentic Hyderabadi Chicken Curry',
    category: 'CURRIES',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop',
    aspect: 'large',
    caption: 'Homestyle Telangana spiced chicken gravy infused with roasted coconut and poppy seeds.',
    relatedDish: 'Hyderabadi Chicken',
  },
  {
    id: 'gal-15',
    title: 'Royal Paneer Biryani with Raita',
    category: 'BIRYANI',
    imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=1000&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'Fragrant basmati layers layered with marinated cottage cheese, mint, and saffron milk.',
    relatedDish: 'Panner Biryani',
  },
  {
    id: 'gal-16',
    title: 'Spicy Chilli Chicken Gravy & Dry',
    category: 'CHINESE',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Crispy fried boneless chicken tossed with slit green chillies, capsicum, and dark soy.',
    relatedDish: 'Chilli Chicken',
  },
];
