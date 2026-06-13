import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

import Hero from './v2/_sections/hero'
import Logos from './v2/_sections/logos'
import Statement from './v2/_sections/statement'
import Difference from './v2/_sections/difference'
import Bento from './v2/_sections/bento'
import Channels from './v2/_sections/channels'
import Lifecycle from './v2/_sections/lifecycle'
import Outcomes from './v2/_sections/outcomes'
import Compliance from './v2/_sections/compliance'
import PeopleBand from './v2/_sections/people-band'
import Testimonials from './v2/_sections/testimonials'
import Pricing from './v2/_sections/pricing'
import Faq from './v2/_sections/faq'
import Resources from './v2/_sections/resources'
import Cta from './v2/_sections/cta'
import MidCta from './v2/_sections/mid-cta'
import RevealInit from './v2/_sections/reveal-init'
import CountUp from './v2/_sections/count-up'
import StickyCta from './v2/_sections/sticky-cta'

export default function HomePage() {
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
