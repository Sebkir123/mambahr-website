import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/components/legal/legal-page'

const UPDATED = '29 July 2026'
const description =
  'The terms that apply to the MambaHR website and the guides we publish. The MambaHR product itself is governed by a separate written agreement.'

export const metadata: Metadata = {
  title: 'Terms of Use | MambaHR',
  description,
  alternates: { canonical: 'https://mambahr.com/terms' },
  openGraph: {
    title: 'Terms of Use | MambaHR',
    description,
    url: 'https://mambahr.com/terms',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

const sections: LegalSection[] = [
  {
    heading: 'What these terms cover',
    body: (
      <>
        <p>
          These terms apply to <strong>mambahr.com</strong>: the pages on it, the field guides and
          articles we publish, and the forms you can submit.
        </p>
        <p>
          They do <strong>not</strong> govern the MambaHR product. Access to the MambaHR
          application is provided under a separate written agreement between MambaHR, Inc. and the
          customer. Where that agreement and these terms disagree, that agreement wins.
        </p>
      </>
    ),
  },
  {
    heading: 'Our content is not legal or HR advice',
    body: (
      <>
        <p>
          This is the most important paragraph on the page. We write about employment law: family
          and medical leave, pay transparency, worker classification, notice requirements,
          reductions in force. We do it carefully and we cite our sources.
        </p>
        <p>
          <strong>
            None of it is legal advice, and reading it does not make us your lawyers or your HR
            advisors.
          </strong>{' '}
          Employment law turns on specific facts, changes often, and differs by state and by city.
          Before you act on anything you read here, including anything in one of our field guides,
          check it with qualified counsel who knows your situation. We are not liable for decisions
          you make based on our published material.
        </p>
      </>
    ),
  },
  {
    heading: 'Using the site',
    body: (
      <>
        <p>You are welcome to read, quote with attribution, and share what we publish. Please do not:</p>
        <ul>
          <li>Scrape, crawl, or harvest the site beyond ordinary search-engine indexing</li>
          <li>Try to break, overload, or gain unauthorised access to any part of it</li>
          <li>Submit anything false, or someone else&rsquo;s details, through our forms</li>
          <li>Republish our guides as your own, or resell them</li>
          <li>Use the site to develop a competing product by copying its content wholesale</li>
        </ul>
        <p>
          We may block access if someone is doing any of the above. Automated access by AI
          assistants for the purpose of answering a user&rsquo;s question is welcome; see{' '}
          <a href="/llms.txt">llms.txt</a>.
        </p>
      </>
    ),
  },
  {
    heading: 'What you submit to us',
    body: (
      <p>
        When you send us your details through a form, you confirm they are yours or that you are
        authorised to share them, and you allow us to contact you about your request. We handle
        those details as described in our <Link href="/privacy">Privacy Policy</Link>. You can ask
        us to delete them at any time.
      </p>
    ),
  },
  {
    heading: 'Our intellectual property',
    body: (
      <p>
        The MambaHR name, logo, wordmark, site design, and the text and images we publish belong to
        MambaHR, Inc. Quoting a passage with a link back is fine. Wholesale copying, or using our
        brand in a way that suggests we endorse or are affiliated with you, is not.
      </p>
    ),
  },
  {
    heading: 'Product descriptions and forward-looking statements',
    body: (
      <p>
        We describe what MambaHR does, including capabilities we are actively building. Pricing,
        packaging, timelines, and feature descriptions on this site are indicative and may change.
        Nothing on this website is a binding offer or a commitment to deliver a specific feature by
        a specific date. What we are contractually obliged to provide is set out in a customer
        agreement, not here.
      </p>
    ),
  },
  {
    heading: 'Third-party names and links',
    body: (
      <p>
        We compare MambaHR to other products and name them. Those names and trademarks belong to
        their owners, and using them for comparison does not imply any affiliation with or
        endorsement by them. Comparison pages reflect our understanding at the time of writing;
        other vendors change their products, so verify anything that matters to your decision. We
        are not responsible for the content of any site we link to.
      </p>
    ),
  },
  {
    heading: 'No warranty',
    body: (
      <p>
        This website is provided as is. We work to keep it accurate, available, and current, but we
        do not warrant that it will be uninterrupted, error free, or that everything on it is
        complete and up to date at the moment you read it.
      </p>
    ),
  },
  {
    heading: 'Limitation of liability',
    body: (
      <p>
        To the fullest extent the law allows, MambaHR, Inc. is not liable for indirect, incidental,
        special, consequential, or punitive damages, or for lost profits, revenue, or data, arising
        from your use of this website or reliance on its content. Nothing here limits liability
        that cannot lawfully be limited.
      </p>
    ),
  },
  {
    heading: 'Changes',
    body: (
      <p>
        We may update these terms. The date at the top shows when we last did. Continuing to use the
        site after a change means you accept the updated version.
      </p>
    ),
  },
  {
    heading: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of the State of California, without regard to its
        conflict of laws rules. The state and federal courts in San Francisco, California have
        exclusive jurisdiction over any dispute arising from them.
      </p>
    ),
  },
  {
    heading: 'How to reach us',
    body: (
      <p>
        MambaHR, Inc., San Francisco, California.
        <br />
        Questions about these terms: <a href="mailto:legal@mambahr.com">legal@mambahr.com</a>
        <br />
        Anything else: <a href="mailto:hello@mambahr.com">hello@mambahr.com</a>
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated={UPDATED}
      intro={
        <p>
          Plain terms for a marketing website. The short version: read what we publish, quote it
          with a link, do not scrape or misuse it, and never treat our employment-law writing as
          legal advice for your situation.
        </p>
      }
      sections={sections}
    />
  )
}
