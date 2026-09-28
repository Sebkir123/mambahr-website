import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

import Logos from '../../v2/_sections/logos'
import Difference from '../../v2/_sections/difference'
import Outcomes from '../../v2/_sections/outcomes'
import Pricing from '../../v2/_sections/pricing'
import Faq from '../../v2/_sections/faq'
import RevealInit from '../../v2/_sections/reveal-init'
import HeroStage from './hero-stage'
import Ratio from './ratio'
import ChannelsStage from './channels-stage'
import CtaStage from './cta-stage'

// Design lab: the homepage with the redesigned sections swapped in, for review
// before anything replaces the live page. Not linked, not in the sitemap, noindex.
export default function LabHome({ variant }: { variant: 'day' | 'night' }) {
  return (
    <>
      <MegaNav tone={variant === 'night' ? 'onDark' : 'light'} />
      <RevealInit />
      <main id="main">
        <HeroStage variant={variant} />
        <Logos />
        <Ratio />
        <Difference />
        <ChannelsStage />
        <Outcomes />
        <Pricing />
        <Faq />
        <CtaStage variant={variant} />
      </main>
      <Footer />
    </>
  )
}
