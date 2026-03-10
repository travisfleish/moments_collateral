// ─── Types ────────────────────────────────────────────────────────────────

export type HeroStat = {
  value: string
  label: string
  description: string
}

export type MomentItem = {
  sport: string
  league: string
  trigger: string
  emotion: string
  verticals: string[]
}

export type SequenceStep = {
  id: string
  stepNumber: number
  label: string
  headline: string
  description: string
  fields: { label: string; value: string }[]
  badgeText?: string
  videoSrc?: string
  videoAlt?: string
}

export type Pillar = {
  id: string
  number: string
  title: string
  description: string
  proof: string
}

export type Deal = {
  region: string
  name: string
  sport: string
  trigger: string
  audience: string
  emotion: string
  verticals: string[]
  channels: string[]
}

export type DealScreenshot = {
  src: string
  alt: string
}

export type EcosystemPartner = {
  name: string
  category: string
}

export type MomentEngineBeat = {
  beat: number
  label: string
  headline: string
  description: string
}

export type MomentEngineContent = {
  hero: {
    kicker: string
    titleLines: string[]
    subhead: string
    stats: HeroStat[]
  }
  momentEngine: {
    kicker: string
    headline: string
    beats: MomentEngineBeat[]
  }
  whatIsAMoment: {
    kicker: string
    headline: string
    subhead: string
    contrastLeft: { label: string; description: string }
    contrastRight: { label: string; headline: string; description: string }
    moments: MomentItem[]
  }
  sequence: {
    kicker: string
    headline: string
    subhead: string
    steps: SequenceStep[]
  }
  fourPillars: {
    kicker: string
    headline: string
    subhead: string
    pillars: Pillar[]
  }
  dealExamples: {
    kicker: string
    headline: string
    subhead: string
    capabilities: string[]
    screenshots: DealScreenshot[]
    deals: Deal[]
  }
  ecosystem: {
    kicker: string
    headline: string
    subhead: string
    supplyPartners: EcosystemPartner[]
    demandPartners: EcosystemPartner[]
    proofPoint: string
  }
}

// ─── Content ──────────────────────────────────────────────────────────────

