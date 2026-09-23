import React, { useState } from 'react';
import { Sparkles, Phone, Share2, MessageCircle } from 'lucide-react';
import { SIGNATURE_PICKS, RESTAURANT_INFO } from '../data/restaurantData';
import { getDishImage, getDishImageAlt, CATEGORY_FALLBACK_IMAGES } from '../data/dishImages';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { ShareModal, ShareData } from './ShareModal';

export const SignatureDishes: React.FC = () => {
  const [activeShareData, setActiveShareData] = useState<ShareData | null>(null);

  const handleOpenShare = (data: ShareData) => {
    setActiveShareData(data);
  };

  const handleCloseShare = () => {
    setActiveShareData(null);
  };

  const handleQuickWhatsApp = (item: typeof SIGNATURE_PICKS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#specials`;
    const msg = `Craving authentic food? Check out "${item.name}" (${item.category}) for ₹${item.price} at Sai Datta Restaurant, Muthangi, Hyderabad!\n\nView details: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="specials" className="py-20 sm:py-24 bg-[#2B0709] relative overflow-hidden border-y border-[#F4C928]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C928]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase">
                HOUSE SPECIALITIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Signature Picks
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Authentic house recipes perfected by our kitchen, featuring our most celebrated dishes.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              type="button"
              id="share-specials-section-btn"
              onClick={() =>
                handleOpenShare({
                  title: 'Sai Datta Restaurant — Signature House Specialities',
                  description: 'Authentic Hyderabadi Biryanis, sizzling starters, and chef special curries at Muthangi, NH 65.',
                  category: 'Specials Menu',
                  url: `${window.location.origin}/#specials`,
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#380b0e] hover:bg-[#4a0f12] text-[#F4C928] hover:text-[#FFF4D6] border border-[#F4C928]/35 text-xs font-bold tracking-wider transition-all active:scale-95 shadow-sm"
              title="Share specials on WhatsApp, Instagram, Facebook"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE SPECIALS</span>
            </button>

            <a
              href="#menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#F4C928] hover:text-[#FFF4D6] transition-colors group"
            >
              <span>EXPLORE FULL MENU</span>
              <span className="text-lg group-hover:translate-x-1.5 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Signature Dishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIGNATURE_PICKS.map((item) => {
            const dishImage = item.image || getDishImage(item);
            return (
              <div
                key={item.id}
                id={`signature-card-${item.id}`}
                className="group relative bg-[#380b0e] border border-[#F4C928]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#F4C928] transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Luxury Skeleton */}
                <div className="relative h-64 overflow-hidden bg-black/40">
                  <ImageWithSkeleton
                    src={dishImage}
                    alt={getDishImageAlt(item)}
                    fallbackSrc={CATEGORY_FALLBACK_IMAGES[item.category]}
                    containerClassName="w-full h-full"
                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    showSkeletonIcon={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#380b0e] via-transparent to-black/30 pointer-events-none z-2" />

                  {/* Non-Veg Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 border border-red-500/60 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                        NON-VEG
                      </span>
                    </span>
                  </div>

                  {/* Top Right Actions: Chef's Special & Floating Share Button */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#F4C928] text-[#2B0709] text-[10px] font-black uppercase tracking-wider shadow-md">
                      CHEF'S SPECIAL
                    </span>
                    <button
                      type="button"
                      id={`share-float-${item.id}`}
                      onClick={() =>
                        handleOpenShare({
                          title: item.name,
                          description: item.description,
                          category: item.category,
                          price: item.price,
                          imageUrl: dishImage,
                          url: `${window.location.origin}/#specials`,
                        })
                      }
                      title={`Share ${item.name} on WhatsApp, Instagram, Facebook`}
                      aria-label={`Share ${item.name}`}
                      className="p-1.5 rounded-full bg-[#2B0709]/85 hover:bg-[#4A0F12] text-[#F4C928] hover:text-white border border-[#F4C928]/40 shadow-lg hover:scale-110 active:scale-95 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold tracking-widest text-[#F4C928] uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#FFF4D6] group-hover:text-[#F4C928] transition-colors mb-2">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price and Call/Inquire / Share Row */}
                  <div className="pt-4 border-t border-[#F4C928]/20 flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <span className="text-xs text-neutral-400 block font-sans">Price</span>
                      <span className="text-2xl font-serif font-bold text-white tracking-tight">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* One-touch WhatsApp Quick Share */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickWhatsApp(item, e)}
                        id={`whatsapp-share-${item.id}`}
                        title="Share directly to WhatsApp"
                        aria-label="Share on WhatsApp"
                        className="p-2 rounded-full bg-[#1b3824] hover:bg-[#25D366] text-emerald-400 hover:text-black border border-emerald-500/40 transition-all active:scale-95 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      </button>

                      {/* Full Share Sheet Trigger (WhatsApp, Instagram, Facebook, Copy) */}
                      <button
                        type="button"
                        id={`share-btn-card-${item.id}`}
                        onClick={() =>
                          handleOpenShare({
                            title: item.name,
                            description: item.description,
                            category: item.category,
                            price: item.price,
                            imageUrl: dishImage,
                            url: `${window.location.origin}/#specials`,
                          })
                        }
                        title="Share on WhatsApp, Instagram, Facebook"
                        aria-label="Share options"
                        className="p-2 rounded-full bg-[#380b0e] hover:bg-[#4d1015] text-[#F4C928] hover:text-[#FFF4D6] border border-[#F4C928]/35 transition-all active:scale-95 shadow-sm"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                        id={`order-signature-${item.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#4A0F12] hover:bg-[#F4C928] text-[#FFF4D6] hover:text-[#2B0709] border border-[#F4C928]/40 text-xs font-bold tracking-wider transition-all active:scale-95 shadow"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>ORDER</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share Modal Dialog */}
      {activeShareData && (
        <ShareModal
          isOpen={!!activeShareData}
          onClose={handleCloseShare}
          data={activeShareData}
        />
      )}
    </section>
  );
};
