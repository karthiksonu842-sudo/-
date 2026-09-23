import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Sparkles,
  X,
  LayoutGrid,
  List,
  ShoppingBag,
  ExternalLink,
  Flame,
  Leaf,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO, computeItemTag } from '../data/restaurantData';
import { MenuCategory, MenuItem } from '../types';
import {
  DISH_IMAGE_REGISTRY,
  CATEGORY_FALLBACK_IMAGES,
  getDishImage,
  getDishImageAlt,
} from '../data/dishImages';
import {
  DietaryFilterState,
  DEFAULT_DIETARY_FILTER,
  filterMenuItems,
  DietaryPreferenceOption,
} from '../data/dietaryUtils';
import { DietaryPreferencesBar } from './DietaryPreferencesBar';
import { MenuCard } from './MenuCard';
import { MenuCardSkeleton } from './MenuCardSkeleton';
import { CategoryVisualGrid } from './CategoryVisualGrid';
import { CategorySpotlightBanner } from './CategorySpotlightBanner';
import { ImageWithSkeleton } from './ImageWithSkeleton';

/**
 * Distinct High-Quality Culinary Placeholder Configuration
 * Used to assign a distinct, high-quality, lazy-loaded placeholder structure with
 * appropriate naming to any dish that lacks a proper dedicated photograph.
 */
export interface DishPlaceholderStructure {
  placeholderUrl: string;
  placeholderName: string;
  altText: string;
  tag: string;
}

export const DISTINCT_DISH_PLACEHOLDERS: Record<string, DishPlaceholderStructure> = {
  SOUPS: {
    placeholderUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Artisanal Steaming Herbal Soup Bouillon',
    altText: 'Rich aromatic steaming herbal soup pot with natural garden garnish',
    tag: 'veg',
  },
  'VEG SNACKS': {
    placeholderUrl:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Golden Crisp Vegetarian Street Fritters',
    altText: 'Crispy spiced vegetarian snack fritters served with vibrant mint dip',
    tag: 'veg',
  },
  'NON-VEG SNACKS': {
    placeholderUrl:
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Sizzling Tandoor Char-Grilled Non-Veg Appetizer',
    altText: 'Spicy flame-roasted non-vegetarian starter platter with grilled lemons',
    tag: 'non-veg',
  },
  NOODLES: {
    placeholderUrl:
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'High-Flame Wok Stir-Fried Hakka Noodles',
    altText: 'Aromatic wok-tossed long wheat noodles seasoned with scallions and garlic',
    tag: 'veg',
  },
  ROTIS: {
    placeholderUrl:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Puffed Clay-Oven Tandoori Flatbread',
    altText: 'Hot clay-oven baked tandoor bread brushed with melted golden butter',
    tag: 'veg',
  },
  'VEG CURRIES': {
    placeholderUrl:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Slow-Simmered Copper Handi Vegetable Curry',
    altText: 'Velvety spiced tomato and onion vegetable curry with fresh coriander',
    tag: 'veg',
  },
  'NON-VEG CURRIES': {
    placeholderUrl:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Traditional Dhaba Spiced Chicken Gravy',
    altText: 'Slow-cooked succulent meat simmered in authentic dhaba masala gravy',
    tag: 'non-veg',
  },
  BIRYANI: {
    placeholderUrl:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Royal Saffron Fragrant Basmati Dum Biryani',
    altText: 'Steaming clay pot Hyderabadi dum biryani garnished with browned onions and mint',
    tag: 'non-veg',
  },
  'FRIED RICE': {
    placeholderUrl:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Wok-Tossed Fragrant Jasmine & Basmati Rice',
    altText: 'Golden wok-tossed fried rice infused with spring onions and oriental seasonings',
    tag: 'veg',
  },
  FISH: {
    placeholderUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Coastal Pan-Seared Spicy Fish Catch',
    altText: 'Fresh coastal catch seared in aromatic red chillies and curry leaves',
    tag: 'seafood',
  },
  'COOL DRINKS': {
    placeholderUrl:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Frosty Condensation-Chilled Beverage Glass',
    altText: 'Refreshing chilled effervescent beverage served with crushed crystal ice',
    tag: 'beverage',
  },
  ALL: {
    placeholderUrl:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    placeholderName: 'Sai Datta Authentic Culinary Specialty',
    altText: 'Authentic royal Indian feast prepared with traditional stone-ground spices',
    tag: 'all',
  },
};

