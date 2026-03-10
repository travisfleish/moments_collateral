import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedFanCloud } from './AnimatedFanCloud'
import { Reveal } from '../primitives/MotionPrimitives'
import { useInView } from '../../hooks/useInView'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

export function FanCloudSandboxSection() {
  const [containerRef, inView] = useInView<HTMLElement>({ threshold: 0.25, once: true })
  const [animateGraph, setAnimateGraph] = useState(false)
  const [replayToken, setReplayToken] = useState(0)
  const reduced = useReducedMotionSafe()

  useEffect(() => {
    if (inView) {
      setAnimateGraph(true)
    }
  }, [inView])

  const replayAnimation = () => {
    setAnimateGraph(false)
    setReplayToken((prev) => prev + 1)
    window.setTimeout(() => {
      setAnimateGraph(true)
    }, 20)
  }

  return (
    <section
      ref={containerRef}
      id="fan-cloud-sandbox"
      style={{ backgroundColor: 'var(--gs-bg)' }}
      className="relative py-24 overflow-hidden"
      aria-labelledby="fan-cloud-sandbox-heading"
    >
      <div className="section-shell">
        <Reveal>
          <p
            className="font-body text-body-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-blue)' }}
          >
            Animation Sandbox
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id="fan-cloud-sandbox-heading" className="section-title mb-6 max-w-3xl">
            Fan Cloud Branch and Attribute Reveal
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-copy max-w-3xl mb-10">
            Baseline card content remains visible first, then branch lines animate in, followed by attribute nodes and labels.
          </p>
        </Reveal>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0.1 : 0.28, ease: 'easeOut' }}
          className="brand-card p-4 sm:p-6"
        >
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={replayAnimation}
              className="px-4 py-2 rounded-brand border text-body-sm font-body font-medium transition-colors"
              style={{
                borderColor: 'var(--color-lightGrey)',
                color: 'var(--color-purple)',
                backgroundColor: 'var(--color-white)',
              }}
            >
              Replay Animation
            </button>
          </div>

          <AnimatedFanCloud
            animate={animateGraph}
            reducedMotion={reduced}
            replayToken={replayToken}
            mode="graph-build"
            className="w-full h-auto"
            alt="Fan cloud graph with profile center, branching lines, and attribute nodes."
          />
        </motion.div>
      </div>
    </section>
  )
}
