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
      <div className="section-shell flex h-24 items-center justify-between pt-6">
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Genius Sports"
        >
          <img
            src="/genius-assets/genius_logo.svg"
            alt="Genius Sports"
            className="h-24 w-auto object-contain"
          />
        </a>
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-navy/20 bg-white/80 px-3.5 py-1.5 font-heading text-sm font-light text-navy backdrop-blur-sm transition-all duration-200 hover:border-navy hover:bg-navy hover:text-white"
        >
          Visit Genius Sports
        </a>
      </div>
    </header>
  )
}
