import { motion, type Variants } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

// ─── Reveal ───────────────────────────────────────────────────────────────

type RevealAs = 'div' | 'section' | 'article'

interface RevealProps {
  children: React.ReactNode
  className?: string
  as?: RevealAs
  delay?: number
  id?: string
  once?: boolean
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const revealVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
  id,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotionSafe()
  const variants = reduced ? revealVariantsReduced : revealVariants

  const Component = motion[as as 'div']

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: reduced ? 0.15 : 0.5, delay, ease: 'easeOut' }}
      variants={variants}
    >
      {children}
    </Component>
  )
}

// ─── Stagger ──────────────────────────────────────────────────────────────

type StaggerAs = 'div' | 'ul'

interface StaggerProps {
  children: React.ReactNode
  className?: string
  as?: StaggerAs
  staggerChildren?: number
  delayChildren?: number
  id?: string
  once?: boolean
}

export function Stagger({
  children,
  className,
  as = 'div',
  staggerChildren = 0.08,
  delayChildren = 0,
  id,
  once = true,
}: StaggerProps) {
  const reduced = useReducedMotionSafe()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerChildren,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  }

  const itemVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
      }

  const Component = motion[as as 'div']

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </Component>
  )
}
