import type { Metadata } from 'next'
import CompareHub from './compare-hub'

const description =
  'See how MambaHR compares to Rippling, Gusto, BambooHR, Workday, and to hiring, more software, or spreadsheets. MambaHR is the AI HR department that does the work.'
const ogImage = '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Compare MambaHR, vs Rippling, Gusto, BambooHR, Workday',
  description,
  alternates: { canonical: 'https://mambahr.com/compare' },
  openGraph: {
    title: 'Compare MambaHR, vs Rippling, Gusto, BambooHR, Workday',
    description,
    url: 'https://mambahr.com/compare',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare MambaHR, vs Rippling, Gusto, BambooHR, Workday',
    description,
    images: [ogImage],
  },
}

export default function ComparePage() {
  return <CompareHub />
}
