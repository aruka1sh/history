import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HOPEFUL_RECOVERY_INITIATIVES, VERIFIED_SOURCES } from '../data/historicalData';
import { AnimatedCounter, ChapterOpener, Eyebrow } from './CinematicPrimitives';
import { ExternalLink, BookOpen, Heart, ArrowUp, Award, Camera } from 'lucide-react';

interface FutureClosingSectionProps {
  onBackToTop: () => void;
}

const CATEGORIES = ['All', 'Aral Sea', 'Semipalatinsk', 'Restoration'];

export const FutureClosingSection: React.FC<FutureClosingSectionProps> = ({ onBackToTop }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSources =
    selectedCategory === 'All'
      ? VERIFIED_SOURCES
      : VERIFIED_SOURCES.filter((s) => s.category === selectedCategory);

  return (
    <section id="section-6" className="relative bg-ink-2 overflow-hidden">
      <ChapterOpener
        number="06"
        tone="sage"
        eyebrow="Ecological Recovery & Epilogue"
        title={
          <>
            HISTORY CANNOT BE REWRITTEN.{' '}
            <span className="italic font-normal text-sage">THE FUTURE CAN.</span>
          </>
        }
        lede="Kazakhstan’s 20th-century environmental crises were among the most severe on Earth—yet the story did not end in tragedy. Over three decades, citizen activism, scientific diplomacy, and ecological engineering have proved that damaged landscapes can begin to heal."
        image="./images/saiga-antelope-steppe.jpg"
        imageAlt="Saiga antelope standing in the Kazakh steppe"
        credit="Saiga antelope on the steppe • Wikimedia Commons"
        meta="Altyn Dala • Central Kazakhstan"
        objectPosition="center 40%"
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Restoration initiatives */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Eyebrow tone="sage">Documented recovery initiatives</Eyebrow>
              <h3 className="font-serif-editorial text-4xl sm:text-5xl text-ivory font-semibold mt-4 max-w-2xl">
                Four Ways the Land Is Healing
              </h3>
            </div>
            <span className="eyebrow text-[10px] text-sage/70">World Bank • UNDP • NNC RK • ACBK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {HOPEFUL_RECOVERY_INITIATIVES.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-ink ring-1 ring-ivory/10 group-hover:ring-sage/60 transition-shadow duration-500">
                  <img
                    src={item.photoSrc}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] saturate-[0.9] group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70" />
                  <span className="chip absolute top-3 left-3 text-sage border-sage/40">{item.year}</span>
                  <span className="absolute bottom-3 left-3 right-3 inline-flex items-center gap-1.5 font-mono-code text-[10px] uppercase tracking-[0.12em] text-ivory/70">
                    <Camera className="w-3 h-3 text-sand shrink-0" />
                    <span className="truncate">{item.photoCredit}</span>
                  </span>
                </div>

                <div className="mt-6 flex-1">
                  <h3 className="font-serif-editorial text-3xl font-semibold text-ivory leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ivory/75 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-ivory/10 flex items-baseline justify-between gap-6">
                  <span className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-sand leading-none">
                    <AnimatedCounter
                      value={item.metric}
                      prefix={item.metricPrefix}
                      suffix={item.metricSuffix}
                      decimals={item.metricDecimals || 0}
                    />
                  </span>
                  <span className="eyebrow text-[10px] text-sage text-right max-w-[22ch]">
                    {item.metricLabel}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing reflection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
          className="relative rounded-2xl overflow-hidden ring-1 ring-sand/30 bg-ink p-10 sm:p-16 lg:p-24 text-center mb-28"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="./images/saiga-herd-kazakhstan.jpg"
              alt="Restored herd of Saiga antelopes across the Kazakh steppe"
              loading="lazy"
              className="w-full h-full object-cover object-center opacity-40 filter contrast-[1.05] saturate-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/70" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="eyebrow text-sand mb-8">Final reflection • Kazakhstan in the 21st century</div>

            <blockquote className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl font-semibold text-ivory leading-[1.08] mb-8">
              “The land remembers what happened.{' '}
              <span className="italic font-normal text-sand">
                What will the next generation choose to do?
              </span>
              ”
            </blockquote>

            <p className="text-sm sm:text-base text-sage max-w-xl mx-auto leading-relaxed mb-10">
              Thank you to our professors and fellow students for exploring this interactive
              historical documentary. May historical memory guide wiser environmental
              stewardship across the Kazakh steppe.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-4 eyebrow text-[10px] text-ivory/85">
              <span className="inline-flex items-center gap-1.5 text-sand">
                <Award className="w-4 h-4" />
                University history final research project
              </span>
              <span className="text-sage/50">•</span>
              <span>The Land Remembers • Kazakhstan</span>
            </div>
          </div>
        </motion.div>

        {/* Sources & references */}
        <div id="sources-references" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">
            <div>
              <Eyebrow>
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" /> Bibliography &amp; archival verification
                </span>
              </Eyebrow>
              <h3 className="font-serif-editorial text-4xl sm:text-5xl text-ivory font-semibold mt-4">
                Sources &amp; References
              </h3>
            </div>

            <div className="segmented self-start md:self-auto">
              {CATEGORIES.map((cat) => (
                <button key={cat} data-active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <ol className="border-t border-ivory/10">
            {filteredSources.map((src, idx) => (
              <li key={src.id}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_10rem_1fr_auto] gap-x-4 sm:gap-x-6 items-start py-5 border-b border-ivory/10 hover:bg-forest/40 transition-colors -mx-3 px-3 rounded-lg"
                >
                  <span className="font-mono-code text-[11px] text-sand/70 pt-1">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden sm:block eyebrow text-[10px] text-sage pt-1.5">
                    {src.organization}
                    <span className="block text-sage/50 mt-1 normal-case tracking-normal">{src.year}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="sm:hidden eyebrow text-[10px] text-sage block mb-1">
                      {src.organization} • {src.year}
                    </span>
                    <span className="font-serif-editorial text-xl sm:text-2xl font-semibold text-ivory group-hover:text-sand transition-colors leading-tight block">
                      {src.title}
                    </span>
                    <span className="text-xs sm:text-sm text-sage leading-relaxed block mt-1.5">{src.summary}</span>
                    <span className="font-mono-code text-[10px] text-sage/50 block mt-2 truncate">{src.url}</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-sage/50 group-hover:text-sand transition-colors mt-1.5" />
                </a>
              </li>
            ))}
          </ol>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 eyebrow text-[10px] text-sage/80">
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-sand" />
              <span>Built for live classroom &amp; academic defense</span>
            </div>

            <button
              onClick={onBackToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ivory/15 text-ivory hover:border-sand/60 hover:text-sand transition-colors"
            >
              <span>Return to opening title</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
