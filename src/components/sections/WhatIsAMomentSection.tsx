import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import type { MomentEngineContent } from '../../content/momentEngine'

// ─── State 1 copy ─────────────────────────────────────────────────────────────

function State1Copy({ content }: { content: MomentEngineContent['whatIsAMoment'] }) {
  return (
    <div>
      <span
        className="inline-block rounded-full px-4 py-2 font-body text-body font-semibold"
        style={{
          backgroundColor: '#e5e7eb',
          color: '#6b7280',
        }}
      >
        The Standard Sports Buy.
      </span>
      <p className="section-copy mt-4">
        {content.contrastLeft.description}
      </p>
    </div>
  )
}

// ─── State 2 copy ─────────────────────────────────────────────────────────────

function State2Copy({ content }: { content: MomentEngineContent['whatIsAMoment'] }) {
  return (
    <div>
      <span
        className="inline-block rounded-full px-4 py-2 font-body text-body font-semibold"
        style={{
          backgroundColor: 'rgba(0,255,204,0.15)',
          border: '1px solid #00ffcc',
          color: '#00ffcc',
        }}
      >
        With Genius Sports Moments.
      </span>
      <h2
        className="section-title mt-4"
        style={{ color: '#ffffff' }}
      >
        {content.contrastRight.headline}
      </h2>
      <p
        className="section-copy mt-6"
        style={{ color: 'rgba(255,255,255,0.8)' }}
      >
        {content.contrastRight.description}
      </p>
    </div>
  )
}

// ─── Timeline card ────────────────────────────────────────────────────────────

