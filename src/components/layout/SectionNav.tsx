import { useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  targetId: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'What Is a Moment', targetId: 'what-is-a-moment' },
  { label: 'How It Works', targetId: 'sequence' },
  { label: 'Genius Moments', targetId: 'moments' },
  { label: 'Moment Engine', targetId: 'moment-engine' },
  { label: 'The Genius Advantage', targetId: 'four-pillars' },
  { label: 'The Stack', targetId: 'ecosystem' },
  { label: 'In Practice', targetId: 'deal-examples' },
]

// ─── Component ────────────────────────────────────────────────────────────

export function SectionNav() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]!.targetId)
  const observersRef = useRef<IntersectionObserver[]>([])
  const sectionsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    // Clean up previous observers
    observersRef.current.forEach((o) => o.disconnect())
    observersRef.current = []
    sectionsRef.current = []

    const sections = NAV_ITEMS.map(({ targetId }) => document.getElementById(targetId)).filter(
      Boolean
    ) as HTMLElement[]
    sectionsRef.current = sections

    const syncActiveSection = () => {
      const viewportAnchorY = window.innerHeight * 0.34
      const activeSection =
        sectionsRef.current.find((section) => {
          const rect = section.getBoundingClientRect()
          return rect.top <= viewportAnchorY && rect.bottom >= viewportAnchorY
        }) ??
        sectionsRef.current.find((section) => section.getBoundingClientRect().top > viewportAnchorY) ??
        sectionsRef.current[sectionsRef.current.length - 1]

      if (activeSection) {
        setActiveId(activeSection.id)
      }
    }

    const observers = NAV_ITEMS.map(({ targetId }) => {
      const el = document.getElementById(targetId)
      if (!el) return null

      const observer = new IntersectionObserver(
        () => {
          // Re-evaluate all sections so tall sticky sections win correctly.
          syncActiveSection()
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-8% 0px -52% 0px',
        }
      )

      observer.observe(el)
      return observer
    })

    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        syncActiveSection()
        rafId = 0
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    syncActiveSection()

    observersRef.current = observers.filter(Boolean) as IntersectionObserver[]

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observersRef.current.forEach((o) => o.disconnect())
    }
  }, [])

  const handleClick = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="hidden md:flex sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[var(--color-lightGrey)]"
    >
      <div className="section-shell w-full">
        <ul className="flex items-center gap-1 h-12" role="list">
          {NAV_ITEMS.map(({ label, targetId }) => {
            const isActive = activeId === targetId

            return (
              <li key={targetId}>
                <button
                  onClick={() => handleClick(targetId)}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'relative flex items-center gap-2 px-3 py-1.5 rounded text-body-sm font-body transition-colors duration-150',
                    isActive
                      ? 'text-navy font-medium'
                      : 'text-[var(--color-text-muted)] hover:text-navy',
                  ].join(' ')}
                >
                  {/* Active accent dot */}
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[var(--color-gs-accent-500)] flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
