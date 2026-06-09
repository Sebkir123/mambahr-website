import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

import HeroSection from './_home-sections/hero'
import ProofStrip from './_home-sections/proof-strip'
import ProblemSection from './_home-sections/problem'
import BentoSection from './_home-sections/bento'
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
        {/* What it is */}
        <HeroSection />
        <ProofStrip />
        <ProblemSection />
        {/* The whole department — modern bento overview */}
        <BentoSection />
        <WatchItRunSection />
        {/* Why it's different */}
        <WhereItLivesSection />
        <ComplianceEngineSection />
        {/* Getting started */}
        <HowItWorksSection />
        {/* Price + convert */}
        <PricingSection />
        <ResourcesSection />
        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
