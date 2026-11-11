import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BEFORE_CRISIS_LANDSCAPES,
  HISTORICAL_MILESTONES,
  TimelineMilestone,
} from '../data/historicalData';
import { AnimatedCounter, ChapterOpener, Eyebrow } from './CinematicPrimitives';
import {
  Calendar,
  MapPin,
  FileText,
  Radiation,
  Waves,
  Users,
  CheckCircle2,
  Camera,
} from 'lucide-react';

export const BeforeCrisisSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedMilestone = HISTORICAL_MILESTONES[selectedIndex];

  const getCategoryIcon = (category: TimelineMilestone['category']) => {
    switch (category) {
      case 'nuclear':
        return <Radiation className="w-4 h-4" />;
      case 'water':
        return <Waves className="w-4 h-4" />;
      case 'movement':
        return <Users className="w-4 h-4" />;
      case 'policy':
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const progressPercentage =
    HISTORICAL_MILESTONES.length > 1
      ? (selectedIndex / (HISTORICAL_MILESTONES.length - 1)) * 100
      : 100;

  return (
    <section id="section-1" className="relative bg-ink-2 overflow-hidden">
      <ChapterOpener
        number="01"
        tone="sage"
        eyebrow="Ecological Baseline & Turning Points"
        title={
          <>
            BEFORE EVERYTHING <span className="italic font-normal text-sage">CHANGED</span>
          </>
        }
        lede="Before mid-20th-century military testing and industrial irrigation reshaped Central Asia, Kazakhstan’s ecosystems—from the feather-grass steppes of Saryarka to the deep blue basin of the Aral Sea—sustained centuries of ecological balance."
        image="./images/kazakh-steppe-spring.jpg"
        imageAlt="Spring feather-grass steppe of central Kazakhstan under an open sky"
        credit="Saryarka steppe in spring • Wikimedia Commons"
        meta="Central Kazakhstan • 49.8° N, 73.1° E"
        objectPosition="center 60%"
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Three baseline landscapes — editorial trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-ivory/10 mb-28">
          {BEFORE_CRISIS_LANDSCAPES.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink ring-1 ring-ivory/10 group-hover:ring-sand/50 transition-shadow duration-500">
                <img
                  src={item.photoSrc}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] saturate-[0.9] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70" />
                <span className="chip chip-sand absolute top-3 left-3">
                  0{idx + 1} / Baseline ecosystem
                </span>
              </div>

              <div className="mt-6 flex-1">
                <p className="eyebrow text-sand mb-2">{item.subtitle}</p>
                <h3 className="font-serif-editorial text-3xl font-semibold text-ivory leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-ivory/75 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-6 pt-5 border-t border-ivory/10">
                <span className="block font-serif-editorial text-4xl font-semibold text-sand leading-none whitespace-nowrap">
                  <AnimatedCounter value={item.metric} suffix={item.metricSuffix} />
                </span>
                <span className="block mt-2 eyebrow text-[10px] text-sage">{item.metricLabel}</span>
              </div>
              <p className="mt-3 font-mono-code text-[10px] uppercase tracking-[0.14em] text-sage/55 truncate">
                {item.photoCredit}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Interactive timeline 1949–1991 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Eyebrow>Historical Journey • 1949 – 1991</Eyebrow>
              <h3 className="font-serif-editorial text-4xl sm:text-5xl text-ivory font-semibold mt-4 max-w-2xl">
                Four Turning Points That Reshaped the Steppe
              </h3>
            </div>
            <p className="eyebrow text-[10px] text-sage/70">Select a year on the track</p>
          </div>

          {/* Track */}
          <div className="relative mb-12">
            <div className="absolute left-0 right-0 top-[1.125rem] h-px bg-ivory/12" />
            <motion.div
              className="absolute left-0 top-[1.125rem] h-px bg-gradient-to-r from-sand via-ember to-sage"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10" role="tablist">
              {HISTORICAL_MILESTONES.map((milestone, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={milestone.year}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedIndex(idx)}
                    className="group text-left"
                  >
                    <span
                      className={`flex w-9 h-9 rounded-full border items-center justify-center mb-5 transition-all duration-300 ${
                        isSelected
                          ? 'bg-sand border-sand text-ink-2 shadow-[0_0_0_6px_rgba(201,167,121,0.15)]'
                          : 'bg-ink-2 border-ivory/20 text-sage group-hover:border-sand/60 group-hover:text-sand'
                      }`}
                    >
                      {getCategoryIcon(milestone.category)}
                    </span>
                    <span
                      className={`block font-serif-editorial text-4xl sm:text-5xl font-semibold leading-none transition-colors ${
                        isSelected ? 'text-sand' : 'text-ivory group-hover:text-sand-2'
                      }`}
                    >
                      {milestone.year}
                    </span>
                    <span className="block mt-2 text-sm text-ivory/80 leading-snug line-clamp-2 max-w-[24ch]">
                      {milestone.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected milestone */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMilestone.year}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="surface grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-8 lg:p-10"
            >
              <div className="lg:col-span-6 space-y-5">
                <span className="chip chip-sand">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedMilestone.subtitle}</span>
                </span>

                <h4 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory leading-tight">
                  {selectedMilestone.title}
                </h4>

                <p className="text-sm sm:text-base text-ivory/85 leading-relaxed">
                  {selectedMilestone.description}
                </p>

                <div className="pl-5 border-l-2 border-sand">
                  <div className="eyebrow text-sand mb-1.5">Documented historical fact</div>
                  <p className="text-sm text-ivory/90 leading-relaxed">{selectedMilestone.fact}</p>
                </div>

                <div className="flex flex-wrap items-center gap-5 pt-1 font-mono-code text-[11px] text-sage">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sand" />
                    {selectedMilestone.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-sand" />
                    {selectedMilestone.archiveCode}
                  </span>
                </div>
              </div>

              <figure className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-ivory/10 bg-ink">
                  <motion.img
                    key={selectedMilestone.photoSrc}
                    src={selectedMilestone.photoSrc}
                    alt={selectedMilestone.title}
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70" />
                  <span className="chip chip-sand absolute top-3 left-3">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{selectedMilestone.year} archival record</span>
                  </span>
                </div>
                <figcaption className="mt-3 flex flex-col gap-1">
                  <span className="text-xs text-ivory/85 leading-relaxed">
                    {selectedMilestone.imageCaption}
                  </span>
                  <span className="font-mono-code text-[10px] uppercase tracking-[0.14em] text-sage/60">
                    {selectedMilestone.photoCredit}
                  </span>
                </figcaption>
              </figure>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