/**
 * Robust Unique Image Mapping Resolver
 * Maps each dish to its proper dedicated photograph, or assigns a distinct,
 * high-quality lazy-loaded placeholder structure if the dish currently lacks one.
 */
export function resolveDishImageMapping(item: MenuItem): {
  src: string;
  fallbackSrc: string;
  placeholderName: string;
  altText: string;
  isPlaceholder: boolean;
  tag: string;
} {
  const customPhoto = item.image;
  const registryPhoto = DISH_IMAGE_REGISTRY[item.id];
  const hasProperPhoto = Boolean(customPhoto || (registryPhoto && registryPhoto.length > 0));

  const placeholder =
    DISTINCT_DISH_PLACEHOLDERS[item.category] || DISTINCT_DISH_PLACEHOLDERS.ALL;

  const src = customPhoto || registryPhoto || placeholder.placeholderUrl;
  const tag = item.tag || computeItemTag(item);

  return {
    src,
    fallbackSrc: placeholder.placeholderUrl,
    placeholderName: `${item.name} - ${placeholder.placeholderName}`,
    altText: `${item.name} (${item.category}, ${tag}) at Sai Datta Restaurant`,
    isPlaceholder: !hasProperPhoto,
    tag,
  };
}

interface MenuSectionProps {
  selectedCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
}

