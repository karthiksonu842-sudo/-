import React, { useState, useEffect, useRef } from 'react';
import {
  Share2,
  X,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Facebook,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export interface ShareData {
  title: string;
  description?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
  url?: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const shareUrl = data.url || window.location.href;
  const priceText = data.price ? ` for ₹${data.price}` : '';
  const categoryText = data.category ? ` (${data.category})` : '';

  const shareMessage = `Craving authentic food? Check out "${data.title}"${categoryText}${priceText} at Sai Datta Restaurant, Muthangi, Hyderabad!\n\nView details and menu: ${shareUrl}`;

  // Reset copied state on open
  useEffect(() => {
    if (isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramShare = async () => {
    // Copy the caption & link for easy pasting into Instagram Stories or DMs
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore
    }
    // Launch Instagram web or app
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: shareMessage,
          url: shareUrl,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl bg-[#280507] border border-[#F4C928]/40 shadow-2xl p-6 relative overflow-hidden text-white animate-in zoom-in-95 duration-200"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#F4C928]/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          id="share-modal-close-btn"
          aria-label="Close share dialog"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#380b0e] hover:bg-[#4a0f12] text-neutral-300 hover:text-white border border-[#F4C928]/25 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#4A0F12] border border-[#F4C928]/40 flex items-center justify-center text-[#F4C928]">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4C928] block">
              SHARE WITH FRIENDS & FAMILY
            </span>
            <h3 id="share-dialog-title" className="text-lg font-serif font-bold text-[#FFF4D6]">
              Share this Dish
            </h3>
          </div>
        </div>

        {/* Dish Summary Preview Card */}
        <div className="mb-5 p-3 rounded-xl bg-[#1d0305] border border-[#F4C928]/25 flex items-center gap-3">
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-14 h-14 rounded-lg object-cover border border-[#F4C928]/30 shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate font-serif">
              {data.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
              {data.category && (
                <span className="text-[#F4C928] font-medium uppercase text-[10px]">
                  {data.category}
                </span>
              )}
              {data.price && (
                <span className="text-white font-bold">₹{data.price}</span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 truncate mt-0.5">
              Sai Datta Restaurant • Muthangi, Hyderabad
            </p>
          </div>
        </div>

        {/* Social Share Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            id="share-btn-whatsapp"
            className="group flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-[#1E3A28]/80 hover:bg-[#25D366] text-emerald-300 hover:text-[#0C1A10] border border-emerald-500/40 hover:border-emerald-400 transition-all duration-200 active:scale-95 shadow-md"
          >
            <div className="w-9 h-9 rounded-full bg-[#122419] group-hover:bg-white/20 flex items-center justify-center mb-1.5 transition-colors">
              <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-black fill-current" />
            </div>
            <span className="text-xs font-bold tracking-wide">WhatsApp</span>
            <span className="text-[9px] opacity-75 mt-0.5 hidden sm:inline">Direct Chat</span>
          </button>

          {/* Instagram */}
          <button
            type="button"
            onClick={handleInstagramShare}
            id="share-btn-instagram"
            className="group flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-[#3D1429]/80 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-pink-300 hover:text-white border border-pink-500/40 hover:border-pink-400 transition-all duration-200 active:scale-95 shadow-md"
          >
            <div className="w-9 h-9 rounded-full bg-[#27091A] group-hover:bg-white/20 flex items-center justify-center mb-1.5 transition-colors">
              <Instagram className="w-5 h-5 text-pink-400 group-hover:text-white" />
            </div>
            <span className="text-xs font-bold tracking-wide">Instagram</span>
            <span className="text-[9px] opacity-75 mt-0.5 hidden sm:inline">Copy & Open</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookShare}
            id="share-btn-facebook"
            className="group flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-[#132A4A]/80 hover:bg-[#1877F2] text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-400 transition-all duration-200 active:scale-95 shadow-md"
          >
            <div className="w-9 h-9 rounded-full bg-[#0B1A2E] group-hover:bg-white/20 flex items-center justify-center mb-1.5 transition-colors">
              <Facebook className="w-5 h-5 text-blue-400 group-hover:text-white fill-current" />
            </div>
            <span className="text-xs font-bold tracking-wide">Facebook</span>
            <span className="text-[9px] opacity-75 mt-0.5 hidden sm:inline">Post/Story</span>
          </button>
        </div>

        {/* Copy Link Row */}
        <div className="p-2 pl-3 rounded-xl bg-[#1a0305] border border-[#F4C928]/30 flex items-center justify-between gap-2">
          <span className="text-xs text-neutral-300 truncate select-all font-mono">
            {shareUrl}
          </span>
          <button
            type="button"
            onClick={handleCopyLink}
            id="share-copy-link-btn"
            className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#4A0F12] hover:bg-[#F4C928] text-[#FFF4D6] hover:text-[#2B0709] border border-[#F4C928]/40 text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* System Share API button if supported on mobile */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <div className="mt-3 pt-3 border-t border-[#F4C928]/15 text-center">
            <button
              type="button"
              onClick={handleNativeShare}
              id="share-native-more-btn"
              className="text-xs text-[#F4C928] hover:text-white inline-flex items-center gap-1.5 font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>More sharing options on your device...</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
