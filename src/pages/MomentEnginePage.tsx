import { momentEngineContent } from '../content/momentEngine'
import marchMadnessMomentsContent from '../content/marchMadnessMoments'
import { HeroSection } from '../components/sections/HeroSection'
import { WhatIsAMomentSection } from '../components/sections/WhatIsAMomentSection'
import { MomentEngineSection } from '../components/sections/MomentEngineSection'
import { MomentEngineSequence } from '../components/sections/MomentEngineSequence'
import MomentsSection from '../components/sections/MomentsSection'
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
      <MomentsSection
        header={marchMadnessMomentsContent.moments.header}
        introParagraph1={marchMadnessMomentsContent.moments.introParagraph1}
        introParagraph2={marchMadnessMomentsContent.moments.introParagraph2}
        labels={marchMadnessMomentsContent.moments.labels}
      />
      <MomentEngineSection content={momentEngineContent.momentEngine} />
      <FourPillarsSection content={momentEngineContent.fourPillars} />
      <EcosystemSection content={momentEngineContent.ecosystem} />
      <DealExamplesSection content={momentEngineContent.dealExamples} />
    </main>
  )
}
