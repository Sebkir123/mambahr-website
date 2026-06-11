import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

import Hero from './_sections/hero'
import Logos from './_sections/logos'
import Statement from './_sections/statement'
import Difference from './_sections/difference'
import Bento from './_sections/bento'
import Channels from './_sections/channels'
import Lifecycle from './_sections/lifecycle'
import Outcomes from './_sections/outcomes'
import Compliance from './_sections/compliance'
import PeopleBand from './_sections/people-band'
import Testimonials from './_sections/testimonials'
import Pricing from './_sections/pricing'
import Faq from './_sections/faq'
import Resources from './_sections/resources'
import Cta from './_sections/cta'
import MidCta from './_sections/mid-cta'
import RevealInit from './_sections/reveal-init'
import CountUp from './_sections/count-up'
import StickyCta from './_sections/sticky-cta'

// Fresh ground-up landing structure — viktor + shapes energy in MambaHR's
// premium system. All sections are new (no reuse of the old _home-sections).
// Prototype palette: warm vibrant gradient. Swaps to the real design system
// when it lands. Viewable at /v2.
export default function V2Page() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <StickyCta />
      <main>
        <Hero />
        <Logos />
        <Statement />
        <Difference />
        {/* The philosophy + human moment — after the proof, before the product. */}
        <PeopleBand />
        <Bento />
        <Channels />
        <Lifecycle />
        <Outcomes />
        <MidCta />
        <Compliance />
        <Testimonials />
        <Pricing />
        <Faq />
        <Resources />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
