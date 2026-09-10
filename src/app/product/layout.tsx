import type { Metadata } from 'next'

const ogImage = '/og?title=See%20the%20AI%20HR%20department%20run%20the%20work&eyebrow=Product'

export const metadata: Metadata = {
  title: 'Product | MambaHR',
  description:
    'See the AI HR department do the work: hiring, onboarding, leave, compensation, and compliance, with a person on the calls that matter.',
  openGraph: {
    title: 'Product | MambaHR',
    description:
      'Watch MambaHR run hiring, onboarding, leave, compensation, and compliance, from Slack and the app.',
    url: 'https://mambahr.com/product',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product | MambaHR',
    description: 'See the AI HR department do the work.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/product' },
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
