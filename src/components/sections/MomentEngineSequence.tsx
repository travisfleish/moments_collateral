import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Reveal } from '../primitives/MotionPrimitives'
import { EmbeddedMomentDetection } from './EmbeddedMomentDetection'
import { AnimatedFanCloud } from './AnimatedFanCloud'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import type { CinematicPhase } from '../../hooks/useCinematicDetectionFlow'
import type { MomentEngineContent } from '../../content/momentEngine'
import {
  CINEMATIC_ACTIVATING_HOLD_MS,
  CINEMATIC_ACTIVATING_SCROLL_MS,
} from '../../tokens'

interface MomentEngineSequenceProps {
  content: MomentEngineContent['sequence']
}

const AUDIENCE_IDS = [
  'GS-118-204',
  'GS-904-113',
  'GS-551-892',
  'GS-332-771',
  'GS-743-024',
  'GS-449-365',
  'GS-802-507',
  'GS-217-649',
  'GS-631-180',
]
const AUDIENCE_TARGET_INDEX = 6
const ROW_HEIGHT = 48
const ACTIVATION_OVERLAY_TOTAL_MS = CINEMATIC_ACTIVATING_SCROLL_MS + CINEMATIC_ACTIVATING_HOLD_MS

export function MomentEngineSequence({ content }: MomentEngineSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const wasSectionInViewRef = useRef(false)
  const [activeStep, setActiveStep] = useState(0)
  const [, setDetectionPhase] = useState<CinematicPhase>('playing')
  const [isManualActivationPlaying, setIsManualActivationPlaying] = useState(false)
  const [manualActivationRunId, setManualActivationRunId] = useState(0)
  const [fanCloudReplayToken, setFanCloudReplayToken] = useState(0)
  const [sectionRunId, setSectionRunId] = useState(0)
  const manualActivationTimeoutRef = useRef<number | null>(null)
  const isSectionInView = useInView(sectionRef, { amount: 0.35 })
  const reduced = useReducedMotionSafe()

  const step = content.steps[activeStep]
  const detectionStep = content.steps.find((s) => s.id === 'step-detect') ?? content.steps[0]
  const shouldRevealFanCloud = activeStep === 1
  const shouldShowActivationOverlay = activeStep === 1 && isManualActivationPlaying
  const showDetectionVideo = activeStep === 0
  const shouldShowWorkInProgressPlaceholder = step?.id === 'step-deal' || step?.id === 'step-activate'
  const reelRows = [...AUDIENCE_IDS, ...AUDIENCE_IDS, ...AUDIENCE_IDS].map((id, index) => ({
    id,
    isTarget: index === AUDIENCE_IDS.length + AUDIENCE_TARGET_INDEX,
    key: `${id}-${index}`,
  }))
  const finalYOffset = -(AUDIENCE_IDS.length * ROW_HEIGHT + AUDIENCE_TARGET_INDEX * ROW_HEIGHT)
  const activationOverlayKey = `activation-overlay-${manualActivationRunId}`

  const triggerManualActivationOverlay = () => {
    if (manualActivationTimeoutRef.current !== null) {
      window.clearTimeout(manualActivationTimeoutRef.current)
      manualActivationTimeoutRef.current = null
    }

    setManualActivationRunId((prev) => prev + 1)
    setFanCloudReplayToken((prev) => prev + 1)
    setIsManualActivationPlaying(true)

    manualActivationTimeoutRef.current = window.setTimeout(() => {
      setIsManualActivationPlaying(false)
      manualActivationTimeoutRef.current = null
    }, ACTIVATION_OVERLAY_TOTAL_MS)
  }

  const goToStep = (nextStep: number) => {
    setActiveStep(nextStep)
    if (nextStep === 1) {
      triggerManualActivationOverlay()
    }
  }

  const handleDetectionPhaseChange = (phase: CinematicPhase) => {
    setDetectionPhase(phase)

    // As soon as activation starts in Step 1, hand off to Step 2 copy/state.
    if (phase === 'activating') {
      triggerManualActivationOverlay()
      setActiveStep((prev) => (prev === 0 ? 1 : prev))
    }
  }

  useEffect(() => {
    return () => {
      if (manualActivationTimeoutRef.current !== null) {
        window.clearTimeout(manualActivationTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const wasInView = wasSectionInViewRef.current
    const hasEnteredView = isSectionInView && !wasInView

    if (manualActivationTimeoutRef.current !== null) {
      window.clearTimeout(manualActivationTimeoutRef.current)
      manualActivationTimeoutRef.current = null
    }

    if (hasEnteredView) {
      setSectionRunId((prev) => prev + 1)
      setActiveStep(0)
      setDetectionPhase('playing')
      setIsManualActivationPlaying(false)
    }

    wasSectionInViewRef.current = isSectionInView
  }, [isSectionInView])

  return (
    <section
      ref={sectionRef}
      id="sequence"
      style={{ backgroundColor: 'var(--gs-bg)' }}
      className="relative py-24 overflow-hidden"
      aria-labelledby="sequence-heading"
    >
      <div className="section-shell max-w-[1320px]">
        {/* Header */}
        {content.kicker ? (
          <Reveal>
            <p className="font-body text-body-sm font-medium tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-purple)' }}>
              {content.kicker}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={0.06}>
          <h2 id="sequence-heading" className="font-heading text-brand-h2 text-navy mb-6 max-w-2xl font-light">
            {content.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-copy max-w-2xl mb-16">
            {content.subhead}
          </p>
        </Reveal>

        {/* Step detail card */}
        {step && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.3, ease: 'easeOut' }}
            className="brand-card shadow-card"
          >
            <div className="p-8 lg:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {content.steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goToStep(i)}
                    aria-pressed={activeStep === i}
                    className={[
                      'w-full flex items-center justify-center gap-2.5 px-4 py-2 rounded-brand border text-body-sm font-body font-medium transition-all duration-200',
                      activeStep === i
                        ? 'text-navy border-[rgba(67,55,168,0.5)]'
                        : 'text-[var(--color-text-muted)] border-[var(--color-lightGrey)] hover:border-[rgba(67,55,168,0.3)] hover:text-navy',
                    ].join(' ')}
                    style={activeStep === i ? { backgroundColor: 'rgba(67,55,168,0.06)' } : { backgroundColor: 'var(--color-white)' }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-heading flex-shrink-0"
                      style={{
                        backgroundColor: activeStep === i ? 'var(--color-purple)' : 'rgba(0,0,0,0.08)',
                        color: activeStep === i ? 'white' : 'var(--color-text-muted)',
                      }}
                    >
                      {s.stepNumber}
                    </span>
                    {s.label}
                  </button>
                ))}
              </div>
              <div
                className="h-0.5 rounded-full overflow-hidden mb-8"
                style={{ backgroundColor: 'var(--color-lightGrey)' }}
                aria-hidden="true"
              >
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: 'var(--color-purple)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeStep + 1) / content.steps.length) * 100}%` }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: 'easeOut' }}
                />
              </div>

              <h3 className="font-heading text-brand-h3 text-navy mb-8">
                {step.headline}
              </h3>

              {(showDetectionVideo || shouldRevealFanCloud || shouldShowWorkInProgressPlaceholder) && (
                <AnimatePresence mode="wait" initial={false}>
                  {showDetectionVideo && detectionStep?.videoSrc && (
                    <motion.div
                      key={`detection-run-${sectionRunId}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0.1 : 0.2, ease: 'easeInOut' }}
                    >
                      <EmbeddedMomentDetection
                        src={detectionStep.videoSrc}
                        videoAlt={detectionStep.videoAlt ?? `${detectionStep.label} sample video`}
                        onPhaseChange={handleDetectionPhaseChange}
                      />
                    </motion.div>
                  )}
                  {shouldRevealFanCloud && (
                    <motion.div
                      key={`fan-cloud-run-${sectionRunId}-${fanCloudReplayToken}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0.1 : 0.25, ease: 'easeInOut' }}
                    >
                      <div
                        className="relative overflow-hidden rounded-brand border"
                        style={{ borderColor: 'var(--color-lightGrey)' }}
                      >
                        <AnimatedFanCloud
                          animate={shouldRevealFanCloud}
                          reducedMotion={reduced}
                          mode="graph-build"
                          replayToken={fanCloudReplayToken}
                          className="w-full h-auto"
                          alt="Genius fan cloud attributes for the activated audience segment."
                        />
                        <AnimatePresence>
                          {shouldShowActivationOverlay && (
                            <motion.div
                              key={activationOverlayKey}
                              className="absolute inset-0 bg-[rgba(13,18,38,0.64)] text-white flex flex-col items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <p className="font-body text-sm tracking-[0.28em] mb-4 text-white/75">
                                ACTIVATING AUDIENCES
                              </p>
                              <div className="relative w-[220px] h-[56px] overflow-hidden rounded-md border border-white/20 bg-black/25">
                                <div className="absolute inset-0 pointer-events-none border-y border-[#17b26a]" />
                                <motion.div
                                  key={`${activationOverlayKey}-reel`}
                                  initial={{ y: 0 }}
                                  animate={{ y: finalYOffset }}
                                  transition={{
                                    duration: CINEMATIC_ACTIVATING_SCROLL_MS / 1000,
                                    ease: [0.2, 0.78, 0.2, 1],
                                  }}
                                >
                                  {reelRows.map((row) => (
                                    <div
                                      key={row.key}
                                      className="h-12 px-4 flex items-center justify-center font-mono text-sm tracking-[0.12em]"
                                      style={{
                                        color: row.isTarget ? '#17b26a' : 'rgba(255,255,255,0.72)',
                                        fontWeight: row.isTarget ? 600 : 400,
                                      }}
                                    >
                                      {row.id}
                                    </div>
                                  ))}
                                </motion.div>
                              </div>
                              <motion.p
                                className="font-body text-xs mt-3 text-white/70"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  delay:
                                    (CINEMATIC_ACTIVATING_SCROLL_MS + CINEMATIC_ACTIVATING_HOLD_MS * 0.4) /
                                    1000,
                                }}
                              >
                                Audience ID {AUDIENCE_IDS[AUDIENCE_TARGET_INDEX]} ready
                              </motion.p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                  {shouldShowWorkInProgressPlaceholder && (
                    <motion.div
                      key={`wip-${step.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0.1 : 0.25, ease: 'easeInOut' }}
                      className="mb-6 overflow-hidden rounded-brand border relative"
                      style={{
                        borderColor: 'var(--color-lightGrey)',
                        background:
                          'linear-gradient(180deg, rgba(13,18,38,0.9) 0%, rgba(13,18,38,0.8) 100%)',
                        aspectRatio: '16 / 9',
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                        <div className="max-w-[520px] rounded-brand border border-white/45 bg-[rgba(13,18,38,0.74)] px-8 py-7 text-center shadow-card backdrop-blur-[2px]">
                          <p className="font-body text-[11px] tracking-[0.3em] text-white/80">INTERNAL DRAFT</p>
                          <p className="font-heading text-[clamp(1.3rem,2.8vw,2.2rem)] leading-[1.05] text-white mt-2">
                            WORK IN PROGRESS
                          </p>
                          <p className="font-body text-[clamp(0.85rem,1.35vw,1rem)] leading-relaxed text-white/90 mt-3">
                            Awaiting final copy and creative assets for this step.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}

      </div>

    </section>
  )
}
