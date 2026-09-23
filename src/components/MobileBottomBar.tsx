import React, { useState, useEffect } from 'react';
import { Home, UtensilsCrossed, PhoneCall, Navigation, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const MobileBottomBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'menu' | 'contact'>('home');
  const [orderPickerOpen, setOrderPickerOpen] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (rafId !== null) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const id = entry.target.id;
                if (id === 'contact') {
                  setActiveSection('contact');
                } else if (id === 'menu') {
                  setActiveSection('menu');
                } else if (id === 'hero') {
                  setActiveSection('home');
                }
              }
            });
          });
        }, 50);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 }
    );

    const hero = document.getElementById('hero');
    const menu = document.getElementById('menu');
    const contact = document.getElementById('contact');

    if (hero) observer.observe(hero);
    if (menu) observer.observe(menu);
    if (contact) observer.observe(contact);

    return () => {
      observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Order Online Partner Picker Modal/Popover */}
      {orderPickerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center pb-24 px-4 animate-in fade-in duration-150">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOrderPickerOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xs p-4 rounded-2xl bg-[#280608] border border-[#F4C928]/40 shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between mb-3 border-b border-[#F4C928]/20 pb-2.5">
              <span className="text-xs font-bold text-[#F4C928] uppercase tracking-wider">
                Select Delivery Partner
              </span>
              <button
                onClick={() => setOrderPickerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 text-sm font-semibold touch-manipulation"
                aria-label="Close delivery partner picker"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href={RESTAURANT_INFO.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOrderPickerOpen(false)}
                id="mobile-picker-swiggy"
                className="min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#FC8019] to-[#E26E0E] text-white text-xs sm:text-sm font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow touch-manipulation"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 fill-white/20" />
                  <span>ORDER ON SWIGGY</span>
                </div>
                <span className="text-xs opacity-90 font-bold">→</span>
              </a>
              <a
                href={RESTAURANT_INFO.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOrderPickerOpen(false)}
                id="mobile-picker-zomato"
                className="min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#E23744] to-[#CB202D] text-white text-xs sm:text-sm font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow touch-manipulation"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  <span>ORDER ON ZOMATO</span>
                </div>
                <span className="text-xs opacity-90 font-bold">→</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <nav
        id="mobile-bottom-nav"
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#240507]/95 backdrop-blur-xl border-t border-[#F4C928]/35 px-2 sm:px-4 pt-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-between text-center relative">
          {/* Home */}
          <a
            href="#hero"
            id="mobile-nav-home"
            className={`min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 touch-manipulation ${
              activeSection === 'home'
                ? 'text-[#F4C928] font-bold'
                : 'text-neutral-300 hover:text-[#F4C928]'
            }`}
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-bold leading-tight">HOME</span>
          </a>

          {/* Menu */}
          <a
            href="#menu"
            id="mobile-nav-menu"
            className={`min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 touch-manipulation ${
              activeSection === 'menu'
                ? 'text-[#F4C928] font-bold'
                : 'text-neutral-300 hover:text-[#F4C928]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-bold leading-tight">MENU</span>
          </a>

          {/* Permanent Standout Call Action Button */}
          <div className="flex items-center justify-center">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              id="mobile-nav-call"
              aria-label={`Call Sai Datta Restaurant at ${RESTAURANT_INFO.phone}`}
              title={`Call Sai Datta Restaurant: ${RESTAURANT_INFO.phone}`}
              className="group relative -top-3.5 flex flex-col items-center justify-center active:scale-90 transition-transform duration-200 touch-manipulation"
            >
              {/* Ambient Gold Glow Ring */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#F4C928] to-[#E5B81B] opacity-75 blur-sm group-hover:opacity-100 animate-pulse pointer-events-none" />

              {/* Main Elevated Circle Button */}
              <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#F4C928] via-[#FFE27A] to-[#E5B81B] text-[#2B0709] flex flex-col items-center justify-center shadow-[0_4px_18px_rgba(244,201,40,0.5)] border-2 border-[#FFF4D6]">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 animate-phone-ring text-[#2B0709]" />
                <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase leading-none mt-0.5 text-[#2B0709]">
                  CALL
                </span>
              </div>

              {/* Floating Quick Dial Pill */}
              <span className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-[#4A0F12] border border-[#F4C928]/60 text-[#FFF4D6] text-[8px] sm:text-[9px] font-extrabold tracking-wider uppercase whitespace-nowrap shadow-md leading-tight">
                TAP TO DIAL
              </span>
            </a>
          </div>

          {/* Online Order Button (Swiggy & Zomato) */}
          <button
            type="button"
            onClick={() => setOrderPickerOpen(!orderPickerOpen)}
            id="mobile-nav-order"
            title="Order Online on Swiggy or Zomato"
            className="min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 text-[#F4C928] hover:text-[#FFE27A] touch-manipulation cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-[#F4C928] shrink-0" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E23744] ring-1 ring-[#240507]" />
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-bold text-[#F4C928] leading-tight">ORDER</span>
          </button>

          {/* Directions */}
          <a
            href={RESTAURANT_INFO.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-nav-directions"
            title={`Get directions to ${RESTAURANT_INFO.address}`}
            className={`min-h-[46px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 touch-manipulation ${
              activeSection === 'contact'
                ? 'text-[#F4C928] font-bold'
                : 'text-neutral-300 hover:text-[#F4C928]'
            }`}
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-bold leading-tight">MAP</span>
          </a>
        </div>
      </nav>
    </>
  );
};

