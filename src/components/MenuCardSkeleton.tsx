import React from 'react';

interface MenuCardSkeletonProps {
  compact?: boolean;
}

export const MenuCardSkeleton: React.FC<MenuCardSkeletonProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-[#33080b] border border-[#F4C928]/20 rounded-xl p-3.5 shadow-md flex items-center justify-between gap-3.5 animate-pulse">
        {/* Thumbnail skeleton */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 animate-luxury-shimmer" />

        {/* Content skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-3 w-16 bg-[#4A0F12] rounded" />
          <div className="h-4 w-3/4 bg-[#4A0F12] rounded" />
          <div className="h-3.5 w-1/3 bg-[#4A0F12]/70 rounded" />
        </div>

        {/* Tag skeleton */}
        <div className="h-6 w-14 bg-[#4A0F12] rounded-full shrink-0" />
      </div>
    );
  }

  return (
    <div className="bg-[#33080b] border border-[#F4C928]/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
      <div>
        {/* Image skeleton with luxury shimmer */}
        <div className="h-44 sm:h-52 w-full animate-luxury-shimmer relative">
          <div className="absolute top-3 left-3 h-5 w-16 bg-[#2B0709]/60 rounded-full border border-[#F4C928]/20" />
          <div className="absolute top-3 right-3 h-5 w-14 bg-[#2B0709]/60 rounded-full border border-[#F4C928]/20" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="h-5 w-4/5 bg-[#4A0F12] rounded animate-pulse" />
          <div className="h-3.5 w-full bg-[#4A0F12]/60 rounded animate-pulse" />
          <div className="h-3.5 w-2/3 bg-[#4A0F12]/40 rounded animate-pulse" />
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="pt-3 border-t border-[#F4C928]/15 flex items-center justify-between">
          <div className="h-6 w-16 bg-[#4A0F12] rounded animate-pulse" />
          <div className="h-4 w-20 bg-[#4A0F12]/50 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