export const momentEngineContent: MomentEngineContent = {
  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    kicker: 'Genius Sports Moments',
    titleLines: [
      'The right ad,',
      'at the right moment,',
      'in live sport.',
    ],
    subhead:
      'Our Moment Engine fires programmatic deals the instant a sporting moment unfolds — combining official live data, fan intelligence, and your existing stack into a single, automated trigger.',
    stats: [
      {
        value: '400+',
        label: 'Official Leagues',
        description: 'NFL, NCAA, EPL and 400+ rights-holder partnerships providing exclusive, real-time data',
      },
      {
        value: '250M',
        label: 'Fan Profiles',
        description: 'Fan Graph™: 250M consumers mapped across 50B interactions and 5K exclusive brand signals',
      },
      {
        value: '<1s',
        label: 'Moment Detection',
        description: 'GeniusIQ fires on official live data feeds with sub-second latency',
      },
      {
        value: '15–25%',
        label: 'Take Rate',
        description: 'Contextual uplift on CPMs versus standard sports inventory',
      },
    ],
  },

  // ── Moment Engine Section ────────────────────────────────────────────────
  momentEngine: {
    kicker: '',
    headline: 'The technology behind a moment.',
    beats: [
      {
        beat: 1,
        label: 'The Data Foundation.',
        headline: 'Every major sport. Every live feed. All official.',
        description:
          'GeniusIQ ingests official data from 400+ global leagues in real time — not scraped, not delayed, not approximate.',
      },
      {
        beat: 2,
        label: 'Contextual Intelligence.',
        headline: 'Not just what happened. What it means.',
        description:
          'GeniusIQ interprets game state, momentum, and win probability — scoring each event for its emotional weight before the broadcast catches up.',
      },
      {
        beat: 3,
        label: 'Audience Intelligence.',
        headline: '250 million fans. The right ones, right now.',
        description:
          'The Fan Graph™ matches the moment to the exact audience segment most likely to respond — assembled automatically, no manual updates required. It continuously refines that segment with live behavior and affinity signals as the game evolves.',
      },
      {
        beat: 4,
        label: 'The Engine Fires.',
        headline: 'Under a second. Fully automatic.',
        description:
          'The Moment Engine scores the event, assembles deal parameters, and activates — before the feeling fades.',
      },
      {
        beat: 5,
        label: 'Activation.',
        headline: 'Every channel. Simultaneously.',
        description:
          'Deal Activation, DCO, Social, Content Personalization — all firing at once, inside the programmatic stack you already use.',
      },
    ],
  },

  // ── What Is A Moment ────────────────────────────────────────────────────
  whatIsAMoment: {
    kicker: 'What Is a Moment',
    headline: 'From time-based buying to moment-based activation.',
    subhead:
      'A Moment is a discrete, emotionally charged event in a live game that creates measurable audience uplift.',
    contrastLeft: {
      label: 'The standard sports buy.',
      description:
        `You target a daypart and run near the game.
The ad has no idea what's happening on the field.
No game state. No emotional context.
It looks like every other sports buy.`,
    },
    contrastRight: {
      label: 'With Genius Sports Moments.',
      headline: 'Activate at the peak. Not the break.',
      description:
        `Moment Engine detects the inflection points that change how fans feel — and act.
It triggers your programmatic deal the instant engagement spikes.
Same buying workflow. Radically better timing.
Precise. Emotional. Automatic.`,
    },
    moments: [
      {
        sport: 'Basketball',
        league: 'NBA',
        trigger: 'Buzzer beater in final 10 seconds',
        emotion: 'High Arousal — Surprise + Euphoria',
        verticals: ['Sportsbooks', 'QSR', 'Alcohol'],
      },
      {
        sport: 'Football',
        league: 'NFL',
        trigger: '10+ seed upset win',
        emotion: 'Surprise + Loyalty',
        verticals: ['Consumer Finance', 'Telco', 'QSR'],
      },
      {
        sport: 'Soccer',
        league: 'World Cup',
        trigger: '2+ goal comeback win',
        emotion: 'Pride + Unity',
        verticals: ['Airlines', 'Telco', 'Luxury Goods'],
      },
    ],
  },

  // ── Sequence ────────────────────────────────────────────────────────────
  sequence: {
    kicker: '',
    headline: 'Four steps. Under one second.',
    subhead:
      'From play completion to ad on screen, this flow runs automatically while keeping your existing buying workflow intact.',
    steps: [
      {
        id: 'step-detect',
        stepNumber: 1,
        label: 'Moment Detected',
        headline: 'GeniusIQ uses official live data to identify the event instantly',
        description:
          'GeniusIQ reads official rights-holder feeds in real time, classifies game state, and scores emotional intensity as soon as the moment occurs.',
        fields: [
          { label: 'Data source', value: 'Official rights-holder live feed' },
          { label: 'Latency', value: '<200ms event detection' },
          { label: 'Coverage', value: '400+ leagues globally' },
          { label: 'Output', value: 'Moment + emotional context score' },
        ],
        badgeText: 'Detection',
        videoSrc: '/Moments Sample.mp4',
        videoAlt: 'Moments sample video showing a detected sports moment.',
      },
      {
        id: 'step-assemble',
        stepNumber: 2,
        label: 'Audience Assembled',
        headline: 'Our Fan Graph™ builds the highest-value segment in real time',
        description:
          'Fan Graph™ maps the detected moment to the most responsive audience segment using historical fan behavior, affinity signals, and live context.',
        fields: [
          { label: 'Audience base', value: '250M fan profiles' },
          { label: 'Signal depth', value: '50B interactions + 5K brand signals' },
          { label: 'Build speed', value: '<300ms segment assembly' },
          { label: 'Output', value: 'Moment-qualified target segment' },
        ],
        badgeText: 'Audience',
      },
      {
        id: 'step-deal',
        stepNumber: 3,
        label: 'Deal Fires',
        headline: 'Pre-configured PMPs and deal IDs activate automatically',
        description:
          'The platform injects live moment and segment context into your existing programmatic setup, so buyers continue to transact in the same workflow.',
        fields: [
          { label: 'Activation path', value: 'Existing DSP + PMP rails' },
          { label: 'Workflow impact', value: 'No new buy path required' },
          { label: 'Supply compatibility', value: 'Major SSP ecosystem support' },
          { label: 'Output', value: 'Live deal-level activation signal' },
        ],
        badgeText: 'Execution',
      },
      {
        id: 'step-activate',
        stepNumber: 4,
        label: 'Ad Activates',
        headline: 'Omnichannel delivery launches while emotion is peaking',
        description:
          'Activation synchronizes across CTV, mobile, and DOOH, keeping creative relevance aligned to the same live moment across channels.',
        fields: [
          { label: 'Channels', value: 'CTV, mobile, DOOH' },
          { label: 'Timing', value: 'Synchronized cross-channel trigger' },
          { label: 'Consistency', value: 'Moment-aligned relevance at delivery' },
          { label: 'End-to-end speed', value: '<1s from moment to activation' },
        ],
        badgeText: 'Activation',
      },
    ],
  },

  // ── Four Pillars ─────────────────────────────────────────────────────────
  fourPillars: {
    kicker: 'The Genius Advantage',
    headline: 'Four pillars no one else can offer.',
    subhead:
      'Moment Engine works because it sits at the intersection of four unique assets. Each is a moat. Together, they\'re a category.',
    pillars: [
      {
        id: 'pillar-rights',
        number: '01',
        title: 'Official Rights',
        description:
          'We are the official data and streaming partner for the NFL, NCAA, EPL, and 400+ other leagues. That means our data is faster, more accurate, and more granular than any aggregator or scraper — it\'s the same feed powering broadcast.',
        proof: 'NFL, NCAA, EPL + 400+ official partnerships',
      },
      {
        id: 'pillar-context',
        number: '02',
        title: 'Contextual Depth',
        description:
          'GeniusIQ doesn\'t just detect events — it interprets game state. Score differential, time remaining, momentum index, win probability shift. We know not just what happened, but what it means emotionally for the fans watching.',
        proof: 'Game state interpretation, not raw data relay',
      },
      {
        id: 'pillar-precision',
        number: '03',
        title: 'Audience Precision',
        description:
          'Fan Graph™ is the most comprehensive sports fan intelligence platform in market. 250M consumer profiles built from 50B interactions and 5K exclusive brand-affinity signals — mapped to moment types and emotional states.',
        proof: '250M profiles · 50B interactions · 5K brand signals',
      },
      {
        id: 'pillar-integration',
        number: '04',
        title: 'Seamless Integration',
        description:
          'Moment Engine operates entirely inside your existing programmatic stack. No new DSP seat, no custom creative workflow, no additional tag. Your current deal ID, your current creative — we inject the intelligence at the deal layer.',
        proof: 'No new workflows — plug into existing PMPs and deal IDs',
      },
    ],
  },

  // ── Deal Examples ────────────────────────────────────────────────────────
  dealExamples: {
    kicker: 'In Practice',
    headline: 'Your in-house agency model, powered by Moment Engine.',
    subhead:
      'We run the full deal lifecycle with you, from strategy and structuring through activation and reporting, so teams get one accountable operating partner instead of fragmented handoffs.',
    capabilities: [
      'Strategy and deal design',
      'Audience and trigger structuring',
      'In-flight activation and optimization',
      'Unified reporting and readouts',
    ],
    screenshots: [
      {
        src: '/agency_image_1.png',
        alt: 'Deal Arena curation list view showing live deal statuses and performance columns.',
      },
      {
        src: '/agency_image_2.png',
        alt: 'Deal Arena curation view with detailed deal context and targeting metadata.',
      },
    ],
    deals: [
      {
        region: 'US',
        name: 'March Madness Clutch & Chaos',
        sport: 'NCAA Basketball',
        trigger: 'Buzzer beaters, upsets, overtime games',
        audience: 'Male 21–44, college basketball fans, high sports-betting propensity',
        emotion: 'Euphoria / Shock / Unpredictability',
        verticals: ['Sportsbooks', 'QSR', 'Alcohol', 'Streaming Services'],
        channels: ['CTV', 'Mobile', 'Display'],
      },
      {
        region: 'UK',
        name: 'EPL Match State Impact',
        sport: 'English Premier League',
        trigger: 'Late goals, relegation battles, live odds swings, red cards',
        audience: 'Male 25–54, UK football fans, betting-active',
        emotion: 'Tension / Drama / Relief',
        verticals: ['Betting Operators', 'Food Delivery', 'Pub & Hospitality', 'Telco'],
        channels: ['CTV', 'Mobile', 'DOOH'],
      },
      {
        region: 'Global',
        name: 'World Cup Momentum',
        sport: 'FIFA World Cup',
        trigger: 'Late goals, national team advancement, comeback victories',
        audience: 'Broad national audiences, travel & lifestyle skew',
        emotion: 'National pride / Collective euphoria',
        verticals: ['Airlines', 'Alcohol', 'Telco', 'Apparel', 'Financial Services'],
        channels: ['CTV', 'Mobile', 'DOOH', 'Display'],
      },
    ],
  },

  // ── Ecosystem ─────────────────────────────────────────────────────────────
  ecosystem: {
    kicker: 'The Stack',
    headline: 'Built into the ecosystem you already use.',
    subhead:
      'Moment Engine doesn\'t replace your stack — it supercharges it. Supply-side and demand-side partners are already integrated, so activation is immediate.',
    supplyPartners: [
      { name: 'PubMatic', category: 'SSP' },
      { name: 'Magnite', category: 'SSP' },
      { name: 'OpenX', category: 'SSP' },
      { name: 'Equativ', category: 'SSP' },
      { name: 'Cadent', category: 'SSP / CTV' },
    ],
    demandPartners: [
      { name: 'The Trade Desk', category: 'DSP' },
      { name: 'Amazon Ads', category: 'DSP' },
      { name: 'DV360', category: 'DSP' },
      { name: 'LiveRamp', category: 'Data / Identity' },
      { name: 'Basis', category: 'DSP' },
      { name: 'Viant', category: 'DSP' },
    ],
    proofPoint:
      'All integrations are live. No custom development required to activate Moment Engine deals through your existing seat.',
  },
}
