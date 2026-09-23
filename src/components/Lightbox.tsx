import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  Utensils,
  Maximize2,
  Minimize2,
  Share2,
  MessageCircle,
  Instagram,
  Facebook,
  ShoppingBag,
} from 'lucide-react';
import { GalleryItem } from '../types';
import { ShareModal } from './ShareModal';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  onExploreMenuDish?: (dishName: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
  onExploreMenuDish,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  // Reset zoom & loaded state on item change
  useEffect(() => {
    setIsZoomed(false);
    setIsLoaded(false);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === ' ' || e.key === 'Enter') {
        // Toggle zoom
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onPrev, onNext]);

  // Auto-scroll thumbnail strip to keep active thumbnail in view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentIndex]);

  if (!item) return null;

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe threshold 45px
    if (diff > 45) {
      onNext();
    } else if (diff < -45) {
      onPrev();
    }
    setTouchStartX(null);
  };

  return (
    <div
      id="gallery-lightbox"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl text-white transition-opacity duration-300 select-none"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls Header */}
      <div className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-[#F4C928]/20 bg-[#2B0709]/80 backdrop-blur-md">
        {/* Left: Counter & Category */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 text-xs font-semibold text-[#F4C928]">
            <Tag className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{item.category}</span>
          </div>

          <span className="text-xs sm:text-sm font-medium text-neutral-400">
            <strong className="text-[#FFF4D6]">{currentIndex + 1}</strong> of{' '}
            <span className="text-neutral-400">{items.length}</span>
          </span>
        </div>

        {/* Right: Actions (Share, Zoom, Close) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            id="lightbox-share-btn"
            aria-label="Share Dish"
            title="Share on WhatsApp, Instagram, Facebook"
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-[#380b0e] hover:bg-[#4d1115] border border-[#F4C928]/40 text-[#F4C928] hover:text-[#FFF4D6] transition-all flex items-center gap-1.5 text-xs font-bold shadow-md active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">SHARE</span>
          </button>

          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            id="lightbox-zoom-btn"
            aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
            className="p-2 sm:p-2.5 rounded-full bg-[#380b0e] hover:bg-[#4d1115] border border-[#F4C928]/30 text-neutral-300 hover:text-white transition-all"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
          >
            {isZoomed ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            id="lightbox-close-btn"
            aria-label="Close Lightbox"
            className="p-2 sm:p-2.5 rounded-full bg-[#4A0F12] hover:bg-[#681519] border border-[#F4C928]/50 text-white hover:text-[#F4C928] transition-all hover:rotate-90 duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Previous Navigation Button */}
        <button
          onClick={onPrev}
          id="lightbox-prev-btn"
          aria-label="Previous Image"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-[#2B0709]/80 hover:bg-[#4A0F12] border border-[#F4C928]/40 text-white hover:text-[#F4C928] hover:scale-110 active:scale-95 transition-all shadow-2xl"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={onNext}
          id="lightbox-next-btn"
          aria-label="Next Image"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-[#2B0709]/80 hover:bg-[#4A0F12] border border-[#F4C928]/40 text-white hover:text-[#F4C928] hover:scale-110 active:scale-95 transition-all shadow-2xl"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Image Container */}
        <div
          className={`relative max-w-5xl w-full flex items-center justify-center transition-all duration-300 ${
            isZoomed ? 'scale-110 sm:scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed((prev) => !prev)}
        >
          {/* Skeleton Spinner while high-res image loads */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-3 border-[#F4C928]/30 border-t-[#F4C928] animate-spin" />
            </div>
          )}

          <img
            key={item.id}
            src={item.imageUrl}
            alt={item.title}
            onLoad={() => setIsLoaded(true)}
            className={`max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-xl border border-[#F4C928]/40 shadow-2xl transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      {/* Bottom Info & Thumbnail Strip */}
      <div className="relative z-50 border-t border-[#F4C928]/20 bg-[#2B0709]/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
          {/* Title & Caption */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#FFF4D6] tracking-wide">
              {item.title}
            </h3>
            {item.caption && (
              <p className="text-xs text-neutral-300 mt-0.5 line-clamp-1 max-w-xl">
                {item.caption}
              </p>
            )}
          </div>

          {/* Actions: Social Sharing Strip & Order Button */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-end">
            {/* Quick Social Share Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#1b0305] border border-[#F4C928]/30">
              <button
                type="button"
                onClick={() => {
                  const msg = `Craving authentic food? Check out "${item.title}" at Sai Datta Restaurant, Muthangi, Hyderabad!\n\n${window.location.origin}/#gallery`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                }}
                id="lightbox-quick-whatsapp"
                title="Share to WhatsApp"
                aria-label="Share on WhatsApp"
                className="p-1.5 rounded-full bg-[#1b3824] hover:bg-[#25D366] text-emerald-400 hover:text-black transition-all active:scale-95 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
              </button>

              <button
                type="button"
                onClick={async () => {
                  const msg = `Craving authentic food? Check out "${item.title}" at Sai Datta Restaurant, Muthangi, Hyderabad!\n\n${window.location.origin}/#gallery`;
                  try {
                    await navigator.clipboard.writeText(msg);
                  } catch {
                    // ignore
                  }
                  window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
                }}
                id="lightbox-quick-instagram"
                title="Share to Instagram (Copies link & opens Instagram)"
                aria-label="Share on Instagram"
                className="p-1.5 rounded-full bg-[#3D1429] hover:bg-pink-600 text-pink-300 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const shareUrl = `${window.location.origin}/#gallery`;
                  const msg = `Check out "${item.title}" at Sai Datta Restaurant!`;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                }}
                id="lightbox-quick-facebook"
                title="Share to Facebook"
                aria-label="Share on Facebook"
                className="p-1.5 rounded-full bg-[#132A4A] hover:bg-[#1877F2] text-blue-300 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                id="lightbox-quick-more"
                title="More sharing options"
                aria-label="More share options"
                className="p-1.5 rounded-full bg-[#380b0e] hover:bg-[#4d1015] text-[#F4C928] hover:text-[#FFF4D6] transition-all active:scale-95 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Menu Dish Jump / Swiggy & Zomato Order Link */}
            <div className="flex items-center gap-2">
              <a
                href={RESTAURANT_INFO.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Order on Swiggy"
                className="shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FC8019] to-[#E26E0E] hover:brightness-110 text-white text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 shadow border border-white/20"
              >
                <ShoppingBag className="w-3.5 h-3.5 fill-white/20" />
                <span>SWIGGY</span>
              </a>

              <a
                href={RESTAURANT_INFO.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Order on Zomato"
                className="shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E23744] to-[#CB202D] hover:brightness-110 text-white text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 shadow border border-white/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>ZOMATO</span>
              </a>

              {item.relatedDish && (
                <a
                  href="#menu"
                  onClick={() => {
                    onClose();
                    if (onExploreMenuDish) {
                      onExploreMenuDish(item.relatedDish!);
                    }
                  }}
                  className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#F4C928] hover:bg-[#E5B81B] text-[#2B0709] text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 shadow"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>VIEW ON MENU</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div
          ref={thumbnailsRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-2xl mx-auto justify-start sm:justify-center"
        >
          {items.map((thumb, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={thumb.id}
                onClick={() => onSelectIndex(idx)}
                className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-[#F4C928] scale-105 shadow-md shadow-[#F4C928]/30'
                    : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${thumb.title}`}
              >
                <img
                  src={thumb.imageUrl}
                  alt={thumb.title}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Social Share Modal */}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          data={{
            title: item.title,
            description: item.caption,
            category: item.category,
            imageUrl: item.imageUrl,
            url: `${window.location.origin}/#gallery`,
          }}
        />
      )}
    </div>
  );
};
