import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ARAL_DECLINE_DATA, ARAL_PHOTO_GALLERY } from '../data/historicalData';
import {
  ArchivalPhotoCard,
  AnimatedCounter,
  ChapterOpener,
  Eyebrow,
  StatStrip,
  Stat,
} from './CinematicPrimitives';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  MoveHorizontal,
  Droplets,
  Wind,
  Anchor,
  HeartPulse,
  CheckCircle,
  Camera,
  Sparkles,
} from 'lucide-react';

const CAUSES = [
  {
    icon: Droplets,
    tone: 'text-sand',
    title: 'Soviet Irrigation & River Diversion',
    body: (
      <>
        Starting in the 1960s, centralized plans expanded water-intensive cotton and rice
        across Central Asia. Huge volumes were diverted from the{' '}
        <strong className="text-ivory font-medium">Amu Darya</strong> and{' '}
        <strong className="text-ivory font-medium">Syr Darya</strong> into unlined desert
        canals where up to half the water evaporated or seeped into sand.
      </>
    ),
  },
  {
    icon: Anchor,
    tone: 'text-sand',
    title: 'Collapse of Fishing Communities',
    body: (
      <>
        In 1960, the Aral Sea supplied over 43,000 tons of fish annually and employed 60,000
        workers in ports like Aralsk. By the 1980s, salinity tripled, native fish died out,
        and trawlers were left stranded in desert sand up to 100 km from water.
      </>
    ),
  },
  {
    icon: Wind,
    tone: 'text-ember',
    title: 'Toxic Salt & Dust Storms',
    body: (
      <>
        The exposed seabed became the{' '}
        <strong className="text-ivory font-medium">Aralkum Desert</strong>. High winds lift
        millions of tons of toxic dust laced with salt, agricultural pesticides, and
        fertilizers each year—causing respiratory illnesses, anemia, and crop damage.
      </>
    ),
  },
  {
    icon: HeartPulse,
    tone: 'text-ember',
    title: 'Climate & Public Health Impact',
    body: (
      <>
        Without the moderating thermal mass of a 68,000 km² sea, regional summers grew hotter
        and drier while winters became colder and longer. Drinking-water mineralization
        created severe health challenges for Kyzylorda communities.
      </>
    ),
  },
];

