import React, { useState, useEffect, useRef } from 'react';
import { Utensils } from 'lucide-react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  imgClassName?: string;
  showSkeletonIcon?: boolean;
  fallbackSrc?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  containerClassName = '',
  imgClassName = '',
  showSkeletonIcon = true,
  fallbackSrc = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
  loading = 'lazy',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isSkeletonUnmounted, setIsSkeletonUnmounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // When src prop changes, reset and check if image is already cached/complete
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

  // Safety fallback: ensure skeleton transitions away and image is visible
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
        setIsSkeletonUnmounted(true);
      }
    }, 1500);
    return () => clearTimeout(safetyTimer);
  }, [currentSrc]);

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
    <div className={`relative overflow-hidden ${containerClassName}`}>
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

      {/* Actual Image */}
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
    </div>
  );
};

