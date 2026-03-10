// ─── SiteHeader ───────────────────────────────────────────────────────────
// Controlled by SHOW_SITE_HEADER in App.tsx (default: false).

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--color-lightGrey)]">
      <div className="section-shell flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {/* Logo placeholder */}
          <div className="w-8 h-8 rounded bg-[var(--color-blue)] flex items-center justify-center">
            <span className="text-white text-xs font-heading font-medium">GS</span>
          </div>
          <span className="font-heading text-navy text-brand-h4 font-medium tracking-tight">
            Genius Sports
          </span>
        </div>
        <nav aria-label="Site navigation">
          <span className="font-body text-body-sm text-[var(--color-text-muted)]">
            Moment Engine
          </span>
        </nav>
      </div>
    </header>
  )
}
