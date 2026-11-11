import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_MARKERS, MapMarkerData } from '../data/historicalData';
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SectionHeader } from './CinematicPrimitives';
import {
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Globe,
  Compass,
  Camera,
  Satellite,
  Moon,
} from 'lucide-react';

// Simplified outline of Kazakhstan for offline + online cartographic rendering
const KAZAKHSTAN_GEOJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Kazakhstan' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [46.5, 48.5], [48.6, 49.9], [50.8, 51.2], [54.5, 51.0], [56.2, 50.7],
            [60.9, 51.3], [61.5, 53.9], [65.1, 54.6], [68.8, 55.3], [71.1, 54.1],
            [73.5, 53.5], [76.9, 54.0], [80.1, 51.4], [83.8, 50.9], [87.3, 49.2],
            [85.6, 47.2], [83.0, 47.0], [82.1, 45.2], [79.9, 44.9], [80.2, 42.2],
            [76.0, 42.9], [73.2, 42.4], [70.9, 42.2], [69.0, 40.9], [66.2, 41.9],
            [62.0, 43.5], [58.6, 45.5], [56.0, 45.0], [55.9, 41.5], [52.5, 41.8],
            [50.1, 44.5], [53.0, 46.8], [49.0, 46.4], [46.5, 48.5],
          ],
        ],
      },
    },
  ],
};

// Key-free basemaps (Esri ArcGIS Online public tile services)
const BASEMAPS = {
  dark: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    maxZoom: 18,
  },
} as const;

type BasemapKey = keyof typeof BASEMAPS;

const FlyToSelected: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 5, { duration: 0.9 });
  }, [coords, map]);
  return null;
};

