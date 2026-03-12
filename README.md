# Moment Engine Microsite

Marketing microsite for **Genius Sports Moments** built with React, TypeScript, Vite, Tailwind, and Framer Motion.

This project presents the Moment Engine value proposition as a narrative scroll experience, combining official live sports data, audience intelligence, and programmatic activation into one story-driven page. The site also features a **Genius Moments** section with March Madness–specific content and moment packages.

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
  - [How It Works (4-Step Sequence)](#how-it-works-4-step-sequence)
  - [Genius Moments](#genius-moments)
  - [Moment Engine (Technology Behind a Moment)](#moment-engine-technology-behind-a-moment)
  - [The Genius Advantage (Four Pillars)](#the-genius-advantage-four-pillars)
  - [The Stack (Ecosystem)](#the-stack-ecosystem)
  - [In Practice (Deal Examples)](#in-practice-deal-examples)
- [UX and Interaction Patterns](#ux-and-interaction-patterns)
- [Branding, Theming, and Assets](#branding-theming-and-assets)
- [Editing Content Safely](#editing-content-safely)
- [Accessibility and Motion Notes](#accessibility-and-motion-notes)
- [Build and Deployment Notes](#build-and-deployment-notes)

---

## What This Project Is

The site communicates one core promise:

> **"See the game. Know the fan. Win the moment."**

It explains how Moment Engine:

- detects emotionally meaningful in-game events in real time from official feeds,
- maps those events to high-propensity audience segments using Fan Graph,
- injects updated targeting into existing programmatic deal workflows,
- and activates coordinated omnichannel creative in under one second.

The page is primarily content-driven; visual components consume typed content objects from `momentEngine.ts` and `marchMadnessMoments.ts`.

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
- `src/content/marchMadnessMoments.ts` - March Madness–specific content (moments, audiences, fan cloud, proof)
- `src/pages/MomentEnginePage.tsx` - Main page assembly and section order
- `src/components/sections/` - Section components for each narrative chapter
- `src/components/layout/SectionNav.tsx` - Sticky section navigation with active-section tracking
- `src/components/layout/SiteHeader.tsx` - Fixed header with logo and CTA (controlled by `SHOW_SITE_HEADER` in `App.tsx`)
- `src/components/primitives/MotionPrimitives.tsx` - Shared animation primitives (`Reveal`, `Stagger`)
- `src/components/ui/MomentsAccordion.tsx` - Accordion for moment details in Genius Moments section
- `src/components/ui/GeniusStripeRail.tsx` - Decorative stripe rail component
- `src/hooks/` - Utility hooks (`useScrollProgress`, `useReducedMotionSafe`, `useCinematicDetectionFlow`)
- `src/tokens.ts` - Design tokens
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
- `sequence`
- `sportsMoments`
- `momentEngine`
- `fourPillars`
- `ecosystem`
- `dealExamples`

March Madness–specific content lives in `marchMadnessMoments.ts` (moments, audiences, fan cloud comparison, proof, how-it-works).

The files define strongly typed interfaces (`HeroStat`, `MomentItem`, `SequenceStep`, `Pillar`, `Deal`, `SportsMomentPlan`, `MarchMadnessMomentsContent`, etc.) so copy edits remain structured and safe.

---

## Section-by-Section Content Summary

This section captures all narrative copy intent and key content points from the current implementation.

### Hero

**Purpose:** Introduce the product promise and establish proof with quantitative credibility.

- **Kicker:** "Genius Sports Moments"
- **Title lines:**
  - "See the game."
  - "Know the fan."
  - "Win the moment."
- **Subhead summary:** The Genius Moment Engine is the only advertising activation solution that leverages official live game data and verified fan intelligence to identify and activate meaningful sports moments instantly, enabling addressable campaigns at scale across open programmatic infrastructure.

**Hero proof stats and meaning:**

- `400+ Official In-Game Tracking`  
  Exclusive data partnerships with NFL, NCAA, EPL, and others; official in-game tracking rights.
- `250M Custom Segmentation`  
  Fan profiles mapped across behavioral and brand signals from the only deterministic data cloud built for sports.
- `<1s Predictive Decisioning`  
  GeniusIQ uses event capture, audience targeting, and inventory to generate activation parameters instantly.
- `50+ In Your Workflow`  
  Audiences available in your preferred DSP using contextual and behavioral targeting.

---

### What Is a Moment

**Purpose:** Contrast programmatic/contextual media with premium live sports, and position Genius Moments as the bridge.

- **Kicker:** "What Is a Moment"
- **Headline:** "Fans have evolved. So should how you reach them."
- **Subhead:** Today, brands face a tradeoff: programmatic and contextual ads offer scale but lack emotional connection; premium in-game placements offer impact but lack precision. Genius Moments brings both together.

**Core idea:**

- A "Moment" is positioned as a discrete, emotionally charged live-game event that creates measurable audience uplift.
- The section reframes buying from generic schedule/daypart placement to event-level emotional timing.

**State 1 narrative ("Programmatic + Contextual Media"):**

- Precision and scale are available, but emotional context is missing.
- The buy can be timely, but it is not connected to how fans feel in the moment.

**State 2 narrative ("Premium Live Sports"):**

- Emotion without precision creates wasted opportunity.
- Genius Moments closes that gap by combining official data, verified fan intelligence, and instant activation.

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

### How It Works (4-Step Sequence)

**Purpose:** Operational explanation of end-to-end programmatic execution.

- **Headline:** "How The Moment Engine Works"
- **Subhead summary:** Four steps. Less than one second. The Genius Moment Engine is an event-based advertising solution powered by official game data that identifies and signals meaningful sports moments as they happen, enabling unique addressable advertising activation at scale.

Detailed steps in copy:

1. **Moment Detected**
   - GeniusIQ uses official live data to identify the event instantly.
   - Key fields: official rights-holder feed, `<200ms` event detection, 400+ leagues globally.
2. **Customize Audience**
   - Top audiences are mapped by sport and moment in real time.
   - Key fields: 250M fan profiles, 50B interactions + 5K brand signals, `<300ms` segment assembly.
3. **Deal Fires**
   - Pre-configured PMPs and Deal IDs activate automatically through preferred DSP/SSP partners.
   - No separate buy path or workflow change.
4. **Ad Activates**
   - Omnichannel delivery (CTV, mobile, DOOH) launches while emotion is peaking.
   - End-to-end speed: `<1s` from moment to activation.

---

### Genius Moments

**Purpose:** Explain how to buy and activate Genius Moments with a 3-step flow and sport-specific moment plans.

- **Headline:** "How To Buy & Activate Genius Moments"
- **Description:** Activating Genius Moments is simple: select the moments that matter, pair them with your audience, and have a Deal ID automatically pushed to your preferred DSP for activation.

**Three-step flow:**

1. **Step 1: Choose your moment** — Select from in-game, in-season, and thematic bundles.
2. **Step 2: Customize your audience** — Pair moments with audience segments (e.g., NFL die-hards, fantasy players).
3. **Step 3: Deal activation** — Pre-configured PMPs and Deal IDs activate automatically across DSP/SSP partners.

**Sport-specific plans** (e.g., NFL, NCAA Basketball) define:

- In-game moments
- In-season moments
- Thematic bundles (curated high-impact moment groups)
- Audience segments

**March Madness integration:** The section also surfaces March Madness–specific content from `marchMadnessMoments.ts`, including moment labels (e.g., LATE GAME RALLY, BUZZER BEATER WIN, UPSET), fan cloud comparison, proof metrics, and audience definitions.

---

### Moment Engine (Technology Behind a Moment)

**Purpose:** Explain technical flow using a 5-beat progressive diagram.

The headline is:

- **"The technology behind a moment."**

The section animates through five beats:

1. **The Data Foundation**  
   400+ global league and federation partners; GeniusIQ ingests official data in real time.
2. **Contextual Intelligence**  
   Interprets game state, momentum, and win probability — not just what happened, but what it means.
3. **Audience Intelligence**  
   Fan Graph matches the moment to the exact audience segment most likely to respond.
4. **The Engine Fires**  
   Scores the event, assembles deal parameters, and activates under one second.
5. **Activation**  
   Deal Activation, DCO, Social, Content Personalization — all firing at once inside the programmatic stack.

Diagram emphasizes:

- multiple data input classes,
- GeniusIQ and Fan Graph processing nodes,
- Moment Engine orchestration,
- and output channels as triggered downstream actions.

---

### The Genius Advantage (Four Pillars)

**Purpose:** Position defensibility and category differentiation.

- **Kicker:** "The Genius Advantage"
- **Headline:** "Four pillars no one else can offer."
- **Subhead summary:** When you partner with Genius, you get four advantages no one else can combine, so your media reaches fans faster, with deeper context, and higher relevance in every moment.

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
- **Headline:** "Your in-house agency model, powered by Moment Engine."
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
- **Subhead summary:** Moment Engine doesn't replace your stack — it supercharges it. Supply-side and demand-side partners are already integrated, so activation is immediate.

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
- **Genius Moments** section uses `MomentsAccordion`, `GeniusStripeRail`, and March Madness content
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

- `public/genius-assets/` (brand logos; decorative line assets such as `green-lines.png`, `blue-lines.png`, `bright-green-lines.png` when present)
- `public/logos/` (ecosystem partner logos)
- `public/fan-cloud.svg` (fan cloud visualization)

---

## Editing Content Safely

For copy updates, prefer editing:

- `src/content/momentEngine.ts` — main narrative content
- `src/content/marchMadnessMoments.ts` — March Madness moments, audiences, fan cloud, proof

Guidelines:

- Keep object shapes aligned with exported types.
- Update copy and quantitative claims together (hero stats, proof chips, thresholds).
- If adding/removing sections, update:
  - `src/pages/MomentEnginePage.tsx`
  - `src/components/layout/SectionNav.tsx` (labels + target IDs in `NAV_ITEMS`)
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

