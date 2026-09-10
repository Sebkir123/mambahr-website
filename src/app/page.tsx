import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

import Hero from './v2/_sections/hero'
import { QA } from './v2/_sections/faq-data'
import Logos from './v2/_sections/logos'
import Statement from './v2/_sections/statement'
import Difference from './v2/_sections/difference'
import Channels from './v2/_sections/channels'
import Outcomes from './v2/_sections/outcomes'
import Pricing from './v2/_sections/pricing'
import Faq from './v2/_sections/faq'
import Cta from './v2/_sections/cta'
import RevealInit from './v2/_sections/reveal-init'
import CountUp from './v2/_sections/count-up'
import StickyCta from './v2/_sections/sticky-cta'

// FAQPage structured data, built from the same QA list the page renders, so
// answer engines (Google rich results, ChatGPT, Perplexity) can extract the
// Q&A verbatim. Escaped the same way as the root layout's JSON-LD.
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QA.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <MegaNav />
      <RevealInit />
      <CountUp />
      <StickyCta />
      <main id="main">
        <Hero />
        <Logos />
        <Statement />
        <Difference />
        <Channels />
        <Outcomes />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
