import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

import HeroSection from './_home-sections/hero'
import ProblemSection from './_home-sections/problem'
import ScenariosSection from './_home-sections/scenarios'
import WhereItLivesSection from './_home-sections/where-it-lives'
import ComplianceEngineSection from './_home-sections/compliance-engine'
import HowItWorksSection from './_home-sections/how-it-works'
import TrustSection from './_home-sections/trust'
import PricingSection from './_home-sections/pricing'
import ResourcesSection from './_home-sections/resources'
import TestimonialSection from './_home-sections/testimonial'
import FaqSection from './_home-sections/faq'

export default function HomePage() {
  return (
    <>
      <MegaNav />
      <main>
        {/* What it is */}
        <HeroSection />
        <ProblemSection />
        {/* What it does — named, then shown working (one block) */}
        <ScenariosSection />
        {/* Why it's different */}
        <WhereItLivesSection />
        <ComplianceEngineSection />
        {/* Getting started + reassurance */}
        <HowItWorksSection />
        <TrustSection />
        {/* Price + convert */}
        <PricingSection />
        <ResourcesSection />
        <TestimonialSection />
        <FaqSection />
        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
