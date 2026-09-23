import React from 'react';
import { Sparkles, Compass, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export const FoodStoryParallax: React.FC = () => {
  return (
    <section id="story-parallax" className="food-story-parallax relative min-h-[480px] sm:min-h-[550px] flex items-center justify-center overflow-hidden border-y border-[#F4C928]/30">
      {/* Background Image with skeleton and layered overlays */}
      <div className="absolute inset-0">
        <ImageWithSkeleton
          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1920&auto=format&fit=crop"
          alt="Sai Datta aromatic basmati biryani and spices"
          containerClassName="w-full h-full"
          imgClassName="w-full h-full object-cover object-center"
          showSkeletonIcon={false}
        />
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B0709] via-transparent to-[#2B0709] pointer-events-none" />
        <div className="absolute inset-0 bg-[#4A0F12]/40 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B0709]/80 border border-[#F4C928]/40 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F4C928]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#F4C928] uppercase">
            THE SAI DATTA PROMISE
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FFF4D6] tracking-tight leading-tight mb-5">
          A TABLE FULL OF FLAVOUR.
        </h2>

        <p className="text-base sm:text-xl text-neutral-200 font-sans max-w-2xl mx-auto leading-relaxed mb-8">
          From aromatic biryanis to comforting curries, discover authentic flavours worth coming back for.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#menu"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] text-xs sm:text-sm font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>EXPLORE FULL MENU</span>
          </a>

          <a
            href={RESTAURANT_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-black/50 hover:bg-black/70 border border-white/30 hover:border-[#F4C928] text-white text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <Compass className="w-4 h-4 text-[#F4C928]" />
            <span>MUTHANGI LOCATION</span>
          </a>
        </div>
      </div>
    </section>
  );
};
