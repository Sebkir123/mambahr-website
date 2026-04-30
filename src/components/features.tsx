'use client'

import { motion } from 'framer-motion'

const features = [
  {
    id: 'payroll',
    pill: 'PAYROLL SIMPLIFIED',
    pillColor: '#3B82F6',
    headline: 'Pay and manage',
    description: 'Handle payroll, contracts, and compliance in one place. Mamba takes care of the heavy lifting. Taxes, filings, and direct deposits — completely handled.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    reverse: false,
    Mockup: () => (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="absolute bottom-10 left-10 right-10 bg-white rounded-xl shadow-2xl p-5 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-gray-900">Payroll — April 2026</div>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Draft</div>
        </div>
        <div className="text-3xl font-semibold text-gray-900 mb-1">$142,350.00</div>
        <div className="text-xs text-gray-500 mb-6">Total payroll this period • 47 employees</div>
        
        <div className="space-y-4">
          {[
            { name: 'Sarah Chen', amount: '$8,450.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
            { name: 'Marcus Lee', amount: '$7,200.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
            { name: 'Taylor Ross', amount: '$6,800.00', status: 'Processing', statusColor: 'bg-yellow-100 text-yellow-700' },
          ].map((row, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="flex justify-between items-center text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                  {row.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium text-gray-900">{row.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-medium">{row.amount}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${row.statusColor}`}>
                  {row.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  },
  {
    id: 'hiring',
    pill: 'SMOOTH ONBOARDING',
    pillColor: '#22C55E',
    headline: 'Hire easily',
    description: 'Onboard full-time employees in any country, without setting up legal entities or juggling multiple tools.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    reverse: true,
    Mockup: () => (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-4 border border-gray-100 flex items-center gap-4 w-[85%]"
      >
        <div className="text-4xl">🎉</div>
        <div>
          <div className="text-gray-900 font-semibold mb-0.5">Congratulations!</div>
          <div className="text-sm text-gray-500">Julian is now a part of your team!</div>
        </div>
      </motion.div>
    )
  },
  {
    id: 'timeoff',
    pill: 'SMART HOLIDAYS',
    pillColor: '#8B5CF6',
    headline: 'Take a break from tracking',
    description: 'Create time-off policies, let employees request vacation from Slack, and see who is out at a glance with our auto-updating team calendar.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    reverse: false,
    Mockup: () => (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="absolute bottom-10 left-10 right-10 bg-white rounded-xl shadow-2xl p-5 border border-gray-100"
      >
        <div className="text-sm font-semibold text-gray-900 mb-4">Time Off Requests</div>
        <div className="space-y-3">
          {[
            { type: 'PTO', dates: 'Jul 12 - Jul 16', name: 'Marcus Lee', status: 'Pending', color: 'bg-yellow-500' },
            { type: 'Sick Leave', dates: 'Today', name: 'Ana Silva', status: 'Approved', color: 'bg-green-500' },
          ].map((req, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${req.color}`} />
                <div>
                  <div className="text-sm font-medium text-gray-900">{req.name}</div>
                  <div className="text-xs text-gray-500">{req.type} • {req.dates}</div>
                </div>
              </div>
              {req.status === 'Pending' ? (
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 shadow-sm">Decline</button>
                  <button className="px-3 py-1 bg-black rounded text-xs font-medium text-white shadow-sm">Approve</button>
                </div>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">Approved</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )
  }
]

export default function FeatureSections() {
  return (
    <section id="product" className="py-32 bg-[var(--bg)]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-32">
        
        {features.map((feature, idx) => (
          <div 
            key={feature.id}
            className={`flex flex-col gap-12 lg:gap-24 items-center ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
          >
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full max-w-lg"
            >
              <div 
                className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm"
              >
                <span style={{ backgroundColor: feature.pillColor }} className="w-1.5 h-1.5 rounded-full" />
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  {feature.pill}
                </span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-6">
                {feature.headline}
              </h3>
              
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>

            {/* Image / Mockup Side (Bolto huge soft container) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full"
            >
              <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#FAFAF9] rounded-[40px] border border-gray-100 overflow-hidden shadow-sm p-8 md:p-12">
                
                {/* Background Image filling the inner padding area nicely */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
                  <img 
                    src={feature.image} 
                    alt={feature.headline}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay to ensure mockups pop */}
                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Floating Mockup Component */}
                <feature.Mockup />
                
              </div>
            </motion.div>
          </div>
        ))}

      </div>
    </section>
  )
}
