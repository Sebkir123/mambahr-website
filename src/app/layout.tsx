import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Instrument_Serif, Fraunces } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import StyledJsxRegistry from './styled-jsx-registry'
import SiteTracker from '@/components/site-tracker'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

// Design-system display face — Warm Editorial Premium uses Fraunces.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mambahr.com'),
  title: 'MambaHR: The AI HR department. Before you hire HR.',
  description:
    'MambaHR is the AI HR department for startups and growing companies. It runs hiring, onboarding, payroll-ready exports, time off, performance, and compliance end to end, for a fraction of the cost of your next HR hire. You approve the calls that matter.',
  keywords: [
    'AI HR department',
    'AI HR software',
    'HR AI agent',
    'people operations AI',
    'HR automation',
    'HRIS for startups',
    'ATS',
    'performance reviews software',
    'multi-state HR compliance',
    'replace HR hire',
  ],
  openGraph: {
    title: 'MambaHR: The AI HR department.',
    description: 'Before you hire HR, hire MambaHR. Hiring, onboarding, payroll-ready exports, time off, performance, and compliance, done end to end, for a fraction of an HR hire.',
    url: 'https://mambahr.com',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MambaHR: The AI HR department.',
    description: 'Before you hire HR, hire MambaHR. The whole department, done end to end.',
    images: ['/mambahr_og_sharing.jpg'],
  },
  alternates: { canonical: 'https://mambahr.com' },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    googleBot: { index: true, follow: true, noarchive: true },
  },
}

// Browser/OS chrome color — matches the oat background of the Warm Editorial
// Premium system so the address bar blends into the page on mobile Safari/Chrome.
export const viewport: Viewport = {
  themeColor: '#F4F2EC',
}

// Static JSON-LD — hardcoded constants, not user input
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    url: 'https://mambahr.com',
    applicationCategory: 'BusinessApplication',
    description: 'The AI HR department: hiring, onboarding, payroll-ready exports, time off, performance, and compliance, run end to end.',
    offers: {
      '@type': 'Offer',
      price: '14',
      priceCurrency: 'USD',
      description: 'Per employee / month, billed annually. Book a demo.',
    },
    operatingSystem: 'Web',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MambaHR',
    legalName: 'MambaHR',
    url: 'https://mambahr.com',
    logo: 'https://mambahr.com/MambaHR_logo.png',
    image: 'https://mambahr.com/mambahr_og_sharing.jpg',
    description:
      'The AI HR department for US companies — the system of record (HRIS, ATS, LMS) with specialist agents that run hiring, onboarding, leave, performance, compensation, and compliance end to end. A human approves the calls that matter.',
    foundingDate: '2026',
    slogan: 'Before you hire HR, hire MambaHR.',
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsAbout: [
      'HR automation',
      'HRIS',
      'Applicant tracking',
      'Multi-state employment law compliance',
      'FMLA and state paid leave',
      'Performance reviews',
      'Compensation and pay equity',
    ],
    founder: [
      { '@type': 'Person', name: 'Brian Bell', jobTitle: 'Co-founder & CEO' },
      { '@type': 'Person', name: 'Sebastian Kirsch', jobTitle: 'Co-founder & CTO' },
    ],
    sameAs: ['https://www.linkedin.com/company/mamba-hr/'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@mambahr.com',
      url: 'https://mambahr.com/demo',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MambaHR',
    url: 'https://mambahr.com',
    publisher: { '@type': 'Organization', name: 'MambaHR' },
  },
]
const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${instrumentSerif.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://dqoqnlecylqlwsahudjn.supabase.co" />
        <link rel="dns-prefetch" href="https://dqoqnlecylqlwsahudjn.supabase.co" />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        {gaId && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <SiteTracker />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
