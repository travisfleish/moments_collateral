import { Reveal, Stagger } from '../primitives/MotionPrimitives'
import type { MomentEngineContent } from '../../content/momentEngine'

interface EcosystemSectionProps {
  content: MomentEngineContent['ecosystem']
}

const partnerLogoByName: Record<string, string> = {
  pubmatic: '/logos/pubmatic.svg',
  magnite: '/logos/magnite.svg',
  openx: '/logos/OpenX.png',
  equativ: '/logos/equativ.png',
  cadent: '/logos/Cadent.png',
  thetradedesk: '/logos/thetradedesk.svg',
  amazonads: '/logos/amazon.svg',
  dv360: '/logos/google.svg',
  liveramp: '/logos/liveramp_iddbbzkshx_0.svg',
  basis: '/logos/Basis.png',
  viant: '/logos/viant.png',
}

function normalizePartnerName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function getPartnerLogo(name: string): string | null {
  return partnerLogoByName[normalizePartnerName(name)] ?? null
}

export function EcosystemSection({ content }: EcosystemSectionProps) {
  return (
    <section
      id="ecosystem"
      style={{ backgroundColor: 'var(--gs-bg)' }}
      className="relative py-24 pb-32 overflow-hidden"
      aria-labelledby="ecosystem-heading"
    >
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,220,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="section-shell">
        {/* Header */}
        <Reveal>
          <p className="font-body text-body-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-blue)' }}>
            {content.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id="ecosystem-heading" className="section-title mb-6 max-w-2xl">
            {content.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-copy max-w-2xl mb-16">
            {content.subhead}
          </p>
        </Reveal>

        {/* Partner layout */}
        <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-6 mb-12 items-start">
          {/* Supply side */}
          <div>
            <Reveal>
              <h3 className="font-body text-body-sm font-medium uppercase tracking-wider mb-6"
                style={{ color: 'var(--color-text-muted)' }}>
                Supply Partners
              </h3>
            </Reveal>
            <Stagger className="space-y-2" staggerChildren={0.07}>
              {content.supplyPartners.map((p) => {
                const logoSrc = getPartnerLogo(p.name)

                return (
                  <div
                    key={p.name}
                    className="brand-card flex items-center justify-center px-4 py-4 min-h-[68px]"
                  >
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={`${p.name} logo`}
                        className="h-6 w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-body text-body-sm text-navy font-medium">{p.name}</span>
                    )}
                  </div>
                )
              })}
            </Stagger>
          </div>

          {/* Center — Moment Engine */}
          <div className="relative z-20 md:self-center">
            <Reveal delay={0.2} className="flex flex-col items-center justify-center px-4">
              <img
                src="/genius-assets/genius_g_logo.svg"
                alt="Genius Sports logo"
                className="w-16 h-16 object-contain"
              />
            </Reveal>
          </div>

          {/* Demand side */}
          <div>
            <Reveal>
              <h3 className="font-body text-body-sm font-medium uppercase tracking-wider mb-6"
                style={{ color: 'var(--color-text-muted)' }}>
                Demand Partners
              </h3>
            </Reveal>
            <Stagger className="space-y-2" staggerChildren={0.07}>
              {content.demandPartners.map((p) => {
                const logoSrc = getPartnerLogo(p.name)

                return (
                  <div
                    key={p.name}
                    className="brand-card flex items-center justify-center px-4 py-4 min-h-[68px]"
                  >
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={`${p.name} logo`}
                        className="h-6 w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-body text-body-sm text-navy font-medium">{p.name}</span>
                    )}
                  </div>
                )
              })}
            </Stagger>
          </div>
        </div>

        {/* Proof point */}
        <Reveal delay={0.3}>
          <div
            className="brand-card p-6 text-center"
            style={{ borderColor: 'rgba(0,0,220,0.15)', backgroundColor: 'rgba(0,0,220,0.03)' }}
          >
            <p className="font-body text-body text-navy max-w-2xl mx-auto">
              {content.proofPoint}
            </p>
          </div>
        </Reveal>
      </div>

    </section>
  )
}
