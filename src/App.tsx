import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HeroIntro } from './components/HeroIntro';
import { BeforeCrisisSection } from './components/BeforeCrisisSection';
import { AralSeaSection } from './components/AralSeaSection';
import { SemipalatinskSection } from './components/SemipalatinskSection';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { HistorySimulationSection } from './components/HistorySimulationSection';
import { FutureClosingSection } from './components/FutureClosingSection';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Menu,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

export interface SectionMeta {
  index: number;
  id: string;
  number: string;
  shortTitle: string;
  chapterLabel: string;
}

const SECTIONS: SectionMeta[] = [
  { index: 0, id: 'section-0', number: '00', shortTitle: 'Intro', chapterLabel: 'The Land Remembers' },
  { index: 1, id: 'section-1', number: '01', shortTitle: 'Before', chapterLabel: 'Before Everything Changed' },
  { index: 2, id: 'section-2', number: '02', shortTitle: 'Aral Sea', chapterLabel: 'The Sea That Disappeared' },
  { index: 3, id: 'section-3', number: '03', shortTitle: 'Semipalatinsk', chapterLabel: '456 Nuclear Tests' },
  { index: 4, id: 'section-4', number: '04', shortTitle: 'Map', chapterLabel: 'The Map of Consequences' },
  { index: 5, id: 'section-5', number: '05', shortTitle: 'Simulation', chapterLabel: 'What Would You Have Done?' },
  { index: 6, id: 'section-6', number: '06', shortTitle: 'Future', chapterLabel: 'Recovery & References' },
];

