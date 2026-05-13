import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

import HeroSection from './_home-sections/hero'
import SocialProofSection from './_home-sections/social-proof'
import ProblemSection from './_home-sections/problem'
import HowItWorksSection from './_home-sections/how-it-works'
import ScenariosSection from './_home-sections/scenarios'
import AiWorkforceSection from './_home-sections/ai-workforce'
import ComplianceEngineSection from './_home-sections/compliance-engine'
import WhereItLivesSection from './_home-sections/where-it-lives'
import BuiltForEveryStageSection from './_home-sections/built-for-every-stage'
import TestimonialSection from './_home-sections/testimonial'
import FaqSection from './_home-sections/faq'

export default function HomePage() {
  return (
    <>
      <MegaNav />
      <main>
        <HeroSection />
        <SocialProofSection />
        <ProblemSection />
        <HowItWorksSection />
        <ScenariosSection />
        <AiWorkforceSection />
        <ComplianceEngineSection />
        <WhereItLivesSection />
        <BuiltForEveryStageSection />
        <TestimonialSection />
        <FaqSection />
        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
