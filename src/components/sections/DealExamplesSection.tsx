import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../primitives/MotionPrimitives'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import type { MomentEngineContent } from '../../content/momentEngine'

interface DealExamplesSectionProps {
  content: MomentEngineContent['dealExamples']
}

export function DealExamplesSection({ content }: DealExamplesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const reduced = useReducedMotionSafe()
  const deal = content.deals[activeIdx]

  return (
    <section
      id="deal-examples"
      style={{ backgroundColor: 'var(--gs-bg)' }}
      className="relative py-24 overflow-hidden"
      aria-labelledby="deal-examples-heading"
    >
      <div className="section-shell-wide relative z-10">
        {/* Header */}
        <Reveal>
          <p className="font-body text-body-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-blue)' }}>
            {content.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id="deal-examples-heading" className="section-title mb-6 max-w-2xl">
            {content.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-subhead">
            {content.subhead}
          </p>
        </Reveal>
        {/* Deal tabs */}
        <Reveal delay={0.18} className="flex flex-wrap gap-2 mb-8">
          {content.deals.map((d, i) => (
            <button
              key={d.name}
              onClick={() => setActiveIdx(i)}
              aria-pressed={activeIdx === i}
              className={[
                'flex items-center gap-2 px-4 py-2.5 rounded-brand border text-body-sm font-body transition-all duration-200',
                activeIdx === i
                  ? 'text-navy border-[rgba(0,0,220,0.4)]'
                  : 'text-[var(--color-text-muted)] border-[var(--color-lightGrey)] hover:text-navy hover:border-[rgba(0,0,220,0.25)]',
              ].join(' ')}
              style={activeIdx === i ? { backgroundColor: 'rgba(0,0,220,0.06)' } : { backgroundColor: 'var(--color-white)' }}
            >
              <span className="text-[10px] font-heading font-medium px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(0,0,220,0.08)', color: 'var(--color-blue)' }}>
                {d.region}
              </span>
              {d.name}
            </button>
          ))}
        </Reveal>

        <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          {/* Deal curation screenshots */}
          <Reveal delay={0.2}>
            <div className="relative mt-10 md:mt-14 md:pb-16">
              {content.screenshots[0] && (
                <figure className="brand-card p-2">
                  <img
                    src={content.screenshots[0].src}
                    alt={content.screenshots[0].alt}
                    loading="eager"
                    className="w-full h-auto rounded-[12px] border"
                    style={{ borderColor: 'var(--color-lightGrey)' }}
                  />
                </figure>
              )}

              {content.screenshots[1] && (
                <figure className="brand-card p-2 mt-4 md:mt-0 md:absolute md:top-8 md:-right-10 md:w-[56%]">
                  <img
                    src={content.screenshots[1].src}
                    alt={content.screenshots[1].alt}
                    loading="lazy"
                    className="w-full h-auto rounded-[12px] border"
                    style={{ borderColor: 'var(--color-lightGrey)' }}
                  />
                </figure>
              )}
            </div>
          </Reveal>

          {/* Deal detail */}
          {deal && (
            <AnimatePresence mode="wait">
              <motion.div
                key={deal.name}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0.1 : 0.28, ease: 'easeOut' }}
                className="brand-card w-full xl:max-w-[560px] xl:justify-self-end"
              >
                {/* Deal header */}
                <div className="p-8 border-b" style={{ borderColor: 'var(--color-lightGrey)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-body text-body-sm mb-1" style={{ color: 'var(--color-blue)' }}>
                        {deal.region} · {deal.sport}
                      </p>
                      <h3 className="font-heading text-brand-h3 text-navy">{deal.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {deal.channels.map((ch) => (
                        <span key={ch}
                          className="px-2.5 py-1 rounded-full text-[11px] font-body font-medium border"
                          style={{ borderColor: 'rgba(0,0,220,0.25)', color: 'var(--color-blue)', backgroundColor: 'rgba(0,0,220,0.06)' }}>
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deal body */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-lightGrey)]">

                  <div className="p-6">
                    <p className="font-body text-body-sm font-medium uppercase tracking-wider mb-3"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Trigger
                    </p>
                    <p className="font-body text-body-sm text-navy leading-relaxed">{deal.trigger}</p>
                  </div>

                  <div className="p-6">
                    <p className="font-body text-body-sm font-medium uppercase tracking-wider mb-3"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Audience
                    </p>
                    <p className="font-body text-body-sm text-navy leading-relaxed">{deal.audience}</p>
                  </div>

                  <div className="p-6">
                    <p className="font-body text-body-sm font-medium uppercase tracking-wider mb-3"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Emotion
                    </p>
                    <p className="font-body text-body-sm mb-4"
                      style={{ color: 'var(--color-blue)' }}>
                      {deal.emotion}
                    </p>
                    <p className="font-body text-body-sm font-medium uppercase tracking-wider mb-2"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Verticals
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {deal.verticals.map((v) => (
                        <span key={v}
                          className="px-2 py-0.5 rounded text-[11px] font-body"
                          style={{ backgroundColor: 'rgba(0,0,220,0.08)', color: 'var(--color-blue)' }}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-6">
        <div className="max-w-[840px] rounded-brand border border-white/45 bg-[rgba(13,18,38,0.74)] px-8 py-7 text-center shadow-card backdrop-blur-[2px]">
          <p className="font-body text-[12px] tracking-[0.3em] text-white/80">INTERNAL DRAFT</p>
          <p className="font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] text-white mt-2">WORK IN PROGRESS</p>
          <p className="font-body text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed text-white/90 mt-4">
            This section will emphasize how we are moving away from a managed services model to an in-house agency model.
          </p>
        </div>
      </div>

    </section>
  )
}
