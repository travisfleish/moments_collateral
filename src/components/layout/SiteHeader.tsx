// ─── SiteHeader ───────────────────────────────────────────────────────────
// Controlled by SHOW_SITE_HEADER in App.tsx (default: false).
// Blends into hero: transparent so grid shows through. Logo left, CTA right.
// Fades out gently as user scrolls down.

import { useEffect, useState } from 'react'

const FADE_SCROLL_THRESHOLD = 120

export function SiteHeader() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const newOpacity = Math.max(0, 1 - scrollY / FADE_SCROLL_THRESHOLD)
      setOpacity(newOpacity)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-opacity duration-200"
      style={{ opacity, pointerEvents: opacity < 0.01 ? 'none' : 'auto' }}
    >
      <div className="section-shell flex h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 min-h-0 items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 lg:pt-5 xl:pt-6">
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Genius Sports"
          className="flex-shrink-0 min-w-0"
        >
          <img
            src="/genius-assets/genius_logo.svg"
            alt="Genius Sports"
            className="h-8 sm:h-10 md:h-12 lg:h-16 xl:h-24 w-auto object-contain object-left"
          />
        </a>
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 rounded-full border border-navy/20 bg-white/80 px-2 py-0.5 font-heading text-sm font-medium text-navy backdrop-blur-sm transition-all duration-200 hover:border-navy hover:bg-navy hover:text-white sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 lg:text-[1rem]"
        >
          Visit Genius Sports
        </a>
      </div>
    </header>
  )
}
