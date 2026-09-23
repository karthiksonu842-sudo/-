import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
  ExternalLink,
  Sparkles,
  Phone,
  Compass,
  Check,
  Smartphone,
  Eye,
  Lock,
  Unlock,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface InteractiveMapProps {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

type MapProvider = 'interactive' | 'google';
type MapLayerType = 'street' | 'satellite';

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  isFullscreen,
  onToggleFullscreen,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [provider, setProvider] = useState<MapProvider>('interactive');
  const [layerType, setLayerType] = useState<MapLayerType>('street');
  const [zoomLevel, setZoomLevel] = useState<number>(15);
  const [isTouchActive, setIsTouchActive] = useState<boolean>(false);
  const [userLocationDist, setUserLocationDist] = useState<string | null>(null);

  const restaurantLat = RESTAURANT_INFO.coordinates.lat;
  const restaurantLng = RESTAURANT_INFO.coordinates.lng;

  // Initialize or update Leaflet map
  useEffect(() => {
    if (provider !== 'interactive' || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create new Leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: [restaurantLat, restaurantLng],
        zoom: zoomLevel,
        zoomControl: false,
        attributionControl: false,
        // Disable scroll zoom by default so user can scroll page smoothly without map hijacking
        scrollWheelZoom: false,
        // Allow smooth touch pan with one finger on mobile
        dragging: true,
        touchZoom: true,
      });

      mapInstanceRef.current = map;

      // Custom pulsing gold restaurant pin
      const customPinHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <span class="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-[#F4C928] opacity-70"></span>
          <div class="relative w-10 h-10 rounded-full bg-[#380b0e] border-2 border-[#F4C928] flex items-center justify-center shadow-2xl text-[#F4C928] font-bold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C928" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/>
              <line x1="10" y1="1" x2="10" y2="4"/>
              <line x1="14" y1="1" x2="14" y2="4"/>
            </svg>
          </div>
          <div class="absolute -bottom-1.5 w-3 h-3 bg-[#F4C928] rotate-45 transform"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-restaurant-marker',
        html: customPinHtml,
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -50],
      });

      const marker = L.marker([restaurantLat, restaurantLng], { icon: customIcon }).addTo(map);
      markerRef.current = marker;

      // Popup with rich verified details and quick links
      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; background: #2B0709; color: #FFF; padding: 12px; border-radius: 12px; border: 1px solid rgba(244, 201, 40, 0.4); max-width: 260px;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #F4C928; text-transform: uppercase; letter-spacing: 0.1em;">
            <span>★</span> VERIFIED REAL LOCATION
          </div>
          <h4 style="margin: 4px 0 2px 0; font-size: 15px; font-weight: 700; color: #FFF;">Sai Datta Restaurant</h4>
          <p style="margin: 0; font-size: 11px; color: #d4d4d4; line-height: 1.4;">${RESTAURANT_INFO.address}</p>
          <div style="margin-top: 8px; font-size: 11px; color: #34d399; font-weight: 600;">
            ● Open Today: 11:00 AM – 11:00 PM
          </div>
          <div style="margin-top: 10px; display: flex; gap: 8px;">
            <a href="${RESTAURANT_INFO.directionsUrl}" target="_blank" rel="noopener noreferrer" style="background: #F4C928; color: #2B0709; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; display: inline-block;">Get Directions</a>
            <a href="tel:${RESTAURANT_INFO.phoneRaw}" style="background: #3A0B0E; color: #F4C928; border: 1px solid rgba(244,201,40,0.3); padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; display: inline-block;">Call</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent).openPopup();

      map.on('zoomend', () => {
        setZoomLevel(map.getZoom());
      });
    }

    // Set or switch tile layers
    const map = mapInstanceRef.current;
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tileUrl =
      layerType === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution =
      layerType === 'satellite'
        ? '&copy; Esri World Imagery'
        : '&copy; OpenStreetMap contributors';

    const newTileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;

    // Invalidate size to guarantee sharp rendering
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => clearTimeout(timer);
  }, [provider, layerType, restaurantLat, restaurantLng]);

  // Invalidate map size on fullscreen toggle
  useEffect(() => {
    if (mapInstanceRef.current) {
      const timer = setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  // Clean up Leaflet on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update zoom
  const handleZoomIn = () => {
    if (provider === 'interactive' && mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    } else {
      setZoomLevel((prev) => Math.min(prev + 1, 19));
    }
  };

  const handleZoomOut = () => {
    if (provider === 'interactive' && mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    } else {
      setZoomLevel((prev) => Math.max(prev - 1, 12));
    }
  };

  const handleCenterOnRestaurant = () => {
    if (provider === 'interactive' && mapInstanceRef.current) {
      mapInstanceRef.current.setView([restaurantLat, restaurantLng], 16, { animate: true });
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }
  };

  // Google Maps embed URL with exact real place and address search
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=Sai+Datta+Restaurant,+Rice+Mill+Road,+Muthangi,+Patancheru,+Telangana+502300&t=${
    layerType === 'satellite' ? 'k' : 'm'
  }&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={`relative w-full h-full min-h-[460px] sm:min-h-[520px] flex flex-col bg-[#1A0305] rounded-2xl overflow-hidden border border-[#F4C928]/35 shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-3 sm:inset-8 z-50 shadow-[0_0_90px_rgba(0,0,0,0.9)] border-[#F4C928]'
          : ''
      }`}
    >
      {/* Top Map Control Bar */}
      <div className="bg-[#230407]/95 border-b border-[#F4C928]/25 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 z-20 backdrop-blur-md">
        {/* Provider Switcher: Interactive vs Google Maps */}
        <div className="flex items-center gap-1.5">
          <div className="inline-flex rounded-lg bg-[#190204] p-1 border border-[#F4C928]/30">
            <button
              type="button"
              id="map-provider-interactive-btn"
              onClick={() => {
                setProvider('interactive');
                setIsTouchActive(true);
              }}
              className={`px-3 py-1 rounded text-xs font-bold tracking-wider uppercase transition-all ${
                provider === 'interactive'
                  ? 'bg-[#F4C928] text-[#2B0709] shadow-sm'
                  : 'text-neutral-300 hover:text-[#F4C928]'
              }`}
            >
              Interactive Map
            </button>
            <button
              type="button"
              id="map-provider-google-btn"
              onClick={() => {
                setProvider('google');
                setIsTouchActive(false); // default locked to prevent "two fingers" popup on mobile
              }}
              className={`px-3 py-1 rounded text-xs font-bold tracking-wider uppercase transition-all ${
                provider === 'google'
                  ? 'bg-[#F4C928] text-[#2B0709] shadow-sm'
                  : 'text-neutral-300 hover:text-[#F4C928]'
              }`}
            >
              Google Maps
            </button>
          </div>
        </div>

        {/* Layer Type & Controls */}
        <div className="flex items-center gap-2">
          {/* Street vs Satellite */}
          <div className="inline-flex rounded-lg bg-[#190204] p-1 border border-[#F4C928]/30">
            <button
              type="button"
              id="map-layer-street-btn"
              onClick={() => setLayerType('street')}
              className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                layerType === 'street'
                  ? 'bg-[#4A0F12] text-[#F4C928] font-bold border border-[#F4C928]/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Street
            </button>
            <button
              type="button"
              id="map-layer-satellite-btn"
              onClick={() => setLayerType('satellite')}
              className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                layerType === 'satellite'
                  ? 'bg-[#4A0F12] text-[#F4C928] font-bold border border-[#F4C928]/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Zoom & Recenter controls */}
          <div className="inline-flex rounded-lg bg-[#190204] border border-[#F4C928]/30 overflow-hidden">
            <button
              type="button"
              id="map-interactive-zoom-in"
              onClick={handleZoomIn}
              aria-label="Zoom In"
              title="Zoom In"
              className="p-1.5 text-neutral-300 hover:text-[#F4C928] hover:bg-[#3D0B0F] transition-colors border-r border-[#F4C928]/20"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="map-interactive-zoom-out"
              onClick={handleZoomOut}
              aria-label="Zoom Out"
              title="Zoom Out"
              className="p-1.5 text-neutral-300 hover:text-[#F4C928] hover:bg-[#3D0B0F] transition-colors border-r border-[#F4C928]/20"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="map-interactive-recenter"
              onClick={handleCenterOnRestaurant}
              aria-label="Re-center on Sai Datta Restaurant"
              title="Re-center on Sai Datta Restaurant"
              className="p-1.5 text-neutral-300 hover:text-[#F4C928] hover:bg-[#3D0B0F] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Launch in Google Maps App */}
          <a
            href={RESTAURANT_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="map-open-google-maps-tab"
            title="Open real location in Google Maps app"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#4A0F12] hover:bg-[#601519] border border-[#F4C928]/40 text-[#F4C928] text-xs font-bold tracking-wider transition-all"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              id="map-fullscreen-toggle-btn"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              className="p-1.5 rounded-lg bg-[#190204] border border-[#F4C928]/30 text-neutral-300 hover:text-[#F4C928] hover:bg-[#3D0B0F] transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-[#F4C928]" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Map Viewport */}
      <div className="relative flex-1 w-full min-h-[380px] bg-[#1a0305]">
        {provider === 'interactive' ? (
          /* High-detail Leaflet Map with Single-Finger Pan, Custom Marker, No Two-Finger Trap */
          <div
            id="interactive-leaflet-map"
            ref={mapContainerRef}
            className="w-full h-full min-h-[380px] sm:min-h-[460px] z-10"
          />
        ) : (
          /* Google Maps Embed with Touch-Lock Guard to eliminate the "Use two fingers to move the map" trap */
          <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px]">
            <iframe
              title="Sai Datta Restaurant Real Google Map Embed"
              src={googleMapsEmbedUrl}
              className={`w-full h-full min-h-[380px] sm:min-h-[460px] border-0 transition-opacity duration-300 ${
                isTouchActive ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Smart Touch Guard Overlay: Stops Google Maps from blocking mobile page scroll with the two-finger warning */}
            {!isTouchActive && (
              <div
                onClick={() => setIsTouchActive(true)}
                className="absolute inset-0 bg-black/30 hover:bg-black/20 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer p-4 text-center z-15 transition-all group"
              >
                <div className="px-4 py-2.5 rounded-full bg-[#200406]/95 border border-[#F4C928] text-white shadow-2xl flex items-center gap-2 group-hover:scale-105 transition-transform">
                  <Unlock className="w-4 h-4 text-[#F4C928]" />
                  <span className="text-xs font-bold text-[#FFF4D6]">
                    Tap anywhere to interact with Google Map
                  </span>
                </div>
                <span className="text-[11px] text-neutral-300 mt-2 bg-black/60 px-3 py-1 rounded-md">
                  Prevents page scroll trapping • Single tap unlocks pan & zoom
                </span>
              </div>
            )}

            {/* When touch is active, give mobile user an easy 1-tap lock button to resume scrolling page */}
            {isTouchActive && (
              <div className="absolute top-3 right-3 z-20">
                <button
                  type="button"
                  onClick={() => setIsTouchActive(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#200406]/95 border border-[#F4C928] text-xs font-bold text-[#F4C928] shadow-2xl hover:bg-[#380b0e] transition-all"
                  title="Lock map to scroll page smoothly"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Map (Scroll Page)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Floating Real Location Badge (Always visible on bottom or top) */}
        <div className="absolute bottom-3 left-3 z-20 max-w-[290px] sm:max-w-sm p-3 rounded-xl bg-[#200406]/95 border border-[#F4C928]/45 shadow-2xl backdrop-blur-md pointer-events-auto">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F4C928]">
              <Sparkles className="w-3 h-3 text-[#F4C928]" />
              <span>REAL RESTAURANT LOCATION</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h4 className="text-sm font-serif font-bold text-white mt-1">
            Sai Datta Restaurant
          </h4>
          <p className="text-[11px] text-neutral-300 leading-snug mt-0.5">
            Rice Mill Road, House 9-38/1, Muthangi, Patancheru, Telangana 502300
          </p>

          <div className="mt-2 pt-2 border-t border-[#F4C928]/20 flex items-center justify-between gap-2">
            <a
              href={RESTAURANT_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="map-floating-navigate-btn"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2B0709] bg-[#F4C928] hover:bg-[#FFE27A] px-3 py-1 rounded-md transition-colors"
              title="Start Google Maps GPS navigation to Sai Datta Restaurant"
            >
              <Navigation className="w-3 h-3 fill-current" />
              <span>Directions</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-[#F4C928] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#F4C928]" />
              <span>Call Host</span>
            </a>

            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#F4C928] hover:underline"
            >
              <span>Open App</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Real Location GPS Badge on Bottom Right */}
        <div className="absolute bottom-3 right-3 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#200406]/90 border border-[#F4C928]/35 backdrop-blur-md text-[11px] text-neutral-300 pointer-events-none z-20">
          <span className="w-2 h-2 rounded-full bg-[#F4C928]" />
          <span>
            Rice Mill Rd, Muthangi • GPS: {restaurantLat}, {restaurantLng}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
