import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Compass,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Car,
  Sparkles,
  Share2,
  Locate,
  Crosshair,
  RotateCcw,
  Smartphone,
  ChevronDown,
  Route,
  ShoppingBag,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { InteractiveMap } from './InteractiveMap';

interface OriginPreset {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  originQuery: string;
}

const POPULAR_ORIGINS: OriginPreset[] = [
  {
    id: 'orr-exit-3',
    name: 'ORR Exit 3 (Muthangi)',
    distance: '2.5 km',
    travelTime: '4 min drive',
    originQuery: 'Outer+Ring+Road+Exit+3,+Muthangi,+Telangana',
  },
  {
    id: 'patancheru-town',
    name: 'Patancheru Bus Station',
    distance: '4.2 km',
    travelTime: '8 min drive',
    originQuery: 'Patancheru+Bus+Stop,+Hyderabad',
  },
  {
    id: 'bhel-township',
    name: 'BHEL Lingampally',
    distance: '11.5 km',
    travelTime: '18 min drive',
    originQuery: 'BHEL+Township,+Hyderabad',
  },
  {
    id: 'sangareddy',
    name: 'Sangareddy Town',
    distance: '15.0 km',
    travelTime: '20 min drive',
    originQuery: 'Sangareddy+Bus+Stand,+Telangana',
  },
  {
    id: 'miyapur-metro',
    name: 'Miyapur Metro Station',
    distance: '18.5 km',
    travelTime: '25 min drive',
    originQuery: 'Miyapur+Metro+Station,+Hyderabad',
  },
];

