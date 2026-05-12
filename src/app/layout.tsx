import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import StickyDemoButton from '@/components/sticky-demo-button'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mambahr.com'),
  title: 'MambaHR — Your HR team, in Slack.',
  description:
    'MambaHR is an AI HR department that runs in Slack, Teams, and the web. Hiring, payroll, leave, performance, compliance — the agents do the work. One human approves the calls that matter.',
  keywords: [
    'HR AI agent',
    'people operations AI',
    'HR automation',
    'AI HR software',
    'HR in Slack',
    'autonomous HR department',
    'replace HR department',
  ],
  openGraph: {
    title: 'MambaHR — Your HR team, in Slack.',
    description: 'An AI HR department that runs in the tools you already use. Hiring, payroll, leave, performance — the agents do the work.',
    url: 'https://mambahr.com',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/api/og?line1=Your+HR+team%2C&line2=automated.&highlight=&subtitle=Hiring%2C+payroll%2C+leave%2C+performance%2C+compliance+%E2%80%94+the+agents+do+the+work.+You+sign+off+when+it+matters.&bottomRight=14+specialists+%C2%B7+50-state+law+%C2%B7+1-day+setup', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MambaHR — Your HR team, in Slack.',
    description: 'An AI HR department that runs in the tools you already use.',
    images: ['/api/og?line1=Your+HR+team%2C&line2=automated.&highlight=&subtitle=Hiring%2C+payroll%2C+leave%2C+performance%2C+compliance+%E2%80%94+the+agents+do+the+work.+You+sign+off+when+it+matters.&bottomRight=14+specialists+%C2%B7+50-state+law+%C2%B7+1-day+setup'],
  },
  alternates: { canonical: 'https://mambahr.com' },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    googleBot: { index: true, follow: true, noarchive: true },
  },
}

// Static JSON-LD — hardcoded constants, not user input
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    url: 'https://mambahr.com',
    applicationCategory: 'BusinessApplication',
    description: 'Autonomous AI agent for HR and people operations',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'AI HR department — request access',
    },
    operatingSystem: 'Web',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MambaHR',
    url: 'https://mambahr.com',
    description: 'Domain AI lab building the autonomous HR agent.',
    foundingDate: '2026',
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://dqoqnlecylqlwsahudjn.supabase.co" />
        <link rel="dns-prefetch" href="https://dqoqnlecylqlwsahudjn.supabase.co" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
        <StickyDemoButton />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
