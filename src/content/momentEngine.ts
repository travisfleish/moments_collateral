// ─── Types ────────────────────────────────────────────────────────────────

export type HeroStat = {
    value: string
    label: string
    sublabel?: string
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

export type ThematicBundle = {
  label: string
  trigger: string
  description: string
}

export type SportsMomentPlan = {
  sport: string
  inGame: string[]
  inSeason: string[]
  thematicBundle: ThematicBundle
  audiences: string[]
}

export type StepThreeCard = {
  step: string
  title: string
  description: string
  tag: string
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
    sportsMoments: {
      headline: string
      description: string
      stepOneTitle: string
      stepTwoTitle: string
      stepThreeTitle: string
      stepThreeSubhead: string
      stepThreeCards: StepThreeCard[]
      plans: SportsMomentPlan[]
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
        'See the game.',
        'Know the fan.',
        'Win the moment.',
      ],
      subhead:
        'The Genius Moment Engine is the only advertising activation solution that leverages official live game data and verified fan intelligence to identify and activate meaningful sports moments instantly, enabling addressable campaigns at scale across open programmatic infrastructure.',
      stats: [
        {
          value: '400+',
          label: 'Official In-Game Tracking',
          sublabel: 'Exclusive Data Partnerships',
          description:
            'Data partners, including the NFL, NCAA, and EPL, with exclusive data and official in-game tracking rights.',
        },
        {
          value: '250M',
          label: 'Custom Segmentation',
          sublabel: 'Know the Fan',
          description:
            'Fan profiles mapped across behavioral and brand signals from the only deterministic data cloud built for sports.',
        },
        {
          value: '<1s',
          label: 'Predictive Decisioning',
          sublabel: 'Sub-One Second Moment Detection',
          description:
            'GeniusIQ uses event capture, audience targeting, and inventory to generate activation parameters instantly with real-time predictive decisions.',
        },
        {
          value: '50+',
          label: 'In Your Workflow',
          sublabel: 'Better Way to Buy Sports',
          description:
            'Audiences available in your preferred DSP using contextual and behavioral targeting.',
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
          headline: '400+ global league and federation partners.',
          description:
            'GeniusIQ ingests official data from the NFL, NCAA, EPL, and other partners in real time — not scraped, not delayed, not approximate.',
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
      headline: 'Fans have evolved.\nSo should how you reach them.',
      subhead:
        'Today, brands face a tradeoff in sports media: they can buy programmatic and contextual ads at scale, but without a connection to live game emotion, or invest in expensive in game placements that are high impact but lack precision and targeting. Genius Moments brings both together, connecting real time fan emotion with scalable, data driven activation.',
      contrastLeft: {
        label: 'Programmatic + Contextual Media',
        description:
          `Precision and scale are available, but emotional context is missing.
  The buy can be timely, but it is not connected to how fans feel in the moment.`,
      },
      contrastRight: {
        label: 'Premium Live Sports',
        headline: 'Emotion without precision creates wasted opportunity.',
        description:
          `Premium environments can deliver scale and emotion, but activation timing and audience precision remain broad.
  Genius Moments closes that gap by combining official data, verified fan intelligence, and instant activation.`,
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
    sportsMoments: {
      headline: 'How To Buy & Activate Genius Moments',
      description:
        'Activating Genius Moments is simple: select the moments that matter, pair them with your audience, and have a Deal ID automatically pushed to your preferred DSP for activation.',
      stepOneTitle: 'Step 1: Choose your moment',
      stepTwoTitle: 'Step 2: Customize your audience',
      stepThreeTitle: 'Step 3: Deal activation',
      stepThreeSubhead:
        'Activate pre-configured PMPs and Deal IDs instantly across your\npreferred DSP and SSP partners.',
      stepThreeCards: [
        {
          step: '01',
          title: 'Pre-configured\nDeals',
          description: 'PMPs and Deal IDs activate automatically.',
          tag: 'Auto-on',
        },
        {
          step: '02',
          title: 'Preferred\nPartners',
          description: 'Activate through your DSP/SSP partners.',
          tag: 'DSP / SSP',
        },
        {
          step: '03',
          title: 'Premium\nInventory',
          description: 'Access premium media via Deal ID.',
          tag: 'Top quality media',
        },
        {
          step: '04',
          title: 'Moment\nSelection',
          description: 'Choose the moments you want to activate.',
          tag: 'Real-time moments',
        },
        {
          step: '05',
          title: 'Audience\nActivation',
          description: 'Reach audiences with precision.',
          tag: 'Audience precision',
        },
      ],
      plans: [
        {
          sport: 'NFL',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'NFL die-hards',
            'Fantasy football players',
            'Live betting active fans',
            'Sunday ticket streamers',
            'Rivalry-week viewers',
            'Team-specific loyalists',
          ],
        },
        {
          sport: 'WNBA/NBA',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'Basketball superfans',
            'Sneaker and style enthusiasts',
            'High-frequency streamers',
            'Player-led fan communities',
            'Women’s sports advocates',
            'League pass heavy viewers',
          ],
        },
        {
          sport: 'PWHL/NHL',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'Hockey loyalists',
            'Cold-weather travel buyers',
            'In-arena attendees',
            'Regional rivalry followers',
            'Late-night game watchers',
            'Youth hockey households',
          ],
        },
        {
          sport: 'MLB',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'Baseball stat trackers',
            'Family sports viewers',
            'Regional team loyalists',
            'Fantasy baseball managers',
            'Ballpark travel planners',
            'Night-game second-screen fans',
          ],
        },
        {
          sport: 'Golf',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'Affluent sports fans',
            'Luxury travel shoppers',
            'Equipment and apparel buyers',
            'Weekend tournament viewers',
            'Club membership prospects',
            'Premium hospitality seekers',
          ],
        },
        {
          sport: 'NASCAR',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'Motorsport enthusiasts',
            'Auto aftermarket buyers',
            'Road-trip planners',
            'Garage culture communities',
            'Weekend race watchers',
            'Truck and SUV intenders',
          ],
        },
        {
          sport: 'NWSL',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'Women’s football supporters',
            'Purpose-driven brand followers',
            'Youth soccer households',
            'Club-first loyal fans',
            'Social-first match viewers',
            'Local supporter groups',
          ],
        },
        {
          sport: 'World Cup',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'Global football fans',
            'National-team loyalists',
            'Multicultural households',
            'Tournament binge viewers',
            'International travel intenders',
            'National pride communities',
          ],
        },
        {
          sport: 'March Madness',
          inGame: [
            'In-Game Moment 1',
            'In-Game Moment 2',
            'In-Game Moment 3',
            'In-Game Moment 4',
            'In-Game Moment 5',
          ],
          inSeason: [
            'In-Season Moment 1',
            'In-Season Moment 2',
            'In-Season Moment 3',
            'In-Season Moment 4',
            'In-Season Moment 5',
          ],
          thematicBundle: {
            label: 'Featured Bundle: High Impact Moments',
            trigger: 'A curated bundle of high-impact moments spanning in-game and in-season',
            description:
              'This thematic bucket groups multiple moments under a single theme (e.g., high impact, high emotional, high leverage). Unlike discrete in-game or in-season moments, it activates when any moment within the theme occurs, offering broader reach across the designated theme.',
          },
          audiences: [
            'College hoops fans',
            'Bracket participants',
            'Tournament live bettors',
            'Conference loyal supporters',
            'Campus sports communities',
            'High-intent streaming viewers',
          ],
        },
      ],
    },
  
    // ── Sequence ────────────────────────────────────────────────────────────
    sequence: {
      kicker: '',
      headline: 'How The Moment Engine Works',
      subhead:
        'Four steps. Less than one second. The Genius Moment Engine is an event-based advertising solution powered by official game data that identifies and signals meaningful sports moments as they happen, enabling unique addressable advertising activation at scale.',
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
          label: 'Customize Audience',
          headline: 'Top audiences are mapped by sport and moment in real time',
          description:
            'Use the same sport-first view from Step 1 to select the audience segments that best match the moment and campaign objective.',
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
            'Deal activation runs through existing buying workflows with pre-configured PMPs and Deal IDs, so activation is immediate once the sport, moments, and audience are selected.',
          fields: [
            { label: 'Activation path', value: 'Preferred DSP/SSP partners' },
            { label: 'Deal setup', value: 'Pre-configured PMPs and Deal IDs' },
            { label: 'Inventory', value: 'Premium inventory via Deal ID' },
            { label: 'Output', value: 'Right audience reached through Genius' },
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
        'When you partner with Genius, you get four advantages no one else can combine, so your media reaches fans faster, with deeper context, and higher relevance in every moment.',
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
            'Genius Moments operates entirely inside your programmatic stack. No new DSP seat, no custom creative workflow, no additional tag. Your current deal ID and your current creative. We inject the intelligence at the deal layer.',
          proof: 'No new workflows. Plug into existing PMPs and deal IDs.',
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
  