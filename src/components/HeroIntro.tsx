import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Play, Compass, ShieldAlert, Droplets, Camera } from 'lucide-react';
import { WordByWordReveal, AnimatedCounter } from './CinematicPrimitives';

interface HeroIntroProps {
  onBeginJourney: () => void;
  onEnterPresentation: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  onBeginJourney,
  onEnterPresentation,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -40]);

  return (
    <section
      ref={heroRef}
      id="section-0"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-ink text-ivory select-none"
    >
      {/* Archival photograph with slow Ken Burns drift */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="./images/aral-ship-graveyard.jpg"
          alt="Abandoned fishing vessel resting on the dry seabed of the Aral Sea"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 0.82 }}
          transition={{
            scale: { duration: 18, ease: 'easeOut' },
            opacity: { duration: 1.6, ease: 'easeOut' },
          }}
          className="w-full h-full object-cover object-[62%_center] filter contrast-[1.06] saturate-[0.8]"
        />

        {/* Documentary grading */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_45%,transparent_20%,#0e1211_100%)] opacity-70" />
      </motion.div>

      {/* Top metadata strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-24 md:pt-28 flex flex-wrap items-center justify-between gap-4 border-b border-ivory/12 pb-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-sand animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-sand" />
          </span>
          <span className="eyebrow text-sand">Kazakhstan • 20th Century</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-5 eyebrow text-[10px] text-sage/80"
        >
          <span className="inline-flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-sand" />
            <span>Archival plate: Aral Sea ship graveyard</span>
          </span>
          <span className="hidden md:inline text-sand/50">•</span>
          <span className="hidden md:inline">46.3000° N, 60.7000° E</span>
        </motion.div>
      </div>

      {/* Title sequence */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 my-auto py-12"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="chip chip-sand mb-7"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Digital Museum &amp; Documentary</span>
          </motion.div>

          <h1 className="font-serif-editorial text-[3.4rem] sm:text-7xl md:text-8xl lg:text-[7.25rem] font-semibold tracking-tight leading-[0.92] text-ivory mb-7">
            <WordByWordReveal
              text="THE LAND REMEMBERS."
              highlightWords={['REMEMBERS.']}
              delay={0.25}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-[1.75rem] text-ivory/90 font-serif-editorial italic max-w-2xl leading-snug mb-6"
          >
            “Environmental disasters that changed Kazakhstan forever.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-sage max-w-xl leading-relaxed mb-10"
          >
            Across the second half of the 20th century, the steppes and inland seas of
            Kazakhstan became the proving ground for industrial irrigation mega-projects and
            Cold War nuclear testing. Explore declassified archival photographs, NASA satellite
            evidence, and a story of ecological resilience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button onClick={onBeginJourney} className="btn-primary group">
              <span>Begin the Journey</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            <button onClick={onEnterPresentation} className="btn-ghost">
              <Play className="w-4 h-4 text-sand fill-sand" />
              <span>Launch Presentation Mode</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom anchors */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-8 pt-6 border-t border-ivory/12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 w-full md:w-auto">
          <div className="flex items-start gap-3">
            <Droplets className="w-5 h-5 text-aqua shrink-0 mt-0.5" />
            <div>
              <div className="eyebrow text-[10px] text-sage/80 mb-1">1960 Aral baseline</div>
              <div className="font-serif-editorial text-2xl text-ivory leading-none">
                <AnimatedCounter value={68000} suffix=" km²" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-ember shrink-0 mt-0.5" />
            <div>
              <div className="eyebrow text-[10px] text-sage/80 mb-1">Semipalatinsk Polygon</div>
              <div className="font-serif-editorial text-2xl text-ivory leading-none">
                <AnimatedCounter value={456} /> <span className="text-base text-sage">tests</span>
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-start gap-3">
            <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-sage" />
            </span>
            <div>
              <div className="eyebrow text-[10px] text-sage/80 mb-1">Verified archives</div>
              <div className="text-sm font-medium text-ivory">NASA • IAEA • World Bank • UN</div>
            </div>
          </div>
        </div>

        <button
          onClick={onBeginJourney}
          className="group flex items-center gap-3 eyebrow text-sage hover:text-sand transition-colors self-end md:self-auto"
          aria-label="Scroll to next section"
        >
          <span>Scroll to explore</span>
          <span className="relative w-6 h-10 rounded-full border border-sand/50 flex items-start justify-center p-1.5 overflow-hidden">
            <motion.span
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2.5 rounded-full bg-sand"
            />
          </span>
        </button>
      </div>
    </section>
  );
};
