'use client'

import { motion } from 'framer-motion'

export default function ProofBar() {
  const logos = [
    { name: 'Axiom Health', id: 'axiom' },
    { name: 'Nordling Finance', id: 'nordling' },
    { name: 'ClearPath SaaS', id: 'clearpath' },
    { name: 'Meridian Labs', id: 'meridian' },
    { name: 'Stratos AI', id: 'stratos' },
    { name: 'Vantage Edu', id: 'vantage' },
    { name: 'Prism Works', id: 'prism' },
  ]

  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center mb-12">
        <p className="text-sm font-medium text-gray-400 tracking-wide">
          Trusted by modern people teams across industries
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 md:gap-24 items-center min-w-max"
        >
          {/* Double array for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div 
              key={`${logo.id}-${i}`}
              className="text-xl md:text-2xl font-bold text-gray-300 tracking-tight select-none"
            >
              {logo.name}
            </div>
          ))}
        </motion.div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  )
}
