import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Camera } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.8,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [displayVal, setDisplayVal] = useState<number>(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayVal(value);
      return;
    }

    let startTimestamp: number | null = null;
    let rafId = 0;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayVal(eased * value);
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setDisplayVal(value);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [isInView, value, duration, prefersReducedMotion]);

  const formatted =
    decimals > 0
      ? displayVal.toFixed(decimals)
      : Math.round(displayVal).toLocaleString('en-US');

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Word-by-word title reveal                                          */
/* ------------------------------------------------------------------ */

interface WordByWordRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
}

export const WordByWordReveal: React.FC<WordByWordRevealProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClassName = 'italic font-normal text-sand',
  delay = 0.15,
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, idx) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <span key={idx} className="inline-block overflow-hidden pb-1 mr-[0.26em]">
            <motion.span
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: delay + idx * 0.11,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block ${isHighlighted ? highlightClassName : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Eyebrow label with leading rule                                    */
/* ------------------------------------------------------------------ */

type Tone = 'sand' | 'sage' | 'ember' | 'aqua';

const toneText: Record<Tone, string> = {
  sand: 'text-sand',
  sage: 'text-sage',
  ember: 'text-ember',
  aqua: 'text-aqua',
};

const toneBg: Record<Tone, string> = {
  sand: 'bg-sand',
  sage: 'bg-sage',
  ember: 'bg-ember',
  aqua: 'bg-aqua',
};

interface EyebrowProps {
  children: React.ReactNode;
  tone?: Tone;
  rule?: boolean;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  tone = 'sand',
  rule = true,
  className = '',
}) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {rule && <span className={`w-10 h-px ${toneBg[tone]} opacity-80`} />}
    <span className={`eyebrow ${toneText[tone]}`}>{children}</span>
  </div>
);

/* ------------------------------------------------------------------ */
/*  In-page section header with ghosted chapter numeral                */
/* ------------------------------------------------------------------ */

interface SectionHeaderProps {
  number: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: Tone;
  aside?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  eyebrow,
  title,
  lede,
  tone = 'sand',
  aside,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`relative mb-14 md:mb-20 ${className}`}
  >
    <span aria-hidden className="ghost-numeral hidden md:block">
      {number}
    </span>

    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end">
      <div className="lg:col-span-8">
        <Eyebrow tone={tone} className="mb-5">
          {eyebrow}
        </Eyebrow>
        <h2 className="font-serif-editorial text-5xl sm:text-6xl md:text-7xl font-semibold text-ivory tracking-tight leading-[0.98]">
          {title}
        </h2>
        {lede && (
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-sage leading-relaxed">{lede}</p>
        )}
      </div>
      {aside && <div className="lg:col-span-4 lg:justify-self-end">{aside}</div>}
    </div>

    <div className="hairline mt-10" />
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Full-bleed chapter opener (photograph + large numeral)             */
/* ------------------------------------------------------------------ */

interface ChapterOpenerProps {
  number: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  image: string;
  imageAlt: string;
  credit: string;
  meta?: string;
  tone?: Tone;
  objectPosition?: string;
}

export const ChapterOpener: React.FC<ChapterOpenerProps> = ({
  number,
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  credit,
  meta,
  tone = 'sand',
  objectPosition = 'center',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={ref}
      className="relative min-h-[68vh] md:min-h-[78vh] flex items-end overflow-hidden bg-ink"
    >
      <motion.div style={{ y }} className="absolute inset-[-12%] z-0">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.82]"
          style={{ objectPosition }}
        />
      </motion.div>

      {/* Documentary grading */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 z-[1] bg-gradient-to-b from-ink-2 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-end gap-5 mb-6">
            <span
              className={`font-serif-editorial text-7xl md:text-8xl leading-[0.8] font-semibold ${toneText[tone]}`}
            >
              {number}
            </span>
            <div className="pb-2">
              <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
            </div>
          </div>

          <h2 className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[0.95] text-ivory max-w-5xl">
            {title}
          </h2>

          {lede && (
            <p className="mt-7 max-w-2xl text-base md:text-xl text-ivory/80 leading-relaxed">
              {lede}
            </p>
          )}
        </motion.div>

        <div className="mt-10 pt-4 border-t border-ivory/15 flex flex-wrap items-center justify-between gap-3 font-mono-code text-[10.5px] uppercase tracking-[0.18em] text-sage/80">
          <span className="inline-flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-sand" />
            {credit}
          </span>
          {meta && <span>{meta}</span>}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Stat strip (hairline-separated figures)                            */
/* ------------------------------------------------------------------ */

interface StatProps {
  label: React.ReactNode;
  value: React.ReactNode;
  note?: React.ReactNode;
  tone?: Tone;
  valueClassName?: string;
}

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  note,
  tone = 'sand',
  valueClassName = 'text-ivory',
}) => (
  <div className="py-7 px-5 lg:px-6 border-ivory/10 [&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 min-w-0">
    <div className={`eyebrow ${toneText[tone]} mb-3`}>{label}</div>
    <div
      className={`font-serif-editorial text-4xl xl:text-5xl font-semibold leading-none whitespace-nowrap ${valueClassName}`}
    >
      {value}
    </div>
    {note && <p className="mt-3 text-xs text-sage leading-relaxed max-w-[26ch]">{note}</p>}
  </div>
);

interface StatStripProps {
  children: React.ReactNode;
  className?: string;
}

export const StatStrip: React.FC<StatStripProps> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={`grid grid-cols-2 lg:grid-cols-4 border-y border-ivory/10 ${className}`}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Archival photo card — editorial caption, no heavy frame            */
/* ------------------------------------------------------------------ */

interface ArchivalPhotoCardProps {
  src: string;
  alt: string;
  year: string;
  title: string;
  caption: string;
  credit: string;
  aspectRatio?: string;
  className?: string;
  enableParallax?: boolean;
  onClick?: () => void;
}

export const ArchivalPhotoCard: React.FC<ArchivalPhotoCardProps> = ({
  src,
  alt,
  year,
  title,
  caption,
  credit,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  enableParallax = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.figure
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`group flex flex-col ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl bg-ink ring-1 ring-ivory/10 group-hover:ring-sand/50 transition-shadow duration-500`}
      >
        {!imgError ? (
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setImgError(true)}
            style={enableParallax ? { y: yParallax, scale: 1.12 } : undefined}
            className="w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] filter contrast-[1.04] saturate-[0.92] group-hover:saturate-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-forest">
            <Camera className="w-8 h-8 text-sand/60 mb-2" />
            <span className="eyebrow text-sand">Archival Plate • {year}</span>
            <span className="text-xs text-sage mt-1">{title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />

        <span className="chip chip-sand absolute top-3 left-3">{year}</span>
      </div>

      <figcaption className="mt-4 pt-4 border-t border-ivory/10">
        <h4 className="font-serif-editorial text-2xl font-semibold text-ivory group-hover:text-sand transition-colors leading-tight">
          {title}
        </h4>
        <p className="mt-1.5 text-sm text-sage leading-relaxed">{caption}</p>
        <p className="mt-3 font-mono-code text-[10px] uppercase tracking-[0.14em] text-sage/60 truncate">
          {credit}
        </p>
      </figcaption>
    </motion.figure>
  );
};
