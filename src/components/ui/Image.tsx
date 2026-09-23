import React, { useState, useEffect, useRef } from 'react';
import { Utensils } from 'lucide-react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
  imgClassName?: string;
  showSkeletonIcon?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Custom luxury Image component for Sai Datta Restaurant
 * Integrates Intersection Observer for performant lazy loading
 * and provides fluid skeleton shimmer loading states with fallback resilience.
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
  containerClassName = '',
  imgClassName = '',
  showSkeletonIcon = true,
  rootMargin = '200px',
  threshold = 0,
  loading,
  ...rest
}) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isSkeletonUnmounted, setIsSkeletonUnmounted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for viewport-aware lazy loading
  useEffect(() => {
    // If eager loading or in an environment without IntersectionObserver, mount immediately
    if (
      loading === 'eager' ||
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window)
    ) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, rootMargin, threshold]);

  // When src prop changes, reset state
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      setIsSkeletonUnmounted(true);
    } else {
      setIsLoaded(false);
      setIsSkeletonUnmounted(false);
    }
  }, [src]);

  // Safety fallback: ensure skeleton transitions away if image has already loaded
  useEffect(() => {
    if (!isInView) return;

    const safetyTimer = setTimeout(() => {
      if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
        setIsSkeletonUnmounted(true);
      }
    }, 1200);

    return () => clearTimeout(safetyTimer);
  }, [isInView, currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setIsSkeletonUnmounted(true);
    }, 300);
    return () => clearTimeout(timer);
  };

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setIsLoaded(true);
      setIsSkeletonUnmounted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Skeleton Screen Layer */}
      {!isSkeletonUnmounted && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-0 transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-full h-full animate-luxury-shimmer relative flex items-center justify-center bg-[#250508]">
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,201,40,0.08)_0%,_transparent_70%)] pointer-events-none" />

            {/* Minimalist Centered Icon */}
            {showSkeletonIcon && (
              <div className="relative z-10 flex flex-col items-center justify-center text-[#F4C928]/40">
                <div className="w-8 h-8 rounded-full border border-[#F4C928]/30 bg-[#2B0709]/80 backdrop-blur-xs flex items-center justify-center">
                  <Utensils className="w-4 h-4 text-[#F4C928]/60" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actual Image rendered once intersected */}
      {isInView && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`relative z-10 transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  );
};

export default Image;
