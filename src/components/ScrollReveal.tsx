import React, { useRef, useEffect, useState, useMemo } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number; // seconds
  duration?: number; // seconds
  distance?: number; // pixels
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
  as?: 'div' | 'section' | 'article' | 'span';
  throttleMs?: number; // ms to throttle rapid repeated events
  debounceMs?: number; // ms to debounce rapid scrolling past elements
}

/**
 * High-performance, throttled & debounced ScrollReveal component.
 * - Debounces and throttles intersection observer triggers to prevent UI lag during rapid scrolling
 * - Uses requestAnimationFrame batching for smooth 60/120fps compositor updates
 * - Automatically unobserves & disconnects once visible to release CPU resources
 * - Cleans up GPU will-change after transition completes to preserve VRAM
 * - Respects prefers-reduced-motion
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  duration = 0.6,
  distance = 24,
  direction = 'up',
  threshold = 0.08,
  once = true,
  rootMargin = '60px 0px -40px 0px',
  as = 'div',
  throttleMs = 50,
  debounceMs = 40,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Graceful fallback for environments/browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    let rafId: number | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let transitionTimer: ReturnType<typeof setTimeout> | null = null;
    let lastTriggerTime = 0;
    let isMounted = true;

    const executeReveal = () => {
      if (!isMounted) return;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!isMounted) return;
        lastTriggerTime = performance.now();
        hasTriggeredRef.current = true;
        setIsVisible(true);
        setIsTransitioning(true);

        if (once && node) {
          try {
            observer.unobserve(node);
            observer.disconnect();
          } catch {
            // Ignore unobserve errors on teardown
          }
        }

        // Clean up will-change after the transition ends to release GPU memory
        const totalDurationMs = (duration + delay) * 1000 + 100;
        if (transitionTimer) clearTimeout(transitionTimer);
        transitionTimer = setTimeout(() => {
          if (isMounted) {
            setIsTransitioning(false);
          }
        }, totalDurationMs);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          if (once && hasTriggeredRef.current) return;

          // Clear any pending exit debounce
          if (debounceTimer) clearTimeout(debounceTimer);

          const now = performance.now();
          const elapsed = lastTriggerTime === 0 ? Infinity : now - lastTriggerTime;

          // If it's the very first trigger (e.g. above-the-fold on load), reveal immediately via rAF
          if (lastTriggerTime === 0) {
            executeReveal();
            return;
          }

          if (elapsed < throttleMs) {
            // Throttled: schedule execution once throttle window has passed
            const delayTime = Math.max(debounceMs, throttleMs - elapsed);
            debounceTimer = setTimeout(executeReveal, delayTime);
          } else {
            // Debounce trigger so rapid scroll-by doesn't churn layout/re-renders
            debounceTimer = setTimeout(executeReveal, debounceMs);
          }
        } else if (!once) {
          // If the element exits view and once is false, debounce the exit transition
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              if (isMounted) {
                setIsVisible(false);
                setIsTransitioning(false);
              }
            });
          }, debounceMs);
        } else {
          // If rapid scrolling scrolled past the element before debounce elapsed, cancel pending trigger
          if (!hasTriggeredRef.current && debounceTimer) {
            clearTimeout(debounceTimer);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      isMounted = false;
      try {
        observer.disconnect();
      } catch {
        // Safe disconnect
      }
      if (debounceTimer) clearTimeout(debounceTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (transitionTimer) clearTimeout(transitionTimer);
    };
  }, [threshold, rootMargin, once, duration, delay, throttleMs, debounceMs]);

  // Compute transform offsets
  const transformStyle = useMemo(() => {
    if (isVisible) {
      return 'translate3d(0, 0, 0)';
    }

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  }, [isVisible, direction, distance]);

  const Component = (as || 'div') as React.ElementType;

  return (
    <Component
      ref={elementRef}
      id={id}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        WebkitTransform: transformStyle,
        transform: transformStyle,
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isTransitioning ? 'opacity, transform' : 'auto',
      }}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
