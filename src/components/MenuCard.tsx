import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, Phone, ShoppingBag, Flame, Leaf } from 'lucide-react';
import { MenuItem, SpiceLevel } from '../types';
import {
  getDishImage,
  getDishImageAlt,
  CATEGORY_FALLBACK_IMAGES,
} from '../data/dishImages';
import { getDishSpiceLevel, SPICE_LEVEL_DETAILS } from '../data/dietaryUtils';
import { Image } from './ui/Image';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MenuCardProps {
  item: MenuItem;
  compact?: boolean;
}

export interface SpiceLevelVisualProps {
  spice: SpiceLevel;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
}

export const SpiceLevelVisual: React.FC<SpiceLevelVisualProps> = ({
  spice,
  size = 'md',
  showDescription = false,
}) => {
  const details = SPICE_LEVEL_DETAILS[spice];

  // Distinct visual icons & styling for each level
  const renderIcon = () => {
    switch (spice) {
      case 'mild':
        return (
          <span className="flex items-center justify-center text-emerald-400" aria-hidden="true">
            <Leaf
              className={`${
                size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
              } fill-emerald-400/20`}
            />
          </span>
        );
      case 'medium':
        return (
          <span className="flex items-center justify-center text-amber-400" aria-hidden="true">
            <Flame
              className={`${
                size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'
              } fill-amber-400/40`}
            />
          </span>
        );
      case 'spicy':
        return (
          <span className="flex items-center -space-x-1" aria-hidden="true">
            <Flame
              className={`${
                size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'
              } text-orange-400 fill-orange-400/40`}
            />
            <Flame
              className={`${
                size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'
              } text-red-500 fill-red-500/50`}
            />
          </span>
        );
      case 'extra-spicy':
        return (
          <span className="flex items-center -space-x-1.5" aria-hidden="true">
            <Flame
              className={`${
                size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'
              } text-orange-400 fill-orange-400/50`}
            />
            <Flame
              className={`${
                size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4.5 h-4.5' : 'w-3.5 h-3.5'
              } text-red-500 fill-red-500 animate-pulse`}
            />
            <Flame
              className={`${
                size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'
              } text-rose-500 fill-rose-500/50`}
            />
          </span>
        );
    }
  };

  const totalPips = spice === 'extra-spicy' ? 4 : 3;
  const activePips = details.levelNumber;

  const getPipColor = (active: boolean) => {
    if (!active) return 'bg-white/20';
    switch (spice) {
      case 'mild':
        return 'bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]';
      case 'medium':
        return 'bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.6)]';
      case 'spicy':
        return 'bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.7)]';
      case 'extra-spicy':
        return 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.9)]';
    }
  };

  const getBadgeStyle = () => {
    switch (spice) {
      case 'mild':
        return 'bg-emerald-950/75 border-emerald-500/40 text-emerald-300';
      case 'medium':
        return 'bg-amber-950/75 border-amber-500/40 text-amber-300';
      case 'spicy':
        return 'bg-orange-950/75 border-orange-500/45 text-orange-300 shadow-sm shadow-orange-500/15';
      case 'extra-spicy':
        return 'bg-rose-950/80 border-rose-500/60 text-rose-300 shadow-sm shadow-rose-500/25 ring-1 ring-rose-500/30';
    }
  };

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${getBadgeStyle()}`}
        title={`${details.label}: ${details.description}`}
        aria-label={`Spice level: ${details.label}`}
      >
        {renderIcon()}
        <span>{details.label}</span>
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-md ${getBadgeStyle()}`}
        title={`${details.label}: ${details.description}`}
      >
        <div className="flex items-center gap-1.5">
          {renderIcon()}
          <span className="font-bold tracking-wider uppercase">{details.label}</span>
        </div>

        {/* Heat Meter Pips */}
        <div className="flex items-center gap-1 pl-1.5 border-l border-white/20" aria-hidden="true">
          {Array.from({ length: totalPips }).map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${getPipColor(idx < activePips)}`}
            />
          ))}
        </div>

        {showDescription && (
          <span className="text-neutral-300 text-[11px] font-normal pl-1.5 border-l border-white/15">
            {details.description}
          </span>
        )}
      </div>
    );
  }

  // Medium (standard grid card)
  return (
    <span
      className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider shadow-xs ${getBadgeStyle()}`}
      title={`${details.label}: ${details.description}`}
      aria-label={`Spice level: ${details.label}`}
    >
      {renderIcon()}
      <span className="uppercase">{details.label}</span>
      {/* Mini Heat Pips */}
      <span className="flex items-center gap-0.5 ml-0.5" aria-hidden="true">
        {Array.from({ length: totalPips }).map((_, idx) => (
          <span
            key={idx}
            className={`w-1 h-1 rounded-full ${getPipColor(idx < activePips)}`}
          />
        ))}
      </span>
    </span>
  );
};