const INITIAL_VISIBLE_COUNT = 24;

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryPreferences, setDietaryPreferences] =
    useState<DietaryFilterState>(DEFAULT_DIETARY_FILTER);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Reset visibleCount whenever category, search, or filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [selectedCategory, searchQuery, dietaryPreferences]);

  const handleCategorySelect = (category: MenuCategory) => {
    if (category === selectedCategory) return;
    setIsTransitioning(true);
    onSelectCategory(category);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 220);
  };

  const handleDietaryPreferencesChange = (newFilters: DietaryFilterState) => {
    setIsTransitioning(true);
    setDietaryPreferences(newFilters);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  // Real-time counts for the Dietary Preferences Toggle based on 'type', 'tag', and 'tags' properties
  const dietaryCounts = useMemo(() => {
    const baseItems = MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.trim().toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesTag = item.tag ? item.tag.toLowerCase().includes(q) : false;
        const matchesDesc = item.description ? item.description.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesCat && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });

    const vegCount = baseItems.filter(
      (item) => item.type === 'veg' || item.tag === 'veg' || (item.tags && item.tags.includes('veg'))
    ).length;

    const nonVegCount = baseItems.filter(
      (item) =>
        item.type === 'non-veg' ||
        item.tag === 'non-veg' ||
        item.tag === 'egg' ||
        item.tag === 'seafood' ||
        (item.tags && item.tags.includes('non-veg'))
    ).length;

    const spicyCount = baseItems.filter(
      (item) =>
        item.tag === 'spicy' ||
        (item.tags && (item.tags.includes('spicy') || item.tags.includes('extra-spicy'))) ||
        item.spiceLevel === 'spicy' ||
        item.spiceLevel === 'extra-spicy'
    ).length;

    return {
      all: baseItems.length,
      veg: vegCount,
      nonVeg: nonVegCount,
      spicy: spicyCount,
    };
  }, [selectedCategory, searchQuery]);

  const activeToggle: DietaryPreferenceOption = dietaryPreferences.preferenceToggle || 'all';

  const handleTogglePreference = (option: DietaryPreferenceOption) => {
    setIsTransitioning(true);
    const nextToggle = activeToggle === option ? 'all' : option;

    setDietaryPreferences((prev) => ({
      ...prev,
      preferenceToggle: nextToggle,
      dietaryType: nextToggle === 'veg' ? 'veg' : nextToggle === 'non-veg' ? 'non-veg' : 'all',
      spiceLevel: 'all',
    }));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 180);
  };

  // Filtered menu items using dietary preferences, category, and search
  const filteredItems = useMemo(() => {
    return filterMenuItems(
      MENU_ITEMS,
      selectedCategory,
      dietaryPreferences,
      searchQuery
    );
  }, [selectedCategory, dietaryPreferences, searchQuery]);

  // Paginated items mapped with robust unique image resolution and distinct placeholder structure
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount).map((item) => {
      const mapping = resolveDishImageMapping(item);
      return {
        ...item,
        tag: item.tag || mapping.tag,
        image: mapping.src,
      };
    });
  }, [filteredItems, visibleCount]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#2B0709] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-3 shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C928]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase font-cinzel">
              OUR COMPLETE MENU
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Explore the Flavours of Sai Datta
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2.5 max-w-xl mx-auto">
            Browse our rich culinary selection with authentic dish photos and prices. Dine-in, takeaway, and doorstep delivery available.
          </p>
        </div>

        {/* Online Food Delivery Banner (Swiggy & Zomato) */}
        <div className="max-w-3xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#3B0E12] via-[#2A080B] to-[#1E0507] border border-[#F4C928]/35 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left w-full lg:w-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FC8019] via-[#E23744] to-[#F4C928] flex items-center justify-center shrink-0 shadow-md">
              <ShoppingBag className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F4C928]">
                  DOORSTEP DELIVERY
                </span>
                <span className="text-[10px] font-semibold bg-[#FC8019]/20 text-[#FFB17A] px-2 py-0.5 rounded-full border border-[#FC8019]/30">
                  Swiggy
                </span>
                <span className="text-[10px] font-semibold bg-[#E23744]/20 text-[#FFA0A8] px-2 py-0.5 rounded-full border border-[#E23744]/30">
                  Zomato
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white mt-0.5">
                Order Online on Swiggy or Zomato
              </h3>
              <p className="text-xs text-neutral-300 leading-snug">
                Enjoy hot biryanis, starters & curries delivered fast across Patancheru, Muthangi & NH 65.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={RESTAURANT_INFO.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="menu-swiggy-order-cta"
              title="Order Sai Datta Restaurant online on Swiggy"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FC8019] to-[#E26E0E] hover:brightness-110 active:scale-95 text-white text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#FC8019]/25 border border-white/20"
            >
              <span>SWIGGY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={RESTAURANT_INFO.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="menu-zomato-order-cta"
              title="Order Sai Datta Restaurant online on Zomato"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E23744] to-[#CB202D] hover:brightness-110 active:scale-95 text-white text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#E23744]/25 border border-white/20"
            >
              <span>ZOMATO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search Bar & Global Dietary Preferences Controls */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-[#F4C928] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken, paneer, biryani, soups, curries..."
              className="w-full bg-[#380b0e] border border-[#F4C928]/35 rounded-full pl-12 pr-10 py-3.5 text-sm sm:text-base text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#F4C928] focus:ring-2 focus:ring-[#F4C928]/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Preferences Toggle (Veg / Non-Veg / Spicy) */}
          <div
            id="dietary-preferences-toggle-panel"
            className="bg-gradient-to-r from-[#380B0E]/95 via-[#29070A]/95 to-[#380B0E]/95 border border-[#F4C928]/35 rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#4A0F12] border border-[#F4C928]/40 flex items-center justify-center text-[#F4C928]">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C928] font-cinzel">
                    Dietary Preferences
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Filter menu dishes in real-time by dietary properties & tags
                  </p>
                </div>
              </div>

              {activeToggle !== 'all' && (
                <button
                  type="button"
                  id="reset-dietary-toggle"
                  onClick={() => handleTogglePreference('all')}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 hover:text-white bg-[#4A0F12] hover:bg-[#5E1418] px-2.5 py-1 rounded-full border border-[#F4C928]/30 transition-all shadow-sm active:scale-95"
                  title="Clear active dietary filter"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            {/* Real-time Toggle Buttons (All, Veg, Non-Veg, Spicy) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* All Items */}
              <button
                type="button"
                id="dietary-pref-all"
                onClick={() => handleTogglePreference('all')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeToggle === 'all'
                    ? 'bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] ring-2 ring-[#F4C928]/60 font-extrabold shadow-md'
                    : 'bg-[#240507] text-neutral-300 hover:text-white hover:bg-[#34070a] border border-[#F4C928]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>All</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    activeToggle === 'all'
                      ? 'bg-[#2B0709]/20 text-[#2B0709]'
                      : 'bg-[#3A0A0E] text-neutral-400'
                  }`}
                >
                  {dietaryCounts.all}
                </span>
              </button>

              {/* Veg (filters by type === 'veg' and tags contains 'veg') */}
              <button
                type="button"
                id="dietary-pref-veg"
                onClick={() => handleTogglePreference('veg')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeToggle === 'veg'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-300/70 font-extrabold shadow-lg shadow-emerald-950/60'
                    : 'bg-[#240507] text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 border border-emerald-500/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm border border-emerald-500 flex items-center justify-center p-0.5 bg-emerald-950/40 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span>Veg</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    activeToggle === 'veg'
                      ? 'bg-emerald-800 text-emerald-100'
                      : 'bg-[#3A0A0E] text-emerald-400/80'
                  }`}
                >
                  {dietaryCounts.veg}
                </span>
              </button>

              {/* Non-Veg (filters by type === 'non-veg' and tags contains 'non-veg') */}
              <button
                type="button"
                id="dietary-pref-non-veg"
                onClick={() => handleTogglePreference('non-veg')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeToggle === 'non-veg'
                    ? 'bg-red-600 text-white ring-2 ring-red-300/70 font-extrabold shadow-lg shadow-red-950/60'
                    : 'bg-[#240507] text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm border border-red-500 flex items-center justify-center p-0.5 bg-red-950/40 shrink-0">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-red-400" />
                  </div>
                  <span>Non-Veg</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    activeToggle === 'non-veg'
                      ? 'bg-red-800 text-red-100'
                      : 'bg-[#3A0A0E] text-red-400/80'
                  }`}
                >
                  {dietaryCounts.nonVeg}
                </span>
              </button>

              {/* Spicy (filters by tags contains 'spicy' or spiceLevel spicy/extra-spicy) */}
              <button
                type="button"
                id="dietary-pref-spicy"
                onClick={() => handleTogglePreference('spicy')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeToggle === 'spicy'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white ring-2 ring-orange-300/70 font-extrabold shadow-lg shadow-orange-950/60'
                    : 'bg-[#240507] text-orange-400 hover:text-orange-300 hover:bg-orange-950/30 border border-orange-500/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/40 shrink-0" />
                  <span>Spicy</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    activeToggle === 'spicy'
                      ? 'bg-orange-900 text-orange-100'
                      : 'bg-[#3A0A0E] text-orange-400/80'
                  }`}
                >
                  {dietaryCounts.spicy}
                </span>
              </button>
            </div>
          </div>

          {/* Detailed Dietary Preferences & Heat Levels Accordion Bar */}
          <DietaryPreferencesBar
            filters={dietaryPreferences}
            onChange={handleDietaryPreferencesChange}
            totalMatching={filteredItems.length}
            totalItems={MENU_ITEMS.length}
          />
        </div>

        {/* Visual Category Cards Carousel with Lazy-Loaded Placeholder Images & Skeletons */}
        <CategoryVisualGrid
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Category Horizontal Scroll / Quick Text Tabs */}
        <div className="mb-8 overflow-x-auto pb-3 scrollbar-none touch-pan-x">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-max px-2 justify-start lg:justify-center">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  id={`cat-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`min-h-[40px] px-4 py-2.5 rounded-full text-xs sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap touch-manipulation active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] shadow-lg ring-2 ring-[#F4C928]/40 scale-102 sm:scale-105'
                      : 'bg-[#3b0d10] text-[#FFF4D6] hover:bg-[#4d1115] border border-[#F4C928]/25 hover:border-[#F4C928]/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Spotlight Feature Banner with High-Quality Lazy-Loaded Imagery */}
        <CategorySpotlightBanner
          category={selectedCategory}
          filteredCount={filteredItems.length}
        />

        {/* Results Info Counter & View Layout Switcher */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 px-1 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span>
              Showing{' '}
              <strong className="text-[#F4C928]">
                {displayedItems.length < filteredItems.length
                  ? `${displayedItems.length} of ${filteredItems.length}`
                  : filteredItems.length}
              </strong>{' '}
              dishes in <span className="text-white font-semibold">{selectedCategory}</span>
            </span>
            {searchQuery && (
              <span className="text-neutral-400">
                • Matching &ldquo;<span className="text-[#FFF4D6]">{searchQuery}</span>&rdquo;
              </span>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-[#380b0e] border border-[#F4C928]/25 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              id="view-mode-grid"
              aria-label="Photo Grid View"
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#F4C928] text-[#2B0709] shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Photo Cards</span>
            </button>
            <button
              onClick={() => setViewMode('compact')}
              id="view-mode-compact"
              aria-label="Compact View"
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all ${
                viewMode === 'compact'
                  ? 'bg-[#F4C928] text-[#2B0709] shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compact</span>
            </button>
          </div>
        </div>

        {/* Menu Grid / List */}
        {isTransitioning ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7'
                : 'grid grid-cols-1 md:grid-cols-2 gap-4'
            }
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <MenuCardSkeleton key={idx} compact={viewMode === 'compact'} />
            ))}
          </div>
        ) : displayedItems.length > 0 ? (
          <>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7'
                  : 'grid grid-cols-1 md:grid-cols-2 gap-4'
              }
            >
              {displayedItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  compact={viewMode === 'compact'}
                />
              ))}
            </div>

            {/* Progressive Loading Controls for Large Menu Sets */}
            {visibleCount < filteredItems.length && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  type="button"
                  id="menu-load-more-btn"
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(filteredItems.length, prev + 24)
                    )
                  }
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] text-xs sm:text-sm font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>LOAD MORE DISHES (+24)</span>
                </button>
                <button
                  type="button"
                  id="menu-show-all-btn"
                  onClick={() => setVisibleCount(filteredItems.length)}
                  className="px-6 py-3 rounded-full bg-[#3b0d10] hover:bg-[#4d1115] border border-[#F4C928]/35 text-[#FFF4D6] hover:text-white text-xs sm:text-sm font-semibold tracking-wider transition-all cursor-pointer"
                >
                  <span>SHOW ALL {filteredItems.length} DISHES</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            id="menu-empty-state"
            className="text-center py-12 px-5 bg-[#380b0e] border border-[#F4C928]/25 rounded-2xl max-w-md mx-auto my-6 shadow-xl overflow-hidden"
          >
            {/* Cinematic High-Quality Food Placeholder with Skeleton */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-2xl overflow-hidden border border-[#F4C928]/35 shadow-lg bg-[#240507]">
              <ImageWithSkeleton
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop"
                alt="Sai Datta Authentic Biryani"
                fallbackSrc="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop"
                loading="lazy"
                containerClassName="w-full h-full"
                imgClassName="w-full h-full object-cover"
                showSkeletonIcon={true}
              />
            </div>

            <div className="w-10 h-10 rounded-full bg-[#2B0709] border border-[#F4C928]/30 flex items-center justify-center mx-auto mb-3 text-[#F4C928]">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#FFF4D6] mb-1">
              No dishes found
            </h3>
            <p className="text-xs text-neutral-400 mb-5 max-w-xs mx-auto">
              No items match &ldquo;{searchQuery || selectedCategory}&rdquo; with current filters. Reset filters to see our full culinary repertoire.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('ALL');
                setDietaryPreferences(DEFAULT_DIETARY_FILTER);
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] text-xs font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
