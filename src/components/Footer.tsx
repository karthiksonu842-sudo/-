import React from 'react';
import { Phone, Navigation, Clock, MapPin, Ban, AlertCircle, ShoppingBag, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#190305] text-white pt-16 pb-28 lg:pb-16 border-t border-[#F4C928]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#F4C928]/20">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-white mb-1">
              SAI DATTA
            </h3>
            <span className="text-xs font-cinzel text-[#F4C928] tracking-[0.25em] uppercase block mb-4">
              RESTAURANT
            </span>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-serif italic">
              &ldquo;Delicious food. Authentic flavours.&rdquo;
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Serving Muthangi, Patancheru, and Hyderabad with exceptional biryanis, slow-simmered curries, and sizzled Chinese delicacies.
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href={RESTAURANT_INFO.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-order-swiggy-btn"
                title="Order online from Sai Datta Restaurant on Swiggy"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FC8019] to-[#E26E0E] text-white text-xs font-bold tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5 shadow border border-white/20"
              >
                <ShoppingBag className="w-3.5 h-3.5 fill-white/20" />
                <span>SWIGGY</span>
              </a>

              <a
                href={RESTAURANT_INFO.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-order-zomato-btn"
                title="Order online from Sai Datta Restaurant on Zomato"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E23744] to-[#CB202D] text-white text-xs font-bold tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5 shadow border border-white/20"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>ZOMATO</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="px-4 py-2 rounded-full bg-[#F4C928] text-[#2B0709] text-xs font-bold tracking-wider hover:bg-[#E5B81B] transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>CALL NOW</span>
              </a>

              <a
                href={RESTAURANT_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-get-directions-btn"
                className="px-4 py-2 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 text-[#FFF4D6] text-xs font-bold tracking-wider hover:bg-[#5f1317] transition-all flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#F4C928]" />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4C928] mb-4">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a
                  href={RESTAURANT_INFO.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FC8019] hover:underline font-bold flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order on Swiggy</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT_INFO.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF7680] hover:underline font-bold flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E23744]" />
                  <span>Order on Zomato</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-[#F4C928] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F4C928] transition-colors">
                  About Our Kitchen
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#F4C928] transition-colors">
                  Full Menu & Prices
                </a>
              </li>
              <li>
                <a href="#specials" className="hover:text-[#F4C928] transition-colors">
                  Signature Picks
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#F4C928] transition-colors">
                  Dining Experience
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F4C928] transition-colors">
                  Food Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F4C928] transition-colors">
                  Common FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F4C928] transition-colors">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Timings */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4C928] mb-4">
              VISIT & INQUIRIES
            </h4>

            <div className="flex items-start gap-3 text-sm text-neutral-300">
              <MapPin className="w-4 h-4 text-[#F4C928] shrink-0 mt-1" />
              <div>
                <strong className="text-white block font-medium">Location:</strong>
                <span>{RESTAURANT_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-neutral-300">
              <Clock className="w-4 h-4 text-[#F4C928] shrink-0 mt-1" />
              <div>
                <strong className="text-white block font-medium">Opening Hours:</strong>
                <span>Daily: {RESTAURANT_INFO.hours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-neutral-300">
              <Phone className="w-4 h-4 text-[#F4C928] shrink-0 mt-1 fill-current" />
              <div>
                <strong className="text-white block font-medium">Telephone:</strong>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-[#F4C928] hover:underline font-serif text-base"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Crucial Policies & Notices */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#380b0e] border border-[#F4C928]/30 text-xs text-amber-200">
                <Ban className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-semibold">{RESTAURANT_INFO.policyNotice}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#380b0e] border border-[#F4C928]/30 text-xs text-neutral-300">
                <AlertCircle className="w-4 h-4 text-[#F4C928] shrink-0" />
                <span>{RESTAURANT_INFO.orderTimeNotice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p id="footer-copyright" className="text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} Sai Datta Restaurant, Muthangi. All rights reserved. Website designed by{' '}
            <span className="text-[#F4C928] font-semibold tracking-wide">K.Karthikeya</span>.
          </p>
          <div className="flex items-center gap-4 text-neutral-400 text-[11px] sm:text-xs shrink-0">
            <span>Dine-In</span>
            <span>•</span>
            <span>Takeaway</span>
            <span>•</span>
            <span>Freshly Cooked</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
