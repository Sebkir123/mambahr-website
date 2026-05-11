'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(255,255,255,0.95)] shadow-sm border-b border-[rgba(0,0,0,0.08)]' : 'bg-[rgba(255,255,255,0.75)] border-b border-[rgba(0,0,0,0.04)]'} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900">
          <span className="text-[var(--gold)] text-2xl">◆</span>
          MambaHR
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#product" className="text-sm font-medium text-gray-600 hover:text-gray-900">Product</Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link href="#security" className="text-sm font-medium text-gray-600 hover:text-gray-900">Security</Link>
          <a href="#request-access" className="btn-primary py-2 px-5 text-sm">Get a demo</a>
        </div>
        
      </div>
    </nav>
  )
}
