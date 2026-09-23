import React from 'react';
import { Sparkles, Utensils, Users, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export const BrandStory: React.FC = () => {
  const highlights = [
    {
      num: '01',
      title: 'Variety',
      icon: Utensils,
      desc: 'A menu with something for different tastes — from rich Hyderabadi curries to sizzled Chinese starters.',
    },
    {
      num: '02',
      title: 'Comfort',
      icon: Users,
      desc: 'A welcoming place for meals with family and friends, celebrating shared moments and good food.',
    },
    {
      num: '03',
      title: 'Flavour',
      icon: Flame,
      desc: 'Classic favourites, aromatic curries, crispy starters, fresh rotis, fragrant rice and signature biryani.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#220406] text-white relative overflow-hidden">
      {/* Decorative Gold Accent Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A0F12]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4C928]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Food & Restaurant Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#F4C928]/30 shadow-2xl group">
              <ImageWithSkeleton
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                alt="Sai Datta Restaurant dining ambiance"
                containerClassName="w-full h-[380px] sm:h-[480px]"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                showSkeletonIcon={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B0709] via-transparent to-transparent opacity-80 pointer-events-none z-2" />

              {/* Floating Badge on Image */}
              <div className="image-floating-badge absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#2B0709]/90 border border-[#F4C928]/40 backdrop-blur-md z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-cinzel text-[#F4C928] tracking-wider block">
                      Dine-in • Takeaway • Family Dining
                    </span>
                    <span className="text-sm font-serif text-white font-medium">
                      Muthangi, Patancheru
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 block">Open Daily</span>
                    <span className="text-xs font-bold text-[#FFF4D6]">{RESTAURANT_INFO.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inset Second Dish Accent */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 h-44 rounded-xl overflow-hidden border-2 border-[#F4C928] shadow-2xl bg-[#4A0F12] z-20">
              <ImageWithSkeleton
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop"
                alt="Signature Chicken Biryani"
                containerClassName="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                showSkeletonIcon={false}
              />
            </div>
          </div>

          {/* Right Column: Editorial Text & Highlights */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C928]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase">
                WELCOME TO SAI DATTA
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FFF4D6] tracking-tight leading-tight mb-6">
              Good Food. Great Company. Memorable Moments.
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8">
              {RESTAURANT_INFO.storyParagraph}
            </p>

            {/* Three Mini Highlights */}
            <div className="space-y-6 pt-2 border-t border-[#F4C928]/20">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.num} className="flex items-start gap-4">
                    <span className="text-lg font-cinzel font-bold text-[#F4C928] shrink-0 w-8">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#F4C928]" />
                        <h3 className="text-base font-serif font-bold text-white tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
