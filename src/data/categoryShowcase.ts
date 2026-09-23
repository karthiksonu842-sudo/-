import { MenuCategory } from '../types';

export interface CategoryShowcaseInfo {
  category: MenuCategory;
  name: string;
  badge: string;
  image: string;
  fallbackImage: string;
  itemCount: number;
  description: string;
  highlights: string[];
}

export const CATEGORY_SHOWCASE: Record<MenuCategory, CategoryShowcaseInfo> = {
  ALL: {
    category: 'ALL',
    name: 'All Specialties',
    badge: '120+ DELICACIES',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    itemCount: 124,
    description:
      'A royal culinary repertoire spanning fragrant dum biryanis, sizzling tandoori starters, slow-simmered rich curries, and freshly baked breads.',
    highlights: ['Basmati Dum Biryani', 'Chicken 65', 'Butter Chicken', 'Tandoori Roti'],
  },
  BIRYANI: {
    category: 'BIRYANI',
    name: 'Hyderabadi Biryani',
    badge: 'SIGNATURE DUM',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    itemCount: 10,
    description:
      'Aromatic long-grain basmati rice layered with tender, marinated meats and royal spices, slow-cooked in traditional handi pots.',
    highlights: ['Chicken Dum Biryani', 'Handi Biryani', 'Family Packs', 'Paneer Biryani'],
  },
  'NON-VEG CURRIES': {
    category: 'NON-VEG CURRIES',
    name: 'Non-Veg Curries',
    badge: 'RICH GRAVIES',
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop',
    itemCount: 23,
    description:
      'Velvety butter chicken, spicy Andhra chicken curry, Mughlai korma, and homestyle egg masalas simmered with freshly roasted spices.',
    highlights: ['Butter Chicken', 'Andhra Chicken', 'Kadai Chicken', 'Egg Curry'],
  },
  'VEG CURRIES': {
    category: 'VEG CURRIES',
    name: 'Vegetarian Curries',
    badge: 'HOMESTYLE & RICH',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
    itemCount: 20,
    description:
      'Tempered Dal Tadka, creamy Paneer Butter Masala, Palak Paneer, and seasonal Kadai vegetables crafted with pure ghee and whole spices.',
    highlights: ['Dal Tadka', 'Paneer Butter Masala', 'Palak Paneer', 'Kaju Paneer'],
  },
  'NON-VEG SNACKS': {
    category: 'NON-VEG SNACKS',
    name: 'Non-Veg Starters',
    badge: 'SIZZLING CRUNCH',
    image:
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1527477378696-6134a413d71c?q=80&w=800&auto=format&fit=crop',
    itemCount: 19,
    description:
      'Crispy Chicken 65, juicy fried chicken lollipops, spiced chicken drumsticks, and peppery starters tossed with curry leaves and green chillies.',
    highlights: ['Chicken 65', 'Chicken Lollipop', 'Chicken Majestic', 'Chilli Chicken'],
  },
  'VEG SNACKS': {
    category: 'VEG SNACKS',
    name: 'Veg Starters',
    badge: 'CRISPY & FRESH',
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop',
    itemCount: 8,
    description:
      'Golden Paneer 65, Indo-Chinese Veg Manchurian, crispy Gobi 65, and savory fries prepared with vibrant aromatic seasonings.',
    highlights: ['Paneer 65', 'Veg Manchurian', 'Gobi 65', 'Finger Chips'],
  },
  ROTIS: {
    category: 'ROTIS',
    name: 'Tandoori Breads',
    badge: 'CLAY OVEN BAKED',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
    itemCount: 8,
    description:
      'Fire-baked in traditional tandoor ovens: piping-hot butter naans, soft tandoori rotis, flaky kulchas, and stuffed parathas.',
    highlights: ['Butter Naan', 'Tandoori Roti', 'Butter Kulcha', 'Aloo Paratha'],
  },
  NOODLES: {
    category: 'NOODLES',
    name: 'Wok Noodles',
    badge: 'INDO-CHINESE',
    image:
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=800&auto=format&fit=crop',
    itemCount: 5,
    description:
      'High-heat wok-tossed Hakka noodles with crunchy garden juliennes, shredded chicken, eggs, and authentic dark soy reductions.',
    highlights: ['Chicken Noodles', 'Egg Noodles', 'Veg Hakka', 'Manchurian Noodles'],
  },
  'FRIED RICE': {
    category: 'FRIED RICE',
    name: 'Fried Rice & Meals',
    badge: 'WOK TOSSED',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop',
    itemCount: 13,
    description:
      'Fragrant rice tossed with farm eggs, chicken, jeera, and herbs, served hot alongside traditional South Indian curd rice and full meals.',
    highlights: ['Chicken Fried Rice', 'Jeera Rice', 'Tomato Rice', 'Complete Meals'],
  },
  FISH: {
    category: 'FISH',
    name: 'Seafood & Fish',
    badge: 'COASTAL CATCH',
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=800&auto=format&fit=crop',
    itemCount: 7,
    description:
      'Fresh river and coastal fish spiced with red chili masala, Apollo fish roasts, and butter-garlic tossed prawns cooked to perfection.',
    highlights: ['Apollo Fish', 'Fish Chilli', 'Fish Roast', 'Masala Prawns'],
  },
  SOUPS: {
    category: 'SOUPS',
    name: 'Steaming Soups',
    badge: 'WARM BROTHS',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=800&auto=format&fit=crop',
    itemCount: 5,
    description:
      'Piping hot broths enriched with sweet corn, garden herbs, cracked black pepper, and tender chicken shreds for the perfect appetizer.',
    highlights: ['Chicken Hot & Sour', 'Veg Sweet Corn', 'Chicken Corn', 'Tomato Soup'],
  },
  'COOL DRINKS': {
    category: 'COOL DRINKS',
    name: 'Chilled Refreshments',
    badge: 'ICE COLD',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
    fallbackImage:
      'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=800&auto=format&fit=crop',
    itemCount: 6,
    description:
      'Ice-cold carbonated sodas, mango pulps, citrus beverages, and packaged mineral water to complement fiery Indian gravies.',
    highlights: ['Thums Up', 'Sprite', 'Maaza', 'Mineral Water'],
  },
};
