import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let cachedTotalScrollable = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId: number | null = null;

    const measureLayout = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      cachedTotalScrollable = Math.max(0, documentHeight - windowHeight);
    };

    const updateProgress = () => {
      if (cachedTotalScrollable <= 0) {
        measureLayout();
      }

      if (cachedTotalScrollable <= 0) {
        setScrollProgress((prev) => (prev !== 0 ? 0 : prev));
        return;
      }

      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      const rawProgress = Math.min(Math.max((currentScroll / cachedTotalScrollable) * 100, 0), 100);

      // Throttle React state changes to prevent main-thread lag during fast scrolling
      setScrollProgress((prev) => {
        if (rawProgress === 0 || rawProgress === 100 || Math.abs(prev - rawProgress) >= 0.5) {
          return rawProgress;
        }
        return prev;
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measureLayout();
        updateProgress();
      }, 100);
    };

    // Initial setup
    measureLayout();
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      id="scroll-progress-container"
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-transparent"
    >
      {/* Slim Gold Progress Bar Track */}
      <div
        id="scroll-progress-indicator"
        className="h-full relative bg-gradient-to-r from-[#F4C928] via-[#FFE27A] to-[#E5B81B] transition-[width] duration-75 ease-out shadow-[0_0_10px_rgba(244,201,40,0.7)]"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Subtle luminous tip accent at leading edge */}
        {scrollProgress > 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFF4D6] shadow-[0_0_8px_#FFF4D6,0_0_14px_rgba(244,201,40,0.9)] opacity-90" />
        )}
      </div>
    </div>
  );
};

export default ScrollProgressBar;
