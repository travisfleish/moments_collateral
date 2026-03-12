import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import {
  useCinematicDetectionFlow,
  type CinematicPhase,
  type CinematicCompletePayload,
} from '../../hooks/useCinematicDetectionFlow'
import { useInView } from '../../hooks/useInView'
import { ScannerOverlay } from '../ScannerOverlay'

const LOOP_RESET_DELAY_MS = 400

interface EmbeddedMomentDetectionProps {
  src: string
  videoAlt: string
  onPhaseChange?: (phase: CinematicPhase) => void
  className?: string
  style?: React.CSSProperties
  /** When true, the video and moment detection animation loop continuously */
  loop?: boolean
  /** When true, stay on "Moment Detected" and do not progress to activating/complete */
  freezeOnDetected?: boolean
  /** When true, delay starting the video until the element comes into view */
  startOnView?: boolean
  /** Start playback at this time in seconds (e.g. 2.5 to skip the first 2.5 seconds) */
  startTime?: number
  /** When true with startOnView, reset the sequence when scrolling out of view and back in */
  resetOnReenterView?: boolean
  /** When true, show the pulsing scanner overlay during the playing phase. Default: false */
  showScannerOverlay?: boolean
}

export function EmbeddedMomentDetection({
  src,
  videoAlt,
  onPhaseChange,
  className = '',
  style,
  loop = false,
  freezeOnDetected = false,
  startOnView = false,
  startTime,
  resetOnReenterView = false,
  showScannerOverlay = false,
}: EmbeddedMomentDetectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [completionPayload, setCompletionPayload] = useState<CinematicCompletePayload | null>(null)
  const [containerRef, inView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    once: !(startOnView && resetOnReenterView),
  })
  const shouldPlay = !startOnView || inView

  const { phase, handleVideoEnded, handleVideoTimeUpdate, reset } = useCinematicDetectionFlow({
    videoRef,
    onComplete: setCompletionPayload,
    onPhaseChange,
    freezeOnDetected,
    startTime,
  })

  // Reset sequence when scrolling out of view and back in (only when resetOnReenterView + startOnView)
  const prevInViewRef = useRef<boolean | null>(null)
  const hasLeftViewRef = useRef(false)
  useEffect(() => {
    if (!startOnView || !resetOnReenterView) return

    const wasInView = prevInViewRef.current
    prevInViewRef.current = inView

    if (wasInView === true && inView === false) {
      hasLeftViewRef.current = true
    }
    if (wasInView === false && inView === true && hasLeftViewRef.current) {
      hasLeftViewRef.current = false
      setCompletionPayload(null)
      reset()
    }
  }, [inView, reset, resetOnReenterView, startOnView])
  const isScannerActive = showScannerOverlay && phase === 'playing'

  // When looping, reset as soon as Moment Detected or Moment Captured is shown
  useEffect(() => {
    if (!loop || (phase !== 'detected' && phase !== 'complete')) return
    const id = window.setTimeout(() => {
      setCompletionPayload(null)
      reset()
    }, LOOP_RESET_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [loop, phase, reset])

  return (
    <div
      ref={containerRef}
      className={`mb-6 overflow-hidden rounded-brand border relative ${className}`}
      style={{ borderColor: 'var(--color-lightGrey)', ...style }}
    >
      {shouldPlay ? (
        <>
      <video
        ref={videoRef}
        className="w-full h-auto"
        src={src}
        aria-label={videoAlt}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          if (startTime != null && startTime > 0) {
            const video = e.currentTarget
            if (Number.isFinite(video.duration) && video.duration > 0) {
              video.currentTime = Math.min(startTime, video.duration - 0.1)
            } else {
              video.currentTime = startTime
            }
          }
        }}
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleVideoEnded}
      />
      {showScannerOverlay && (
        <div className="absolute inset-0">
          <ScannerOverlay active={isScannerActive} durationMs={1600} />
        </div>
      )}

      <AnimatePresence>
        {phase === 'detecting' && (
          <motion.div
            key="phase-detecting"
            className="absolute inset-0 bg-[rgba(13,18,38,0.54)] text-white flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
              />
              <p className="font-body text-base tracking-wide">Detecting Moment...</p>
            </div>
          </motion.div>
        )}

        {phase === 'detected' && (
          <motion.div
            key="phase-detected"
            className="absolute inset-0 bg-[rgba(13,18,38,0.58)] text-white flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <CheckCircle2 size={52} className="mb-3 text-[#17b26a]" />
              <p className="font-body text-lg">Moment Detected</p>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {phase === 'complete' && completionPayload?.capturedFrameDataUrl && (
        <div className="absolute inset-0 bg-[rgba(13,18,38,0.72)] flex items-end">
          <div className="w-full p-4 bg-[rgba(13,18,38,0.74)] border-t border-white/20">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-white/70 mb-2">Moment Captured</p>
            <div className="grid grid-cols-[120px_1fr_auto] gap-3 items-center">
              <img
                src={completionPayload.capturedFrameDataUrl}
                alt="Captured moment frame"
                className="w-[120px] h-[68px] object-cover rounded-sm border border-white/20"
              />
              <p className="font-body text-sm text-white/90">
                Paused at {completionPayload.videoCurrentTime.toFixed(2)}s and handed off inline.
              </p>
              <button
                type="button"
                onClick={reset}
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      ) : (
        <div className="aspect-video w-full bg-[rgba(13,18,38,0.2)]" aria-hidden />
      )}
    </div>
  )
}
