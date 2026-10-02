import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'
import AnalyticsGate from '@/components/analytics-gate'
import StyledJsxRegistry from './styled-jsx-registry'
import SiteTracker from '@/components/site-tracker'
import { LAST_VERIFIED } from '@/lib/llms-content'
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

// Design-system display face, Warm Editorial Premium uses Fraunces.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mambahr.com'),
  // Search console ownership tags. Set the codes in Vercel's environment
  // (Google Search Console: HTML tag method; Bing Webmaster Tools: meta tag);
  // unset, no tag renders.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
  },
  title: 'MambaHR: HR that runs itself',
  description:
    "MambaHR takes the HR admin off your team's plate: hiring, onboarding, time off, payroll changes and compliance, with the law cited. You approve what matters.",
  keywords: [
    'AI HR department',
    'AI HR software',
    'HR AI agent',
    'people operations AI',
    'HR automation',
    'HRIS for startups',
    'ATS',
    'multi-state HR compliance',
    'HR software for startups',
  ],
  openGraph: {
    title: 'MambaHR: HR that runs itself',
    description: "MambaHR takes the HR admin off your team's plate: hiring, onboarding, time off, payroll changes and compliance, with the law cited. You approve what matters.",
    url: 'https://www.mambahr.com',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MambaHR: HR that runs itself',
    description: 'The HR admin, done for your team. You approve what matters.',
    images: ['/mambahr_og_sharing.jpg'],
  },
  alternates: {
    canonical: 'https://www.mambahr.com',
    types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'MambaHR blog' }] },
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    googleBot: { index: true, follow: true, noarchive: true },
  },
}

// Browser/OS chrome color, matches the oat background of the Warm Editorial
// Premium system so the address bar blends into the page on mobile Safari/Chrome.
export const viewport: Viewport = {
  themeColor: '#F4F2EC',
}

// Static JSON-LD, hardcoded constants, not user input
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    url: 'https://www.mambahr.com',
    applicationCategory: 'BusinessApplication',
    publisher: { '@id': 'https://www.mambahr.com/#organization' },
    description: 'HR software that does the admin for your team: hiring, onboarding, payroll changes, time off and compliance.',
    offers: {
      '@type': 'Offer',
      price: '14',
      priceCurrency: 'USD',
      description: 'Per employee / month, billed annually. Book a demo.',
    },
    operatingSystem: 'Web',
    // Freshness signal. Answer engines discount undated facts, and this is the
    // same constant the /llms.txt dateline renders, so the two cannot disagree.
    dateModified: LAST_VERIFIED,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.mambahr.com/#organization',
    name: 'MambaHR',
    legalName: 'MambaHR',
    url: 'https://www.mambahr.com',
    logo: 'https://www.mambahr.com/MambaHR_logo.png',
    image: 'https://www.mambahr.com/mambahr_og_sharing.jpg',
    description:
      'HR software for US companies that keeps your employee records and hiring in one place and does the admin in them: hiring, onboarding, leave, pay changes and compliance. A person approves the decisions that matter.',
    foundingDate: '2026',
    slogan: 'HR that runs itself.',
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsAbout: [
      'HR automation',
      'HRIS',
      'Applicant tracking',
      'Multi-state employment law compliance',
      'FMLA and state paid leave',
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
      url: 'https://www.mambahr.com/demo',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MambaHR',
    url: 'https://www.mambahr.com',
    publisher: { '@id': 'https://www.mambahr.com/#organization' },
    dateModified: LAST_VERIFIED,
    inLanguage: 'en-US',
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}>
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
        <a href="#main" className="skip-link">Skip to content</a>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <SiteTracker />
        {gaId && <AnalyticsGate gaId={gaId} />}
      </body>
    </html>
  )
}
