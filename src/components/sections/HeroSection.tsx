import { Reveal, Stagger } from '../primitives/MotionPrimitives'
import type { MomentEngineContent } from '../../content/momentEngine'

interface HeroSectionProps {
  content: MomentEngineContent['hero']
}

export function HeroSection({ content }: HeroSectionProps) {
  const meshWidth = 1200
  const meshHeight = 675
  const focalPoint = { x: 1085, y: 95 }
  const horizontalLineCount = 34
  const verticalLineCount = 48

  const horizontalLines = Array.from({ length: horizontalLineCount }, (_, index) => {
    const y = (index / (horizontalLineCount - 1)) * meshHeight
    const yDistance = Math.abs(y - focalPoint.y)
    const influence = Math.max(0, 1 - yDistance / 360)
    const pull = 210 * influence * influence

    return `M 0 ${y.toFixed(2)} C ${(meshWidth * 0.35).toFixed(2)} ${(y - pull).toFixed(2)} ${(meshWidth * 0.72).toFixed(2)} ${(y - pull).toFixed(2)} ${meshWidth} ${y.toFixed(2)}`
  })

  const verticalLines = Array.from({ length: verticalLineCount }, (_, index) => {
    const x = (index / (verticalLineCount - 1)) * meshWidth
    const xDistance = Math.abs(x - focalPoint.x)
    const influence = Math.max(0, 1 - xDistance / 420)
    const pull = 190 * influence * influence

    return `M ${x.toFixed(2)} 0 C ${(x + pull).toFixed(2)} ${(meshHeight * 0.3).toFixed(2)} ${(x + pull).toFixed(2)} ${(meshHeight * 0.72).toFixed(2)} ${x.toFixed(2)} ${meshHeight}`
  })

  return (
    <section
      style={{ backgroundColor: 'var(--gs-bg)' }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Curved mesh background decoration */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg viewBox={`0 0 ${meshWidth} ${meshHeight}`} preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <radialGradient id="hero-mesh-glow" cx="95%" cy="5%" r="24%">
              <stop offset="0%" stopColor="rgba(0,17,225,0.06)" />
              <stop offset="40%" stopColor="rgba(0,17,225,0.022)" />
              <stop offset="100%" stopColor="rgba(0,17,225,0)" />
            </radialGradient>
          </defs>

          <rect width={meshWidth} height={meshHeight} fill="url(#hero-mesh-glow)" />

          <g stroke="rgba(0,17,225,0.035)" strokeWidth="1" fill="none">
            {horizontalLines.map((path, index) => (
              <path key={`horizontal-${index}`} d={path} />
            ))}
            {verticalLines.map((path, index) => (
              <path key={`vertical-${index}`} d={path} />
            ))}
          </g>
        </svg>
      </div>

      {/* Glow blob */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,17,225,0.055) 0%, rgba(0,17,225,0.015) 35%, transparent 72%)',
          transform: 'translate(44%, -44%)',
          opacity: 0.3,
        }}
      />

      <div className="section-shell relative z-10 py-24">
        {/* Top row: kicker left, logo right */}
        <div className="mb-6 flex items-center justify-between gap-6">
          <Reveal delay={0.04}>
            <div className="inline-block">
              <p className="font-body text-xl font-medium tracking-widest uppercase text-black">
                {content.kicker}
              </p>
              <div
                className="mt-2 h-px w-[30%]"
                style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)' }}
              />
            </div>
          </Reveal>
          <Reveal delay={0}>
            <img
              src="/genius-assets/genius_logo.svg"
              alt="Genius Sports"
              className="h-[120px] w-auto object-contain"
            />
          </Reveal>
        </div>

        {/* Title */}
        <Reveal delay={0.08}>
          <h1
            className="font-heading text-brand-h1 text-navy mb-8 max-w-3xl"
            style={{ fontSize: '50.5586px', fontWeight: 300 }}
          >
            {content.titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
        </Reveal>

        {/* Subhead */}
        <Reveal delay={0.16}>
          <p className="font-body text-body text-[var(--color-text-muted)] max-w-2xl mb-16 leading-relaxed">
            {content.subhead}
          </p>
        </Reveal>

        {/* Stats */}
        <Stagger
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
          delayChildren={0.24}
          staggerChildren={0.1}
        >
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-brand border p-6 backdrop-blur-sm h-full flex flex-col min-h-0"
              style={{
                backgroundColor: 'var(--color-gs-accent-500)',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
            >
              <p className="font-heading text-brand-h2 text-white mb-1 font-light">
                {stat.value}
              </p>
              <p className="font-body text-body-sm font-medium text-white mb-2">
                {stat.label}
              </p>
              <p className="font-body text-body-sm leading-snug text-white/80">
                {stat.description}
              </p>
            </div>
          ))}
        </Stagger>

        {/* Scroll cue */}
        <Reveal delay={0.6} className="mt-16 flex items-center gap-3">
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <p className="font-body text-body-sm" style={{ color: 'var(--color-text-muted)' }}>
            Scroll to explore
          </p>
        </Reveal>
      </div>

    </section>
  )
}
