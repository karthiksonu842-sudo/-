import React from 'react';
import { Phone, Navigation, ArrowDown, Sparkles, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Cinematic Background Food Imagery & Lighting */}
      <div className="absolute inset-0 z-0">
        <ImageWithSkeleton
          src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1920&auto=format&fit=crop"
          alt="Authentic Hyderabadi Biryani at Sai Datta Restaurant"
          containerClassName="w-full h-full"
          imgClassName="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000"
          showSkeletonIcon={false}
          loading="eager"
        />
        {/* Layered cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B0709] via-[#2B0709]/80 to-[#2B0709]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B0709] via-[#2B0709]/85 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#2B0709]/40 to-[#2B0709] pointer-events-none" />
      </div>

      {/* Decorative Gold Corner Lines */}
      <div className="absolute top-24 left-8 w-24 h-24 border-t border-l border-[#F4C928]/20 hidden lg:block pointer-events-none" />
      <div className="absolute bottom-20 right-8 w-24 h-24 border-b border-r border-[#F4C928]/20 hidden lg:block pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10">
        <div className="max-w-3xl">
          {/* Small Gold Label */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A0F12]/80 border border-[#F4C928]/40 mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4C928]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase">
              {RESTAURANT_INFO.cuisineSubtitle}
            </span>
          </div>

          {/* Restaurant Brand Title */}
          <div className="mb-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08]">
              SAI DATTA
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-cinzel text-[#F4C928] font-normal tracking-[0.25em] mt-1">
                RESTAURANT
              </span>
            </h1>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#FFF4D6] font-medium italic mb-4 leading-tight">
            &ldquo;{RESTAURANT_INFO.tagline}.&rdquo;
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-8 font-sans">
            {RESTAURANT_INFO.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#menu"
              id="hero-explore-menu-btn"
              className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] text-xs sm:text-sm font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-[#F4C928]/20 flex items-center gap-2"
            >
              <span>EXPLORE MENU</span>
              <span className="text-base">→</span>
            </a>

            <a
              href={RESTAURANT_INFO.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-order-swiggy-btn"
              title="Order online from Sai Datta Restaurant on Swiggy (Patancheru, Hyderabad)"
              className="px-5 sm:px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FC8019] to-[#E26E0E] hover:brightness-110 active:scale-95 text-white text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#FC8019]/25 border border-white/20"
            >
              <ShoppingBag className="w-4 h-4 fill-white/20 text-white" />
              <span>SWIGGY</span>
            </a>

            <a
              href={RESTAURANT_INFO.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-order-zomato-btn"
              title="Order online from Sai Datta Restaurant on Zomato"
              className="px-5 sm:px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E23744] to-[#CB202D] hover:brightness-110 active:scale-95 text-white text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#E23744]/25 border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>ZOMATO</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              id="hero-call-now-btn"
              className="px-5 sm:px-7 py-3.5 rounded-full bg-[#4A0F12] hover:bg-[#5f1317] border border-[#F4C928]/50 text-[#FFF4D6] text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#F4C928] fill-current" />
              <span>CALL NOW</span>
            </a>

            <a
              href={RESTAURANT_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-get-directions-btn"
              title={`Get directions to ${RESTAURANT_INFO.address}`}
              className="px-5 sm:px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-[#F4C928]/50 text-neutral-200 hover:text-white text-xs sm:text-sm font-medium tracking-wider transition-all flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#F4C928]" />
              <span>GET DIRECTIONS</span>
            </a>
          </div>

          {/* Location & Time Tag */}
          <div className="mt-8 flex items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Today: {RESTAURANT_INFO.hours}
            </span>
            <span className="text-neutral-600">•</span>
            <span>Muthangi, Patancheru</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <a
          href="#quick-info"
          className="pointer-events-auto flex flex-col items-center gap-1 text-[11px] font-semibold tracking-[0.2em] text-neutral-400 hover:text-[#F4C928] transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#F4C928] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
