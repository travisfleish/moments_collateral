import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import {
  useCinematicDetectionFlow,
  type CinematicPhase,
  type CinematicCompletePayload,
} from '../../hooks/useCinematicDetectionFlow'
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
}

export function EmbeddedMomentDetection({
  src,
  videoAlt,
  onPhaseChange,
  className = '',
  style,
  loop = false,
}: EmbeddedMomentDetectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [completionPayload, setCompletionPayload] = useState<CinematicCompletePayload | null>(null)

  const { phase, handleVideoEnded, handleVideoTimeUpdate, reset } = useCinematicDetectionFlow({
    videoRef,
    onComplete: setCompletionPayload,
    onPhaseChange,
  })
  const isScannerActive = phase === 'playing'

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
      className={`mb-6 overflow-hidden rounded-brand border relative ${className}`}
      style={{ borderColor: 'var(--color-lightGrey)', ...style }}
    >
      <video
        ref={videoRef}
        className="w-full h-auto"
        src={src}
        aria-label={videoAlt}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleVideoEnded}
      />
      <div className="absolute inset-0">
        <ScannerOverlay active={isScannerActive} durationMs={1600} />
      </div>

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
    </div>
  )
}
