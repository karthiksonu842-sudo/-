import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { MenuCategory } from '../types';
import { MENU_CATEGORIES } from '../data/restaurantData';
import { CATEGORY_SHOWCASE } from '../data/categoryShowcase';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface CategoryVisualGridProps {
  selectedCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
}

export const CategoryVisualGrid: React.FC<CategoryVisualGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-8">
      {/* Category Scroll Header with Nav Arrows */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold text-[#F4C928] tracking-widest font-cinzel">
            Visual Category Browser
          </span>
          <span className="text-[10px] text-neutral-400 hidden sm:inline">
            (Select a category to view dishes)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full bg-[#380b0e] hover:bg-[#4d1115] border border-[#F4C928]/25 text-[#FFF4D6] hover:text-[#F4C928] transition-colors cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full bg-[#380b0e] hover:bg-[#4d1115] border border-[#F4C928]/25 text-[#FFF4D6] hover:text-[#F4C928] transition-colors cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none scroll-smooth px-1"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {MENU_CATEGORIES.map((cat) => {
          const info = CATEGORY_SHOWCASE[cat] || CATEGORY_SHOWCASE.ALL;
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              id={`cat-card-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              style={{ scrollSnapAlign: 'start' }}
              className={`group relative w-48 sm:w-56 shrink-0 rounded-2xl overflow-hidden text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F4C928] cursor-pointer ${
                isActive
                  ? 'border-2 border-[#F4C928] ring-2 ring-[#F4C928]/40 shadow-xl shadow-[#F4C928]/15 scale-[1.02]'
                  : 'border border-[#F4C928]/25 hover:border-[#F4C928]/60 bg-[#33080b] hover:scale-[1.01]'
              }`}
            >
              {/* Lazy-Loaded High-Quality Category Placeholder Image with Skeleton */}
              <div className="relative h-28 sm:h-32 w-full bg-[#1e0507] overflow-hidden">
                <ImageWithSkeleton
                  src={info.image}
                  alt={info.name}
                  fallbackSrc={info.fallbackImage}
                  loading="lazy"
                  containerClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  showSkeletonIcon={true}
                />

                {/* Dark Vignette Overlay for Text Legibility */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#200406] via-[#200406]/40 to-transparent transition-opacity ${
                    isActive ? 'opacity-90' : 'opacity-80 group-hover:opacity-70'
                  }`}
                />

                {/* Top Category Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span
                    className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow backdrop-blur-xs ${
                      isActive
                        ? 'bg-[#F4C928] text-[#2B0709]'
                        : 'bg-[#190305]/80 text-[#FFF4D6] border border-[#F4C928]/30'
                    }`}
                  >
                    {info.badge}
                  </span>
                </div>

                {/* Active Sparkle Tag */}
                {isActive && (
                  <div className="absolute top-2.5 right-2.5 z-10 p-1 rounded-full bg-[#F4C928] text-[#2B0709] shadow">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Bottom Card Label Info */}
              <div className="p-3 bg-gradient-to-b from-[#2B0709] to-[#1E0507]">
                <div className="flex items-center justify-between gap-1.5">
                  <h4
                    className={`text-xs sm:text-sm font-serif font-bold tracking-tight truncate ${
                      isActive
                        ? 'text-[#F4C928]'
                        : 'text-[#FFF4D6] group-hover:text-[#F4C928] transition-colors'
                    }`}
                  >
                    {info.name}
                  </h4>
                  <span className="text-[10px] text-neutral-400 shrink-0 font-sans">
                    {info.itemCount} {info.itemCount === 1 ? 'dish' : 'dishes'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
