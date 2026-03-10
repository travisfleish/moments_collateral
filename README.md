# Moment Engine Microsite

Marketing microsite for **Genius Sports Moments** built with React, TypeScript, Vite, Tailwind, and Framer Motion.

This project presents the Moment Engine value proposition as a narrative scroll experience, combining official live sports data, audience intelligence, and programmatic activation into one story-driven page.

---

## Table of Contents

- [What This Project Is](#what-this-project-is)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Project Structure](#project-structure)
- [Content Model (Source of Truth)](#content-model-source-of-truth)
- [Section-by-Section Content Summary](#section-by-section-content-summary)
  - [Hero](#hero)
  - [What Is a Moment](#what-is-a-moment)
  - [Moment Engine (Technology Behind a Moment)](#moment-engine-technology-behind-a-moment)
  - [How It Works (4-Step Sequence)](#how-it-works-4-step-sequence)
  - [The Genius Advantage (Four Pillars)](#the-genius-advantage-four-pillars)
  - [In Practice (Deal Examples)](#in-practice-deal-examples)
  - [The Stack (Ecosystem)](#the-stack-ecosystem)
- [UX and Interaction Patterns](#ux-and-interaction-patterns)
- [Branding, Theming, and Assets](#branding-theming-and-assets)
- [Editing Content Safely](#editing-content-safely)
- [Accessibility and Motion Notes](#accessibility-and-motion-notes)
- [Build and Deployment Notes](#build-and-deployment-notes)

---

## What This Project Is

The site communicates one core promise:

> **"The right ad, at the right moment, in live sport."**

It explains how Moment Engine:

- detects emotionally meaningful in-game events in real time from official feeds,
- maps those events to high-propensity audience segments using Fan Graph,
- injects updated targeting into existing programmatic deal workflows,
- and activates coordinated omnichannel creative in under one second.

The page is primarily content-driven; visual components consume typed content objects from a single source file.

---

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build tooling:** Vite 5
- **Routing:** `react-router-dom`
- **Styling:** Tailwind CSS + CSS custom properties
- **Animation and transitions:** Framer Motion
- **Icons:** `lucide-react`

---

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL shown in terminal (usually `http://localhost:5173`).

---

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check (`tsc -b`) and build production assets
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint across the project

---

## Routes

Defined in `src/App.tsx`:

- `/` -> Main Moment Engine page
- `/moment-engine` -> Alias to the same main page
- `/iframe-test` -> Embedded preview page for iframe testing
- `*` -> Redirects to `/`

---

## Project Structure

High-level layout:

- `src/content/momentEngine.ts` - Typed source-of-truth content object for all narrative sections
- `src/pages/MomentEnginePage.tsx` - Main page assembly and section order
- `src/components/sections/` - Section components for each narrative chapter
- `src/components/layout/SectionNav.tsx` - Sticky section navigation with active-section tracking
- `src/components/primitives/MotionPrimitives.tsx` - Shared animation primitives (`Reveal`, `Stagger`)
- `src/hooks/` - Utility hooks (`useScrollProgress`, `useReducedMotionSafe`)
- `src/styles/theme.css` - Fonts, palette, spacing/radius tokens
- `src/index.css` - Tailwind layers and shared utility component classes
- `public/` - Logos and design assets used by sections

---

## Content Model (Source of Truth)

All page copy is centralized in:

- `src/content/momentEngine.ts`

Key content groups in `momentEngineContent`:

- `hero`
- `whatIsAMoment`
- `momentEngine`
- `sequence`
- `fourPillars`
- `dealExamples`
- `ecosystem`

The file also defines strongly typed interfaces (`HeroStat`, `MomentItem`, `SequenceStep`, `Pillar`, `Deal`, etc.) so copy edits remain structured and safe.

---

## Section-by-Section Content Summary

This section captures all narrative copy intent and key content points from the current implementation.

### Hero

**Purpose:** Introduce the product promise and establish proof with quantitative credibility.

- **Kicker:** "Genius Sports Moments"
- **Title lines:**
  - "The right ad,"
  - "at the right moment,"
  - "in live sport."
- **Subhead summary:** Moment Engine triggers programmatic deals at the instant a sporting moment unfolds by combining official live data, fan intelligence, and existing ad stack integrations.

**Hero proof stats and meaning:**

- `400+ Official Leagues`  
  Rights-holder partnerships (including NFL, NCAA, EPL) provide exclusive real-time data.
- `250M Fan Profiles`  
  Fan Graph maps 250M consumers across 50B interactions and 5K brand signals.
- `<1s Moment Detection`  
  GeniusIQ detects and triggers on official live feeds with sub-second latency.
- `15-25% Take Rate`  
  Claimed contextual CPM uplift relative to standard sports inventory.

---

### What Is a Moment

**Purpose:** Contrast generic sports buying with emotionally contextual activation.

**Core idea:**

- A "Moment" is positioned as a discrete, emotionally charged live-game event that creates measurable audience uplift.
- The section reframes buying from generic schedule/daypart placement to event-level emotional timing.

**State 1 narrative ("The Standard Sports Buy"):**

- Broad daypart targeting.
- Ads run near games but without game-state context.
- No emotional precision.
- Limited differentiation versus standard market buys.

**State 2 narrative ("With Genius Sports Moments"):**

- Detects inflection points in real time.
- Fires deals before emotional relevance decays.
- Emphasizes precision + emotional relevance + automation.

**Moment examples in current copy:**

1. **Basketball / NBA**
   - Trigger: buzzer beater in final 10 seconds
   - Emotion: surprise + euphoria
   - Verticals: Sportsbooks, QSR, Alcohol
2. **Football / NFL**
   - Trigger: 10+ seed upset win
   - Emotion: surprise + loyalty
   - Verticals: Consumer Finance, Telco, QSR
3. **Soccer / World Cup**
   - Trigger: 2+ goal comeback win
   - Emotion: pride + unity
   - Verticals: Airlines, Telco, Luxury Goods

---

### Moment Engine (Technology Behind a Moment)

**Purpose:** Explain technical flow using a 5-beat progressive diagram.

The headline is:

- **"The technology behind a moment."**

The section animates through five beats:

1. **The Data Foundation**  
   Official, real-time data ingestion across 400+ leagues.
2. **Contextual Intelligence**  
   Interprets game state and emotional weight (not just raw event detection).
3. **Audience Intelligence**  
   Matches moments to high-response segments from Fan Graph.
4. **The Engine Fires**  
   Scores + assembles parameters + activates automatically under one second.
5. **Activation**  
   Simultaneous outputs across deal activation, DCO, social, and content personalization.

Diagram emphasizes:

- multiple data input classes,
- GeniusIQ and Fan Graph processing nodes,
- Moment Engine orchestration,
- and output channels as triggered downstream actions.

---

### How It Works (4-Step Sequence)

**Purpose:** Operational explanation of end-to-end programmatic execution.

- **Kicker:** "How It Works"
- **Headline:** "Four steps. Under one second."
- **Subhead summary:** From play completion to ad on screen, the chain is automated while preserving existing workflows.

Detailed steps in copy:

1. **Moment Detected (Official Data)**
   - GeniusIQ reads official live feed.
   - Classifies event + emotion.
   - Key fields: official rights-holder feed, `<200ms` latency, 400+ league coverage.
2. **Audience Assembled (Fan Graph)**
   - Uses 250M profiles, 50B interactions, 5K brand signals.
   - Builds highest-value segment in real time.
   - Key field: `<300ms` segment build time.
3. **Deal Fires (Programmatic)**
   - Updates pre-configured deal IDs/PMPs with moment + segment context.
   - No separate buy path or workflow change.
   - Compatible with major SSPs.
4. **Ad Activates (Omnichannel)**
   - Synchronized trigger across CTV, mobile, and DOOH.
   - Ensures channel-consistent relevance.
   - End-to-end sync target: `<1s`.

---

### The Genius Advantage (Four Pillars)

**Purpose:** Position defensibility and category differentiation.

- **Kicker:** "The Genius Advantage"
- **Headline:** "Four pillars no one else can offer."
- **Subhead summary:** Product moat emerges from the combination of rights, contextual modeling, audience intelligence, and integration.

Current pillars:

1. **Official Rights**  
   Official partner data from NFL, NCAA, EPL, and 400+ leagues; faster/more accurate than scraped alternatives.
2. **Contextual Depth**  
   Interprets score differential, time remaining, momentum, and win-probability shifts.
3. **Audience Precision**  
   Fan Graph coverage: 250M profiles, 50B interactions, 5K brand-affinity signals.
4. **Seamless Integration**  
   Works inside existing deal IDs/PMPs and programmatic tooling without new seats/tags/workflows.

---

### In Practice (Deal Examples)

**Purpose:** Show real-world packaging patterns by region, sport, trigger, audience, and channel mix.

- **Kicker:** "In Practice"
- **Headline:** "How buyers are activating Moment Engine."
- **Subhead summary:** Demonstrates how moment triggers map to verticals, audience definitions, and channel activation plans.

Current examples:

1. **US - March Madness Clutch & Chaos**
   - Sport: NCAA Basketball
   - Triggers: buzzer beaters, upsets, overtime games
   - Audience: male 21-44, college basketball fans, high sports-betting propensity
   - Emotion: euphoria/shock/unpredictability
   - Verticals: Sportsbooks, QSR, Alcohol, Streaming Services
   - Channels: CTV, Mobile, Display
2. **UK - EPL Match State Impact**
   - Sport: English Premier League
   - Triggers: late goals, relegation battles, live odds swings, red cards
   - Audience: male 25-54, UK football fans, betting-active
   - Emotion: tension/drama/relief
   - Verticals: Betting Operators, Food Delivery, Pub & Hospitality, Telco
   - Channels: CTV, Mobile, DOOH
3. **Global - World Cup Momentum**
   - Sport: FIFA World Cup
   - Triggers: late goals, advancement, comeback victories
   - Audience: broad national audiences with travel/lifestyle skew
   - Emotion: national pride/collective euphoria
   - Verticals: Airlines, Alcohol, Telco, Apparel, Financial Services
   - Channels: CTV, Mobile, DOOH, Display

---

### The Stack (Ecosystem)

**Purpose:** Prove integration readiness and low-friction activation.

- **Kicker:** "The Stack"
- **Headline:** "Built into the ecosystem you already use."
- **Subhead summary:** Moment Engine augments rather than replaces existing supply and demand infrastructure.

Supply-side partners in copy:

- PubMatic
- Magnite
- OpenX
- Equativ
- Cadent

Demand-side/data partners in copy:

- The Trade Desk
- Amazon Ads
- DV360
- LiveRamp
- Basis
- Viant

Proof statement:

- Integrations are live and do not require custom development for activation through existing seats.

---

## UX and Interaction Patterns

The page combines static content with scroll and state-driven transitions:

- **Sticky section nav** highlights active section via `IntersectionObserver`
- **Scroll-progress storytelling** powers state transitions in:
  - `WhatIsAMomentSection` (2-state contrast)
  - `MomentEngineSection` (5-beat diagram progression)
- **Interactive step/deal tabs** in sequence and deal examples sections
- **Reveal and stagger primitives** for consistent entrance motion
- **Reduced motion support** via Framer Motion preference handling + CSS media query

---

## Branding, Theming, and Assets

Design system references:

- `src/styles/theme.css` defines brand colors, text tokens, spacing, and radius variables
- `tailwind.config.ts` extends typography scales, color aliases, shadows, and font families
- `src/index.css` defines shared utility classes such as:
  - `.section-title`
  - `.section-copy`
  - `.section-shell`
  - `.brand-card`

Notable asset groups:

- `public/genius-assets/` (brand logos)
- `public/logos/` (ecosystem partner logos)
- `public/green-lines.png` (four pillars decorative motif)

---

## Editing Content Safely

For copy updates, prefer editing:

- `src/content/momentEngine.ts`

Guidelines:

- Keep object shapes aligned with exported types.
- Update copy and quantitative claims together (hero stats, proof chips, thresholds).
- If adding/removing sections, update:
  - `src/pages/MomentEnginePage.tsx`
  - `src/components/layout/SectionNav.tsx` (labels + target IDs)
  - any affected section component IDs (`id`/`aria-labelledby`)

---

## Accessibility and Motion Notes

- Sections use semantic headings and `aria-labelledby` anchors.
- Navigation uses `aria-current` and scroll-to-section behavior.
- Logos include `alt` text where meaningful.
- Motion is reduced when user preference indicates reduced animation.

---

## Build and Deployment Notes

- Production build output is created by Vite (`npm run build`).
- App is a client-side routed SPA; route fallback to `index.html` is required in hosting config.
- `/iframe-test` is available for embed validation and quick visual QA.

