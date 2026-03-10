// ─── GeniusStripeRail ─────────────────────────────────────────────────────
// Decorative stripe rail using Genius Sports brand assets.
// Themes map to asset files in /genius-assets/.

export type StripeTheme = 'green' | 'softGreen' | 'navy' | 'red' | 'blue'
export type FadeTone = 'light' | 'dark'
export type ScaleVariant = 'default' | 'site'
export type MaskVariant = 'none' | 'heroRight'

interface GeniusStripeRailProps {
  theme: StripeTheme
  className?: string
  dimmed?: boolean
  fadeTone?: FadeTone
  scale?: ScaleVariant
  mask?: MaskVariant
}

const themeAssetMap: Record<StripeTheme, string> = {
  green:     '/genius-assets/stripe-green.png',
  softGreen: '/genius-assets/stripe-soft-green.png',
  navy:      '/genius-assets/stripe-navy.png',
  red:       '/genius-assets/stripe-red.png',
  blue:      '/genius-assets/stripe-blue.png',
}

const fadeToneClass: Record<FadeTone, string> = {
  light: 'after:from-white',
  dark:  'after:from-[#0A1330]',
}

const maskClass: Record<MaskVariant, string> = {
  none:      '',
  heroRight: 'mask-hero-right',
}

export function GeniusStripeRail({
  theme,
  className = '',
  dimmed = false,
  fadeTone = 'dark',
  scale = 'default',
  mask = 'none',
}: GeniusStripeRailProps) {
  const asset = themeAssetMap[theme]
  const sizeClass = scale === 'site' ? 'h-full w-auto' : 'h-64 w-auto'

  return (
    <div
      className={[
        'relative overflow-hidden pointer-events-none select-none',
        maskClass[mask],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <img
        src={asset}
        alt=""
        className={[
          sizeClass,
          'object-cover',
          dimmed ? 'opacity-40' : 'opacity-100',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      {/* Fade overlay */}
      <div
        className={[
          'absolute inset-0',
          'after:absolute after:inset-0 after:bg-gradient-to-r after:to-transparent',
          fadeToneClass[fadeTone],
        ].join(' ')}
      />
    </div>
  )
}
