import { momentEngineContent } from '../content/momentEngine'
import { HeroSection } from '../components/sections/HeroSection'
import { WhatIsAMomentSection } from '../components/sections/WhatIsAMomentSection'
import { MomentEngineSection } from '../components/sections/MomentEngineSection'
import { MomentEngineSequence } from '../components/sections/MomentEngineSequence'
import { FourPillarsSection } from '../components/sections/FourPillarsSection'
import { DealExamplesSection } from '../components/sections/DealExamplesSection'
import { EcosystemSection } from '../components/sections/EcosystemSection'
import { SectionNav } from '../components/layout/SectionNav'

export function MomentEnginePage() {
  return (
    <main>
      <HeroSection content={momentEngineContent.hero} />
      <SectionNav />
      <WhatIsAMomentSection content={momentEngineContent.whatIsAMoment} />
      <MomentEngineSequence content={momentEngineContent.sequence} />
      <MomentEngineSection content={momentEngineContent.momentEngine} />
      <FourPillarsSection content={momentEngineContent.fourPillars} />
      <EcosystemSection content={momentEngineContent.ecosystem} />
      <DealExamplesSection content={momentEngineContent.dealExamples} />
    </main>
  )
}
