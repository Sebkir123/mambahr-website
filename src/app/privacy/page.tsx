import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/components/legal/legal-page'

const UPDATED = '29 July 2026'
const description =
  'How MambaHR handles personal information on mambahr.com: what we collect, why, who processes it, how long we keep it, and how to have it deleted.'

export const metadata: Metadata = {
  title: 'Privacy Policy | MambaHR',
  description,
  alternates: { canonical: 'https://mambahr.com/privacy' },
  openGraph: {
    title: 'Privacy Policy | MambaHR',
    description,
    url: 'https://mambahr.com/privacy',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

const sections: LegalSection[] = [
  {
    heading: 'What this policy covers',
    body: (
      <>
        <p>
          This policy covers <strong>mambahr.com</strong>, our public website: the pages you
          browse, the demo request form, and the field guides you can download.
        </p>
        <p>
          It does <strong>not</strong> cover the MambaHR application itself. Employee data that a
          customer puts into the MambaHR product is handled under that customer&rsquo;s written
          agreement and data processing terms, where MambaHR acts as a processor on the
          customer&rsquo;s instructions. If you are an employee of a MambaHR customer asking about
          your own HR records, your employer is the right place to start.
        </p>
      </>
    ),
  },
  {
    heading: 'Information you give us',
    body: (
      <>
        <p>
          You only ever type into this website when you ask us for something. When you request a
          demo, download a field guide, or join the waitlist, we collect:
        </p>
        <ul>
          <li>Your name</li>
          <li>Your work email address</li>
          <li>Your company name</li>
          <li>Your company size band (a range, not a headcount)</li>
        </ul>
        <p>
          If you email us, we keep that correspondence so we can reply and keep track of the
          conversation. We do not ask for, and this website does not collect, any sensitive
          category of personal information: no government identifiers, no financial account
          details, no health information.
        </p>
      </>
    ),
  },
  {
    heading: 'Information collected automatically',
    body: (
      <>
        <p>
          We run our own first-party analytics so we can see which pages are useful and which are
          not. For each visit we record:
        </p>
        <ul>
          <li>Pages viewed, page titles, time on page, and how far down the page you scrolled</li>
          <li>The referring site and any UTM campaign parameters in the link you followed</li>
          <li>Screen size and browser language</li>
          <li>Device type, browser, and operating system, derived from your user agent</li>
          <li>Clicks on calls to action, such as a demo button</li>
          <li>
            Approximate location (country, region, city) and network operator, derived from your IP
            address
          </li>
        </ul>
        <p>
          <strong>We do not store your IP address.</strong> It is used in the moment to derive the
          approximate location and network above, and to rate-limit abuse, then discarded. What we
          keep is a salted, truncated one-way hash of it, which lets us recognise repeat requests
          in a session without holding the address itself.
        </p>
        <p>
          We also classify obvious bots and crawlers from the user agent so they do not pollute the
          numbers.
        </p>
      </>
    ),
  },
  {
    heading: 'Cookies and local storage',
    body: (
      <>
        <p>
          Our own analytics do not use cookies. They use two opaque random identifiers stored in
          your browser:
        </p>
        <div className="scroller">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Where</th>
                <th>Purpose</th>
                <th>Lifetime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>mt_vid</td>
                <td>Local storage</td>
                <td>Tells a returning browser apart from a new one</td>
                <td>Until you clear site data</td>
              </tr>
              <tr>
                <td>mt_sid</td>
                <td>Session storage</td>
                <td>Groups pages viewed in one sitting</td>
                <td>Until you close the tab</td>
              </tr>
              <tr>
                <td>blog view key</td>
                <td>Session storage</td>
                <td>Stops one blog read being counted twice</td>
                <td>Until you close the tab</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Neither identifier contains your name, your email, or anything derived from them. Clearing
          your browser&rsquo;s site data for mambahr.com removes both, and you become a new visitor.
        </p>
        <p>
          Two third parties may set their own cookies: Cloudflare Turnstile, which checks that form
          submissions come from a person rather than a script, and Google Analytics, where enabled.
          Cookies used by our admin tools are limited to signed-in MambaHR staff.
        </p>
      </>
    ),
  },
  {
    heading: 'Why we use it',
    body: (
      <>
        <p>We use the information above to:</p>
        <ul>
          <li>Reply to your demo request and send you the guide you asked for</li>
          <li>Send the confirmation email for a request you submitted</li>
          <li>Understand which pages help people and which do not, so we can improve them</li>
          <li>Keep the forms free of spam and automated abuse</li>
          <li>Keep the site secure and available</li>
        </ul>
        <p>
          We do not use this information to make automated decisions about you, and we do not
          profile you for advertising.
        </p>
      </>
    ),
  },
  {
    heading: 'Who processes it for us',
    body: (
      <>
        <p>
          We keep the list short on purpose. Each of these companies processes data on our
          instructions, under contract, and all of them process it in the United States.
        </p>
        <div className="scroller">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>What it does for us</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Vercel</td><td>Hosts and serves this website</td></tr>
              <tr><td>Supabase</td><td>Database that stores form submissions and analytics</td></tr>
              <tr><td>Resend</td><td>Sends the confirmation and field-guide emails</td></tr>
              <tr><td>Cloudflare</td><td>Turnstile bot check on our forms</td></tr>
              <tr><td>Slack</td><td>Notifies our founders internally that you asked for a demo</td></tr>
              <tr><td>Google Analytics</td><td>Aggregate traffic measurement, where enabled</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>We do not sell your personal information</strong>, and we do not share it for
          cross-context behavioural advertising. We have never done either. We will disclose
          information if the law requires it, and we would tell you unless we were legally
          prohibited from doing so.
        </p>
      </>
    ),
  },
  {
    heading: 'How long we keep it',
    body: (
      <>
        <p>
          Analytics data expires on a schedule, enforced by an automated sweep that runs every day:
        </p>
        <ul>
          <li>Sessions identified as bots are deleted after <strong>30 days</strong></li>
          <li>All other analytics sessions are deleted after <strong>180 days</strong></li>
        </ul>
        <p>
          Demo requests, field-guide requests, and email correspondence are business records. We
          keep those while we are in contact with you and for as long as we may need them for our
          legitimate business and legal purposes. Ask us to delete them and we will.
        </p>
      </>
    ),
  },
  {
    heading: 'Your choices and your rights',
    body: (
      <>
        <p>You can, at any time and regardless of where you live:</p>
        <ul>
          <li>Ask what personal information we hold about you</li>
          <li>Ask us to correct it</li>
          <li>Ask us to delete it</li>
          <li>Ask us to stop emailing you, or use the unsubscribe link in any email</li>
          <li>Clear your browser&rsquo;s site data to reset the analytics identifiers above</li>
        </ul>
        <p>
          If you are a California resident, the CCPA as amended by the CPRA gives you rights to
          know, delete, and correct your personal information, to opt out of sale or sharing, and
          not to be discriminated against for exercising them. As above, we do not sell or share
          your personal information, so there is nothing to opt out of. We honour Global Privacy
          Control signals where your browser sends them.
        </p>
        <p>
          To exercise any of these, email{' '}
          <a href="mailto:privacy@mambahr.com">privacy@mambahr.com</a> from the address you gave us,
          or tell us which address to look up. We will respond within 45 days. You may use an
          authorised agent; we will ask for proof of their authority.
        </p>
      </>
    ),
  },
  {
    heading: 'Security',
    body: (
      <p>
        Data is encrypted in transit and at rest, access on our side is restricted to the people who
        need it, and administrative access is logged. No system is perfect, and we will not claim
        otherwise. If you believe you have found a vulnerability in this website, email{' '}
        <a href="mailto:security@mambahr.com">security@mambahr.com</a> and we will get back to you
        quickly.
      </p>
    ),
  },
  {
    heading: 'Children',
    body: (
      <p>
        This is a website for people who buy business software. It is not directed at children, and
        we do not knowingly collect personal information from anyone under 16. If you believe a
        child has given us information, email us and we will delete it.
      </p>
    ),
  },
  {
    heading: 'Changes to this policy',
    body: (
      <p>
        If we change how we handle personal information, we will update this page and move the date
        at the top. If a change is significant, we will say so plainly rather than quietly editing
        the text.
      </p>
    ),
  },
  {
    heading: 'How to reach us',
    body: (
      <p>
        MambaHR, Inc., San Francisco, California.
        <br />
        Privacy questions: <a href="mailto:privacy@mambahr.com">privacy@mambahr.com</a>
        <br />
        Anything else: <a href="mailto:hello@mambahr.com">hello@mambahr.com</a>
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <p>
          We collect very little on this website, we do not sell any of it, and we delete the
          analytics on a timer. This page says exactly what we take, why, who helps us process it,
          and how to make us delete it.
        </p>
      }
      sections={sections}
    />
  )
}
