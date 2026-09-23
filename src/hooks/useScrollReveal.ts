import { useRef, useEffect, useState, useMemo } from 'react';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  distance?: number;
  duration?: number; // ms
  delay?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  throttleMs?: number;
  debounceMs?: number;
}

/**
 * Custom hook for lightweight, throttled & debounced scroll-reveal animations.
 * Provides ref and animation state (opacity, transform, transition)
 * using a throttled and debounced IntersectionObserver to eliminate UI lag during rapid scrolling.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.08,
  rootMargin = '60px 0px -40px 0px',
  once = true,
  distance = 24,
  duration = 600,
  delay = 0,
  direction = 'up',
  throttleMs = 50,
  debounceMs = 40,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Fallback for browsers/environments without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    let rafId: number | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;
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
            // Safe unobserve
          }
        }

        // Clear will-change after transition completes
        const totalMs = duration + delay + 100;
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
          if (isMounted) {
            setIsTransitioning(false);
          }
        }, totalMs);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          if (once && hasTriggeredRef.current) return;

          if (debounceTimer) clearTimeout(debounceTimer);

          const now = performance.now();
          const elapsed = lastTriggerTime === 0 ? Infinity : now - lastTriggerTime;

          if (lastTriggerTime === 0) {
            executeReveal();
            return;
          }

          if (elapsed < throttleMs) {
            const delayTime = Math.max(debounceMs, throttleMs - elapsed);
            debounceTimer = setTimeout(executeReveal, delayTime);
          } else {
            debounceTimer = setTimeout(executeReveal, debounceMs);
          }
        } else if (!once) {
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
      if (timerId) clearTimeout(timerId);
    };
  }, [threshold, rootMargin, once, duration, delay, throttleMs, debounceMs]);

  const transform = useMemo(() => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      default:
        return 'translate3d(0, 0, 0)';
    }
  }, [isVisible, direction, distance]);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    WebkitTransform: transform,
    transform,
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isTransitioning ? 'opacity, transform' : 'auto',
  };

  return { ref, isVisible, style };
}

export default useScrollReveal;
