import Nav from '@/components/nav'
import Hero from '@/components/hero'
import ProofBar from '@/components/logo-bar'
import TheShift from '@/components/problem'
import ProductDemo from '@/components/product-demo'
import Capabilities from '@/components/features'
import Lab from '@/components/lab'
import BuiltFor from '@/components/built-for'
import DesignPartnerOffer from '@/components/testimonial'
import ProductPreview from '@/components/product-preview'
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
        <ProductDemo />
        <Capabilities />
        <Lab />
        <BuiltFor />
        <DesignPartnerOffer />
        <ProductPreview />
        <RequestAccess />
      </main>
      <Footer />
      <AnimateOnScroll />
    </>
  )
}
