import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['ESKlarheitKurrentTRIAL', 'system-ui', 'sans-serif'],
        body: ['Red Hat Text', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Headings — ESKlarheitKurrentTRIAL
        // h1: 56px / weight 300 / lh 1.1 / ls -0.02em
        'brand-h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '300' }],
        // h2: 40px / weight 300 / lh 1.15 / ls -0.015em
        'brand-h2': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '300' }],
        // h3: 28px / weight 500 / lh 1.2 / ls -0.01em
        'brand-h3': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        // h4: 20px / weight 500 / lh 1.3 / ls -0.005em
        'brand-h4': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '500' }],
        // Body — Red Hat Text
        // body: 16px / weight 400 / lh 1.6
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        // body-sm: 14px / weight 400 / lh 1.5
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        // Section title: 40px / weight 300 / lh 1.15 / ls -0.015em (alias of brand-h2)
        'section-title': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '300' }],
        // Section copy: 18px / weight 400 / lh 1.6 / ls 0
        'section-copy': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
      },
      fontWeight: {
        // 300 — ESKlarheitKurrentTRIAL Book  → headings (h1, h2, section titles)
        light: '300',
        // 400 — Red Hat Text Regular         → body copy
        normal: '400',
        // 500 — ESKlarheitKurrentTRIAL Md / Red Hat Text Medium → h3, h4, emphasis
        medium: '500',
        // 600 — ESKlarheitKurrentTRIAL Smbd  → subheadings, strong accents
        semibold: '600',
        // 700 — system fallback              → bold labels, CTAs
        bold: '700',
      },
      colors: {
        navy: '#0d1226',
        blue: '#0000dc',
        purple: '#4337a8',
        orange: '#fa5d00',
        lightGrey: '#f6f7f9',
        snow: '#fafafa',
        'gs-bg': 'var(--gs-bg)',
        'gs-surface': 'var(--gs-surface)',
        'gs-primary-700': '#0d1226',
        'gs-accent-500': '#0000dc',
        'gs-accent-600': '#0011e1',
        'gs-neon': '#00ffcc',
        text: '#0d1226',
        'text-muted': '#5b6472',
        border: '#e5e7eb',
        success: '#17b26a',
      },
      borderRadius: {
        brand: '0.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.10)',
        'card-hover': '0 15px 30px -8px rgba(0,0,0,0.08)',
        sequence: '0 8px 48px rgba(0,0,0,0.32)',
        handle: '0 2px 12px rgba(0,0,0,0.24)',
      },
    },
  },
  plugins: [],
}

export default config
