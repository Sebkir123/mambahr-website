'use client'

import { motion } from 'framer-motion'

export default function BuiltFor() {
  const items = [
    {
      icon: '◆', iconColor: '#B08D57',
      title: 'Simple, transparent pricing',
      desc: 'No pay-per-module surprises or inflated implementation fees. One clear price, all-inclusive.',
    },
    {
      icon: '◼', iconColor: '#3B82F6',
      title: 'Live in days, not months',
      desc: 'It\'s SaaS, not a major systems project. Most teams are up and running in days, not weeks.',
    },
    {
      icon: '●', iconColor: '#22C55E',
      title: 'Support when you need it',
      desc: 'You may not need much help but when you do, our support team is on hand. Real humans, fast replies.',
    },
    {
      icon: '▲', iconColor: '#8B5CF6',
      title: 'Product that teams actually use',
      desc: 'A modern, intuitive HR platform that\'s easy to adopt across your entire organisation.',
    },
    {
      icon: '◉', iconColor: '#EF4444',
      title: 'Best-practice guidance built in',
      desc: 'Our AI delivers best practices on all things HR, and benchmarks on demand. You look like the expert.',
    },
    {
      icon: '■', iconColor: '#0891B2',
      title: 'Robust access control',
      desc: 'People data is sensitive. Get access & permissions built for GDPR, HIPAA, and data protection standards.',
    },
  ]

  return (
    <section className="py-32 bg-[#FAFAF9]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-[clamp(40px,5vw,56px)] font-medium text-[#1A1611] tracking-tight mb-4">
            Built for HR leaders <span className="font-serif italic text-[#B08D57] font-normal">of the future.</span>
          </h2>
          <p className="text-xl text-[#57534E] max-w-[600px] mx-auto text-balance">
            Everything you need to run a world-class people organization, without the legacy software bloat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {items.map((item, i) => (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Ultra-minimal icon container like Bolto */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg mb-6 shadow-sm border border-gray-100"
                style={{ backgroundColor: `${item.iconColor}10`, color: item.iconColor }}
              >
                {item.icon}
              </div>
              <h3 className="text-[20px] font-medium text-[#1A1611] mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[16px] text-[#57534E] leading-[1.7]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
