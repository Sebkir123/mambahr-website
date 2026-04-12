import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://mambahr.com'),
  title: 'MambaHR — The HR Agent That Never Calls in Sick',
  description:
    'MambaHR is an autonomous AI agent that handles leave, onboarding, and people ops for HR teams of 50-500. Built on a proprietary HR decision engine.',
  keywords: [
    'HR AI agent',
    'people operations AI',
    'HR automation',
    'AI HR software',
    'HR decision engine',
    'autonomous HR',
  ],
  openGraph: {
    title: 'MambaHR — The HR agent that never calls in sick.',
    description: 'The autonomous AI agent for people operations. Leave, onboarding, people ops — handled in seconds.',
    url: 'https://mambahr.com',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MambaHR — The HR agent that never calls in sick.',
    description: 'The autonomous AI agent for people operations.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://mambahr.com' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
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
      description: 'Private beta — request access',
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
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
