import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let cachedHeroHeight = 600;
    let cachedScrollHeight = 3000;
    let rafId: number | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const measureLayout = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        cachedHeroHeight = heroElement.offsetHeight;
      }
      cachedScrollHeight = Math.max(
        1,
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      );
    };

    measureLayout();

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureLayout, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      if (!ticking) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;

          // Toggle visibility only when state changes (past hero banner)
          const shouldBeVisible = scrollTop > cachedHeroHeight - 120;
          setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));

          // Only calculate progress if visible and throttle step to reduce unnecessary React state churn
          if (shouldBeVisible && cachedScrollHeight > 0) {
            const currentPct = Math.min(
              100,
              Math.max(0, Math.round((scrollTop / cachedScrollHeight) * 100))
            );
            setScrollProgress((prev) =>
              Math.abs(prev - currentPct) >= 2 ? currentPct : prev
            );
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  // Circular progress dimensions
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed right-4 sm:right-6 lg:right-8 bottom-20 lg:bottom-8 z-40 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        id="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top of page"
        title="Back to top"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#280608]/90 hover:bg-[#F4C928] text-[#F4C928] hover:text-[#2B0709] backdrop-blur-md border border-[#F4C928]/40 hover:border-[#F4C928] shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_25px_rgba(244,201,40,0.4)] active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F4C928] focus:ring-offset-2 focus:ring-offset-[#2B0709]"
      >
        {/* Circular Scroll Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 52 52"
          aria-hidden="true"
        >
          {/* Subtle background track */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-[#F4C928]/15"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Active progress indicator */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-[#F4C928] group-hover:stroke-[#2B0709] transition-colors duration-300"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Up Arrow Icon with hover upward nudge */}
        <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />

        {/* Floating Tooltip (Desktop only) */}
        <span className="hidden lg:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#1B0305] border border-[#F4C928]/40 text-[#FFF4D6] text-[10px] font-bold tracking-wider uppercase opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg whitespace-nowrap">
          Top
        </span>
      </button>
    </div>
  );
};
