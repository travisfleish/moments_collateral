# frozen_string_literal: true

# ─────────────────────────────────────────────────────────────────────────────
# Moments Engine — Comprehensive Site Overview
# Generated from: tailwind.config.ts, src/styles/theme.css, src/index.css,
#                 section components, and layout components.
# ─────────────────────────────────────────────────────────────────────────────

module MomentsEngine
  module SiteOverview
    # ─── Site Identity ───────────────────────────────────────────────────────
    SITE_NAME = 'Moments Engine'
    SITE_OWNER = 'Genius Sports'
    DEFAULT_ROUTES = {
      home: '/',
      moment_engine: '/moment-engine',
      iframe_test: '/iframe-test'
    }.freeze

    # ─── Typography ──────────────────────────────────────────────────────────
    FONTS = {
      heading: {
        family: 'ESKlarheitKurrentTRIAL',
        fallbacks: %w[system-ui sans-serif],
        files: {
          300 => '/fonts/ESKlarheitKurrent-Bk_TRIAL.woff2',
          500 => '/fonts/ESKlarheitKurrent-Md_TRIAL.woff2',
          600 => '/fonts/ESKlarheitKurrent-Smbd_TRIAL.woff2'
        },
        usage: 'h1, h2, h3, h4, section titles, kickers (accent), step labels'
      },
      body: {
        family: 'Red Hat Text',
        fallbacks: %w[system-ui sans-serif],
        files: {
          400 => '/fonts/RedHatText-Regular.woff2',
          500 => '/fonts/RedHatText-Medium.woff2'
        },
        usage: 'body copy, labels, descriptions, nav, cards'
      }
    }.freeze

    FONT_SIZES = {
      # Headings — ESKlarheitKurrentTRIAL
      brand_h1:        { size: '3.5rem',  line_height: '1.1',  letter_spacing: '-0.02em',  weight: 300 },
      brand_h2:        { size: '2.5rem',  line_height: '1.15', letter_spacing: '-0.015em', weight: 300 },
      brand_h3:        { size: '1.75rem',  line_height: '1.2',  letter_spacing: '-0.01em',  weight: 500 },
      brand_h4:        { size: '1.25rem',  line_height: '1.3',  letter_spacing: '-0.005em', weight: 500 },
      section_title:   { size: '2.5rem',  line_height: '1.15', letter_spacing: '-0.015em', weight: 300 },
      # Body — Red Hat Text
      body:            { size: '1rem',    line_height: '1.6',  letter_spacing: '0',       weight: 400 },
      body_sm:         { size: '0.875rem', line_height: '1.5',  letter_spacing: '0',       weight: 400 },
      section_copy:    { size: '1.125rem', line_height: '1.6',  letter_spacing: '0',       weight: 400 }
    }.freeze

    FONT_WEIGHTS = {
      light:    300,  # ESKlarheitKurrent Book → h1, h2, section titles
      normal:   400,  # Red Hat Text Regular → body
      medium:   500,  # ESKlarheitKurrent Md / Red Hat Text Medium → h3, h4, emphasis
      semibold: 600,  # ESKlarheitKurrent Smbd → subheadings, strong accents
      bold:     700   # system fallback → bold labels, CTAs
    }.freeze

    # ─── Colors ──────────────────────────────────────────────────────────────
    COLORS = {
      # Core palette (Tailwind + CSS vars)
      navy:           '#0d1226',
      blue:           '#0000dc',
      purple:         '#4337a8',
      orange:         '#fa5d00',
      light_grey:     '#f6f7f9',
      snow:           '#fafafa',
      white:          '#ffffff',

      # GS tokens
      gs_primary_700: '#0d1226',
      gs_accent_500:  '#0000dc',
      gs_accent_600:  '#0011e1',
      gs_neon:        '#00ffcc',
      text:           '#0d1226',
      text_muted:     '#5b6472',
      border:         '#e5e7eb',
      success:        '#17b26a',

      # Page & surface
      gs_bg:          :white,        # var(--gs-bg) → --color-white
      gs_surface:     :light_grey,   # var(--gs-surface) → --color-lightGrey

      # Section-specific
      hero_bg:        '#0A1330',
      hero_tile:      '#0011e1',
      hero_tile_alt:  '#0014ff',
      seq_bg:         '#0a0a1a',
      seq_card:       '#12122a',
      seq_accent:     '#6B4EFF',
      seq_label:      '#8B7FFF',
      fan_band:       '#1D26FF',
      proof_bar:      '#1D26FF',
      proof_bar_alt:  '#1EC971',
      accordion_green: '#18C971',
      modal_accent:   '#66d29f'
    }.freeze

    # ─── Shadows & Radius ────────────────────────────────────────────────────
    SHADOWS = {
      soft:       '0 2px 8px rgba(0,0,0,0.06)',
      card:       '0 4px 24px rgba(0,0,0,0.10)',
      card_hover: '0 15px 30px -8px rgba(0,0,0,0.08)',
      sequence:   '0 8px 48px rgba(0,0,0,0.32)',
      handle:     '0 2px 12px rgba(0,0,0,0.24)'
    }.freeze

    BORDER_RADIUS = {
      brand: '0.5rem',
      md:    '0.5rem'
    }.freeze

    # ─── Spacing (CSS vars) ──────────────────────────────────────────────────
    SPACING = {
      space_1: '0.5rem',
      space_2: '1rem',
      space_3: '1.5rem',
      space_4: '2rem',
      space_5: '2.5rem',
      space_6: '3rem'
    }.freeze

    # ─── Layout ──────────────────────────────────────────────────────────────
    LAYOUT = {
      section_shell: {
        max_width: '1200px',
        margin_x: 'auto',
        padding_x: '1.5rem',   # px-6
        padding_x_lg: '3rem'   # lg:px-12
      },
      section_nav_height: '3rem',
      site_header_height: '4rem'
    }.freeze

    # ─── Sections (order matches MomentEnginePage) ─────────────────────────────
    SECTIONS = [
      {
        id: nil,
        component: 'HeroSection',
        aria_label: 'Hero',
        nav_label: nil,
        design: {
          background: 'var(--gs-bg)',
          min_height: '100vh',
          layout: 'flex flex-col justify-center',
          decorations: [
            '64px grid: linear-gradient(rgba(0,17,225,0.06) 1px, transparent 1px)',
            'Glow blob: radial-gradient circle top-right, blue tint'
          ],
          kicker_color: 'var(--color-gs-neon)',
          title: 'font-heading text-brand-h1 text-navy',
          subhead: 'font-body text-body, --color-text-muted',
          stats_cards: 'bg gs-accent-500, border rgba(255,255,255,0.2), white text',
          scroll_cue: 'vertical line + "Scroll to explore"'
        },
        content_keys: %w[kicker titleLines subhead stats]
      },
      {
        id: 'what-is-a-moment',
        component: 'WhatIsAMomentSection',
        aria_labelledby: 'what-is-a-moment-heading',
        nav_label: 'What is a Moment',
        design: {
          background: 'var(--gs-bg)',
          padding_y: 'py-24',
          kicker_color: 'var(--color-blue)',
          headline: 'section-title',
          contrast_cards: [
            'Left: brand-card, muted dot + label, section-copy',
            'Right: brand-card, blue tint border/background, blue dot + label'
          ],
          moments_grid: 'md:grid-cols-2, brand-card, league in blue, emotion pill blue tint'
        },
        content_keys: %w[kicker headline subhead contrastLeft contrastRight moments]
      },
      {
        id: 'sequence',
        component: 'MomentEngineSequence',
        aria_labelledby: 'sequence-heading',
        nav_label: 'How It Works',
        design: {
          background: 'var(--gs-bg)',
          padding_y: 'py-24',
          kicker_color: 'var(--color-purple)',
          headline: 'font-heading text-brand-h2 text-navy font-light',
          step_tabs: 'rounded-brand border, active: purple tint bg/border, step number circle',
          step_card: 'brand-card shadow-card, two-column (content | Signal Details panel)',
          step_badges: 'purple pill (Step N), optional success green pill',
          progress_bar: 'bottom of card, purple fill, animated width',
          nav_dots: 'purple when active'
        },
        content_keys: %w[kicker headline subhead steps]
      },
      {
        id: 'four-pillars',
        component: 'FourPillarsSection',
        aria_labelledby: 'four-pillars-heading',
        nav_label: 'The Genius Advantage',
        design: {
          background: 'var(--gs-bg)',
          padding_y: 'py-24',
          top_accent: '1px gradient line (transparent → blue 0.2 → transparent)',
          kicker_color: 'var(--color-blue)',
          headline: 'section-title',
          pillars: 'md:grid-cols-2, brand-card, hover border blue tint',
          pillar_number: 'text-brand-h1 font-light, rgba(0,0,220,0.18)',
          proof_chip: 'green tint bg/border, green dot, body-sm'
        },
        content_keys: %w[kicker headline subhead pillars]
      },
      {
        id: 'deal-examples',
        component: 'DealExamplesSection',
        aria_labelledby: 'deal-examples-heading',
        nav_label: 'Deal Examples',
        design: {
          background: 'var(--gs-bg)',
          padding_y: 'py-24',
          kicker_color: 'var(--color-blue)',
          headline: 'section-title',
          deal_tabs: 'rounded-brand border, active: blue tint, region badge blue',
          deal_card: 'brand-card, header (region·sport, name, channel pills), grid Trigger/Audience/Emotion+Verticals',
          pills: 'blue tint bg, blue text'
        },
        content_keys: %w[kicker headline subhead deals]
      },
      {
        id: 'ecosystem',
        component: 'EcosystemSection',
        aria_labelledby: 'ecosystem-heading',
        nav_label: 'The Ecosystem',
        design: {
          background: 'var(--gs-bg)',
          padding_y: 'py-24 pb-32',
          top_accent: '1px gradient line (transparent → blue 0.2 → transparent)',
          kicker_color: 'var(--color-blue)',
          headline: 'section-title',
          layout: 'md:grid-cols-[1fr_auto_1fr] — Supply | Moment Engine hub | Demand',
          hub: '20x20 rounded-2xl blue box "ME", Moment Engine, Genius Sports',
          supply_partners: 'brand-card list, category pill blue',
          demand_partners: 'brand-card list, category pill success green',
          proof_point: 'brand-card center, blue tint border/bg'
        },
        content_keys: %w[kicker headline subhead supplyPartners demandPartners proofPoint]
      }
    ].freeze

    # ─── Layout Components ──────────────────────────────────────────────────
    LAYOUT_COMPONENTS = {
      SiteHeader: {
        visibility: 'Controlled by SHOW_SITE_HEADER in App.tsx (default: false)',
        style: 'fixed top-0, bg-white/95 backdrop-blur, border-b lightGrey',
        height: 'h-16',
        logo: '8x8 rounded blue box "GS", font-heading text-brand-h4 Genius Sports',
        nav: 'Moment Engine label (body-sm text-muted)'
      },
      SectionNav: {
        visibility: 'Sticky below Hero, hidden on small screens (md:flex)',
        style: 'sticky top-0 z-40, bg-white/95 backdrop-blur, border-b lightGrey, h-12',
        items: [
          { label: 'What is a Moment', target_id: 'what-is-a-moment' },
          { label: 'How It Works',     target_id: 'sequence' },
          { label: 'Moments Engine',   target_id: 'moment-engine' },
          { label: 'The Genius Advantage', target_id: 'four-pillars' },
          { label: 'Deal Examples',    target_id: 'deal-examples' },
          { label: 'The Ecosystem',    target_id: 'ecosystem' }
        ],
        active_style: 'text-navy font-medium + 1.5px blue accent dot',
        inactive_style: 'text-muted hover:text-navy'
      }
    }.freeze

    # ─── Shared UI Patterns ──────────────────────────────────────────────────
    UI_PATTERNS = {
      section_title: 'text-brand-h2 font-heading text-navy font-light',
      section_copy:  'text-body font-body, color --color-text-muted',
      section_shell: 'max-w-[1200px] mx-auto px-6 lg:px-12',
      brand_card: {
        base: 'background lightGrey, border lightGrey, radius 0.5rem',
        hover: 'translateY(-4px), shadow card-hover'
      },
      kicker: 'font-body text-body-sm font-medium tracking-widest uppercase, section accent color'
    }.freeze

    # ─── Accessibility ───────────────────────────────────────────────────────
    A11Y = {
      reduced_motion: 'prefers-reduced-motion: animations/transitions set to 0.01ms',
      scroll: 'html { scroll-behavior: smooth }',
      focus: 'Interactive elements receive focus styles via Tailwind'
    }.freeze

    # ─── Summary for quick reference ──────────────────────────────────────────
    def self.summary
      {
        site: SITE_NAME,
        sections_count: SECTIONS.size,
        section_ids: SECTIONS.map { |s| s[:id] }.compact,
        primary_font_heading: FONTS[:heading][:family],
        primary_font_body: FONTS[:body][:family],
        primary_color: COLORS[:blue],
        primary_bg: COLORS[:navy]
      }
    end
  end
end

# Optional: pretty-print overview (run with: ruby docs/site_overview.rb)
if __FILE__ == $PROGRAM_NAME
  require 'json'
  mod = MomentsEngine::SiteOverview
  puts "=== Moments Engine — Site Overview ===\n\n"
  puts "Summary: #{mod.summary}\n\n"
  puts "Sections:"
  mod::SECTIONS.each_with_index do |s, i|
    puts "  #{i + 1}. #{s[:component]} (id: #{s[:id].inspect}, nav: #{s[:nav_label].inspect})"
  end
  puts "\nColors (core): #{mod::COLORS.slice(:navy, :blue, :purple, :orange, :gs_neon, :success).keys.join(', ')}"
  puts "Fonts: heading=#{mod::FONTS[:heading][:family]}, body=#{mod::FONTS[:body][:family]}"
end
