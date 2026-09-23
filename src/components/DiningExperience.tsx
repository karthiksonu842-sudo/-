import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MenuCategory } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface DiningExperienceProps {
  onSelectCategory: (category: MenuCategory) => void;
}

export const DiningExperience: React.FC<DiningExperienceProps> = ({ onSelectCategory }) => {
  const experiences = [
    {
      title: 'INDIAN FAVOURITES',
      icon: '🍛',
      category: 'VEG SNACKS' as MenuCategory,
      tagline: 'Crispy snacks, roasts, fresh rotis & warm naans',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'RICH CURRIES',
      icon: '🥘',
      category: 'NON-VEG CURRIES' as MenuCategory,
      tagline: 'Slow-simmered chicken, paneer, dal fry & egg gravies',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'AROMATIC BIRYANI',
      icon: '🍚',
      category: 'BIRYANI' as MenuCategory,
      tagline: 'Authentic Hyderabadi basmati biryani & handi pots',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'CHINESE FAVOURITES',
      icon: '🥢',
      category: 'NOODLES' as MenuCategory,
      tagline: 'Wok-tossed noodles, manchurian, fried rice & sizzlers',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const handleCardClick = (cat: MenuCategory) => {
    onSelectCategory(cat);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="py-20 sm:py-24 bg-[#220406] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C928]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase">
              CULINARY JOURNEY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Dining Experience
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Explore our curated specialties made fresh with authentic Indian spices.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              onClick={() => handleCardClick(exp.category)}
              className="group cursor-pointer relative h-80 rounded-2xl overflow-hidden border border-[#F4C928]/25 hover:border-[#F4C928] transition-all duration-300 shadow-xl"
            >
              {/* Background Image with Luxury Skeleton */}
              <ImageWithSkeleton
                src={exp.image}
                alt={exp.title}
                containerClassName="absolute inset-0 w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                showSkeletonIcon={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B0709] via-[#2B0709]/70 to-transparent group-hover:via-[#2B0709]/50 transition-colors z-2" />

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <span className="text-3xl mb-2 block">{exp.icon}</span>
                <h3 className="text-lg font-serif font-bold text-[#FFF4D6] group-hover:text-[#F4C928] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                  {exp.tagline}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#F4C928] tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>VIEW DISHES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
