import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SEMIPALATINSK_TIMELINE_DATA,
  SEMIPALATINSK_PHOTO_GALLERY,
} from '../data/historicalData';
import {
  AnimatedCounter,
  ArchivalPhotoCard,
  ChapterOpener,
  Eyebrow,
  StatStrip,
  Stat,
} from './CinematicPrimitives';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Users, FileCheck2, Radio, Camera } from 'lucide-react';

export const SemipalatinskSection: React.FC = () => {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState<number>(0);
  const selectedPeriod = SEMIPALATINSK_TIMELINE_DATA[selectedPeriodIdx];

  return (
    <section id="section-3" className="relative bg-ink-2 overflow-hidden">
      <ChapterOpener
        number="03"
        tone="ember"
        eyebrow="Semipalatinsk Nuclear Test Site • 1949 – 1991"
        title={
          <>
            456 TESTS.{' '}
            <span className="italic font-normal text-ember">GENERATIONS OF CONSEQUENCES.</span>
          </>
        }
        lede="For forty years between August 29, 1949 and October 19, 1989, an 18,500 km² expanse of the East Kazakhstan steppe—the Semipalatinsk Polygon—served as the primary nuclear weapons testing ground of the Soviet Union."
        image="./images/semey-polygon-steppe.jpg"
        imageAlt="Open steppe of the former Semipalatinsk nuclear test site"
        credit="The silent steppe of the Polygon • Documentary photograph"
        meta="East Kazakhstan • 50.1° N, 78.7° E"
        objectPosition="center 55%"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Faint radiological glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[48rem] h-[20rem] rounded-full bg-ember/[0.06] blur-[140px] pointer-events-none" />

        <StatStrip className="relative mb-24">
          <Stat
            tone="ember"
            label="Total verified detonations"
            value={<AnimatedCounter value={456} />}
            note="Conducted between Aug 29, 1949 and Oct 19, 1989"
          />
          <Stat
            tone="sand"
            label="Atmospheric & surface"
            value={<AnimatedCounter value={116} />}
            valueClassName="text-sand"
            note="Open-air tests (1949–1962) before the Partial Test Ban Treaty"
          />
          <Stat
            tone="sage"
            label="Underground tests"
            value={<AnimatedCounter value={340} />}
            note="Detonated in Degelen tunnels and Balapan boreholes (1961–1989)"
          />
          <Stat
            tone="ember"
            label="Affected population"
            value={<AnimatedCounter value={1.3} decimals={1} suffix="M+" />}
            note="Citizens officially recognized as affected by radiation exposure"
          />
        </StatStrip>

        {/* Archival photography */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Eyebrow tone="ember">
                <span className="inline-flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5" /> Declassified visual evidence • 1949 – 2010
                </span>
              </Eyebrow>
              <h3 className="font-serif-editorial text-4xl sm:text-5xl text-ivory font-semibold mt-4">
                Inside the Semipalatinsk Polygon
              </h3>
            </div>
            <span className="eyebrow text-[10px] text-sage/70">CTBTO • NNSA • IAEA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {SEMIPALATINSK_PHOTO_GALLERY.map((photo) => (
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

        {/* Chart + sector map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-28 items-stretch">
          <div className="lg:col-span-7 surface-strong p-6 sm:p-8 flex flex-col">
            <Eyebrow tone="ember">IAEA &amp; NNC RK archival data</Eyebrow>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-ivory mt-4 mb-8">
              Atmospheric vs. Underground Testing by Era
            </h3>

            <div className="h-72 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SEMIPALATINSK_TIMELINE_DATA} margin={{ top: 10, right: 8, left: -14, bottom: 5 }} barCategoryGap="28%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(241,240,232,0.08)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(241,240,232,0.18)"
                    tick={{ fill: '#a8bba5', fontSize: 10.5, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="rgba(241,240,232,0.18)"
                    tick={{ fill: '#a8bba5', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(241,240,232,0.04)' }}
                    contentStyle={{
                      backgroundColor: '#101413',
                      border: '1px solid rgba(217,78,65,0.5)',
                      borderRadius: '10px',
                      color: '#f1f0e8',
                      fontFamily: 'JetBrains Mono',
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#a8bba5', paddingTop: 8 }}
                  />
                  <Bar dataKey="atmospheric" name="Atmospheric / surface" stackId="a" fill="#d94e41" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="underground" name="Underground" stackId="a" fill="#c9a779" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-auto pt-5 border-t border-ivory/10">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {SEMIPALATINSK_TIMELINE_DATA.map((item, idx) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedPeriodIdx(idx)}
                    className={`px-3 py-1.5 rounded-full font-mono-code text-[11px] tracking-wide border transition-colors ${
                      selectedPeriodIdx === idx
                        ? 'bg-ember text-ivory border-ember'
                        : 'bg-transparent text-sage border-ivory/12 hover:border-ember/60 hover:text-ivory'
                    }`}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
              <p className="text-sm text-ivory/90 leading-relaxed">
                <strong className="text-sand font-mono-code text-xs">
                  {selectedPeriod.year} • cumulative {selectedPeriod.totalCumulative} tests —{' '}
                </strong>
                {selectedPeriod.eventNote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 surface-strong p-6 sm:p-8 flex flex-col">
            <Eyebrow>Cartographic survey • 18,500 km²</Eyebrow>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-ivory mt-4 mb-5">
              Testing Zones &amp; Nearby Communities
            </h3>

            <div className="rounded-xl overflow-hidden ring-1 ring-ivory/10 bg-ink my-auto">
              <svg viewBox="0 0 500 340" className="w-full h-full">
                <rect width="500" height="340" fill="#0e1312" />
                <g stroke="#f1f0e8" strokeOpacity="0.05" strokeWidth="1">
                  <line x1="125" y1="0" x2="125" y2="340" />
                  <line x1="250" y1="0" x2="250" y2="340" />
                  <line x1="375" y1="0" x2="375" y2="340" />
                  <line x1="0" y1="113" x2="500" y2="113" />
                  <line x1="0" y1="226" x2="500" y2="226" />
                </g>
                <path d="M120,20 Q260,55 480,95" fill="none" stroke="#3e7b8b" strokeWidth="4" />
                <text x="345" y="65" fill="#7ad7e8" fontSize="10" fontFamily="JetBrains Mono">
                  Irtysh River → Semey
                </text>

                <polygon
                  points="115,65 345,85 385,255 245,305 95,240"
                  fill="#d94e41"
                  fillOpacity="0.08"
                  stroke="#d94e41"
                  strokeWidth="1.8"
                  strokeDasharray="6 4"
                />

                <circle cx="215" cy="145" r="24" fill="#d94e41" fillOpacity="0.2" stroke="#d94e41" />
                <circle cx="215" cy="145" r="4" fill="#d94e41" />
                <text x="245" y="142" fill="#f1f0e8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                  Opytnoye Pole
                </text>
                <text x="245" y="156" fill="#a8bba5" fontSize="9.5" fontFamily="JetBrains Mono">
                  RDS-1 (1949) &amp; RDS-6s (1953)
                </text>

                <polygon points="180,235 195,210 210,235" fill="#c9a779" />
                <text x="145" y="255" fill="#c9a779" fontSize="10.5" fontFamily="JetBrains Mono">
                  Degelen Mt. (181 tunnels)
                </text>

                <circle cx="315" cy="215" r="7" fill="#3e7b8b" stroke="#c9a779" strokeWidth="1.5" />
                <text x="260" y="200" fill="#f1f0e8" fontSize="10.5" fontFamily="JetBrains Mono">
                  Balapan / Chagan (1965)
                </text>

                <circle cx="430" cy="75" r="4" fill="#a8bba5" />
                <text x="395" y="50" fill="#f1f0e8" fontSize="11" fontFamily="JetBrains Mono">
                  Semipalatinsk (Semey)
                </text>

                <text x="18" y="322" fill="#a8bba5" fontSize="9.5" fontFamily="JetBrains Mono">
                  SOURCE: IAEA RADIOLOGICAL ASSESSMENT REPORT (1998)
                </text>
              </svg>
            </div>

            <p className="text-xs text-sage leading-relaxed mt-5">
              Located just 150 km west of the city of Semipalatinsk (now Semey), the site
              bordered rural farming communities in the Abai, Beskaragai, and Zhanasemey
              districts.
            </p>
          </div>
        </div>

        {/* Three pillars — open columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-ivory/10 border-t border-ivory/10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:pr-8"
          >
            <Radio className="w-6 h-6 text-ember mb-5" />
            <h3 className="font-serif-editorial text-2xl font-semibold text-ivory mb-3 leading-tight">
              Environmental &amp; Human Cost
            </h3>
            <p className="text-sm text-sage leading-relaxed">
              Radioactive isotopes—including Strontium-90, Cesium-137, and Plutonium-239—settled
              across steppe pastures and water sources. Because radiation data remained
              classified for decades, local families continued grazing livestock and drinking
              well water, leading to multigenerational rates of cancer, thyroid disease, and
              birth complications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:px-8"
          >
            <Users className="w-6 h-6 text-sand mb-5" />
            <h3 className="font-serif-editorial text-2xl font-semibold text-ivory mb-3 leading-tight">
              The Nevada–Semipalatinsk Movement (1989)
            </h3>
            <p className="text-sm text-sage leading-relaxed">
              In February 1989, after radioactive gas leaked from an underground test, Kazakh
              poet <strong className="text-ivory font-medium">Olzhas Suleimenov</strong> called
              on citizens to demand an end to testing. Uniting Kazakh villagers, physicians,
              miners, and international activists from Nevada, over 2 million people signed the
              anti-nuclear petition.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:pl-8"
          >
            <FileCheck2 className="w-6 h-6 text-sage mb-5" />
            <h3 className="font-serif-editorial text-2xl font-semibold text-ivory mb-3 leading-tight">
              Closure in 1991 &amp; Global Legacy
            </h3>
            <p className="text-sm text-sage leading-relaxed">
              Driven by public courage, the final detonation occurred on October 19, 1989. On{' '}
              <strong className="text-ivory font-medium">August 29, 1991</strong>, Kazakhstan
              officially closed the Polygon by Decree No. 409—becoming the first nation in
              history to shut down a major nuclear test site through the will of its people.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
