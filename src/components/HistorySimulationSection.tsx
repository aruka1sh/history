import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SIMULATION_SCENARIOS, QUIZ_QUESTIONS, DecisionChoice } from '../data/historicalData';
import { SectionHeader, Eyebrow } from './CinematicPrimitives';
import {
  Scale,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  TrendingUp,
  Sprout,
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  Camera,
  Check,
} from 'lucide-react';

export const HistorySimulationSection: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, DecisionChoice>>({});

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentScenario = SIMULATION_SCENARIOS[activeScenarioIdx];
  const activeChoice = selectedChoices[currentScenario.id];

  const handleSelectChoice = (choice: DecisionChoice) => {
    setSelectedChoices((prev) => ({ ...prev, [currentScenario.id]: choice }));
  };

  const handleNextScenario = () => {
    if (activeScenarioIdx < SIMULATION_SCENARIOS.length - 1) {
      setActiveScenarioIdx((prev) => prev + 1);
    }
  };

  const handleResetSimulation = () => {
    setSelectedChoices({});
    setActiveScenarioIdx(0);
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const totalScore = QUIZ_QUESTIONS.reduce(
    (acc, q) => (selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <section id="section-5" className="relative py-24 md:py-32 px-6 bg-ink-2 border-t border-ivory/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="05"
          eyebrow="Interactive Policy Simulation & Historical Verification"
          title={
            <>
              WHAT WOULD <span className="italic font-normal text-sand">YOU HAVE DONE?</span>
            </>
          }
          lede="Step into the role of a historical advisor across three pivotal eras. Weigh the economic pressures, environmental warnings, and human costs—then test your command of the archival facts."
          aside={
            <div className="flex items-start gap-2.5 max-w-xs text-[11px] font-mono-code text-sage leading-relaxed pl-4 border-l-2 border-sand/60">
              <AlertCircle className="w-4 h-4 shrink-0 text-sand mt-0.5" />
              <span>
                Methodological note: simplified hypothetical scenarios for classroom
                discussion, not historical transcripts.
              </span>
            </div>
          }
        />

        {/* Scenario stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8" role="tablist">
          {SIMULATION_SCENARIOS.map((scenario, idx) => {
            const isCurrent = idx === activeScenarioIdx;
            const isCompleted = Boolean(selectedChoices[scenario.id]);
            return (
              <button
                key={scenario.id}
                role="tab"
                aria-selected={isCurrent}
                onClick={() => setActiveScenarioIdx(idx)}
                className={`group text-left pt-4 border-t-2 transition-colors ${
                  isCurrent ? 'border-sand' : 'border-ivory/12 hover:border-sage/60'
                }`}
              >
                <div className="flex items-center justify-between eyebrow text-[10px] mb-2">
                  <span className={isCurrent ? 'text-sand' : 'text-sage/70'}>
                    Scenario 0{scenario.id}
                  </span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-sage">
                      <Check className="w-3 h-3" /> Decided
                    </span>
                  )}
                </div>
                <div
                  className={`font-serif-editorial text-2xl font-semibold leading-tight transition-colors ${
                    isCurrent ? 'text-ivory' : 'text-ivory/60 group-hover:text-ivory'
                  }`}
                >
                  {scenario.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active scenario */}
        <div className="surface-strong p-6 sm:p-10 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 eyebrow text-[10px]">
                <span className="text-sand">{currentScenario.era}</span>
                <span className="inline-flex items-center gap-1.5 text-sage">
                  <Scale className="w-3.5 h-3.5 text-sand" />
                  Role: {currentScenario.role}
                </span>
              </div>

              <h3 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory mb-6 leading-tight">
                {currentScenario.title}
              </h3>

              <blockquote className="font-serif-editorial text-xl sm:text-2xl text-ivory/90 leading-snug pl-5 border-l-2 border-sand mb-6">
                “{currentScenario.prompt}”
              </blockquote>

              <div className="flex flex-wrap gap-2">
                {currentScenario.contextFacts.map((fact, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ivory/10 text-[11px] text-sage"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sand shrink-0" />
                    <span>{fact}</span>
                  </span>
                ))}
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-ivory/10 bg-ink">
                <img
                  src={currentScenario.photoSrc}
                  alt={currentScenario.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="chip chip-sand absolute top-3 left-3">
                  <Camera className="w-3 h-3" />
                  <span>Historical context</span>
                </span>
              </div>
              <figcaption className="mt-3 font-mono-code text-[10.5px] uppercase tracking-[0.12em] text-sage/70">
                {currentScenario.photoCaption}
              </figcaption>
            </figure>
          </div>

          {/* Decision options */}
          <div className="mb-10">
            <div className="eyebrow text-sage mb-5">Select your policy recommendation</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {currentScenario.choices.map((choice, cIdx) => {
                const isSelected = activeChoice?.id === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice)}
                    aria-pressed={isSelected}
                    className={`group p-6 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sand/10 border-sand shadow-[0_0_0_4px_rgba(201,167,121,0.08)]'
                        : 'bg-ink/40 border-ivory/10 hover:border-sand/50'
                    }`}
                  >
                    <div>
                      <div className="eyebrow text-[10px] text-sand mb-3">Option 0{cIdx + 1}</div>
                      <h4 className="font-serif-editorial text-2xl font-semibold text-ivory mb-3 leading-tight">
                        {choice.label}
                      </h4>
                      <p className="text-sm text-sage leading-relaxed">{choice.summary}</p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-ivory/10 flex items-center justify-between eyebrow text-[10px] text-sand">
                      <span>{isSelected ? 'Selected policy' : 'Evaluate option'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Outcome analysis */}
          <AnimatePresence mode="wait">
            {activeChoice && (
              <motion.div
                key={activeChoice.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="pt-10 border-t border-ivory/10"
              >
                <Eyebrow>Historically grounded outcome analysis</Eyebrow>
                <h4 className="font-serif-editorial text-3xl sm:text-4xl text-ivory mt-4 mb-4 leading-tight">
                  Consequences of “{activeChoice.label}”
                </h4>
                <p className="text-sm sm:text-base text-ivory/90 leading-relaxed max-w-3xl mb-8">
                  {activeChoice.historicalConsequence}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-ivory/10 border-y border-ivory/10 py-6 mb-8">
                  <div className="md:pr-8">
                    <div className="flex items-center gap-2 eyebrow text-[10px] text-sand mb-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Economic trade-off</span>
                    </div>
                    <p className="text-sm text-sage leading-relaxed">{activeChoice.tradeOffs.economy}</p>
                  </div>
                  <div className="md:px-8">
                    <div className="flex items-center gap-2 eyebrow text-[10px] text-sage mb-2">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>Ecological impact</span>
                    </div>
                    <p className="text-sm text-sage leading-relaxed">{activeChoice.tradeOffs.ecology}</p>
                  </div>
                  <div className="md:pl-8">
                    <div className="flex items-center gap-2 eyebrow text-[10px] text-ember mb-2">
                      <Users className="w-3.5 h-3.5" />
                      <span>Human &amp; social cost</span>
                    </div>
                    <p className="text-sm text-sage leading-relaxed">{activeChoice.tradeOffs.humanCost}</p>
                  </div>
                </div>

                <div className="pl-5 border-l-2 border-sand flex items-start gap-3 mb-8">
                  <BookOpen className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                  <div className="text-sm text-ivory/85 leading-relaxed">
                    <span className="eyebrow text-[10px] text-sand block mb-1">What happened in real history</span>
                    {activeChoice.historicalRealityNote}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={handleResetSimulation}
                    className="inline-flex items-center gap-2 eyebrow text-[10px] text-sage hover:text-ivory transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset all scenarios</span>
                  </button>

                  {activeScenarioIdx < SIMULATION_SCENARIOS.length - 1 ? (
                    <button onClick={handleNextScenario} className="btn-primary text-xs sm:text-sm">
                      <span>Continue to Scenario 0{activeScenarioIdx + 2}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="eyebrow text-[10px] text-sage">All 3 historical scenarios explored</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Knowledge check */}
        <div className="surface-strong p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Eyebrow>Interactive audience knowledge check</Eyebrow>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-ivory mt-4">
                Verify the Historical Record
              </h3>
            </div>

            {quizSubmitted && (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-sand/60 bg-sand/10">
                <Award className="w-5 h-5 text-sand" />
                <span className="font-serif-editorial text-2xl font-semibold text-ivory leading-none">
                  {totalScore} <span className="text-sage text-lg">/ {QUIZ_QUESTIONS.length}</span>
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 mb-10">
            {QUIZ_QUESTIONS.map((q, qIdx) => {
              const userChoice = selectedAnswers[q.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div key={q.id} className="flex flex-col justify-between border-t border-ivory/10 pt-6">
                  <div>
                    <div className="eyebrow text-[10px] text-sand mb-3">Question 0{qIdx + 1}</div>
                    <h4 className="font-serif-editorial text-xl sm:text-2xl text-ivory font-medium mb-5 leading-snug">
                      {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = userChoice === optIdx;
                        const isThisCorrect = q.correctIndex === optIdx;

                        let btnStyle = 'border-ivory/10 text-ivory/85 hover:border-sand/50 hover:bg-ink/40';
                        if (quizSubmitted) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-sage/15 border-sage text-ivory';
                          } else if (isThisSelected && !isThisCorrect) {
                            btnStyle = 'bg-ember/15 border-ember text-ivory';
                          } else {
                            btnStyle = 'border-ivory/8 text-ivory/50';
                          }
                        } else if (isThisSelected) {
                          btnStyle = 'bg-sand/12 border-sand text-ivory';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            disabled={quizSubmitted}
                            className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-start justify-between gap-3 disabled:cursor-default ${btnStyle}`}
                          >
                            <span className="flex items-start gap-3">
                              <span className="font-mono-code text-[10px] text-sand/70 mt-1">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </span>
                            {quizSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                            )}
                            {quizSubmitted && isThisSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-ember shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`mt-5 pl-4 border-l-2 text-xs leading-relaxed ${
                        isAnswered && isCorrect ? 'border-sage' : 'border-sand'
                      }`}
                    >
                      <p className="text-ivory/90 mb-1.5">{q.explanation}</p>
                      <span className="font-mono-code text-[10.5px] text-sand">Source: {q.sourceRef}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-ivory/10">
            <div className="eyebrow text-[10px] text-sage">
              {Object.keys(selectedAnswers).length} of {QUIZ_QUESTIONS.length} questions answered
            </div>
            <div className="flex items-center gap-3">
              {quizSubmitted ? (
                <button onClick={resetQuiz} className="btn-ghost text-sm">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset quiz</span>
                </button>
              ) : (
                <button onClick={() => setQuizSubmitted(true)} className="btn-primary text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Reveal verified answers &amp; score</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
