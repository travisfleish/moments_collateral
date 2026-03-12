import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import type { MomentEngineContent } from '../../content/momentEngine'

interface WhatIsAMomentSectionProps {
  content: MomentEngineContent['whatIsAMoment']
}

const comparisonCardClassName = 'flex h-full flex-col rounded-2xl bg-gs-surface p-7 lg:h-[312px]'
const boldSubheadSentence =
  'Genius Moments brings both together, connecting real time fan emotion with scalable, data driven activation.'

function ConnectorArrow({
  direction,
}: {
  direction: 'left' | 'right'
}) {
  const isLeft = direction === 'left'

  return (
    <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
      <svg width="72" height="20" viewBox="0 0 72 20" fill="none">
        <line
          x1={isLeft ? 66 : 6}
          y1="10"
          x2={isLeft ? 6 : 66}
          y2="10"
          stroke="#c5d0ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1={isLeft ? 66 : 6}
          y1="10"
          x2={isLeft ? 6 : 66}
          y2="10"
          stroke="#7a89ff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        {isLeft ? (
          <path
            d="M10 5 L4 10 L10 15"
            stroke="#b8c4ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
          />
        ) : (
          <path
            d="M62 5 L68 10 L62 15"
            stroke="#b8c4ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
          />
        )}
      </svg>
    </div>
  )
}

function GeniusMomentsBridgeCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.article
      className={`${comparisonCardClassName} relative z-10 border border-[rgba(15,23,42,0.08)] lg:scale-[1.06]`}
      initial={false}
      animate={
        reducedMotion
          ? {
              opacity: 1,
              scale: 1,
              boxShadow: '0 20px 44px rgba(30,58,196,0.34)',
            }
          : {
              opacity: 1,
              scale: [1.06, 1.08, 1.06],
              boxShadow: [
                '0 20px 44px rgba(30,58,196,0.34)',
                '0 28px 54px rgba(30,58,196,0.46)',
                '0 20px 44px rgba(30,58,196,0.34)',
              ],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.2, ease: 'easeOut' }
          : { duration: 1.6, ease: 'easeInOut', repeat: Infinity }
      }
      style={{
        borderColor: 'rgba(208,219,255,0.8)',
        backgroundColor: 'var(--color-gs-accent-500)',
      }}
    >
      <h3 className="font-heading text-brand-h4 leading-tight" style={{ color: '#ffffff' }}>
        Genius Moments
      </h3>
      <ul className="mt-4 space-y-2.5 list-disc pl-5">
        {[
          'Brings the live game into context',
          'Deploys deterministic fan segments',
          'Price: efficient',
          'Inventory: scaled',
        ].map((item) => (
          <li key={item} className="font-body text-base" style={{ color: 'rgba(255,255,255,0.95)' }}>
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function ComparisonCard({
  title,
  bullets,
}: {
  title: string
  bullets: string[]
}) {
  return (
    <article
      className={comparisonCardClassName}
      style={{
        opacity: 0.96,
      }}
    >
      <h3 className="font-heading text-brand-h4 leading-tight text-navy">{title}</h3>
      <ul className="mt-5 space-y-2 list-disc pl-5">
        {bullets.map((item) => (
          <li key={item} className="font-body text-base text-[var(--color-text-muted)]/95">
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function OutsideChecklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap justify-center gap-2">
      {items.map((item) => {
        const isCheck = item.startsWith('✓')
        const isCross = item.startsWith('✗')
        const label = item.replace(/^[✓✗]\s*/, '')
        const symbol = isCheck ? '✓' : isCross ? '✗' : ''
        const symbolColor = '#ffffff'
        const pillStyles = isCheck
          ? {
              borderColor: '#15803d',
              color: '#ffffff',
              backgroundColor: '#16a34a',
            }
          : isCross
            ? {
                borderColor: '#b91c1c',
                color: '#ffffff',
                backgroundColor: '#dc2626',
              }
            : {
                borderColor: 'rgba(15,23,42,0.2)',
                color: '#334155',
                backgroundColor: '#ffffff',
              }

        return (
          <li
            key={item}
            className="rounded-full border px-3 py-1.5 font-body text-[12px] font-semibold tracking-[0.01em]"
            style={{
              ...pillStyles,
              boxShadow: '0 2px 6px rgba(15,23,42,0.14)',
            }}
          >
            {symbol ? (
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" style={{ color: symbolColor }}>
                  {symbol}
                </span>
                <span>{label}</span>
              </span>
            ) : (
              item
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function WhatIsAMomentSection({ content }: WhatIsAMomentSectionProps) {
  const reducedMotion = useReducedMotionSafe()
  const boldSentenceIncluded = content.subhead.includes(boldSubheadSentence)
  const subheadLead = boldSentenceIncluded
    ? content.subhead.replace(` ${boldSubheadSentence}`, '')
    : content.subhead
  const subheadBoldSentence = boldSentenceIncluded ? ` ${boldSubheadSentence}` : ''

  return (
    <section
      id="what-is-a-moment"
      aria-labelledby="what-is-a-moment-heading"
      className="bg-white py-24 md:py-28"
    >
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="what-is-a-moment-heading"
            className="section-title whitespace-pre-line text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
          >
            {content.headline}
          </h2>
          <p className="section-copy mx-auto mt-6 max-w-4xl text-[clamp(1rem,1.8vw,1.18rem)] leading-[1.55] text-[#4d5a70]">
            <span>{subheadLead}</span>
            {subheadBoldSentence ? <strong className="font-semibold text-navy">{subheadBoldSentence}</strong> : null}
          </p>
        </div>

        <div className="mt-12 text-center">
          <h3 className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-[#596581]">
            The Sports Media Tradeoff
          </h3>
        </div>
        <div className="mt-8 grid items-stretch gap-4 lg:mt-12 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_72px_300px_72px_minmax(0,1fr)]">
          <div className="flex flex-col">
            <ComparisonCard
              title={content.contrastLeft.label}
              bullets={[
                'Sports fan audiences',
                'Sports contextual publishers',
                'Price: low',
                'Inventory: scale',
              ]}
            />
            <OutsideChecklist items={['✓ Precision', '✓ Scale', '✗ Emotion']} />
          </div>
          <ConnectorArrow direction="right" />
          <div className="lg:-mt-1">
            <GeniusMomentsBridgeCard reducedMotion={reducedMotion} />
          </div>
          <ConnectorArrow direction="left" />
          <div className="flex flex-col">
            <ComparisonCard
              title={content.contrastRight.label}
              bullets={[
                'Live game spots',
                'In-game sponsorships',
                'Price: high',
                'Inventory: scarce',
              ]}
            />
            <OutsideChecklist items={['✓ Scale', '✓ Emotion', '✗ Precision']} />
          </div>
        </div>
      </div>
    </section>
  )
}
