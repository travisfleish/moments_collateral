import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Radio,
  Activity,
  BarChart2,
  TrendingUp,
  CreditCard,
  MapPin,
  Users,
  Shield,
} from 'lucide-react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import type { MomentEngineContent } from '../../content/momentEngine'

// ─── Types ────────────────────────────────────────────────────────────────────

type Beat = 1 | 2 | 3 | 4 | 5
type NodeState = 'resting' | 'active' | 'dimmed'
type TimelineStop = {
  beat: Beat
  label: string
}

const TIMELINE_STOPS: TimelineStop[] = [
  { beat: 2, label: 'Data inputs to GeniusIQ' },
  { beat: 3, label: 'Data inputs to Fan Graph' },
  { beat: 4, label: 'GeniusIQ + Fan Graph to Moment Engine' },
  { beat: 5, label: 'Moment Engine to outputs' },
]

// ─── Beat copy ────────────────────────────────────────────────────────────────

const BEAT_COPY = [
  {
    beat: 1,
    label: 'The Data Foundation.',
    headline: 'Every major sport. Every live feed. All official.',
    description:
      'GeniusIQ ingests official data from 400+ global leagues in real time — not scraped, not delayed, not approximate.',
  },
  {
    beat: 2,
    label: 'Contextual Intelligence.',
    headline: 'Not just what happened. What it means.',
    description:
      'GeniusIQ interprets game state, momentum, and win probability — scoring each event for its emotional weight before the broadcast catches up.',
  },
  {
    beat: 3,
    label: 'Audience Intelligence.',
    headline: '250 million fans. The right ones, right now.',
    description:
      'The Fan Graph™ matches the moment to the exact audience segment most likely to respond — assembled automatically, no manual updates required. It continuously refines that segment with live behavior and affinity signals as the game evolves.',
  },
  {
    beat: 4,
    label: 'The Engine Fires.',
    headline: 'Under a second. Fully automatic.',
    description:
      'The Moment Engine scores the event, assembles deal parameters, and activates — before the feeling fades.',
  },
  {
    beat: 5,
    label: 'Activation.',
    headline: 'Every channel. Simultaneously.',
    description:
      'Deal Activation, DCO, Social, Content Personalization — all firing at once, inside the programmatic stack you already use.',
  },
]

// ─── Input item config ────────────────────────────────────────────────────────

const INPUT1_ITEMS = [
  { label: 'Official Data Feeds', Icon: Radio },
  { label: 'Tracking Data', Icon: Activity },
  { label: 'Next-Gen Stats', Icon: BarChart2 },
  { label: 'Real-Time Betting Odds', Icon: TrendingUp },
]

const INPUT2_ITEMS = [
  { label: 'Transaction / Search Data', Icon: CreditCard },
  { label: 'Venue Event Data', Icon: MapPin },
  { label: 'Engagement Signals', Icon: Users },
  { label: 'Official Audiences', Icon: Shield },
]

// ─── Node state helpers ───────────────────────────────────────────────────────

function nodeStyle(
  state: NodeState,
  color: 'blue' | 'green' | 'purple',
  reducedMotion: boolean
): React.CSSProperties {
  const colors = {
    blue: {
      border: '#0000dc',
      bg: 'rgba(0,0,220,0.08)',
      shadow: '0 0 20px rgba(0,0,220,0.25)',
    },
    green: {
      border: '#17b26a',
      bg: 'rgba(23,178,106,0.08)',
      shadow: '0 0 20px rgba(23,178,106,0.25)',
    },
    purple: {
      border: '#4337a8',
      bg: 'rgba(67,55,168,0.10)',
      shadow: '0 0 20px rgba(67,55,168,0.30)',
    },
  }

  if (state === 'dimmed') {
    return { opacity: reducedMotion ? 1 : 0.2 }
  }
  if (state === 'active') {
    return {
      borderColor: colors[color].border,
      backgroundColor: colors[color].bg,
      boxShadow: reducedMotion ? 'none' : colors[color].shadow,
    }
  }
  return {}
}

// ─── Arrow component ──────────────────────────────────────────────────────────

interface ArrowProps {
  id: string
  d: string
  color: string
  visible: boolean
  reducedMotion: boolean
}

