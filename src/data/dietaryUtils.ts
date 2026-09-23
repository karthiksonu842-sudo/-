import { MenuItem, SpiceLevel, MenuCategory } from '../types';

export type DietaryPreferenceOption = 'all' | 'veg' | 'non-veg' | 'spicy';

export interface DietaryFilterState {
  dietaryType: 'all' | 'veg' | 'non-veg' | 'beverage';
  spiceLevel: 'all' | SpiceLevel;
  onlySpecials: boolean;
  preferenceToggle?: DietaryPreferenceOption;
}

export const DEFAULT_DIETARY_FILTER: DietaryFilterState = {
  dietaryType: 'all',
  spiceLevel: 'all',
  onlySpecials: false,
  preferenceToggle: 'all',
};

export const SPICE_LEVEL_DETAILS: Record<
  SpiceLevel,
  {
    label: string;
    levelNumber: number;
    description: string;
    iconEmoji: string;
    badgeColor: string;
    badgeBg: string;
    borderColor: string;
  }
> = {
  mild: {
    label: 'Mild',
    levelNumber: 1,
    description: 'Gentle & kid-friendly seasonings',
    iconEmoji: '🌱',
    badgeColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/15',
    borderColor: 'border-amber-500/35',
  },
  medium: {
    label: 'Medium',
    levelNumber: 2,
    description: 'Balanced classic Indian masala heat',
    iconEmoji: '🌶️',
    badgeColor: 'text-orange-400',
    badgeBg: 'bg-orange-500/15',
    borderColor: 'border-orange-500/35',
  },
  spicy: {
    label: 'Spicy',
    levelNumber: 3,
    description: 'Authentic Hyderabadi & Andhra kick',
    iconEmoji: '🌶️🌶️',
    badgeColor: 'text-red-400',
    badgeBg: 'bg-red-500/15',
    borderColor: 'border-red-500/35',
  },
  'extra-spicy': {
    label: 'Extra Spicy',
    levelNumber: 4,
    description: 'Intense green chillies & roasted black pepper',
    iconEmoji: '🔥',
    badgeColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/20',
    borderColor: 'border-rose-500/40',
  },
};

/**
 * Returns the spice classification for any dish.
 */
export function getDishSpiceLevel(item: MenuItem): SpiceLevel {
  if (item.spiceLevel) {
    return item.spiceLevel;
  }

  // Drinks are mild
  if (item.category === 'COOL DRINKS' || item.type === 'beverage') {
    return 'mild';
  }

  const name = item.name.toLowerCase();

  // Extra Spicy items
  if (
    name.includes('chilli') ||
    name.includes('schezwan') ||
    name.includes('hot & sour') ||
    name.includes('pepper chicken') ||
    name.includes('special chicken dry') ||
    name.includes('dragon') ||
    name.includes('malaysian')
  ) {
    return 'extra-spicy';
  }

  // Spicy items (Biryani, 65, Majestic, curries with spicy profiles)
  if (
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
    item.category === 'BIRYANI' ||
    item.category === 'NON-VEG CURRIES'
  ) {
    return 'spicy';
  }

  // Mild items (Breads, plain rice, mild soups, finger chips, desserts)
  if (
    item.category === 'ROTIS' ||
    name.includes('tomato soup') ||
    name.includes('veg corn soup') ||
    name.includes('finger chips') ||
    name.includes('green peas') ||
    name.includes('dal fry') ||
    name.includes('boiled egg') ||
    name.includes('plain') ||
    name.includes('jeera') ||
    name.includes('curd') ||
    name.includes('sweet')
  ) {
    return 'mild';
  }

  // Default to Medium for everything else (Manchurian, Chinese Noodles, Fried Rice, Mild Curries)
  return 'medium';
}

/**
 * Filter items by Category, Search Query, and Dietary Preferences
 */
export function filterMenuItems(
  items: MenuItem[],
  selectedCategory: MenuCategory,
  filters: DietaryFilterState,
  searchQuery: string
): MenuItem[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    // 1. Category Filter
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
      return false;
    }

    // 2. Dietary Preference Toggle (Veg / Non-Veg / Spicy) based on 'type', 'tag', and 'tags' properties
    if (filters.preferenceToggle && filters.preferenceToggle !== 'all') {
      if (filters.preferenceToggle === 'veg') {
        const isVeg = item.type === 'veg' || item.tag === 'veg' || (item.tags && item.tags.includes('veg'));
        if (!isVeg) return false;
      } else if (filters.preferenceToggle === 'non-veg') {
        const isNonVeg = item.type === 'non-veg' || item.tag === 'non-veg' || item.tag === 'egg' || item.tag === 'seafood' || (item.tags && item.tags.includes('non-veg'));
        if (!isNonVeg) return false;
      } else if (filters.preferenceToggle === 'spicy') {
        const isSpicy =
          item.tag === 'spicy' ||
          (item.tags && (item.tags.includes('spicy') || item.tags.includes('extra-spicy'))) ||
          item.spiceLevel === 'spicy' ||
          item.spiceLevel === 'extra-spicy' ||
          getDishSpiceLevel(item) === 'spicy' ||
          getDishSpiceLevel(item) === 'extra-spicy';
        if (!isSpicy) return false;
      }
    }

    // 3. Dietary Preference Dropdown / Detail Filter (Veg vs Non-Veg vs Beverage)
    if (filters.dietaryType === 'veg') {
      const isVeg = item.type === 'veg' || item.tag === 'veg' || (item.tags && item.tags.includes('veg'));
      if (!isVeg) return false;
    }
    if (filters.dietaryType === 'non-veg') {
      const isNonVeg = item.type === 'non-veg' || item.tag === 'non-veg' || item.tag === 'egg' || item.tag === 'seafood' || (item.tags && item.tags.includes('non-veg'));
      if (!isNonVeg) return false;
    }
    if (filters.dietaryType === 'beverage' && item.type !== 'beverage' && item.tag !== 'beverage' && item.category !== 'COOL DRINKS') {
      return false;
    }

    // 3. Spice Level Filter
    if (filters.spiceLevel !== 'all') {
      const dishSpice = getDishSpiceLevel(item);
      if (dishSpice !== filters.spiceLevel) {
        return false;
      }
    }

    // 4. Chef's Specials Only
    if (filters.onlySpecials && !item.isSpecial) {
      return false;
    }

    // 5. Search query matching
    if (query !== '') {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesCategory = item.category.toLowerCase().includes(query);
      const matchesDesc = item.description ? item.description.toLowerCase().includes(query) : false;
      if (!matchesName && !matchesCategory && !matchesDesc) {
        return false;
      }
    }

    return true;
  });
}
