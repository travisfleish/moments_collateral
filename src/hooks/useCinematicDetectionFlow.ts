import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import {
  CINEMATIC_ACTIVATING_HOLD_MS,
  CINEMATIC_ACTIVATING_SCROLL_MS,
  CINEMATIC_DETECTED_DISPLAY_MS,
  CINEMATIC_DETECTING_DELAY_MS,
} from '../tokens'

export type CinematicPhase = 'playing' | 'detecting' | 'detected' | 'activating' | 'complete'

export type CinematicCompletePayload = {
  videoCurrentTime: number
  capturedFrameDataUrl: string | null
}

interface UseCinematicDetectionFlowOptions {
  videoRef: RefObject<HTMLVideoElement | null>
  onComplete?: (payload: CinematicCompletePayload) => void
  onPhaseChange?: (phase: CinematicPhase) => void
  /** When true, stay on "Moment Detected" and do not progress to activating/complete */
  freezeOnDetected?: boolean
  /** Start playback at this time in seconds when resetting (e.g. 2.5) */
  startTime?: number
}

const DETECTION_LEAD_TIME_SECONDS = 1

export function useCinematicDetectionFlow({
  videoRef,
  onComplete,
  onPhaseChange,
  freezeOnDetected = false,
  startTime,
}: UseCinematicDetectionFlowOptions) {
  const [phase, setPhase] = useState<CinematicPhase>('playing')
  const [payload, setPayload] = useState<CinematicCompletePayload | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const completionNotifiedRef = useRef(false)

  const clearScheduledTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const captureCurrentVideoFrame = useCallback((): CinematicCompletePayload => {
    const video = videoRef.current
    if (!video) {
      return { videoCurrentTime: 0, capturedFrameDataUrl: null }
    }

    let capturedFrameDataUrl: string | null = null

    if (video.videoWidth > 0 && video.videoHeight > 0) {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        capturedFrameDataUrl = canvas.toDataURL('image/jpeg', 0.92)
      }
    }

    return {
      videoCurrentTime: video.currentTime,
      capturedFrameDataUrl,
    }
  }, [videoRef])

  useEffect(() => {
    clearScheduledTimeout()

    if (phase === 'detecting') {
      timeoutRef.current = window.setTimeout(() => {
        setPhase('detected')
      }, CINEMATIC_DETECTING_DELAY_MS)
      return
    }

    if (phase === 'detected') {
      if (freezeOnDetected) return
      timeoutRef.current = window.setTimeout(() => {
        const video = videoRef.current
        if (video) {
          video.pause()
        }

        const nextPayload = captureCurrentVideoFrame()
        setPayload(nextPayload)
        setPhase('activating')
      }, CINEMATIC_DETECTED_DISPLAY_MS)
      return
    }

    if (phase === 'activating') {
      timeoutRef.current = window.setTimeout(() => {
        setPhase('complete')
      }, CINEMATIC_ACTIVATING_SCROLL_MS + CINEMATIC_ACTIVATING_HOLD_MS)
      return
    }

    if (phase === 'complete' && payload && !completionNotifiedRef.current) {
      completionNotifiedRef.current = true
      onComplete?.(payload)
    }
  }, [captureCurrentVideoFrame, clearScheduledTimeout, freezeOnDetected, onComplete, payload, phase, videoRef])

  useEffect(() => clearScheduledTimeout, [clearScheduledTimeout])

  useEffect(() => {
    onPhaseChange?.(phase)
  }, [onPhaseChange, phase])

  const startDetecting = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
    }

    setPhase((currentPhase) => (currentPhase === 'playing' ? 'detecting' : currentPhase))
  }, [videoRef])

  const handleVideoTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return
    }

    const remainingSeconds = video.duration - video.currentTime
    if (remainingSeconds <= DETECTION_LEAD_TIME_SECONDS) {
      startDetecting()
    }
  }, [startDetecting, videoRef])

  const handleVideoEnded = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
    }
    startDetecting()
  }, [startDetecting, videoRef])

  const reset = useCallback(() => {
    clearScheduledTimeout()
    completionNotifiedRef.current = false
    setPayload(null)
    setPhase('playing')

    const video = videoRef.current
    if (!video) return

    const seekTo = startTime != null && startTime > 0
      ? Math.min(startTime, Math.max(0, (video.duration || 0) - 0.1))
      : 0
    video.currentTime = seekTo
    void video.play().catch(() => undefined)
  }, [clearScheduledTimeout, startTime, videoRef])

  return {
    phase,
    payload,
    handleVideoTimeUpdate,
    handleVideoEnded,
    reset,
  }
}
