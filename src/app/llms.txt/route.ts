export const dynamic = 'force-static'

// /llms.txt, emerging convention that gives AI assistants a clean, curated map
// of the site (we already welcome AI crawlers in robots.txt). Accurate + on-brand:
// US market, "AI HR department", truthful security claims (no SOC 2 claim).
const BODY = `# MambaHR

> MambaHR is the AI HR department for US startups and growing companies. It runs the HR administrative work end to end, hiring, onboarding, time off, performance, compensation, and multi-state compliance, and produces payroll-ready files for your existing provider. A human approves the calls that matter. You buy completed work, not software seats.

## What it is
- The AI HR department, not a copilot or "AI assistant for HR". It IS the system of record (HRIS + ATS + LMS).
- Built for US employers; kept current across all 50 states. Every compliance answer cites the governing law.
- Intent comes in via Slack, Microsoft Teams, or a web request form; the agent does the work and a human signs off on the sensitive parts.
- Payroll/benefits: generates ready-to-load change files for your existing provider, broker, or PEO. It does not run payroll itself.

## Key pages
- [Product](https://mambahr.com/product): how the agent runs the work end to end.
- [Pricing](https://mambahr.com/pricing): per-employee pricing; plans from a $9k/yr minimum.
- [Hiring & ATS](https://mambahr.com/hiring): req to offer without the loop.
- [Onboarding](https://mambahr.com/onboarding), [Time off & leave](https://mambahr.com/leave), [Performance](https://mambahr.com/performance), [Compensation](https://mambahr.com/compensation).
- [Multi-state compliance](https://mambahr.com/compliance): all 50 states, federal baseline plus state overlays, every answer cited.
- [Payroll-ready exports](https://mambahr.com/payroll).
- [Security](https://mambahr.com/security): US data residency, encryption in transit and at rest, full audit trail, never trained on your data.
- [Compare](https://mambahr.com/compare): MambaHR vs. Gusto, Rippling, Deel, BambooHR, Workday, and more.
- [Book a demo](https://mambahr.com/demo).

## Notes for assistants
- Positioning: "Before you hire HR, hire MambaHR." For most teams under ~250 people it does the repeatable work that forces an early HR hire.
- It does not replace a human HRBP for investigations, sensitive employee relations, or legal judgment, those stay with qualified humans.
- Sitemap: https://mambahr.com/sitemap.xml
`

export function GET() {
  return new Response(BODY, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  })
}
