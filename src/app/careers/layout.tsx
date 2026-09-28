import type { Metadata } from 'next'

const description = 'Build HR software that does the admin for HR teams. See open roles at MambaHR and apply.'

export const metadata: Metadata = {
  title: 'Careers | MambaHR',
  description,
  openGraph: {
    title: 'Careers | MambaHR',
    description,
    url: 'https://www.mambahr.com/careers',
    images: [{ url: '/og?title=Careers%20at%20MambaHR&eyebrow=Careers', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | MambaHR',
    description,
    images: ['/og?title=Careers%20at%20MambaHR&eyebrow=Careers'],
  },
  alternates: { canonical: 'https://www.mambahr.com/careers' },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