function Arrow({ id, d, color, visible, reducedMotion }: ArrowProps) {
  const isVisible = visible || reducedMotion
  return (
    <motion.path
      id={id}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      initial={false}
      animate={{
        pathLength: isVisible ? 1 : 0,
        opacity: isVisible ? 0.85 : 0,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  )
}

// ─── Diagram ──────────────────────────────────────────────────────────────────

interface DiagramProps {
  beat: Beat
  reducedMotion: boolean
}

function MomentEngineDiagram({ beat, reducedMotion }: DiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null)
  const input1Ref = useRef<HTMLDivElement>(null)
  const input2Ref = useRef<HTMLDivElement>(null)
  const geniusIqRef = useRef<HTMLDivElement>(null)
  const fanGraphRef = useRef<HTMLDivElement>(null)
  const momentEngineRef = useRef<HTMLDivElement>(null)
  const outputsRef = useRef<HTMLDivElement>(null)

  const [paths, setPaths] = useState({
    arrow1: '',
    arrow2: '',
    arrow3: '',
    arrow4: '',
    arrow5: '',
  })

  const input1State: NodeState =
    beat === 1 || beat === 2 ? 'active' : beat === 5 ? 'resting' : 'dimmed'
  const input2State: NodeState =
    beat === 3 ? 'active' : beat === 5 ? 'resting' : 'dimmed'
  const geniusIQState: NodeState =
    beat === 2 || beat === 4 ? 'active' : beat === 5 ? 'resting' : 'dimmed'
  const fanGraphState: NodeState =
    beat === 3 || beat === 4 ? 'active' : beat === 5 ? 'resting' : 'dimmed'
  const momentEngineState: NodeState = beat === 4 || beat === 5 ? 'active' : 'dimmed'
  const outputsState: NodeState = beat === 5 ? 'active' : 'dimmed'

  const arrow1Visible = beat >= 2 // input1 → geniusIQ
  const arrow2Visible = beat >= 3 // input2 → fanGraph
  const arrow3Visible = beat >= 4 // geniusIQ → momentEngine
  const arrow4Visible = beat >= 4 // fanGraph → momentEngine
  const arrow5Visible = beat >= 5 // momentEngine → outputs

  const blueColor = '#0000dc'
  const greenColor = '#17b26a'
  const purpleColor = '#4337a8'

  useLayoutEffect(() => {
    const updatePaths = () => {
      const container = diagramRef.current
      const input1 = input1Ref.current
      const input2 = input2Ref.current
      const geniusIq = geniusIqRef.current
      const fanGraph = fanGraphRef.current
      const momentEngine = momentEngineRef.current
      const outputs = outputsRef.current

      if (!container || !input1 || !input2 || !geniusIq || !fanGraph || !momentEngine || !outputs) {
        return
      }

      const containerRect = container.getBoundingClientRect()
      const toLocal = (rect: DOMRect) => ({
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
        centerX: rect.left - containerRect.left + rect.width / 2,
        centerY: rect.top - containerRect.top + rect.height / 2,
      })

      const i1 = toLocal(input1.getBoundingClientRect())
      const i2 = toLocal(input2.getBoundingClientRect())
      const g = toLocal(geniusIq.getBoundingClientRect())
      const f = toLocal(fanGraph.getBoundingClientRect())
      const m = toLocal(momentEngine.getBoundingClientRect())
      const o = toLocal(outputs.getBoundingClientRect())

      // Keep the first two connectors perfectly horizontal.
      const topHorizontalY = i1.centerY
      const bottomHorizontalY = i2.centerY
      // Stop just before the engine border so arrowheads are flush.
      const engineLeftFlushX = m.left - 1

      setPaths({
        // Data input cards right-center → circles left side at matching Y.
        arrow1: `M ${i1.right} ${topHorizontalY} L ${g.left} ${topHorizontalY}`,
        arrow2: `M ${i2.right} ${bottomHorizontalY} L ${f.left} ${bottomHorizontalY}`,
        // Circle right-center → Moment Engine left-center.
        arrow3: `M ${g.right} ${g.centerY} L ${engineLeftFlushX} ${m.centerY}`,
        arrow4: `M ${f.right} ${f.centerY} L ${engineLeftFlushX} ${m.centerY}`,
        // Moment Engine bottom-center → Outputs top-center.
        arrow5: `M ${m.centerX} ${m.bottom} L ${o.centerX} ${o.top}`,
      })
    }

    updatePaths()
    let rafId: number | null = null
    // Framer-motion scale transforms do not trigger ResizeObserver. Recompute
    // paths for the duration of the transition so arrowheads stay edge-flush.
    if (!reducedMotion) {
      const start = performance.now()
      const durationMs = 500
      const tick = () => {
        updatePaths()
        if (performance.now() - start < durationMs) {
          rafId = window.requestAnimationFrame(tick)
        }
      }
      rafId = window.requestAnimationFrame(tick)
    }

    const observer = new ResizeObserver(updatePaths)
    ;[
      diagramRef.current,
      input1Ref.current,
      input2Ref.current,
      geniusIqRef.current,
      fanGraphRef.current,
      momentEngineRef.current,
      outputsRef.current,
    ].forEach((el) => {
      if (el) observer.observe(el)
    })

    window.addEventListener('resize', updatePaths)
    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      observer.disconnect()
      window.removeEventListener('resize', updatePaths)
    }
  }, [beat, reducedMotion])

  // Active accent colors for icons
  const input1IconColor = input1State === 'active' ? blueColor : '#5b6472'
  const input2IconColor = input2State === 'active' ? greenColor : '#5b6472'
  return (
    <div ref={diagramRef} className="relative w-full" style={{ minHeight: '500px' }}>
      {/* SVG arrow layer in local pixel coordinates */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible', zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Arrow 1: Input1 right edge → GeniusIQ left edge */}
        <Arrow
          id="arrow-input1-geniusiq"
          d={paths.arrow1}
          color={blueColor}
          visible={arrow1Visible && paths.arrow1.length > 0}
          reducedMotion={reducedMotion}
        />

        {/* Arrow 2: Input2 right edge → FanGraph left edge */}
        <Arrow
          id="arrow-input2-fangraph"
          d={paths.arrow2}
          color={greenColor}
          visible={arrow2Visible && paths.arrow2.length > 0}
          reducedMotion={reducedMotion}
        />

        {/* Arrow 3: GeniusIQ right edge center → MomentEngine left edge center */}
        <Arrow
          id="arrow-geniusiq-engine"
          d={paths.arrow3}
          color={blueColor}
          visible={arrow3Visible && paths.arrow3.length > 0}
          reducedMotion={reducedMotion}
        />

        {/* Arrow 4: FanGraph right edge center → MomentEngine left edge center */}
        <Arrow
          id="arrow-fangraph-engine"
          d={paths.arrow4}
          color={greenColor}
          visible={arrow4Visible && paths.arrow4.length > 0}
          reducedMotion={reducedMotion}
        />

        {/* Arrow 5: MomentEngine bottom-center → Outputs top-center (straight down) */}
        <Arrow
          id="arrow-engine-outputs"
          d={paths.arrow5}
          color={purpleColor}
          visible={arrow5Visible && paths.arrow5.length > 0}
          reducedMotion={reducedMotion}
        />
      </svg>

      {/* HTML layout grid — 3 columns */}
      <div
        className="relative grid gap-x-8 gap-y-4 h-full"
        style={{ gridTemplateColumns: '300px 112px minmax(0, 1fr)', zIndex: 2 }}
      >
        {/* Column 1: Input boxes */}
        <div className="flex flex-col justify-between gap-4 py-2">

          {/* Input box 1 */}
          <motion.div
            ref={input1Ref}
            className="rounded-xl border p-4 flex-1"
            style={{
              backgroundColor: '#f6f7f9',
              borderColor: '#e5e7eb',
              ...nodeStyle(input1State, 'blue', reducedMotion),
            }}
            animate={{
              scale: input1State === 'active' && !reducedMotion ? 1.03 : 1,
              opacity: input1State === 'dimmed' && !reducedMotion ? 0.2 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <p
              className="font-body font-medium uppercase tracking-widest mb-3"
              style={{ fontSize: '11px', color: '#5b6472' }}
            >
              Data Inputs
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {INPUT1_ITEMS.map(({ label, Icon }) => (
                <li
                  key={label}
                  style={{
                    fontSize: '13px',
                    color: input1IconColor,
                    padding: '6px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Icon size={20} strokeWidth={2.1} style={{ flexShrink: 0, color: input1IconColor }} />
                  <span style={{ color: '#5b6472' }}>{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Input box 2 */}
          <motion.div
            ref={input2Ref}
            className="rounded-xl border p-4 flex-1"
            style={{
              backgroundColor: '#f6f7f9',
              borderColor: '#e5e7eb',
              ...nodeStyle(input2State, 'green', reducedMotion),
            }}
            animate={{
              scale: input2State === 'active' && !reducedMotion ? 1.03 : 1,
              opacity: input2State === 'dimmed' && !reducedMotion ? 0.2 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <p
              className="font-body font-medium uppercase tracking-widest mb-3"
              style={{ fontSize: '11px', color: '#5b6472' }}
            >
              Data Inputs
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {INPUT2_ITEMS.map(({ label, Icon }) => (
                <li
                  key={label}
                  style={{
                    fontSize: '13px',
                    padding: '6px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Icon size={20} strokeWidth={2.1} style={{ flexShrink: 0, color: input2IconColor }} />
                  <span style={{ color: '#5b6472' }}>{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Column 2: Circles */}
        <div className="flex flex-col gap-4 py-2" style={{ transform: 'translateY(-6px)' }}>

          {/* GeniusIQ circle */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              ref={geniusIqRef}
              className="rounded-full border-2 flex items-center justify-center flex-none"
              style={{
                backgroundColor: '#f6f7f9',
                borderColor: '#e5e7eb',
                width: '112px',
                aspectRatio: '1 / 1',
                ...nodeStyle(geniusIQState, 'blue', reducedMotion),
              }}
              animate={{
                scale: geniusIQState === 'active' && !reducedMotion ? 1.03 : 1,
                opacity: geniusIQState === 'dimmed' && !reducedMotion ? 0.2 : 1,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span
                className="font-heading font-medium text-center"
                style={{ fontSize: '15px', color: '#0d1226', lineHeight: 1.2 }}
              >
                GeniusIQ
              </span>
            </motion.div>
          </div>

          {/* Fan Graph circle */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              ref={fanGraphRef}
              className="rounded-full border-2 flex items-center justify-center flex-none"
              style={{
                backgroundColor: '#f6f7f9',
                borderColor: '#e5e7eb',
                width: '112px',
                aspectRatio: '1 / 1',
                ...nodeStyle(fanGraphState, 'green', reducedMotion),
              }}
              animate={{
                scale: fanGraphState === 'active' && !reducedMotion ? 1.03 : 1,
                opacity: fanGraphState === 'dimmed' && !reducedMotion ? 0.2 : 1,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span
                className="font-heading font-medium text-center"
                style={{ fontSize: '15px', color: '#0d1226', lineHeight: 1.2 }}
              >
                Fan Graph™
              </span>
            </motion.div>
          </div>
        </div>

        {/* Column 3: Moment Engine + Outputs */}
        {/*
          Shift the stack upward so the combined Moment Engine + Outputs group
          centers against the input cards and circles rather than anchoring the
          Moment Engine box itself to the midpoint.
        */}
        <div
          className="flex flex-col"
          style={{ paddingTop: '126px', paddingBottom: '8px', paddingLeft: '24px', gap: '37px' }}
        >

          {/* Moment Engine box */}
          <motion.div
            ref={momentEngineRef}
            className="rounded-xl border p-4"
            style={{
              backgroundColor: '#f6f7f9',
              borderColor: '#e5e7eb',
              flex: '0 0 auto',
              ...nodeStyle(momentEngineState, 'purple', reducedMotion),
            }}
            animate={{
              scale: momentEngineState === 'active' && !reducedMotion ? 1.03 : 1,
              opacity: momentEngineState === 'dimmed' && !reducedMotion ? 0.2 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <p
              className="font-heading font-medium"
              style={{ fontSize: '14px', color: '#0d1226' }}
            >
              Genius Moment Engine
            </p>
            <p
              className="font-body mt-1"
              style={{ fontSize: '11px', color: '#5b6472' }}
            >
              Detects events + Scores Moments
            </p>
          </motion.div>

          {/* Outputs box */}
          <motion.div
            ref={outputsRef}
            className="rounded-xl border flex-none"
            style={{
              backgroundColor: '#f6f7f9',
              borderColor: '#e5e7eb',
              padding: '12px 14px',
              ...nodeStyle(outputsState, 'purple', reducedMotion),
            }}
            animate={{
              opacity: outputsState === 'dimmed' && !reducedMotion ? 0.2 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <p
              className="font-body font-medium uppercase tracking-widest mb-2"
              style={{ fontSize: '10px', color: '#5b6472' }}
            >
              Outputs
            </p>
            <div className="flex flex-col gap-1">
              {['Deal Activation', 'DCO', 'Social', 'Content Personalization'].map((item, i) => (
                <motion.div
                  key={item}
                  className="rounded-md px-2.5 py-1.5"
                  style={{
                    backgroundColor: beat === 5 ? 'rgba(67,55,168,0.08)' : '#ffffff',
                    border: `1px solid ${beat === 5 ? 'rgba(67,55,168,0.2)' : '#e5e7eb'}`,
                    fontSize: '11px',
                    color: '#0d1226',
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={
                    beat === 5 || reducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.15, y: 0 }
                  }
                  transition={{
                    duration: reducedMotion ? 0.1 : 0.35,
                    delay: beat === 5 && !reducedMotion ? i * 0.1 : 0,
                    ease: 'easeOut',
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Right column copy ────────────────────────────────────────────────────────

interface BeatCopyProps {
  beat: Beat
  reducedMotion: boolean
}

function BeatCopy({ beat, reducedMotion }: BeatCopyProps) {
  const copy = BEAT_COPY[beat - 1]

  const variants = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reducedMotion ? 0 : -8 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={beat}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: reducedMotion ? 0.1 : 0.4, ease: 'easeOut' }}
      >
        <h3
          className="font-heading"
          style={{
            fontSize: '1.35rem',
            fontWeight: 300,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: '#0d1226',
            marginBottom: '1rem',
          }}
        >
          {copy.headline}
        </h3>
        <p
          className="font-body"
          style={{ fontSize: '1rem', lineHeight: 1.6, color: '#5b6472', maxWidth: '40ch' }}
        >
          {copy.description}
        </p>

        {/* Beat indicator dots */}
        <div className="flex gap-2 mt-8">
          {([1, 2, 3, 4, 5] as Beat[]).map((b) => (
            <div
              key={b}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: b === beat ? '#0000dc' : '#e5e7eb',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>

        <div className="flex justify-start mt-4">
          <span
            className="inline-block rounded-full px-3 py-1 font-body font-medium"
            style={{
              fontSize: '12px',
              backgroundColor: 'rgba(0,0,220,0.08)',
              color: '#0000dc',
              border: '1px solid rgba(0,0,220,0.2)',
            }}
          >
            {copy.label}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

interface MomentEngineSectionProps {
  content: MomentEngineContent['momentEngine']
}

export function MomentEngineSection({ content: _content }: MomentEngineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(sectionRef)
  const reducedMotion = useReducedMotionSafe()

  const rawBeat = reducedMotion ? 5 : Math.min(5, Math.floor(progress * 5) + 1)
  const beat = rawBeat as Beat
  const activeTimelineIndex = TIMELINE_STOPS.findIndex((stop) => stop.beat === beat)
  const timelineProgressPercent =
    activeTimelineIndex < 0 ? 0 : ((activeTimelineIndex + 1) / TIMELINE_STOPS.length) * 100

  const scrollToBeat = (targetBeat: Beat) => {
    const section = sectionRef.current
    if (!section) return

    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 0)
    const targetProgress = (targetBeat - 0.5) / 5
    const targetY = sectionTop + scrollableDistance * Math.min(0.999, Math.max(0, targetProgress))

    window.scrollTo({
      top: targetY,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="moment-engine"
      aria-labelledby="moment-engine-heading"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-white">
        <div className="section-shell-wide w-full">

          {/* Section header */}
          <div className="text-center mb-12">
            <h2
              id="moment-engine-heading"
              className="section-title mt-1 mb-8"
            >
              The technology behind a moment.
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-12 lg:gap-16 items-center">

            {/* Left: diagram */}
            <div>
              <MomentEngineDiagram
                beat={beat}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Right: beat copy */}
            <div className="lg:pl-10">
              <BeatCopy beat={beat} reducedMotion={reducedMotion} />
            </div>
          </div>

          <div className="mt-8 px-2 lg:px-6">
            <div className="relative">
              <div
                className="absolute left-0 right-0 top-[16px] h-0.5 rounded-full"
                style={{ backgroundColor: '#e5e7eb' }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-0 top-[16px] h-0.5 rounded-full"
                style={{ backgroundColor: '#4337a8' }}
                initial={{ width: 0 }}
                animate={{ width: `${timelineProgressPercent}%` }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {TIMELINE_STOPS.map((stop, index) => {
                  const isActive = beat === stop.beat

                  return (
                    <button
                      key={stop.label}
                      type="button"
                      onClick={() => scrollToBeat(stop.beat)}
                      aria-current={isActive ? 'step' : undefined}
                      className="flex flex-col items-start gap-2 text-left"
                    >
                      <span
                        className="w-8 h-8 rounded-full border flex items-center justify-center font-heading text-xs transition-colors duration-200"
                        style={{
                          backgroundColor: isActive ? '#4337a8' : '#ffffff',
                          borderColor: isActive ? '#4337a8' : '#d1d5db',
                          color: isActive ? '#ffffff' : '#5b6472',
                        }}
                      >
                        {index + 1}
                      </span>
                      <span
                        className="font-body text-[13px] leading-5 transition-colors duration-200"
                        style={{ color: isActive ? '#0d1226' : '#5b6472' }}
                      >
                        {stop.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
