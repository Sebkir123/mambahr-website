import Nav from '@/components/nav'
import Hero from '@/components/hero'
import ProofBar from '@/components/logo-bar'
import TheShift from '@/components/problem'
import Capabilities from '@/components/features'
import BeforeAfter from '@/components/before-after'
import BuiltFor from '@/components/built-for'
import DesignPartnerOffer from '@/components/testimonial'
import RequestAccess from '@/components/waitlist'
import Footer from '@/components/footer'
import AnimateOnScroll from '@/components/animate-on-scroll'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofBar />
        <TheShift />
        <Capabilities />
        <BeforeAfter />
        <BuiltFor />
        <DesignPartnerOffer />
        <RequestAccess />
      </main>
      <Footer />
      <AnimateOnScroll />
    </>
  )
}
