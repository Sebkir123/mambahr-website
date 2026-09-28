import type { Metadata } from 'next'
import CompareHub from './compare-hub'

const description =
  'See how MambaHR compares with Rippling, Gusto, BambooHR, Workday and others, and with doing HR admin by hand. MambaHR does the admin, you approve what matters.'
const ogImage = '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Compare MambaHR with Rippling, Gusto, BambooHR and Workday',
  description,
  alternates: { canonical: 'https://www.mambahr.com/compare' },
  openGraph: {
    title: 'Compare MambaHR with Rippling, Gusto, BambooHR and Workday',
    description,
    url: 'https://www.mambahr.com/compare',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare MambaHR with Rippling, Gusto, BambooHR and Workday',
    description,
    images: [ogImage],
  },
}

export default function ComparePage() {
  return <CompareHub />
}
