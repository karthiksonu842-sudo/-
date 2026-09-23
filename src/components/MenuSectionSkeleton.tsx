import React from 'react';
import { Sparkles } from 'lucide-react';
import { MenuCardSkeleton } from './MenuCardSkeleton';

export const MenuSectionSkeleton: React.FC = () => {
  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#2B0709] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Placeholder */}
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
          <div className="h-4 w-72 bg-[#4A0F12]/60 rounded-full mx-auto mt-3 animate-pulse" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="h-12 w-full bg-[#380b0e] border border-[#F4C928]/25 rounded-full animate-luxury-shimmer" />
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="h-8 w-28 bg-[#4A0F12] rounded-full animate-pulse" />
            <div className="h-8 w-24 bg-[#4A0F12]/70 rounded-full animate-pulse" />
            <div className="h-8 w-28 bg-[#4A0F12]/70 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Visual Category Carousel Skeleton */}
        <div className="mb-8">
          <div className="h-4 w-40 bg-[#4A0F12]/60 rounded mb-3 animate-pulse" />
          <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-48 sm:w-56 shrink-0 rounded-2xl overflow-hidden border border-[#F4C928]/20 bg-[#33080b]"
              >
                <div className="h-28 sm:h-32 w-full animate-luxury-shimmer" />
                <div className="p-3 bg-[#200406] flex items-center justify-between">
                  <div className="h-3.5 w-24 bg-[#4A0F12] rounded animate-pulse" />
                  <div className="h-3 w-10 bg-[#4A0F12]/60 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category horizontal pills skeleton */}
        <div className="mb-8 flex items-center gap-2.5 justify-center overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 rounded-full bg-[#3b0d10] border border-[#F4C928]/20 animate-pulse shrink-0"
            />
          ))}
        </div>

        {/* Category Spotlight Banner Skeleton */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[#F4C928]/20 bg-[#2A080B] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-4 lg:col-span-5 h-48 md:h-56 w-full animate-luxury-shimmer" />
            <div className="md:col-span-8 lg:col-span-7 p-6 space-y-3">
              <div className="h-4 w-28 bg-[#4A0F12] rounded animate-pulse" />
              <div className="h-6 w-56 bg-[#4A0F12] rounded animate-pulse" />
              <div className="h-3.5 w-full bg-[#4A0F12]/60 rounded animate-pulse" />
              <div className="h-3.5 w-4/5 bg-[#4A0F12]/60 rounded animate-pulse" />
              <div className="pt-3 flex gap-2">
                <div className="h-6 w-20 bg-[#4A0F12]/70 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-[#4A0F12]/70 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-[#4A0F12]/70 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* 6 Luxury Menu Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuCardSkeleton key={i} compact={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSectionSkeleton;
