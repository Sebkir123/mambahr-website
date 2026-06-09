import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

import HeroSection from './_home-sections/hero'
import ProofStrip from './_home-sections/proof-strip'
import BentoSection from './_home-sections/bento'
import MetricBand from './_home-sections/metric-band'
import WhereItLivesSection from './_home-sections/where-it-lives'
import ComplianceEngineSection from './_home-sections/compliance-engine'
import HumansSection from './_home-sections/humans'
import HowItWorksSection from './_home-sections/how-it-works'
import PricingSection from './_home-sections/pricing'
import ResourcesSection from './_home-sections/resources'

export default function HomePage() {
  return (
    <>
      <MegaNav />
      <main>
        {/* Hero — big product shot, shapes.co / bolto pattern */}
        <HeroSection />
        <ProofStrip />
        {/* The whole department — modern colorful bento */}
        <BentoSection />
        {/* Bold saturated stat band */}
        <MetricBand />
        {/* Proof it works — channels + compliance */}
        <WhereItLivesSection />
        <ComplianceEngineSection />
        {/* Humans */}
        <HumansSection />
        {/* Getting started + convert */}
        <HowItWorksSection />
        <PricingSection />
        <ResourcesSection />
        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