export const AralSeaSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [selectedYearIdx, setSelectedYearIdx] = useState<number>(0);
  const [comparisonMode, setComparisonMode] = useState<'satellite-photo' | 'cartographic'>(
    'satellite-photo'
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1 && e.pointerType === 'mouse') return;
    updatePosition(e.clientX);
  };

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos(Math.round((x / rect.width) * 100));
  };

  const selectedData = ARAL_DECLINE_DATA[selectedYearIdx];

  return (
    <section id="section-2" className="relative bg-ink-2 overflow-hidden">
      <ChapterOpener
        number="02"
        eyebrow="Hydrological Crisis & Partial Restoration"
        title={
          <>
            THE SEA THAT <span className="italic font-normal text-sand">DISAPPEARED</span>
          </>
        }
        lede="In 1960, the Aral Sea was the fourth-largest inland lake on Earth, covering 68,000 km². Soviet water diversion from the Amu Darya and Syr Darya shrank more than 80% of the basin—yet thanks to the 2005 Kok-Aral Dam, the North Aral Sea in Kazakhstan did not disappear."
        image="./images/aral-harbor-ships.jpg"
        imageAlt="Rusting fishing vessels stranded in the former harbor of Aralsk"
        credit="Abandoned fleet at Aralsk harbor • Documentary photograph"
        meta="Kyzylorda Region • 46.8° N, 61.7° E"
        objectPosition="center 45%"
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Key hydrological figures */}
        <StatStrip className="mb-24">
          <Stat
            tone="aqua"
            label="1960 surface area"
            value={<AnimatedCounter value={68000} suffix=" km²" />}
            note="4th largest inland water body on Earth"
          />
          <Stat
            tone="sand"
            label="1960 fish harvest"
            value={<AnimatedCounter value={43000} suffix=" t" />}
            valueClassName="text-sand"
            note="Annual catch supporting 60,000 jobs"
          />
          <Stat
            tone="ember"
            label="Exposed seabed"
            value={<AnimatedCounter value={60000} suffix=" km²" />}
            note="New Aralkum salt and pesticide desert"
          />
          <Stat
            tone="sage"
            label="Kok-Aral Dam (2005)"
            value={<AnimatedCounter value={13} suffix=" km" />}
            valueClassName="text-sage"
            note="Dike that saved the North Aral Sea"
          />
        </StatStrip>

        {/* Satellite comparison slider */}
        <div className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <Eyebrow>Interactive satellite comparison</Eyebrow>
              <h3 className="font-serif-editorial text-4xl sm:text-5xl text-ivory font-semibold mt-4">
                1964 Baseline vs. Modern State
              </h3>
              <p className="mt-3 text-sm text-sage max-w-lg">
                Drag across the sea to compare the unified basin photographed from orbit in
                1964 with today’s NASA MODIS view.
              </p>
            </div>

            <div className="segmented self-start md:self-auto">
              <button
                data-active={comparisonMode === 'satellite-photo'}
                onClick={() => setComparisonMode('satellite-photo')}
              >
                NASA satellite photos
              </button>
              <button
                data-active={comparisonMode === 'cartographic'}
                onClick={() => setComparisonMode('cartographic')}
              >
                Annotated hydrological map
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            onPointerDown={(e) => updatePosition(e.clientX)}
            onPointerMove={handlePointerMove}
            className="relative w-full aspect-[16/10] sm:aspect-[16/8.5] rounded-2xl overflow-hidden ring-1 ring-ivory/12 bg-ink select-none cursor-ew-resize shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
          >
            {comparisonMode === 'satellite-photo' ? (
              <>
                {/* Base layer: modern MODIS */}
                <div className="absolute inset-0 w-full h-full bg-ink">
                  <img
                    src="./images/aral-2014-modis.jpg"
                    alt="NASA Terra MODIS satellite image of the shrunken Aral Sea and intact North Aral Sea"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
                  <div className="absolute top-5 right-5 max-w-xs text-right">
                    <div className="eyebrow text-sand">Modern • NASA MODIS</div>
                    <div className="text-xs text-ivory/85 mt-1.5 leading-relaxed hidden sm:block">
                      North Aral Sea preserved by the Kok-Aral Dam (top); the eastern South
                      Basin dried into the Aralkum Desert
                    </div>
                  </div>
                </div>

                {/* Clipped layer: 1964 Argon */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden bg-ink"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src="./images/aral-1964-nasa.jpg"
                    alt="1964 NASA Argon satellite photograph of the full Aral Sea"
                    className="w-full h-full object-cover object-center filter sepia-[0.12] contrast-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
                  <div className="absolute top-5 left-5 max-w-xs">
                    <div className="eyebrow text-aqua">1964 • NASA Argon</div>
                    <div className="text-xs text-ivory/85 mt-1.5 leading-relaxed hidden sm:block">
                      Unified 68,000 km² inland sea • 4th largest lake in the world
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 w-full h-full">
                  <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                    <rect width="1000" height="500" fill="#121a18" />
                    <path
                      d="M360,65 C425,50 495,62 535,95 C565,120 625,155 630,235 C635,325 575,415 475,435 C385,450 325,395 315,310 C305,220 315,130 360,65 Z"
                      fill="#2b241b"
                      stroke="#c9a779"
                      strokeOpacity="0.45"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    <path
                      d="M395,72 C445,60 505,72 522,105 C532,125 495,148 452,146 C415,144 375,132 372,105 C370,85 380,76 395,72 Z"
                      fill="#1e6b7b"
                      stroke="#7ad7e8"
                      strokeWidth="2"
                    />
                    <line x1="425" y1="146" x2="478" y2="146" stroke="#f1f0e8" strokeWidth="3.5" />
                    <path
                      d="M342,185 C365,180 382,215 378,275 C374,335 358,370 338,360 C322,350 318,285 326,230 C332,198 335,188 342,185 Z"
                      fill="#174a56"
                      stroke="#4fa3b8"
                    />
                    <g fontFamily="JetBrains Mono" fontSize="12">
                      <text x="540" y="102" fill="#7ad7e8" fontWeight="bold">
                        ← North Aral Sea (restored in Kazakhstan)
                      </text>
                      <text x="492" y="154" fill="#f1f0e8" fontSize="11">
                        ← Kok-Aral Dam (2005)
                      </text>
                      <text x="445" y="290" fill="#c9a779" fontWeight="bold">
                        ARALKUM SALT DESERT
                      </text>
                    </g>
                  </svg>
                </div>

                <div
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                    <rect width="1000" height="500" fill="#101a19" />
                    <path
                      d="M360,65 C425,50 495,62 535,95 C565,120 625,155 630,235 C635,325 575,415 475,435 C385,450 325,395 315,310 C305,220 315,130 360,65 Z"
                      fill="#18596a"
                      stroke="#7ad7e8"
                      strokeWidth="2.5"
                    />
                    <text
                      x="405"
                      y="265"
                      fill="#f1f0e8"
                      fontSize="20"
                      fontFamily="Cormorant Garamond"
                      fontWeight="bold"
                    >
                      THE UNIFIED ARAL SEA (1960 • 68,000 km²)
                    </text>
                  </svg>
                </div>
              </>
            )}

            {/* Divider + handle */}
            <div
              className="absolute top-0 bottom-0 w-px bg-sand shadow-[0_0_24px_rgba(201,167,121,0.9)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-sand text-ink-2 flex items-center justify-center shadow-2xl ring-2 ring-ivory/90">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-5">
            <span className="eyebrow text-[10px] text-aqua shrink-0">1964 full sea</span>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Compare Aral Sea before and after"
              className="range-sand"
            />
            <span className="eyebrow text-[10px] text-sand shrink-0">Modern state</span>
          </div>
        </div>

        {/* Photo essay */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Eyebrow>
                <span className="inline-flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5" /> Archival photo essay • The Aral Sea
                </span>
              </Eyebrow>
              <h3 className="font-serif-editorial text-4xl sm:text-5xl text-ivory font-semibold mt-4 max-w-2xl">
                From Thriving Ports to the Aralkum—and Back
              </h3>
            </div>
            <span className="eyebrow text-[10px] text-sage/70">NASA • Copernicus • Documentary</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {ARAL_PHOTO_GALLERY.map((photo) => (
              <ArchivalPhotoCard
                key={photo.id}
                src={photo.src}
                alt={photo.title}
                year={photo.year}
                title={photo.title}
                caption={photo.caption}
                credit={photo.credit}
              />
            ))}
          </div>
        </div>

        {/* Causes and consequences — open list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28">
          <div className="lg:col-span-4">
            <Eyebrow>Causes & consequences</Eyebrow>
            <h3 className="font-serif-editorial text-4xl sm:text-5xl text-ivory font-semibold mt-4 leading-tight">
              How a Sea Became a Desert
            </h3>
            <p className="mt-4 text-sm text-sage leading-relaxed">
              Four interlocking processes, documented by NASA, UNEP, and the World Bank,
              turned the fourth-largest lake on Earth into the youngest desert on the planet.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {CAUSES.map((cause, idx) => {
              const Icon = cause.icon;
              return (
                <motion.div
                  key={cause.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="py-7 border-t border-ivory/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${cause.tone}`} />
                    <span className="font-mono-code text-[10px] text-sage/60 tracking-[0.18em]">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="font-serif-editorial text-2xl font-semibold text-ivory leading-tight mb-2">
                    {cause.title}
                  </h4>
                  <p className="text-sm text-sage leading-relaxed">{cause.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Kok-Aral highlight */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="surface-strong grid grid-cols-1 md:grid-cols-12 overflow-hidden mb-28"
        >
          <div className="md:col-span-7 p-7 sm:p-10">
            <div className="flex items-center gap-2 eyebrow text-sage mb-4">
              <CheckCircle className="w-4 h-4" />
              <span>Why the entire sea did not disappear</span>
            </div>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-ivory leading-tight mb-4">
              The Kok-Aral Dam &amp; the Return of the North Aral Sea (2005 – present)
            </h3>
            <p className="text-sm sm:text-base text-ivory/85 leading-relaxed">
              After the Aral Sea split into two bodies in 1989, independent Kazakhstan partnered
              with the World Bank to construct the 13-kilometre{' '}
              <strong className="text-sand font-medium">Kok-Aral Dam</strong> in 2005. Within
              months, the North Aral Sea rose by 4 metres, salinity fell by more than half, and
              commercial fishing revived in the Kyzylorda region.
            </p>
          </div>
          <div className="md:col-span-5 relative min-h-[220px]">
            <img
              src="./images/aral-north-recovery.jpg"
              alt="NASA satellite comparison showing North Aral Sea expansion between 2005 and 2006"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-2 via-transparent to-transparent hidden md:block" />
            <span className="chip chip-sand absolute bottom-3 left-3">NASA • 2005 → 2006</span>
          </div>
        </motion.div>

        {/* Telemetry chart + year inspector */}
        <div className="surface-strong p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <Eyebrow>Hydrological telemetry • 1960 – 2024</Eyebrow>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-ivory mt-4 mb-8">
                Documented Surface Area Decline (km²)
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ARAL_DECLINE_DATA} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c9a779" stopOpacity={0.55} />
                        <stop offset="95%" stopColor="#c9a779" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(241,240,232,0.08)" vertical={false} />
                    <XAxis
                      dataKey="year"
                      stroke="rgba(241,240,232,0.18)"
                      tick={{ fill: '#a8bba5', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="rgba(241,240,232,0.18)"
                      tick={{ fill: '#a8bba5', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                      axisLine={false}
                      width={56}
                      tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                    />
                    <Tooltip
                      cursor={{ stroke: '#c9a779', strokeOpacity: 0.4 }}
                      contentStyle={{
                        backgroundColor: '#101c1b',
                        border: '1px solid rgba(201,167,121,0.4)',
                        borderRadius: '10px',
                        color: '#f1f0e8',
                        fontFamily: 'JetBrains Mono',
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="areaKm2"
                      name="Surface area (km²)"
                      stroke="#c9a779"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#areaColor)"
                      activeDot={{ r: 5, fill: '#c9a779', stroke: '#f1f0e8', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-ivory/10 lg:pl-10">
              <div className="eyebrow text-sage mb-4">Select documented year</div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {ARAL_DECLINE_DATA.map((pt, index) => (
                  <button
                    key={pt.year}
                    onClick={() => setSelectedYearIdx(index)}
                    className={`px-3 py-1.5 rounded-full font-mono-code text-[11px] tracking-wide transition-colors border ${
                      selectedYearIdx === index
                        ? 'bg-sand text-ink-2 border-sand font-semibold'
                        : 'bg-transparent text-ivory/80 border-ivory/12 hover:border-sand/60 hover:text-ivory'
                    }`}
                  >
                    {pt.year}
                  </button>
                ))}
              </div>

              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-5 ring-1 ring-ivory/10">
                <img
                  src={selectedData.photoSrc}
                  alt={`Aral Sea state in ${selectedData.year}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <span className="chip chip-sand absolute bottom-3 left-3">
                  <Sparkles className="w-3 h-3" />
                  <span>Archival visual • {selectedData.year}</span>
                </span>
              </div>

              <div className="grid grid-cols-3 border-y border-ivory/10 mb-5">
                <div className="py-4 pr-3">
                  <div className="eyebrow text-[10px] text-sage/70 mb-1.5">Area</div>
                  <div className="font-serif-editorial text-2xl font-semibold text-ivory leading-none">
                    {selectedData.areaKm2.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-sage">km²</span>
                  </div>
                </div>
                <div className="py-4 px-3 border-l border-ivory/10">
                  <div className="eyebrow text-[10px] text-sage/70 mb-1.5">Volume</div>
                  <div className="font-serif-editorial text-2xl font-semibold text-sand leading-none">
                    {selectedData.volumeKm3} <span className="text-xs font-normal text-sage">km³</span>
                  </div>
                </div>
                <div className="py-4 pl-3 border-l border-ivory/10">
                  <div className="eyebrow text-[10px] text-sage/70 mb-1.5">Salinity</div>
                  <div className="font-serif-editorial text-2xl font-semibold text-sage leading-none">
                    {selectedData.salinityGL} <span className="text-xs font-normal text-sage">g/L</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-ivory/90 leading-relaxed">
                <strong className="text-sand font-mono-code text-xs">{selectedData.year} — </strong>
                {selectedData.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
