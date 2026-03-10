import { useReducedMotion } from 'framer-motion'

/**
 * Safe wrapper around Framer Motion's useReducedMotion.
 * Returns true if the user prefers reduced motion, false otherwise.
 */
export function useReducedMotionSafe(): boolean {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ?? false
}
