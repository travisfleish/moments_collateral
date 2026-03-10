import { Reveal, Stagger } from '../primitives/MotionPrimitives'
import type { MomentEngineContent } from '../../content/momentEngine'

interface FourPillarsSectionProps {
  content: MomentEngineContent['fourPillars']
}

export function FourPillarsSection({ content }: FourPillarsSectionProps) {
  return (
    <section
      id="four-pillars"
      style={{ backgroundColor: 'var(--gs-bg)' }}
      className="relative py-24 overflow-hidden"
      aria-labelledby="four-pillars-heading"
    >
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,220,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="section-shell">
        {/* Header */}
        <Reveal>
          <p className="font-body text-body-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-blue)' }}>
            {content.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id="four-pillars-heading" className="section-title mb-6 max-w-2xl">
            {content.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-copy max-w-2xl mb-16">
            {content.subhead}
          </p>
        </Reveal>

        {/* Pillars */}
        <div className="relative overflow-visible">
          <img
            src="/green-lines.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-28 md:-right-40 lg:-right-52 top-[35%] h-[110%] w-auto opacity-90 z-0"
          />

          <Stagger
            className="relative z-10 grid md:grid-cols-2 gap-4"
            staggerChildren={0.1}
          >
            {content.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="brand-card group p-8 hover:border-[rgba(0,0,220,0.3)]"
              >
                {/* Number */}
                <p className="font-heading text-brand-h1 font-light mb-4 leading-none"
                  style={{ color: 'rgba(0,0,220,0.18)' }}>
                  {pillar.number}
                </p>

                <h3 className="font-heading text-brand-h3 text-navy mb-4">
                  {pillar.title}
                </h3>

                <p className="section-copy mb-6 leading-relaxed">
                  {pillar.description}
                </p>

              </div>
            ))}
          </Stagger>
        </div>
      </div>

    </section>
  )
}
