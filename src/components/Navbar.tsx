import React, { useState, useEffect } from 'react';
import { Phone, Menu as MenuIcon, X, Navigation, Sun, Moon, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;
    const handleScroll = () => {
      if (!ticking) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'MENU', href: '#menu' },
    { name: 'SPECIALS', href: '#specials' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        try {
          element.scrollIntoView({ behavior: 'smooth' });
        } catch {
          window.location.hash = href;
        }
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2B0709]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#F4C928]/20'
          : 'bg-gradient-to-b from-[#2B0709]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          id="navbar-brand-logo"
          className="group flex flex-col focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-white group-hover:text-[#F4C928] transition-colors">
              SAI DATTA
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-cinzel tracking-widest px-2 py-0.5 rounded bg-[#4A0F12] text-[#F4C928] border border-[#F4C928]/30">
              Muthangi
            </span>
          </div>
          <span className="text-[10px] font-cinzel text-amber-200/70 tracking-[0.22em] uppercase -mt-1">
            RESTAURANT
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              id={`nav-link-${link.name.toLowerCase()}`}
              className="text-xs font-semibold tracking-widest text-neutral-200 hover:text-[#F4C928] transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F4C928] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (Light/Dark Mode) with Animated Sun/Moon & Gold Glow */}
          <button
            onClick={handleThemeToggle}
            id="theme-toggle-button"
            type="button"
            aria-label={
              theme === 'dark'
                ? 'Currently luxury dark theme. Click to switch to high-contrast light theme'
                : 'Currently light theme. Click to switch to luxury dark theme'
            }
            title={
              theme === 'dark'
                ? 'Switch to High-Contrast Light Mode'
                : 'Switch to Luxury Dark Mode'
            }
            className={`relative group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border transition-colors duration-150 text-xs font-semibold tracking-wider active:scale-95 overflow-hidden cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#3b0d10] hover:bg-[#4A0F12] border-[#F4C928]/50 text-[#FFF4D6] hover:text-[#F4C928] hover:border-[#F4C928] shadow-[0_0_12px_rgba(244,201,40,0.15)] active:shadow-[0_0_20px_rgba(244,201,40,0.4)]'
                : 'bg-[#F2ECE4] hover:bg-[#EAE2D8] border-[#8C6300]/50 text-[#2B0709] hover:text-[#8C6300] hover:border-[#8C6300] shadow-sm active:shadow-md'
            }`}
          >
            {/* Ambient gold glow highlight layer on click or hover */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F4C928]/25 via-[#FFE27A]/35 to-[#F4C928]/25 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-40 group-active:opacity-80"
            />

            {/* Visual Icon Track with Animated Sliding & Rotating Sun / Moon */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              {/* Sun Icon */}
              <Sun
                className={`w-4 h-4 text-[#F4C928] absolute inset-0 m-auto transition-transform duration-200 ease-out transform ${
                  theme === 'dark'
                    ? 'opacity-100 rotate-0 scale-100 drop-shadow-[0_0_6px_rgba(244,201,40,0.8)]'
                    : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
                }`}
              />

              {/* Moon Icon */}
              <Moon
                className={`w-4 h-4 text-[#8C6300] absolute inset-0 m-auto transition-transform duration-200 ease-out transform ${
                  theme === 'light'
                    ? 'opacity-100 rotate-0 scale-100 drop-shadow-[0_0_4px_rgba(140,99,0,0.4)]'
                    : 'opacity-0 rotate-90 scale-50 pointer-events-none'
                }`}
              />
            </div>

            {/* Label with snappy transition */}
            <span className="hidden sm:inline text-[10px] uppercase font-cinzel font-bold tracking-widest relative z-10 transition-colors duration-150">
              {theme === 'dark' ? (
                <span className="text-[#F4C928]">LIGHT</span>
              ) : (
                <span className="text-[#2B0709]">DARK</span>
              )}
            </span>
          </button>

          {/* Desktop Directions Link */}
          <a
            href={RESTAURANT_INFO.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="navbar-directions-button"
            title={`Get turn-by-turn directions to ${RESTAURANT_INFO.address}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 text-[#FFF4D6] hover:text-[#F4C928] hover:border-[#F4C928] text-xs font-semibold tracking-wider transition-all"
          >
            <Navigation className="w-3.5 h-3.5 text-[#F4C928]" />
            <span>DIRECTIONS</span>
          </a>

          {/* Desktop Order on Swiggy & Zomato Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={RESTAURANT_INFO.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-swiggy-button"
              title="Order online from Sai Datta Restaurant on Swiggy"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#FC8019] to-[#E26E0E] text-white hover:brightness-110 active:scale-95 text-xs font-bold tracking-wider transition-all shadow-sm border border-white/20"
            >
              <ShoppingBag className="w-3.5 h-3.5 fill-white/20" />
              <span>SWIGGY</span>
            </a>
            <a
              href={RESTAURANT_INFO.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-zomato-button"
              title="Order online from Sai Datta Restaurant on Zomato"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#E23744] to-[#CB202D] text-white hover:brightness-110 active:scale-95 text-xs font-bold tracking-wider transition-all shadow-sm border border-white/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>ZOMATO</span>
            </a>
          </div>

          {/* Desktop Call Now Button */}
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            id="navbar-call-button"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] text-xs font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span className="hidden xs:inline">CALL NOW</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="navbar-mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="lg:hidden p-2 rounded-lg bg-[#4A0F12]/80 border border-[#F4C928]/30 text-white hover:text-[#F4C928]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#2B0709] border-b border-[#F4C928]/30 px-4 sm:px-6 py-5 shadow-2xl transition-all animate-in slide-in-from-top duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain"
        >
          <div className="flex flex-col gap-4">
            {/* Mobile Theme Toggle Row */}
            <div className="pb-3 border-b border-[#4A0F12] flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-neutral-300 uppercase">
                DISPLAY THEME
              </span>
              <button
                onClick={handleThemeToggle}
                id="mobile-nav-theme-toggle"
                type="button"
                className={`relative min-h-[44px] flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-150 border overflow-hidden active:scale-95 cursor-pointer touch-manipulation ${
                  theme === 'dark'
                    ? 'bg-[#3b0d10] border-[#F4C928]/50 text-[#F4C928] shadow-[0_0_10px_rgba(244,201,40,0.15)] active:shadow-[0_0_16px_rgba(244,201,40,0.4)]'
                    : 'bg-[#F2ECE4] border-[#8C6300]/50 text-[#2B0709] shadow-sm active:shadow-md'
                }`}
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <Sun
                    className={`w-4 h-4 text-[#F4C928] absolute inset-0 m-auto transition-transform duration-200 ease-out transform ${
                      theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100 drop-shadow-[0_0_4px_rgba(244,201,40,0.8)]'
                        : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
                    }`}
                  />
                  <Moon
                    className={`w-4 h-4 text-[#8C6300] absolute inset-0 m-auto transition-transform duration-200 ease-out transform ${
                      theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100 drop-shadow-[0_0_4px_rgba(140,99,0,0.4)]'
                        : 'opacity-0 rotate-90 scale-50 pointer-events-none'
                    }`}
                  />
                </div>
                <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </button>
            </div>

            {/* Navigation Touch-Friendly Links */}
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Menu Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="min-h-[48px] px-4 py-3 rounded-xl bg-black/15 active:bg-[#4A0F12] hover:bg-[#4A0F12]/60 border border-[#F4C928]/10 hover:border-[#F4C928]/35 transition-all flex items-center justify-between group touch-manipulation"
                >
                  <span className="text-sm sm:text-base font-semibold tracking-wider text-[#FFF4D6] group-hover:text-[#F4C928] transition-colors">
                    {link.name}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#4A0F12] border border-[#F4C928]/30 flex items-center justify-center text-[#F4C928] text-xs font-bold group-hover:bg-[#F4C928] group-hover:text-[#2B0709] transition-all">
                    →
                  </span>
                </a>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-[#4A0F12] flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={RESTAURANT_INFO.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="navbar-mobile-swiggy-btn"
                  title="Order online from Sai Datta Restaurant on Swiggy"
                  className="min-h-[48px] py-3.5 px-3 rounded-xl bg-gradient-to-r from-[#FC8019] to-[#E26E0E] text-white font-bold text-center text-xs tracking-wider flex items-center justify-center gap-2 shadow-md border border-white/20 active:scale-95 transition-all touch-manipulation"
                >
                  <ShoppingBag className="w-4 h-4 fill-white/20" />
                  <span>SWIGGY</span>
                </a>
                <a
                  href={RESTAURANT_INFO.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="navbar-mobile-zomato-btn"
                  title="Order online from Sai Datta Restaurant on Zomato"
                  className="min-h-[48px] py-3.5 px-3 rounded-xl bg-gradient-to-r from-[#E23744] to-[#CB202D] text-white font-bold text-center text-xs tracking-wider flex items-center justify-center gap-2 shadow-md border border-white/20 active:scale-95 transition-all touch-manipulation"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>ZOMATO</span>
                </a>
              </div>
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-[#F4C928] hover:bg-[#FFE27A] text-[#2B0709] font-bold text-center text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all touch-manipulation"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>CALL: {RESTAURANT_INFO.phone}</span>
              </a>
              <a
                href={RESTAURANT_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Get directions to ${RESTAURANT_INFO.address}`}
                className="w-full min-h-[48px] py-3 px-3 rounded-xl bg-[#4A0F12] hover:bg-[#5C1519] border border-[#F4C928]/40 text-[#FFF4D6] font-semibold text-center text-xs tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all touch-manipulation"
              >
                <Navigation className="w-4 h-4 text-[#F4C928] shrink-0" />
                <span className="truncate">GET DIRECTIONS (MUTHANGI)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