export const MenuCard: React.FC<MenuCardProps> = React.memo(function MenuCard({
  item,
  compact = false,
}) {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    if (!isPreviewOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  const currentPrice = item.priceOptions
    ? item.priceOptions[selectedOption]?.price
    : item.price;

  const currentSizeLabel = item.priceOptions
    ? item.priceOptions[selectedOption]?.label
    : undefined;

  const imageUrl = item.image || getDishImage(item);
  const imageAlt = getDishImageAlt(item);
  const fallbackSrc =
    CATEGORY_FALLBACK_IMAGES[item.category] ||
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop';
  const spice = getDishSpiceLevel(item);
  const spiceDetails = SPICE_LEVEL_DETAILS[spice];

  const modalPreview = isPreviewOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`preview-modal-title-${item.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsPreviewOpen(false)}
    >
      <div
        className="relative w-full max-w-xl bg-[#2B0709] border border-[#F4C928]/40 rounded-2xl overflow-hidden shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsPreviewOpen(false)}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-[#4A0F12] border border-[#F4C928]/40 text-[#FFF4D6] hover:text-[#F4C928] transition-colors"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High-res Photo Container */}
        <div className="relative h-72 sm:h-96 w-full bg-[#1e0507]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fallbackSrc={fallbackSrc}
            containerClassName="w-full h-full"
            imgClassName="w-full h-full object-cover"
            showSkeletonIcon={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B0709] via-transparent to-black/40 pointer-events-none z-2" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border shadow-md backdrop-blur-md ${
                item.type === 'veg'
                  ? 'border-emerald-500/60 bg-[#190305]/85 text-emerald-400'
                  : item.type === 'non-veg'
                  ? 'border-red-500/60 bg-[#190305]/85 text-red-400'
                  : 'border-amber-500/60 bg-[#190305]/85 text-amber-400'
              }`}
            >
              {item.type === 'veg' ? 'VEGETARIAN' : item.type === 'non-veg' ? 'NON-VEG' : 'DRINK'}
            </span>

            {item.isSpecial && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F4C928] text-[#2B0709] text-xs font-extrabold uppercase shadow">
                <Sparkles className="w-3.5 h-3.5" />
                SIGNATURE
              </span>
            )}
          </div>
        </div>

        {/* Modal Info Footer */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-300/80 font-cinzel tracking-wider block mb-1">
                {item.category}
              </span>
              <h2
                id={`preview-modal-title-${item.id}`}
                className="text-xl sm:text-2xl font-serif font-bold text-[#FFF4D6]"
              >
                {item.name}
              </h2>
            </div>
            <div className="text-right shrink-0">
              {item.priceNote ? (
                <span className="text-xs text-neutral-400 italic block">{item.priceNote}</span>
              ) : (
                <span className="text-2xl font-serif font-bold text-[#F4C928] block">
                  ₹{currentPrice}
                </span>
              )}
              {currentSizeLabel && (
                <span className="text-xs text-neutral-400 block font-sans">({currentSizeLabel})</span>
              )}
            </div>
          </div>

          {/* Spice and Characteristics Row */}
          <div className="flex items-center gap-2.5 flex-wrap pt-1">
            <SpiceLevelVisual spice={spice} size="lg" showDescription={true} />
            <span className="text-xs text-neutral-400 italic">
              Authentic recipe cooked fresh on order
            </span>
          </div>

          {item.description && (
            <p className="text-sm text-neutral-300 leading-relaxed border-t border-[#F4C928]/15 pt-3">
              {item.description}
            </p>
          )}

          {/* Call / Swiggy Order CTA in preview */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#F4C928]/15">
            <span className="text-xs text-neutral-400">
              Serving NH 65, Muthangi, Hyderabad
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={RESTAURANT_INFO.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Order ${item.name} online on Swiggy`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#FC8019] to-[#E26E0E] hover:brightness-110 active:scale-95 text-white text-xs font-bold tracking-wider transition-all shadow border border-white/20"
              >
                <ShoppingBag className="w-3.5 h-3.5 fill-white/20" />
                <span>SWIGGY</span>
              </a>
              <a
                href={RESTAURANT_INFO.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Order ${item.name} online on Zomato`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#E23744] to-[#CB202D] hover:brightness-110 active:scale-95 text-white text-xs font-bold tracking-wider transition-all shadow border border-white/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>ZOMATO</span>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F4C928] hover:bg-[#E5B81B] text-[#2B0709] text-xs font-bold tracking-wider transition-colors shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (compact) {
    return (
      <>
        <div
          id={`menu-item-${item.id}`}
          className="menu-card-item group bg-[#33080b] hover:bg-[#3d0b0f] border border-[#F4C928]/25 hover:border-[#F4C928]/70 rounded-xl p-3.5 shadow-md hover:shadow-xl hover:shadow-[#F4C928]/10 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out transform-gpu flex items-center justify-between gap-3.5"
        >
          {/* Left: Thumbnail image with professional skeleton and zoom cue */}
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-[#240507] border border-[#F4C928]/20 group/img focus:outline-none focus:ring-1 focus:ring-[#F4C928] cursor-pointer text-left"
            title={`View photo of ${item.name}`}
            aria-label={`View photo of ${item.name}`}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fallbackSrc={fallbackSrc}
              containerClassName="w-full h-full"
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              showSkeletonIcon={false}
            />
            <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
              <span
                className={`w-2.5 h-2.5 rounded-full inline-block ring-2 ring-black/80 ${
                  item.type === 'veg'
                    ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                    : item.type === 'non-veg'
                    ? 'bg-red-500 shadow-sm shadow-red-500/50'
                    : 'bg-amber-400 shadow-sm shadow-amber-400/50'
                }`}
              />
            </div>
            {/* Zoom hint on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10">
              <Maximize2 className="w-4 h-4 text-[#F4C928]" />
            </div>
          </button>

          {/* Center: Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="text-[10px] uppercase font-bold text-amber-300/80 font-cinzel tracking-wider">
                {item.category}
              </span>
              {item.isSpecial && (
                <span className="text-[9px] font-extrabold text-[#2B0709] bg-[#F4C928] px-1.5 rounded">
                  SPECIAL
                </span>
              )}
              <SpiceLevelVisual spice={spice} size="sm" />
            </div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#FFF4D6] group-hover:text-[#F4C928] transition-colors truncate">
              {item.name}
            </h3>
            <div className="mt-1 flex items-baseline gap-2">
              {item.priceNote ? (
                <span className="text-xs text-neutral-400 italic">{item.priceNote}</span>
              ) : (
                <>
                  <span className="text-sm font-bold text-[#F4C928]">₹{currentPrice}</span>
                  {currentSizeLabel && (
                    <span className="text-[10px] text-neutral-400">({currentSizeLabel})</span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Badge Display */}
          <div className="text-right shrink-0 flex flex-col items-end gap-1">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/30 text-[#FFF4D6]">
              {item.type === 'veg' ? 'Veg' : item.type === 'non-veg' ? 'Non-Veg' : 'Drink'}
            </span>
          </div>
        </div>
        {modalPreview}
      </>
    );
  }

  return (
    <>
      <div
        id={`menu-item-${item.id}`}
        className="menu-card-item group bg-[#33080b] hover:bg-[#3d0b0f] border border-[#F4C928]/25 hover:border-[#F4C928]/70 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#F4C928]/15 hover:-translate-y-1.5 hover:scale-[1.015] transition-all duration-300 ease-out transform-gpu flex flex-col justify-between"
      >
        <div>
          {/* Photo Container with Fluid Skeleton and Interactive Zoom */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#240507] group/photo">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="w-full h-full text-left relative focus:outline-none focus:ring-2 focus:ring-[#F4C928] cursor-pointer"
              title={`Click to preview full photo of ${item.name}`}
              aria-label={`Preview full image for ${item.name}`}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fallbackSrc={fallbackSrc}
                containerClassName="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                showSkeletonIcon={true}
              />

              {/* Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#33080b] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-2" />

              {/* Hover Zoom Cue Icon */}
              <span className="absolute bottom-3 right-3 z-10 p-1.5 rounded-full bg-[#190305]/80 border border-[#F4C928]/40 text-[#F4C928] opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 backdrop-blur-xs shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Top Overlaid Badges */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
              {/* Veg / Non-Veg / Drink Indicator */}
              {item.type === 'veg' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/60 bg-[#190305]/85 backdrop-blur-md text-[10px] font-bold text-emerald-400 tracking-wider shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
                  VEG
                </span>
              ) : item.type === 'non-veg' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-red-500/60 bg-[#190305]/85 backdrop-blur-md text-[10px] font-bold text-red-400 tracking-wider shadow">
                  <span className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-red-500/30" />
                  NON-VEG
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-500/60 bg-[#190305]/85 backdrop-blur-md text-[10px] font-bold text-amber-400 tracking-wider shadow">
                  <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
                  DRINK
                </span>
              )}

              {/* Special Badge or Category Tag */}
              {item.isSpecial ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] text-[10px] font-extrabold tracking-wider uppercase shadow">
                  <Sparkles className="w-3 h-3" />
                  SPECIAL
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/90 bg-[#190305]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#F4C928]/30 font-cinzel shadow">
                  {item.category}
                </span>
              )}
            </div>
          </div>

          {/* Content Container */}
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              {/* Dish Name */}
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#FFF4D6] group-hover:text-[#F4C928] transition-colors leading-snug">
                {item.name}
              </h3>

              {/* Spice Heat Pill with distinct visual icons */}
              <SpiceLevelVisual spice={spice} size="md" />
            </div>

            {/* Description only if present */}
            {item.description && (
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        </div>

        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          {/* Size Selector for Small / Full / Large options */}
          {item.priceOptions && item.priceOptions.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3 bg-[#240507] p-1 rounded-lg border border-[#F4C928]/20">
              {item.priceOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedOption(idx)}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded transition-all ${
                    selectedOption === idx
                      ? 'bg-[#F4C928] text-[#2B0709] shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {opt.label}: ₹{opt.price}
                </button>
              ))}
            </div>
          )}

          {/* Price Row */}
          <div className="pt-3 border-t border-[#F4C928]/15 flex items-center justify-between">
            <div>
              {item.priceNote ? (
                <span className="text-xs font-semibold text-neutral-300 italic">
                  {item.priceNote}
                </span>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-serif font-bold text-white tracking-tight">
                    ₹{currentPrice}
                  </span>
                  {currentSizeLabel && (
                    <span className="text-[11px] text-[#F4C928] font-medium">({currentSizeLabel})</span>
                  )}
                </div>
              )}
            </div>

            <span className="text-[11px] text-neutral-400 font-medium italic">
              Freshly prepared
            </span>
          </div>
        </div>
      </div>
      {modalPreview}
    </>
  );
});
