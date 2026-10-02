import Link from 'next/link'
import { MambaMark } from '@/components/mamba-mark'
import s from './footer.module.css'

// The same groups as the Product menu (src/content/nav.ts), so the two never
// disagree about what the product covers, plus the Guides column that links
// the answer pages (/guides, /hr-by-state).
const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'The product', href: '/product' },
      { label: 'How it works', href: '/mamba' },
      { label: 'To do', href: '/today' },
      { label: 'Employee records', href: '/people' },
      { label: 'Documents & e-sign', href: '/documents' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'What it does',
    links: [
      { label: 'Hiring', href: '/hiring' },
      { label: 'Careers page', href: '/job-portal' },
      { label: 'Onboarding', href: '/onboarding' },
      { label: 'Payroll', href: '/payroll' },
      { label: 'Time off & leave', href: '/leave' },
      { label: 'Compensation', href: '/compensation' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'Headcount & layoffs', href: '/rif' },
    ],
  },
  {
    title: 'Compare',
    links: [
      { label: 'vs Rippling', href: '/compare/rippling' },
      { label: 'vs Gusto', href: '/compare/gusto' },
      { label: 'vs Deel', href: '/compare/deel' },
      { label: 'vs BambooHR', href: '/compare/bamboohr' },
      { label: 'vs Workday', href: '/compare/workday' },
      { label: 'All comparisons', href: '/compare' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Security', href: '/security' },
      { label: 'Careers', href: '/careers' },
      { label: 'Book a demo', href: '/demo' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'All HR guides', href: '/guides' },
      { label: 'HR laws by state', href: '/hr-by-state' },
      { label: 'HR laws by company size', href: '/guides/hr-laws-by-company-size' },
      { label: 'Onboarding checklist', href: '/guides/new-hire-onboarding-checklist' },
      { label: 'Final paycheck rules', href: '/guides/final-paycheck-laws' },
    ],
  },
  {
    title: 'Made for',
    links: [
      { label: 'Startups', href: '/best-hris-for-startups' },
      { label: 'Small businesses', href: '/hr-software-small-business' },
      { label: 'AI HR software', href: '/ai-hr-software' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={`site-footer ${s.foot}`}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <Link href="/" prefetch={false} className={s.logo}>
              <MambaMark size={22} color="var(--gold)" title="MambaHR" />
              <span className={s.wordmark}>MambaHR</span>
            </Link>
            <p className={s.tag}>The HR admin, done for your team. You make the calls.</p>
            <div className={s.contact}>
              <a className={s.mail} href="mailto:hello@mambahr.com">hello@mambahr.com</a>
              <a
                className={s.social}
                href="https://www.linkedin.com/company/mamba-hr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MambaHR on LinkedIn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>

          <nav className={s.cols} aria-label="Footer">
            {cols.map((col) => (
              <div key={col.title}>
                <p className={s.colTitle}>{col.title}</p>
                <ul className={s.list}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} prefetch={false} className={s.link}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>© {new Date().getFullYear()} MambaHR, Inc. All rights reserved.</p>
          <div className={s.legal}>
            <Link href="/privacy" prefetch={false}>Privacy</Link>
            <Link href="/terms" prefetch={false}>Terms</Link>
            <Link href="/dpa" prefetch={false}>DPA</Link>
            <Link href="/subscription-terms" prefetch={false}>Subscription terms</Link>
          </div>
        </div>

        <p className={s.sign}>HR that runs itself.</p>
      </div>
    </footer>
  )
}
