'use client'

import { motion } from 'framer-motion'
import ProductMockup from '@/components/product-mockup'

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 text-center bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-[1000px] mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Subtle Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAFAF9] border border-gray-200 mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
              The new standard for HR
            </span>
          </div>

          <h1 className="text-[clamp(48px,7vw,88px)] font-medium tracking-tight text-[#1A1611] mb-6 leading-[1.05] max-w-[900px] text-balance">
            HRIS is dead.<br/>
            <span className="font-serif italic font-normal text-[#B08D57]">Meet the PeopleOS.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          <p className="text-[clamp(18px,2.5vw,21px)] text-[#57534E] mb-10 max-w-[600px] leading-relaxed text-balance">
            Forget everything you know about HR tools. Run any people process from a single space — your way, built with AI.
          </p>

          {/* CTAs */}
          <div className="flex flex-row justify-center items-center gap-4 mb-20 w-full">
            <a href="#request-access" className="inline-flex items-center justify-center bg-[#1C1917] text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap text-lg">
              Get a demo
            </a>
            <a href="#product" className="inline-flex items-center justify-center bg-white text-[#1C1917] border border-gray-200 px-8 py-4 rounded-xl font-medium shadow-sm hover:bg-gray-50 hover:-translate-y-0.5 transition-all whitespace-nowrap gap-2 text-lg">
              Watch video
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Product Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-[900px] rounded-t-[24px] bg-[#FAFAF9] border border-gray-200 border-b-0 p-4 pb-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] relative">
            <div className="rounded-t-[16px] overflow-hidden border border-gray-200 border-b-0 shadow-sm relative z-10 bg-white">
              <ProductMockup />
            </div>
            
            {/* Subtle Bolto-style decorative glow behind mockup */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#B08D57] opacity-5 blur-[100px] z-0 rounded-full" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
