import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Maximize2,
  Eye,
  Filter,
  Layers,
  Share2,
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { Lightbox } from './Lightbox';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { ShareModal, ShareData } from './ShareModal';

const GALLERY_CATEGORIES = [
  'ALL',
  'BIRYANI',
  'STARTERS',
  'CURRIES',
  'CHINESE',
  'VEG',
  'BREADS',
] as const;

interface FoodGalleryProps {
  onExploreMenuDish?: (dishName: string) => void;
}

export const FoodGallery: React.FC<FoodGalleryProps> = ({ onExploreMenuDish }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeShareData, setActiveShareData] = useState<ShareData | null>(null);

  // Category counts for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: GALLERY_ITEMS.length };
    GALLERY_CATEGORIES.forEach((cat) => {
      if (cat !== 'ALL') {
        counts[cat] = GALLERY_ITEMS.filter((item) => item.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Limited curated items filtered by selected category (no infinite cyclical repeating)
  const displayedItems = useMemo(() => {
    if (activeCategory === 'ALL') {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Lightbox handlers
  const currentLightboxItem =
    lightboxIndex !== null && displayedItems[lightboxIndex]
      ? displayedItems[lightboxIndex]
      : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! === 0 ? displayedItems.length - 1 : prev! - 1
      );
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! === displayedItems.length - 1 ? 0 : prev! + 1
      );
    }
  };

  // Helper for bento grid aspect ratio styling
  const getItemSpanClasses = (aspect?: string) => {
    switch (aspect) {
      case 'large':
        return 'md:col-span-2 md:row-span-2 min-h-[360px] md:min-h-[460px]';
      case 'wide':
        return 'md:col-span-2 md:row-span-1 min-h-[220px] md:min-h-[260px]';
      case 'tall':
        return 'md:col-span-1 md:row-span-2 min-h-[360px] md:min-h-[460px]';
      case 'small':
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[220px] md:min-h-[260px]';
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#1f0305] text-white relative">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4A0F12]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C928]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase font-cinzel">
              CULINARY SHOWCASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Interactive Food & Ambiance Gallery
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2.5 max-w-xl mx-auto leading-relaxed">
            A visual feast of our rich Hyderabadi biryanis, sizzled starters, clay-pot curries, and tandoor flatbreads.
          </p>

          <div className="mt-4 flex items-center justify-center">
            <button
              type="button"
              id="share-gallery-section-btn"
              onClick={() =>
                setActiveShareData({
                  title: 'Sai Datta Restaurant — Food & Ambiance Gallery',
                  description: 'Authentic Hyderabadi Biryanis, sizzling starters, and clay pot curries at Muthangi, NH 65.',
                  category: 'Culinary Gallery',
                  url: `${window.location.origin}/#gallery`,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#380b0e] hover:bg-[#4d1015] text-[#F4C928] hover:text-[#FFF4D6] border border-[#F4C928]/35 text-xs font-bold tracking-wider transition-all active:scale-95 shadow-sm"
              title="Share gallery on WhatsApp, Instagram, Facebook"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE GALLERY</span>
            </button>
          </div>
        </div>

        {/* Category Filtering Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  id={`gallery-filter-${cat.toLowerCase()}`}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] shadow-lg shadow-[#F4C928]/20 scale-105'
                      : 'bg-[#33080b] hover:bg-[#470d11] text-[#FFF4D6] border border-[#F4C928]/25 hover:border-[#F4C928]/60'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-[#2B0709] text-[#F4C928]'
                        : 'bg-[#240507] text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Masonry Grid (Large, Small, Tall, Wide Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-auto">
          {displayedItems.map((item, idx) => {
            const spanClasses = getItemSpanClasses(item.aspect);

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                id={`gallery-card-${item.id}`}
                className={`group relative rounded-2xl overflow-hidden border border-[#F4C928]/25 hover:border-[#F4C928] bg-[#2B0709] cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#F4C928]/15 ${spanClasses}`}
              >
                {/* Image Element with Luxury Shimmer Skeleton */}
                <ImageWithSkeleton
                  src={item.imageUrl}
                  alt={item.title}
                  containerClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  showSkeletonIcon={false}
                />

                {/* Aspect Badge (Corner indicator) */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2B0709]/80 backdrop-blur-md border border-[#F4C928]/40 text-[10px] font-bold text-[#F4C928] tracking-widest uppercase shadow">
                    {item.category}
                  </span>
                </div>

                {/* Actions on Top Right: Share & Zoom */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveShareData({
                        title: item.title,
                        description: item.caption,
                        category: item.category,
                        imageUrl: item.imageUrl,
                        url: `${window.location.origin}/#gallery`,
                      });
                    }}
                    id={`gallery-share-card-${idx}`}
                    title={`Share ${item.title} on WhatsApp, Instagram, Facebook`}
                    aria-label={`Share ${item.title}`}
                    className="p-2 rounded-full bg-[#2B0709]/90 hover:bg-[#4A0F12] text-[#F4C928] hover:text-white border border-[#F4C928]/50 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <span
                    title="Click to view full size"
                    className="p-2 rounded-full bg-[#2B0709]/85 text-[#F4C928] border border-[#F4C928]/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Ambient Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d0305] via-transparent to-black/30 opacity-60 group-hover:opacity-85 transition-opacity pointer-events-none z-2" />

                {/* Bottom Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-10">
                  <h3 className="text-sm sm:text-base lg:text-lg font-serif font-bold text-white group-hover:text-[#F4C928] transition-colors leading-snug drop-shadow-md">
                    {item.title}
                  </h3>

                  {item.caption && (
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {item.caption}
                    </p>
                  )}

                  <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-[#F4C928] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Expand</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveShareData({
                          title: item.title,
                          description: item.caption,
                          category: item.category,
                          imageUrl: item.imageUrl,
                          url: `${window.location.origin}/#gallery`,
                        });
                      }}
                      className="flex items-center gap-1 text-[10px] text-[#FFF4D6] hover:text-[#F4C928] bg-[#380b0e]/90 px-2 py-0.5 rounded-full border border-[#F4C928]/30 transition-colors"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Share Dish</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Limited Curated Gallery Showcase Indicator */}
        <div className="mt-12 text-center flex flex-col items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-[#2B0709] border border-[#F4C928]/35 text-xs text-neutral-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#F4C928]" />
            <span>
              Curated collection of{' '}
              <strong className="text-[#FFF4D6] font-semibold">{displayedItems.length}</strong>{' '}
              authentic photos
            </span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-[#F4C928]">Tap any photo for high-definition lightbox</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      <Lightbox
        item={currentLightboxItem}
        items={displayedItems}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
        onExploreMenuDish={onExploreMenuDish}
      />

      {/* Social Media Share Modal */}
      {activeShareData && (
        <ShareModal
          isOpen={!!activeShareData}
          onClose={() => setActiveShareData(null)}
          data={activeShareData}
        />
      )}
    </section>
  );
};

export default FoodGallery;
