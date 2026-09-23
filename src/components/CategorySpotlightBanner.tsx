import React from 'react';
import { Sparkles, Utensils, Award } from 'lucide-react';
import { MenuCategory } from '../types';
import { CATEGORY_SHOWCASE } from '../data/categoryShowcase';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface CategorySpotlightBannerProps {
  category: MenuCategory;
  filteredCount: number;
}

export const CategorySpotlightBanner: React.FC<CategorySpotlightBannerProps> = ({
  category,
  filteredCount,
}) => {
  const showcase = CATEGORY_SHOWCASE[category] || CATEGORY_SHOWCASE.ALL;

  return (
    <div
      id="category-spotlight-banner"
      className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-r from-[#3B0E12] via-[#2A080B] to-[#1E0507] border border-[#F4C928]/30 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Left Side: Cinematic High-Quality Lazy-Loaded Image with Skeleton */}
        <div className="relative md:col-span-4 lg:col-span-5 min-h-[190px] sm:min-h-[220px] md:min-h-[240px] bg-[#1a0305] overflow-hidden">
          <ImageWithSkeleton
            src={showcase.image}
            alt={`${showcase.name} culinary presentation`}
            fallbackSrc={showcase.fallbackImage}
            loading="lazy"
            containerClassName="w-full h-full"
            imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            showSkeletonIcon={true}
          />
          {/* Subtle Golden Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#2A080B]/40 via-transparent to-[#2A080B] pointer-events-none z-2" />

          {/* Floating Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#190305]/85 border border-[#F4C928]/40 text-[#F4C928] text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-xs shadow-md">
              <Award className="w-3 h-3 text-[#F4C928]" />
              <span>{showcase.badge}</span>
            </span>
          </div>
        </div>

        {/* Right Side: Category Information & Culinary Notes */}
        <div className="md:col-span-8 lg:col-span-7 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4C928] font-cinzel">
                CATEGORY SPOTLIGHT
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#4A0F12] border border-[#F4C928]/25 text-[#FFF4D6] font-semibold">
                {filteredCount} {filteredCount === 1 ? 'Dish' : 'Dishes'} Available
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#FFF4D6] tracking-tight mb-2">
              {showcase.name}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl mb-4">
              {showcase.description}
            </p>
          </div>

          {/* Culinary Highlights Chips */}
          <div className="pt-3 border-t border-[#F4C928]/15 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1 mr-1">
              <Utensils className="w-3 h-3 text-[#F4C928]" />
              Highlights:
            </span>
            {showcase.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#35090C] border border-[#F4C928]/20 text-[#FFF4D6] hover:border-[#F4C928]/50 transition-colors"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
