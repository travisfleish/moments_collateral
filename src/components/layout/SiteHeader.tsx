// ─── SiteHeader ───────────────────────────────────────────────────────────
// Controlled by SHOW_SITE_HEADER in App.tsx (default: false).

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="section-shell flex h-20 items-center justify-between">
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Genius Sports"
        >
          <img
            src="/genius-assets/genius_logo.svg"
            alt="Genius Sports"
            className="h-9 w-auto object-contain brightness-0 invert"
          />
        </a>
        <a
          href="https://www.geniussports.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/25 bg-white/10 px-5 py-2 font-body text-body-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          visit GeniusSports.com
        </a>
      </div>
    </header>
  )
}
