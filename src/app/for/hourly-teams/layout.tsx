import type { Metadata } from 'next'
import { ogCard } from '@/lib/og'

// Ad landing page for the blue-collar segment of the October 2026 ad test
// (blue-collar companies vs SF tech startups). Not in the sitemap or the nav and
// not indexed: its words change with the test, and the ads link straight to it.
const title = 'HR for Hourly Teams | MambaHR'
const description =
  'HR admin for restaurants, trades and hourly teams: offers with the right hourly rate, joining paperwork and Form I-9 on time, tipped pay by your state’s rules, and final pay by the deadline.'
const ogImage = ogCard('HR for hourly teams, done for you.', 'Restaurants, trades and hourly teams')

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: { title, description, url: 'https://www.mambahr.com/for/hourly-teams', images: [{ url: ogImage, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  alternates: { canonical: 'https://www.mambahr.com/for/hourly-teams' },
}

export default function HourlyTeamsLayout({ children }: { children: React.ReactNode }) {
  return children
}