// Calculate straight line distance between two coordinates in kilometers (Haversine formula)
function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const LocationSection: React.FC = React.memo(() => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAppPicker, setShowAppPicker] = useState(false);

  // User Geolocation state
  const [geoLoading, setGeoLoading] = useState(false);
  const [userDistanceKm, setUserDistanceKm] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const [liveStatus, setLiveStatus] = useState<{
    isOpen: boolean;
    statusText: string;
    subText: string;
  }>({
    isOpen: true,
    statusText: 'OPEN NOW',
    subText: 'Closes at 11:00 PM',
  });

  // Calculate live open/closed status
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const isOpen = currentHour >= 11 && currentHour < 23;
      setLiveStatus({
        isOpen,
        statusText: isOpen ? 'OPEN NOW' : 'CLOSED FOR DINE-IN',
        subText: isOpen ? 'Closes tonight at 11:00 PM' : 'Opens daily at 11:00 AM',
      });
    };
    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(RESTAURANT_INFO.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    } catch {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const handleCopyCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(RESTAURANT_INFO.coordinates.rawString);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2500);
    } catch {
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2500);
    }
  };

  // Launch navigation using user's real GPS position
  const handleNavigateFromCurrentLocation = () => {
    if (!navigator.geolocation) {
      window.open(RESTAURANT_INFO.directionsUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLoading(false);
        const { latitude, longitude } = position.coords;
        const dist = calculateHaversineDistanceKm(
          latitude,
          longitude,
          RESTAURANT_INFO.coordinates.lat,
          RESTAURANT_INFO.coordinates.lng
        );
        setUserDistanceKm(Math.round(dist * 10) / 10);

        // Open turn-by-turn directions directly with the user's precise starting coordinates
        const directNavUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=Sai+Datta+Restaurant,+Muthangi,+Patancheru,+Hyderabad,+Telangana+502300&travelmode=driving`;
        window.open(directNavUrl, '_blank', 'noopener,noreferrer');
      },
      (error) => {
        setGeoLoading(false);
        setGeoError('Location permission unavailable. Opening standard navigation...');
        setTimeout(() => setGeoError(null), 4000);
        // Fallback to standard directions with pre-filled destination coordinates
        window.open(RESTAURANT_INFO.directionsUrl, '_blank', 'noopener,noreferrer');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#220406] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-3.5">
            <Compass className="w-3.5 h-3.5 text-[#F4C928]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase">
              LOCATION & DIRECTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Find Us in Muthangi
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2.5 max-w-xl mx-auto">
            Conveniently positioned in Muthangi, Patancheru along the NH 65 highway corridor with direct access and spacious parking.
          </p>
        </div>

        {/* 2-Column Grid: Location Details + Interactive Custom Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Details & Navigation Action Hub */}
          <div className="lg:col-span-5 bg-[#380b0e] border border-[#F4C928]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Live Status Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F4C928]/20">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    {liveStatus.isOpen && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        liveStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                  </span>
                  <div>
                    <span
                      className={`text-xs font-bold tracking-wider uppercase block ${
                        liveStatus.isOpen ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {liveStatus.statusText}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {liveStatus.subText}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#F4C928] font-bold block">
                    SERVICE
                  </span>
                  <span className="text-xs text-neutral-300 font-medium">
                    Dine-in, Takeaway, Swiggy & Zomato
                  </span>
                </div>
              </div>

              {/* Address with Copy Button */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2B0709] border border-[#F4C928]/40 flex items-center justify-center shrink-0 text-[#F4C928]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold tracking-widest text-[#F4C928] uppercase block">
                      ADDRESS
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      type="button"
                      id="copy-address-button"
                      className="inline-flex items-center gap-1 text-[11px] text-[#F4C928] hover:text-white transition-colors px-2 py-0.5 rounded bg-[#2B0709]/60 border border-[#F4C928]/30"
                      title="Copy address to clipboard"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#FFF4D6] mb-1">
                    Sai Datta Restaurant
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>
              </div>

              {/* GPS Coordinates Bar with 1-Click Copy */}
              <div className="p-3 rounded-xl bg-[#280608] border border-[#F4C928]/25 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#4A0F12] border border-[#F4C928]/30 flex items-center justify-center text-[#F4C928] shrink-0">
                    <Crosshair className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      GPS COORDINATES
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#FFF4D6]">
                      {RESTAURANT_INFO.coordinates.formatted}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCoordinates}
                  id="copy-coordinates-button"
                  className="px-2.5 py-1.5 rounded-lg bg-[#3A0B0E] hover:bg-[#4E0E13] border border-[#F4C928]/40 text-[#F4C928] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                  title="Copy decimal coordinates for GPS navigation"
                >
                  {copiedCoords ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy GPS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hours & Contact Quick Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2B0709] border border-[#F4C928]/40 flex items-center justify-center shrink-0 text-[#F4C928]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-[#F4C928] uppercase block">
                      HOURS
                    </span>
                    <span className="text-xs font-bold text-[#FFF4D6] block">
                      {RESTAURANT_INFO.hours}
                    </span>
                    <span className="text-[11px] text-neutral-400">Open all 7 days</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2B0709] border border-[#F4C928]/40 flex items-center justify-center shrink-0 text-[#F4C928]">
                    <Phone className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-[#F4C928] uppercase block">
                      PHONE
                    </span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                      className="text-xs font-bold text-[#F4C928] hover:text-white transition-colors block"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <span className="text-[11px] text-neutral-400">Takeaway & Inquiries</span>
                  </div>
                </div>
              </div>

              {/* Fast 1-Click Directions from Key Corridors */}
              <div className="pt-2 border-t border-[#F4C928]/15">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-[#F4C928]" />
                    Directions From Common Hubs
                  </span>
                  <span className="text-[10px] text-neutral-400">Tap to route</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {POPULAR_ORIGINS.map((origin) => (
                    <a
                      key={origin.id}
                      id={`direction-origin-${origin.id}`}
                      href={`https://www.google.com/maps/dir/?api=1&origin=${origin.originQuery}&destination=Sai+Datta+Restaurant,+Muthangi,+Patancheru,+Hyderabad,+Telangana+502300&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#2B0709]/70 hover:bg-[#4A0F12] border border-[#F4C928]/20 hover:border-[#F4C928]/60 transition-all flex items-center justify-between group"
                      title={`Get driving directions from ${origin.name} to Sai Datta Restaurant`}
                    >
                      <div className="min-w-0 pr-1">
                        <span className="text-white font-medium block text-[11px] group-hover:text-[#F4C928] transition-colors leading-snug">
                          {origin.name}
                        </span>
                        <span className="text-neutral-400 text-[10px]">
                          {origin.distance} • {origin.travelTime}
                        </span>
                      </div>
                      <Navigation className="w-3.5 h-3.5 text-[#F4C928] shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Action Hub: Pre-filled Get Directions & App Picker */}
            <div className="mt-8 pt-6 border-t border-[#F4C928]/20 space-y-3">
              {/* Primary "Get Directions" Button with Full Uncut Address */}
              <div className="relative">
                <div className="flex items-stretch gap-2">
                  <a
                    href={RESTAURANT_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="location-get-directions-primary-btn"
                    className="flex-1 py-3 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-[#F4C928] via-[#FFE27A] to-[#E5B81B] text-[#2B0709] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-between gap-2.5 shadow-[0_4px_20px_rgba(244,201,40,0.35)] text-left"
                    title="Launch Google Maps directions to Sai Datta Restaurant, Muthangi, Patancheru"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#2B0709] flex items-center justify-center shrink-0">
                        <Navigation className="w-4 h-4 fill-[#F4C928] text-[#F4C928]" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-[#2B0709] leading-tight flex items-center gap-1.5 flex-wrap">
                          <span>GET DIRECTIONS</span>
                          <span className="text-[10px] font-bold bg-[#2B0709]/15 px-1.5 py-0.5 rounded font-mono">
                            Google Maps
                          </span>
                        </div>
                        <div className="text-[11px] sm:text-xs font-bold text-[#3B090C] leading-snug mt-0.5">
                          Sai Datta Restaurant, Muthangi, Patancheru, Hyderabad (502300)
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#2B0709] shrink-0 opacity-80" />
                  </a>

                  {/* Toggle App Picker Button */}
                  <button
                    type="button"
                    onClick={() => setShowAppPicker((prev) => !prev)}
                    id="location-nav-apps-toggle-btn"
                    aria-label="Choose navigation application"
                    className={`px-3 py-3 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                      showAppPicker
                        ? 'bg-[#F4C928] text-[#2B0709] border-[#F4C928]'
                        : 'bg-[#4A0F12] border-[#F4C928]/40 text-[#FFF4D6] hover:bg-[#5f1317]'
                    }`}
                    title="More navigation options (Apple Maps, Waze, etc.)"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        showAppPicker ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Verified Full Address Strip below Direction Button */}
                <div className="mt-2 px-3 py-2 rounded-lg bg-[#200406]/90 border border-[#F4C928]/25 flex items-center justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-[#F4C928] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      <span className="text-[#F4C928] font-semibold">Destination Address: </span>
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    id="direction-strip-copy-address"
                    className="text-[10px] font-bold text-[#F4C928] hover:text-white px-2 py-0.5 rounded bg-[#3A0B0E] border border-[#F4C928]/30 shrink-0 transition-colors"
                  >
                    {copiedAddress ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Navigation App Picker Popup */}
                {showAppPicker && (
                  <div
                    id="location-nav-apps-popup"
                    className="absolute bottom-full left-0 right-0 mb-2 p-3 rounded-xl bg-[#200406] border border-[#F4C928]/40 shadow-2xl backdrop-blur-xl z-30 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#F4C928] px-2 py-1 flex items-center justify-between">
                      <span>CHOOSE NAVIGATION APP</span>
                      <span className="text-neutral-400 font-normal">Full Address Pre-filled</span>
                    </div>

                    {/* Google Maps Option */}
                    <a
                      href={RESTAURANT_INFO.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="nav-option-google-maps"
                      className="w-full px-3 py-2 rounded-lg bg-[#2E070A] hover:bg-[#4A0F12] border border-[#F4C928]/20 hover:border-[#F4C928]/50 flex items-center justify-between text-xs text-white transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-[#F4C928]" />
                        <div>
                          <span className="font-bold block">Google Maps</span>
                          <span className="text-[10px] text-neutral-300">
                            Sai Datta Restaurant, Muthangi, Patancheru (502300)
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>

                    {/* Apple Maps Option */}
                    <a
                      href={RESTAURANT_INFO.appleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="nav-option-apple-maps"
                      className="w-full px-3 py-2 rounded-lg bg-[#2E070A] hover:bg-[#4A0F12] border border-[#F4C928]/20 hover:border-[#F4C928]/50 flex items-center justify-between text-xs text-white transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#F4C928]" />
                        <div>
                          <span className="font-bold block">Apple Maps</span>
                          <span className="text-[10px] text-neutral-300">
                            Sai Datta Restaurant, Muthangi, Patancheru (iOS/macOS)
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>

                    {/* Waze Option */}
                    <a
                      href={RESTAURANT_INFO.wazeDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="nav-option-waze"
                      className="w-full px-3 py-2 rounded-lg bg-[#2E070A] hover:bg-[#4A0F12] border border-[#F4C928]/20 hover:border-[#F4C928]/50 flex items-center justify-between text-xs text-white transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#F4C928]" />
                        <div>
                          <span className="font-bold block">Waze Navigation</span>
                          <span className="text-[10px] text-neutral-300">
                            Live traffic alerts to Sai Datta Restaurant
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>

                    {/* Native Mobile Geo Intent */}
                    <a
                      href={RESTAURANT_INFO.geoIntentUrl}
                      id="nav-option-native-geo"
                      className="w-full px-3 py-2 rounded-lg bg-[#2E070A] hover:bg-[#4A0F12] border border-[#F4C928]/20 hover:border-[#F4C928]/50 flex items-center justify-between text-xs text-white transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#F4C928]" />
                        <div>
                          <span className="font-bold block">Default Device App</span>
                          <span className="text-[10px] text-neutral-300">Direct address URI (geo: intent)</span>
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>
                  </div>
                )}
              </div>

              {/* Secondary Action: Navigate From My Location & Call */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleNavigateFromCurrentLocation}
                  disabled={geoLoading}
                  id="location-from-my-gps-btn"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#2B0709] border border-[#F4C928]/40 hover:border-[#F4C928] text-[#FFF4D6] text-xs font-semibold hover:text-[#F4C928] active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                  title="Detect your current location and calculate distance and route"
                >
                  <Locate className={`w-3.5 h-3.5 text-[#F4C928] ${geoLoading ? 'animate-spin' : ''}`} />
                  <span>
                    {geoLoading
                      ? 'Locating...'
                      : userDistanceKm !== null
                      ? `From My Location (${userDistanceKm} km away)`
                      : 'From My Current Location'}
                  </span>
                </button>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  id="location-call-btn"
                  className="py-2.5 px-3 rounded-xl bg-[#4A0F12] border border-[#F4C928]/40 text-[#FFF4D6] text-xs font-semibold hover:bg-[#5f1317] active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F4C928]" />
                  <span>CALL</span>
                </a>

                <a
                  href={RESTAURANT_INFO.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="location-order-swiggy-btn"
                  title="Order online from Sai Datta Restaurant on Swiggy"
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FC8019] to-[#E26E0E] text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow border border-white/20"
                >
                  <ShoppingBag className="w-3.5 h-3.5 fill-white/20" />
                  <span>SWIGGY</span>
                </a>

                <a
                  href={RESTAURANT_INFO.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="location-order-zomato-btn"
                  title="Order online from Sai Datta Restaurant on Zomato"
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E23744] to-[#CB202D] text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow border border-white/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>ZOMATO</span>
                </a>
              </div>

              {/* Geolocation feedback note if any */}
              {geoError && (
                <p className="text-[11px] text-amber-300 text-center italic animate-fade-in">
                  {geoError}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Verified Real Location Interactive Map & Navigation Hub */}
          <div
            className={`lg:col-span-7 flex flex-col relative transition-all duration-300 ${
              isFullscreen
                ? 'fixed inset-4 sm:inset-10 z-50 shadow-[0_0_80px_rgba(0,0,0,0.85)]'
                : 'min-h-[480px] lg:min-h-full'
            }`}
          >
            <InteractiveMap
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
            />

            {/* If Fullscreen is active, render backdrop dismissal */}
            {isFullscreen && (
              <div
                onClick={() => setIsFullscreen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default LocationSection;
