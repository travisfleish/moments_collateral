import { useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  targetId: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'What Is a Moment', targetId: 'what-is-a-moment' },
  { label: 'How It Works', targetId: 'sequence' },
  { label: 'Moment Engine', targetId: 'moment-engine' },
  { label: 'The Genius Advantage', targetId: 'four-pillars' },
  { label: 'The Stack', targetId: 'ecosystem' },
  { label: 'In Practice', targetId: 'deal-examples' },
]

// ─── Component ────────────────────────────────────────────────────────────

export function SectionNav() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]!.targetId)
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    // Clean up previous observers
    observersRef.current.forEach((o) => o.disconnect())
    observersRef.current = []

    const observers = NAV_ITEMS.map(({ targetId }) => {
      const el = document.getElementById(targetId)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting) {
            setActiveId(targetId)
          }
        },
        {
          threshold: [0, 0.35, 0.6, 1],
          rootMargin: '-12% 0px -45% 0px',
        }
      )

      observer.observe(el)
      return observer
    })

    observersRef.current = observers.filter(Boolean) as IntersectionObserver[]

    return () => {
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
