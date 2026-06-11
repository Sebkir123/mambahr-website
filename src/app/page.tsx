import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

import HeroSection from './_home-sections/hero'
import ProofStrip from './_home-sections/proof-strip'
import ProblemSection from './_home-sections/problem'
import CoverageSection from './_home-sections/coverage'
import WatchItRunSection from './_home-sections/watch-it-run'
import WhereItLivesSection from './_home-sections/where-it-lives'
import ComplianceEngineSection from './_home-sections/compliance-engine'
import HowItWorksSection from './_home-sections/how-it-works'
import PricingSection from './_home-sections/pricing'
import ResourcesSection from './_home-sections/resources'

export default function HomePage() {
  return (
    <>
      <MegaNav />
      <main>
        {/* 1. Hero */}
        <HeroSection />
        {/* 2. Proof Strip */}
        <ProofStrip />
        {/* 3. The Problem */}
        <ProblemSection />
        {/* 4. Coverage Grid */}
        <CoverageSection />
        {/* 5. Flagship Proof */}
        <WatchItRunSection />
        {/* 6. Works where you work */}
        <WhereItLivesSection />
        {/* 7. Compliance Trust */}
        <ComplianceEngineSection />
        {/* 8. How it works */}
        <HowItWorksSection />
        {/* 9. Pricing */}
        <PricingSection />
        {/* 10. Lead magnet */}
        <ResourcesSection />
        {/* 11. Final CTA */}
        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
