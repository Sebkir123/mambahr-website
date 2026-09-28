import type { Metadata } from 'next'

const ogImage = '/og?title=See%20MambaHR%20do%20the%20admin&eyebrow=Product'

export const metadata: Metadata = {
  title: 'Product | MambaHR',
  description:
    'MambaHR does the admin in hiring, onboarding, leave, pay changes and compliance. Your team approves the sensitive calls.',
  openGraph: {
    title: 'Product | MambaHR',
    description:
      'MambaHR does the admin in hiring, onboarding, leave, pay changes and compliance. Your team approves the sensitive calls.',
    url: 'https://www.mambahr.com/product',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product | MambaHR',
    description: 'See MambaHR take the HR admin off your team.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/product' },
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
