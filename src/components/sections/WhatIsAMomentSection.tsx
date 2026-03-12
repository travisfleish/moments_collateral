import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import type { MomentEngineContent } from '../../content/momentEngine'

interface WhatIsAMomentSectionProps {
  content: MomentEngineContent['whatIsAMoment']
}

const AUTO_ADVANCE_MS = 3200
const comparisonCardClassName = 'flex h-full flex-col rounded-2xl bg-gs-surface p-6 lg:h-[300px]'
const boldSubheadSentence =
  'Genius Moments brings both together, connecting real time fan emotion with scalable, data driven activation.'

function ConnectorArrow({
  direction,
  reducedMotion,
}: {
  direction: 'left' | 'right'
  reducedMotion: boolean
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
          stroke="#a7b3ff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.line
          x1={isLeft ? 66 : 6}
          y1="10"
          x2={isLeft ? 6 : 66}
          y2="10"
          stroke="#5f6fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          initial={false}
          animate={
            reducedMotion
              ? { pathLength: 1, opacity: 0.9 }
              : { pathLength: [0, 1, 1], opacity: [0, 0.95, 0] }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 1.35,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.15,
                }
          }
        />
        {isLeft ? (
          <motion.path
            d="M10 5 L4 10 L10 15"
            stroke="#a7b3ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={reducedMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 1.35, ease: 'easeInOut', repeat: Infinity }
            }
          />
        ) : (
          <motion.path
            d="M62 5 L68 10 L62 15"
            stroke="#a7b3ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={reducedMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 1.35, ease: 'easeInOut', repeat: Infinity }
            }
          />
        )}
      </svg>
    </div>
  )
}

function GeniusMomentsBridgeCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.article
      className={comparisonCardClassName}
      initial={false}
      animate={
        reducedMotion
          ? {
              opacity: 1,
              scale: 1,
              boxShadow: '0 14px 30px rgba(67,55,168,0.25)',
            }
          : {
              opacity: 1,
              scale: [1, 1.02, 1],
              boxShadow: [
                '0 14px 30px rgba(67,55,168,0.25)',
                '0 20px 42px rgba(67,55,168,0.42)',
                '0 14px 30px rgba(67,55,168,0.25)',
              ],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.2, ease: 'easeOut' }
          : { duration: 1.6, ease: 'easeInOut', repeat: Infinity }
      }
      style={{
        borderColor: 'rgba(167,179,255,0.42)',
        backgroundColor: 'var(--color-gs-accent-500)',
      }}
    >
      <h3 className="font-heading text-brand-h4" style={{ color: '#ffffff' }}>
        Genius Moments
      </h3>
      <ul className="mt-4 space-y-2.5 list-disc pl-5">
        {[
          'Brings the live game into context',
          'Deploys deterministic fan segments',
          'Price: low',
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
  isActive,
}: {
  title: string
  bullets: string[]
  isActive: boolean
}) {
  return (
    <motion.article
      className={comparisonCardClassName}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0.78,
        scale: isActive ? 1 : 0.985,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <h3 className="font-heading text-brand-h4 text-navy">{title}</h3>
      <ul className="mt-5 space-y-2 list-disc pl-5">
        {bullets.map((item) => (
          <li key={item} className="font-body text-base text-[var(--color-text-muted)]">
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function OutsideChecklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2 justify-center">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border px-3 py-1 font-body text-xs"
          style={{
            borderColor: 'rgba(15,23,42,0.16)',
            color: '#5b6472',
            backgroundColor: '#ffffff',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function WhatIsAMomentSection({ content }: WhatIsAMomentSectionProps) {
  const reducedMotion = useReducedMotionSafe()
  const [activeCard, setActiveCard] = useState(0)
  const boldSentenceIncluded = content.subhead.includes(boldSubheadSentence)
  const subheadLead = boldSentenceIncluded
    ? content.subhead.replace(` ${boldSubheadSentence}`, '')
    : content.subhead

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0))
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(intervalId)
  }, [reducedMotion])

  return (
    <section
      id="what-is-a-moment"
      aria-labelledby="what-is-a-moment-heading"
      className="bg-white py-24"
    >
      <div className="section-shell">
        <div className="mx-auto max-w-5xl text-center">
          <h2 id="what-is-a-moment-heading" className="section-title whitespace-pre-line">
            {content.headline}
          </h2>
          <p className="section-copy mt-5">{subheadLead}</p>
          {boldSentenceIncluded ? (
            <p className="section-copy mt-4">
              <strong className="font-semibold text-navy">{boldSubheadSentence}</strong>
            </p>
          ) : null}
        </div>

        <h3 className="mt-10 text-center font-heading text-brand-h4 text-navy">The Sports Media Tradeoff</h3>
        <div className="mt-12 grid gap-4 lg:gap-6 items-stretch lg:grid-cols-[minmax(0,1fr)_72px_280px_72px_minmax(0,1fr)]">
          <div className="flex flex-col">
            <ComparisonCard
              title={content.contrastLeft.label}
              bullets={[
                'Sports fan audiences',
                'Sports contextual publishers',
                'Price: low',
                'Inventory: scale',
              ]}
              isActive={activeCard === 0}
            />
            <OutsideChecklist items={['✓ Precision', '✓ Scale', '✗ Emotion']} />
          </div>
          <ConnectorArrow direction="left" reducedMotion={reducedMotion} />
          <GeniusMomentsBridgeCard reducedMotion={reducedMotion} />
          <ConnectorArrow direction="right" reducedMotion={reducedMotion} />
          <div className="flex flex-col">
            <ComparisonCard
              title={content.contrastRight.label}
              bullets={[
                'Live game spots',
                'In-game sponsorships',
                'Price: high',
                'Inventory: scarce',
              ]}
              isActive={activeCard === 1}
            />
            <OutsideChecklist items={['✓ Scale', '✓ Emotion', '✗ Precision']} />
          </div>
        </div>
      </div>
    </section>
  )
}
