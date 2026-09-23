import React, { useEffect, useState } from 'react';

interface BrandedLoaderProps {
  onComplete?: () => void;
}

export const BrandedLoader: React.FC<BrandedLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(hideTimer);
    }, 900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      id="branded-loader"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2B0709] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#F4C928] font-semibold block mb-2">
          Muthangi • Patancheru • Hyderabad
        </span>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wider text-white font-bold mb-1">
          SAI DATTA
        </h1>
        <p className="text-sm md:text-base font-cinzel text-amber-200/80 tracking-[0.25em] uppercase mb-6">
          RESTAURANT
        </p>

        {/* Animated Gold Shimmer Line */}
        <div className="w-48 h-0.5 bg-neutral-800 mx-auto relative overflow-hidden rounded-full">
          <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#F4C928] to-transparent animate-[shimmer_1.2s_infinite]" />
        </div>
      </div>
    </div>
  );
};
