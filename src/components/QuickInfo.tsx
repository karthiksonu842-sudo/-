import React from 'react';
import { Clock, MapPin, Phone, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const QuickInfo: React.FC = () => {
  return (
    <section
      id="quick-info"
      className="relative z-20 -mt-6 sm:-mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 bg-[#4A0F12] border border-[#F4C928]/40 rounded-xl shadow-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#F4C928]/20 backdrop-blur-md">
        {/* Item 1: Open Today */}
        <div className="p-5 sm:p-6 flex items-center gap-4 group transition-colors hover:bg-[#5f1317]/60">
          <div className="w-12 h-12 rounded-full bg-[#2B0709] border border-[#F4C928]/30 flex items-center justify-center shrink-0 text-[#F4C928] group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-widest text-[#F4C928] uppercase block">
              OPEN TODAY
            </span>
            <span className="text-base sm:text-lg font-serif font-bold text-[#FFF4D6]">
              {RESTAURANT_INFO.hours}
            </span>
            <span className="block text-xs text-neutral-400 mt-0.5">Dine-in & Takeaway</span>
          </div>
        </div>

        {/* Item 2: Location */}
        <a
          href={RESTAURANT_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 sm:p-6 flex items-center justify-between group transition-colors hover:bg-[#5f1317]/60"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2B0709] border border-[#F4C928]/30 flex items-center justify-center shrink-0 text-[#F4C928] group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-widest text-[#F4C928] uppercase block">
                LOCATION
              </span>
              <span className="text-base sm:text-lg font-serif font-bold text-[#FFF4D6]">
                Muthangi, Patancheru
              </span>
              <span className="block text-xs text-neutral-400 mt-0.5">Hyderabad, Telangana</span>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#F4C928] transition-colors shrink-0 mr-2" />
        </a>

        {/* Item 3: Call */}
        <a
          href={`tel:${RESTAURANT_INFO.phoneRaw}`}
          className="p-5 sm:p-6 flex items-center justify-between group transition-colors hover:bg-[#5f1317]/60"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2B0709] border border-[#F4C928]/30 flex items-center justify-center shrink-0 text-[#F4C928] group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-widest text-[#F4C928] uppercase block">
                CALL NOW
              </span>
              <span className="text-base sm:text-lg font-serif font-bold text-[#FFF4D6]">
                {RESTAURANT_INFO.phone}
              </span>
              <span className="block text-xs text-neutral-400 mt-0.5">Instant phone reservation</span>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#F4C928] text-[#2B0709] group-hover:brightness-110 transition-all">
            DIAL
          </span>
        </a>
      </div>
    </section>
  );
};
