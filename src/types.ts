export type DietaryType = 'veg' | 'non-veg' | 'beverage';
export type SpiceLevel = 'mild' | 'medium' | 'spicy' | 'extra-spicy';

export type MenuCategory =
  | 'ALL'
  | 'SOUPS'
  | 'VEG SNACKS'
  | 'NON-VEG SNACKS'
  | 'NOODLES'
  | 'ROTIS'
  | 'VEG CURRIES'
  | 'NON-VEG CURRIES'
  | 'BIRYANI'
  | 'FRIED RICE'
  | 'FISH'
  | 'COOL DRINKS';

export interface PriceOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  type: DietaryType;
  price: number; // base price or starting price
  priceOptions?: PriceOption[]; // for small / full / large
  priceNote?: string; // e.g., "Price available at restaurant"
  description?: string;
  isSpecial?: boolean;
  image?: string;
  spiceLevel?: SpiceLevel;
  tags?: string[];
  tag?: string; // Dietary filtering tag for flexible future filtering
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  sizeLabel?: string;
  quantity: number;
  type: DietaryType;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'BIRYANI' | 'STARTERS' | 'CURRIES' | 'VEG' | 'BREADS' | 'CHINESE';
  imageUrl: string;
  aspect?: 'square' | 'small' | 'wide' | 'tall' | 'large';
  caption?: string;
  relatedDish?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes?: string;
}
