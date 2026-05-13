import { redirect } from 'next/navigation'

// Pricing is hidden during private beta. Redirect to /demo so any
// inbound links don't 404. Restore the previous page from git history
// when public pricing is ready: git log --diff-filter=D -- src/app/pricing/page.tsx
export default function PricingPage() {
  redirect('/demo')
}