export function App() {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const navigateToSection = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
      setCurrentSlide(clamped);
      setMobileMenuOpen(false);

      if (!isPresentationMode) {
        const el = document.getElementById(SECTIONS[clamped].id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [isPresentationMode]
  );

  // Keyboard navigation in Presentation Mode
  useEffect(() => {
    if (!isPresentationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(SECTIONS.length - 1, prev + 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(0, prev - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'Escape') {
        setIsPresentationMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode]);

  // Track active section + header state while scrolling in documentary mode
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      if (isPresentationMode) return;

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSlide(i);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPresentationMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const enterPresentation = () => {
    setIsPresentationMode(true);
    setCurrentSlide(0);
    window.scrollTo({ top: 0 });
  };

  const renderSlideComponent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <HeroIntro
            onBeginJourney={() => navigateToSection(1)}
            onEnterPresentation={enterPresentation}
          />
        );
      case 1:
        return <BeforeCrisisSection />;
      case 2:
        return <AralSeaSection />;
      case 3:
        return <SemipalatinskSection />;
      case 4:
        return <InteractiveMapSection />;
      case 5:
        return <HistorySimulationSection />;
      case 6:
        return <FutureClosingSection onBackToTop={() => navigateToSection(0)} />;
      default:
        return null;
    }
  };

  const headerSolid = scrolled || isPresentationMode || mobileMenuOpen;

  return (
    <div className="min-h-screen bg-ink-2 text-ivory relative">
      {/* Fixed editorial masthead */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          headerSolid
            ? 'bg-ink-2/85 backdrop-blur-xl border-b border-ivory/10'
            : 'bg-gradient-to-b from-ink/80 to-transparent border-b border-transparent'
        }`}
      >
        {/* Reading progress */}
        {!isPresentationMode && (
          <motion.div
            style={{ scaleX: progress }}
            className="absolute bottom-[-1px] left-0 right-0 h-px origin-left bg-gradient-to-r from-sand via-sand-2 to-sand"
          />
        )}

        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => navigateToSection(0)}
            className="flex items-center gap-3 text-left group min-w-0"
          >
            <span className="relative flex w-2.5 h-2.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-sand/50 group-hover:animate-ping" />
              <span className="relative rounded-full w-2.5 h-2.5 bg-sand" />
            </span>
            <div className="leading-none min-w-0">
              <span className="font-serif-editorial text-base sm:text-[1.35rem] font-semibold tracking-[0.04em] text-ivory block truncate">
                THE LAND REMEMBERS
              </span>
              <span className="eyebrow text-[9.5px] text-sage/80 hidden sm:block mt-1 whitespace-nowrap">
                Kazakhstan • 20th century
              </span>
            </div>
          </button>

          {/* Chapter navigation */}
          <nav className="hidden xl:flex items-center gap-0" aria-label="Chapters">
            {SECTIONS.map((sec) => {
              const isActive = currentSlide === sec.index;
              return (
                <button
                  key={sec.id}
                  onClick={() => navigateToSection(sec.index)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative px-2.5 py-2 font-mono-code text-[11px] tracking-[0.06em] uppercase whitespace-nowrap transition-colors ${
                    isActive ? 'text-ivory' : 'text-sage/80 hover:text-ivory'
                  }`}
                >
                  <span className={`mr-1.5 ${isActive ? 'text-sand' : 'text-sand/50'}`}>
                    {sec.number}
                  </span>
                  {sec.shortTitle}
                  <span
                    className={`absolute left-2.5 right-2.5 -bottom-0.5 h-px bg-sand transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {!isPresentationMode && (
              <a
                href="#sources-references"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 font-mono-code text-[11px] uppercase tracking-[0.08em] whitespace-nowrap text-sage hover:text-sand transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Sources</span>
              </a>
            )}

            <button
              onClick={() =>
                isPresentationMode ? setIsPresentationMode(false) : enterPresentation()
              }
              aria-label={isPresentationMode ? 'Exit presentation mode' : 'Enter presentation mode'}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-mono-code text-[11px] uppercase tracking-[0.1em] whitespace-nowrap shrink-0 transition-all border ${
                isPresentationMode
                  ? 'bg-ember/15 text-ember border-ember/50 hover:bg-ember/25'
                  : 'bg-sand text-ink-2 border-sand font-semibold hover:bg-sand-2'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isPresentationMode ? 'Exit Presentation' : 'Presentation Mode'}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2 rounded-full border border-ivory/15 text-ivory hover:border-sand/60 transition-colors"
              aria-label="Toggle chapter menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet chapter drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden border-t border-ivory/10 bg-ink-2/95 backdrop-blur-xl px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-2"
            >
              {SECTIONS.map((sec) => {
                const isActive = currentSlide === sec.index;
                return (
                  <button
                    key={sec.id}
                    onClick={() => navigateToSection(sec.index)}
                    className={`p-3 rounded-xl text-left border transition-colors ${
                      isActive
                        ? 'bg-sand text-ink-2 border-sand'
                        : 'bg-forest/60 text-ivory border-ivory/10 hover:border-sand/50'
                    }`}
                  >
                    <div className="font-mono-code text-[10px] tracking-[0.12em] uppercase opacity-80">
                      {sec.number} • {sec.shortTitle}
                    </div>
                    <div className="font-serif-editorial text-base leading-tight mt-0.5">
                      {sec.chapterLabel}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content: slide-by-slide presentation or full documentary scroll */}
      {isPresentationMode ? (
        <main className="pt-16 pb-24 min-h-screen flex flex-col justify-between bg-ink-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex-1"
            >
              {renderSlideComponent(currentSlide)}
            </motion.div>
          </AnimatePresence>

          {/* Projector HUD */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink-2/90 backdrop-blur-xl border-t border-ivory/10 px-4 sm:px-8 py-3">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-mono-code text-[11px] tracking-[0.12em] uppercase text-sand">
                  Slide {String(currentSlide + 1).padStart(2, '0')}
                  <span className="text-sage/60"> / {String(SECTIONS.length).padStart(2, '0')}</span>
                </span>
                <span className="font-serif-editorial text-lg text-ivory hidden sm:inline">
                  {SECTIONS[currentSlide].chapterLabel}
                </span>
              </div>

              <div className="hidden md:flex items-center gap-2">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => navigateToSection(sec.index)}
                    title={sec.chapterLabel}
                    aria-label={`Go to ${sec.chapterLabel}`}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === sec.index
                        ? 'w-8 bg-sand'
                        : 'w-2.5 bg-sage/35 hover:bg-sage'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateToSection(currentSlide - 1)}
                  disabled={currentSlide === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-ivory/15 text-[11px] font-mono-code uppercase tracking-[0.08em] text-ivory disabled:opacity-30 hover:border-sand/60 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <button
                  onClick={() => navigateToSection(currentSlide + 1)}
                  disabled={currentSlide === SECTIONS.length - 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sand text-ink-2 text-[11px] font-mono-code font-semibold uppercase tracking-[0.08em] disabled:opacity-30 hover:bg-sand-2 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full border border-ivory/15 text-sage hover:text-ivory hover:border-sand/60 transition-colors"
                  title="Toggle projector fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <>
          <main>
            <HeroIntro
              onBeginJourney={() => navigateToSection(1)}
              onEnterPresentation={enterPresentation}
            />
            <BeforeCrisisSection />
            <AralSeaSection />
            <SemipalatinskSection />
            <InteractiveMapSection />
            <HistorySimulationSection />
            <FutureClosingSection onBackToTop={() => navigateToSection(0)} />
          </main>

          {/* Colophon */}
          <footer className="relative border-t border-ivory/10 bg-ink">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-sand" />
                  <span className="font-serif-editorial text-2xl font-semibold tracking-[0.04em] text-ivory">
                    THE LAND REMEMBERS
                  </span>
                </div>
                <p className="text-sm text-sage leading-relaxed max-w-md">
                  An interactive digital museum on the environmental history of Kazakhstan in
                  the 20th century: the Aral Sea, the Semipalatinsk Test Site, and the long work
                  of recovery. Built for a university history research project and live defense.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="eyebrow text-sand mb-4">Chapters</div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {SECTIONS.map((sec) => (
                    <li key={sec.id}>
                      <button
                        onClick={() => navigateToSection(sec.index)}
                        className="group inline-flex items-baseline gap-2 text-sm text-ivory/85 hover:text-sand transition-colors text-left"
                      >
                        <span className="font-mono-code text-[10px] text-sand/70">{sec.number}</span>
                        <span>{sec.chapterLabel}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3">
                <div className="eyebrow text-sand mb-4">Archives</div>
                <ul className="space-y-2 text-sm text-ivory/85">
                  <li>NASA Earth Observatory</li>
                  <li>IAEA • CTBTO • NNSA</li>
                  <li>World Bank • UNDP</li>
                  <li>
                    <a
                      href="#sources-references"
                      className="inline-flex items-center gap-1 text-sand hover:text-sand-2 transition-colors"
                    >
                      Full bibliography <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-ivory/10">
              <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-code text-[10.5px] uppercase tracking-[0.16em] text-sage/70">
                <span>Kazakhstan • 1949 — 2024 • Environmental history archive</span>
                <span>Offline-ready • Classroom projector build</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
