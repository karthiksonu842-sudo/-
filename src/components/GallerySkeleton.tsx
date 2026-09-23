import React from 'react';
import { Camera } from 'lucide-react';

export const GallerySkeleton: React.FC = () => {
  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#200406] text-white relative border-t border-[#F4C928]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-3 shadow">
            <Camera className="w-3.5 h-3.5 text-[#F4C928]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase font-cinzel">
              CULINARY GALLERY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            A Feast for the Eyes
          </h2>
          <div className="h-4 w-72 bg-[#4A0F12]/60 rounded-full mx-auto mt-3 animate-pulse" />
        </div>

        {/* Category filter pills skeleton */}
        <div className="mb-8 flex items-center gap-2.5 justify-center overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 rounded-full bg-[#33080b] border border-[#F4C928]/20 animate-pulse shrink-0"
            />
          ))}
        </div>

        {/* Grid skeleton with luxury shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className={`rounded-2xl overflow-hidden border border-[#F4C928]/20 bg-[#2B0709] shadow-xl animate-luxury-shimmer ${
                idx % 3 === 0 ? 'h-80 sm:h-96' : 'h-64 sm:h-72'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySkeleton;