function TimelineCard({ variant }: { variant: 'before' | 'after' }) {
  const isBefore = variant === 'before'

  return (
    <div
      className="w-full rounded-2xl p-6"
      style={{
        maxWidth: '480px',
        height: '280px',
        backgroundColor: isBefore ? '#f6f7f9' : '#0a0a2e',
        boxShadow: isBefore
          ? '0 4px 24px rgba(0,0,0,0.10)'
          : '0 4px 24px rgba(0,0,220,0.25)',
      }}
    >
      {/* Label */}
      <p
        className="font-body text-body-sm tracking-widest uppercase mb-4"
        style={{
          color: isBefore ? '#9ca3af' : '#00ffcc',
          fontSize: '20px',
          lineHeight: 1.2,
        }}
      >
        {isBefore ? 'SCHEDULED DELIVERY' : 'MOMENT ACTIVATION'}
      </p>

      {/* Timeline bar + markers */}
      <div className="relative mb-6" style={{ height: '64px' }}>
        {/* Bar */}
        <div
          className="absolute rounded-full"
          style={{
            top: '28px',
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: isBefore ? '#e5e7eb' : 'rgba(255,255,255,0.15)',
          }}
        />

        {isBefore ? (
          // Before: three identical ad markers
          <>
            {[
              { left: '15%', label: 'Pre-Roll' },
              { left: '50%', label: 'Mid-Roll' },
              { left: '80%', label: 'Mid-Roll' },
            ].map(({ left, label }) => (
              <div
                key={left}
                className="absolute flex flex-col items-center"
                style={{ left, transform: 'translateX(-50%)', top: '16px' }}
              >
                {/* Wireframe ad unit */}
                <div
                  className="mb-1"
                  style={{
                    width: '28px',
                    height: '18px',
                    border: '1px solid #d1d5db',
                    borderRadius: '2px',
                    backgroundColor: '#fff',
                  }}
                />
                {/* Yellow ad marker */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#facc15',
                    borderRadius: '2px',
                  }}
                >
                  <span style={{ fontSize: '8px', color: '#000', fontWeight: 600 }}>Ad</span>
                </div>
                <span
                  className="mt-1 font-body"
                  style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </>
        ) : (
          // After: single neon marker at 65% with spike + badge
          <div
            className="absolute flex flex-col items-center"
            style={{ left: '65%', transform: 'translateX(-50%)', top: '-12px' }}
          >
            {/* Badge */}
            <div
              className="rounded-full px-3 py-1 mb-1"
              style={{
                backgroundColor: 'rgba(0,255,204,0.15)',
                border: '1px solid #00ffcc',
                color: '#00ffcc',
                fontSize: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              Buzzer Beater — High ↑
            </div>
            {/* Spike */}
            <div style={{ width: '2px', height: '32px', backgroundColor: '#00ffcc' }} />
            {/* Neon marker */}
            <div
              className="flex items-center justify-center"
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#00ffcc',
                borderRadius: '2px',
              }}
            >
              <span style={{ fontSize: '10px', color: '#0a0a2e', fontWeight: 700 }}>Ad</span>
            </div>
          </div>
        )}
      </div>

      {/* Emotional intensity SVG — after variant only */}
      {!isBefore && (
        <svg
          width="100%"
          height="40"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          className="mb-3"
          aria-hidden="true"
        >
          <polyline
            points="0,30 40,31 70,27 95,32 120,28 150,33 180,29 210,31 235,24 248,12 260,4 272,14 286,26 310,30 340,28 370,31 400,30"
            fill="none"
            stroke="#00ffcc"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* Bottom label */}
      <p
        className="font-body text-body-sm mt-auto"
        style={{
          color: isBefore ? '#9ca3af' : '#ffffff',
          marginTop: isBefore ? '8px' : '0',
          fontSize: '20px',
          lineHeight: 1.35,
          textAlign: isBefore ? 'left' : 'center',
        }}
      >
        {isBefore
          ? 'Broad daypart. No game state. No emotion.'
          : 'Precise. Emotional. Automatic.'}
      </p>
    </div>
  )
}

// ─── Moment card ──────────────────────────────────────────────────────────────

function MomentCard({ moment, index }: { moment: MomentEngineContent['whatIsAMoment']['moments'][number]; index: number }) {
  return (
    <motion.li
      role="listitem"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="rounded-2xl p-5 flex-shrink-0"
      style={{
        minWidth: '280px',
        flex: 1,
        maxWidth: '400px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* League badge */}
      <span
        className="inline-block rounded-full px-2 py-0.5 font-body font-medium"
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          color: '#ffffff',
          fontSize: '11px',
        }}
      >
        {moment.league}
      </span>

      {/* Sport */}
      <p className="font-heading text-brand-h4 mt-3" style={{ color: '#ffffff' }}>
        {moment.sport}
      </p>

      {/* Trigger */}
      <p className="font-body text-body-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
        {moment.trigger}
      </p>

      {/* Emotion pill */}
      <div className="mt-3">
        <span
          className="inline-block rounded-full px-2 py-0.5 font-body"
          style={{
            backgroundColor: 'rgba(0,255,204,0.15)',
            border: '1px solid #00ffcc',
            color: '#00ffcc',
            fontSize: '11px',
          }}
        >
          {moment.emotion}
        </span>
      </div>

      {/* Verticals */}
      <div className="mt-3 flex flex-wrap gap-1">
        {moment.verticals.map((v) => (
          <span
            key={v}
            className="rounded-full px-2 py-0.5 font-body"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
            }}
          >
            {v}
          </span>
        ))}
      </div>
    </motion.li>
  )
}

// ─── Moment example cards row ─────────────────────────────────────────────────

function MomentExampleCards({ moments }: { moments: MomentEngineContent['whatIsAMoment']['moments'] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5 }}
      className="mt-12 w-full"
    >
      <ul
        role="list"
        className="flex gap-6 justify-center flex-nowrap"
      >
        {moments.map((moment, i) => (
          <MomentCard key={moment.trigger} moment={moment} index={i} />
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

interface WhatIsAMomentSectionProps {
  content: MomentEngineContent['whatIsAMoment']
}

const HEADER_TRANSITION_MS = 400
const BACKGROUND_TRANSITION_MS = 300

export function WhatIsAMomentSection({ content }: WhatIsAMomentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(sectionRef)
  const reducedMotion = useReducedMotionSafe()
  const [headerVisible, setHeaderVisible] = useState(true)
  const prevStateRef = useRef<number | null>(null)

  // Single threshold: fully State 1 or fully State 2. No in-between.
  const effectiveProgress = reducedMotion ? 1 : progress
  const isStateTwo = effectiveProgress >= 0.5
  const state = isStateTwo ? 2 : 1
  const showMomentCards = isStateTwo

  // Mirror content transition: persistent header fades out then back in only when state changes (not on mount)
  useEffect(() => {
    const prev = prevStateRef.current
    prevStateRef.current = state
    if (prev === null) return // first mount, no dip
    if (prev === state) return
    setHeaderVisible(false)
    const t = setTimeout(() => setHeaderVisible(true), HEADER_TRANSITION_MS)
    return () => clearTimeout(t)
  }, [state])

  return (
    <section
      ref={sectionRef}
      id="what-is-a-moment"
      aria-labelledby="what-is-a-moment-heading"
      style={{ height: '200vh' }}
    >
      {/* Sticky container — background flips at threshold with short CSS transition */}
      <div
        className="sticky top-0 h-screen"
        style={{
          backgroundColor: isStateTwo ? '#0000dc' : '#ffffff',
          transition: `background-color ${BACKGROUND_TRANSITION_MS}ms ease`,
        }}
      >
        <div className="section-shell flex flex-col h-full py-24">

          {/* Header block: fixed height, pinned to top so headline stays stationary across states */}
          <div
            className="flex flex-col justify-start flex-shrink-0 pt-12 pb-0"
            style={{ height: '120px' }}
          >
            <motion.h2
              id="what-is-a-moment-heading"
              className="section-title text-center mb-4"
              style={{ color: isStateTwo ? '#ffffff' : 'rgb(13, 18, 38)' }}
              initial={false}
              animate={{ opacity: headerVisible ? 1 : 0 }}
              transition={{ duration: HEADER_TRANSITION_MS / 1000, ease: 'easeInOut' }}
            >
              There's a better way to buy sports.
            </motion.h2>
          </div>

          {/* Two-column content — fixed min-height so header does not shift when content swaps */}
          <AnimatePresence mode="wait">
            {state === 1 ? (
              <motion.div
                key="state1"
                className="grid lg:grid-cols-2 gap-16 items-center flex-shrink-0"
                style={{ minHeight: '400px' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <State1Copy content={content} />
                <div className="flex justify-center lg:justify-end">
                  <TimelineCard variant="before" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="state2"
                className="grid lg:grid-cols-2 gap-16 items-center flex-shrink-0"
                style={{ minHeight: '400px' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <State2Copy content={content} />
                <div className="flex justify-center lg:justify-end">
                  <TimelineCard variant="after" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Moment example cards — appear at progress 0.85+ */}
          <AnimatePresence>
            {showMomentCards && (
              <MomentExampleCards moments={content.moments} />
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