export const InteractiveMapSection: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData>(MAP_MARKERS[0]);
  const [mapMode, setMapMode] = useState<'leaflet' | 'offline-vector'>('leaflet');
  const [basemap, setBasemap] = useState<BasemapKey>('dark');

  const getMarkerColor = (cat: MapMarkerData['category']) => {
    switch (cat) {
      case 'nuclear':
        return '#d94e41';
      case 'water':
        return '#5ac2d6';
      case 'oil':
        return '#c9a779';
      case 'industrial':
        return '#a8bba5';
    }
  };

  const tiles = BASEMAPS[basemap];

  return (
    <section id="section-4" className="relative py-24 md:py-32 px-6 bg-forest/40 border-t border-ivory/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="04"
          eyebrow="Cartographic Investigation"
          title={
            <>
              THE MAP OF <span className="italic font-normal text-sand">CONSEQUENCES</span>
            </>
          }
          lede="Select any marker across Kazakhstan to inspect a documented 20th-century environmental flashpoint—complete with archival photographs, dates, and scientific findings."
          aside={
            <div className="segmented">
              <button data-active={mapMode === 'leaflet'} onClick={() => setMapMode('leaflet')}>
                <Globe className="w-3.5 h-3.5" />
                <span>Interactive map</span>
              </button>
              <button
                data-active={mapMode === 'offline-vector'}
                onClick={() => setMapMode('offline-vector')}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Projector map (offline)</span>
              </button>
            </div>
          }
        />

        {/* Location selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {MAP_MARKERS.map((marker) => {
            const isSelected = selectedMarker.id === marker.id;
            return (
              <button
                key={marker.id}
                onClick={() => setSelectedMarker(marker)}
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all border ${
                  isSelected
                    ? 'bg-sand text-ink-2 border-sand'
                    : 'bg-transparent text-ivory/85 border-ivory/15 hover:border-sand/60 hover:text-ivory'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isSelected ? '#101413' : getMarkerColor(marker.category) }}
                />
                <span>{marker.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map viewport */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden ring-1 ring-ivory/12 bg-ink min-h-[440px] sm:min-h-[560px] relative flex flex-col shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            {mapMode === 'leaflet' ? (
              <>
                <MapContainer
                  center={[48.0, 67.0]}
                  zoom={5}
                  scrollWheelZoom={false}
                  className="w-full h-full flex-1 z-10 min-h-[440px] sm:min-h-[560px]"
                >
                  <TileLayer
                    key={basemap}
                    attribution={tiles.attribution}
                    url={tiles.url}
                    maxZoom={tiles.maxZoom}
                  />

                  <GeoJSON
                    data={KAZAKHSTAN_GEOJSON}
                    style={{
                      color: '#c9a779',
                      weight: 1.5,
                      fillColor: basemap === 'dark' ? '#192e2b' : '#c9a779',
                      fillOpacity: basemap === 'dark' ? 0.35 : 0.06,
                      dashArray: '4 4',
                    }}
                  />

                  <FlyToSelected coords={selectedMarker.coordinates} />

                  {MAP_MARKERS.map((marker) => {
                    const isSelected = selectedMarker.id === marker.id;
                    const color = getMarkerColor(marker.category);
                    return (
                      <CircleMarker
                        key={marker.id}
                        center={marker.coordinates}
                        radius={isSelected ? 13 : 8}
                        pathOptions={{
                          color: '#f1f0e8',
                          weight: isSelected ? 2.5 : 1.5,
                          fillColor: color,
                          fillOpacity: 0.92,
                        }}
                        eventHandlers={{ click: () => setSelectedMarker(marker) }}
                      >
                        <Popup>
                          <div className="p-1 max-w-[220px]">
                            <img
                              src={marker.photoSrc}
                              alt={marker.name}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                            <div className="font-mono-code text-[10px] text-sand uppercase tracking-wider">
                              {marker.dates}
                            </div>
                            <div className="font-serif-editorial font-semibold text-base text-ivory mb-1 leading-tight">
                              {marker.name}
                            </div>
                            <div className="text-xs text-sage">{marker.mainProblem}</div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    );
                  })}
                </MapContainer>

                {/* Basemap toggle */}
                <div className="absolute top-3 right-3 z-20 segmented">
                  <button data-active={basemap === 'dark'} onClick={() => setBasemap('dark')}>
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </button>
                  <button
                    data-active={basemap === 'satellite'}
                    onClick={() => setBasemap('satellite')}
                  >
                    <Satellite className="w-3.5 h-3.5" />
                    <span>Satellite</span>
                  </button>
                </div>
              </>
            ) : (
              /* Offline high-contrast vector map */
              <div className="w-full h-full flex-1 flex flex-col justify-between p-4 sm:p-6 bg-ink">
                <svg viewBox="0 0 1000 600" className="w-full h-full">
                  <rect width="1000" height="600" fill="#0e1211" />
                  <g stroke="#f1f0e8" strokeOpacity="0.06" strokeWidth="1">
                    <line x1="200" y1="0" x2="200" y2="600" />
                    <line x1="400" y1="0" x2="400" y2="600" />
                    <line x1="600" y1="0" x2="600" y2="600" />
                    <line x1="800" y1="0" x2="800" y2="600" />
                    <line x1="0" y1="150" x2="1000" y2="150" />
                    <line x1="0" y1="300" x2="1000" y2="300" />
                    <line x1="0" y1="450" x2="1000" y2="450" />
                  </g>

                  <path
                    d="M65,245 L115,190 L215,165 L335,175 L415,105 L535,85 L645,115 L745,105 L835,175 L925,215 L885,295 L825,320 L785,415 L695,445 L585,465 L495,510 L405,475 L315,435 L235,445 L195,525 L125,510 L95,415 L145,365 L85,335 Z"
                    fill="#162624"
                    stroke="#c9a779"
                    strokeWidth="2.5"
                  />

                  <path d="M35,345 Q115,355 135,425 Q115,515 65,555 L35,555 Z" fill="#184754" stroke="#5ac2d6" strokeWidth="1.5" />
                  <ellipse cx="285" cy="405" rx="28" ry="18" fill="#184754" stroke="#5ac2d6" strokeWidth="1.5" />
                  <path d="M595,405 Q650,375 715,385 Q690,410 595,405 Z" fill="#184754" stroke="#5ac2d6" strokeWidth="1.5" />

                  {MAP_MARKERS.map((marker) => {
                    const isSelected = selectedMarker.id === marker.id;
                    const color = getMarkerColor(marker.category);
                    return (
                      <g
                        key={marker.id}
                        transform={`translate(${marker.svgCoords.x}, ${marker.svgCoords.y})`}
                        onClick={() => setSelectedMarker(marker)}
                        className="cursor-pointer"
                      >
                        {isSelected && (
                          <circle r="26" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="1.5" />
                        )}
                        <circle r={isSelected ? 11 : 8} fill={color} stroke="#f1f0e8" strokeWidth="2" />
                        <text
                          y={-16}
                          textAnchor="middle"
                          fill="#f1f0e8"
                          fontSize={isSelected ? '13' : '11'}
                          fontFamily="JetBrains Mono"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {marker.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            <div className="bg-ink-2/95 px-5 py-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4 eyebrow text-[10px] text-sage/80">
              <div className="flex items-center gap-5">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5ac2d6]" /> Water basin
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-ember" /> Nuclear site
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sand" /> Hydrocarbon / industrial
                </span>
              </div>
              <span>No API keys • Offline-ready</span>
            </div>
          </div>

          {/* Dossier */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMarker.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-5 surface-strong overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-ink">
                  <img
                    src={selectedMarker.photoSrc}
                    alt={selectedMarker.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-2 via-transparent to-black/30" />
                  <span className="chip chip-sand absolute top-3 left-3 max-w-[85%]">
                    <Camera className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{selectedMarker.photoCredit}</span>
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 eyebrow text-[10px]">
                    <span className="inline-flex items-center gap-1.5 text-sand">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedMarker.region}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sage">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedMarker.dates}
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-ivory mb-4 leading-tight">
                    {selectedMarker.name}
                  </h3>

                  <div className="pl-4 border-l-2 border-ember mb-5">
                    <div className="flex items-center gap-2 eyebrow text-[10px] text-ember mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Primary environmental issue</span>
                    </div>
                    <div className="text-sm font-medium text-ivory">{selectedMarker.mainProblem}</div>
                  </div>

                  <p className="text-sm text-ivory/85 leading-relaxed mb-6">
                    {selectedMarker.shortExplanation}
                  </p>

                  <div className="space-y-2.5">
                    <div className="eyebrow text-[10px] text-sand">Documented historical facts</div>
                    {selectedMarker.keyFacts.map((fact, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm text-sage">
                        <span className="text-sand font-mono-code text-[11px] mt-0.5">0{index + 1}</span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 border-t border-ivory/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-sage">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                  <span className="line-clamp-1">{selectedMarker.currentStatus}</span>
                </div>
                <span className="font-mono-code text-[10.5px] text-sand shrink-0 inline-flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {selectedMarker.archiveRef}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
