/**
 * Email helpers for MambaHR, uses Resend API.
 * Sends from team@mambahr.com (domain already verified in Resend).
 */

import { Resend } from 'resend'
import { getSecret } from '@/lib/secrets'
import { companyFromEmail } from '@/content/early-access'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const FROM_EMAIL = 'MambaHR <team@mambahr.com>'

async function getClient(): Promise<Resend | null> {
  const key = await getSecret('RESEND_API_KEY')
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('RESEND_API_KEY not set (env or Vault), emails disabled')
    }
    return null
  }
  return new Resend(key)
}

/* ── Email shell: paper background, the real wordmark, one white card. ── */
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
const SERIF = "Georgia,'Times New Roman',serif"
const INK = '#1A1611'

function emailShell(headline: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(headline)}</title>
  <style>
    @media (max-width: 480px) {
      .mh-card { padding: 30px 22px 26px !important; }
    }
  </style>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:#F5F2EC;-webkit-text-size-adjust:100%;mso-line-height-rule:exactly;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#F5F2EC;">
    <tr>
      <td align="center" style="padding:44px 16px 52px;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding:0 4px 28px;">
              <a href="https://www.mambahr.com" style="text-decoration:none;"><img src="https://www.mambahr.com/brand/mamba-logo-light.png" width="126" height="20" alt="MambaHR" style="display:block;border:0;outline:none;width:126px;height:20px;" /></a>
            </td>
          </tr>
          <tr>
            <td class="mh-card" style="background:#FFFFFF;border:1px solid #ECE5D8;border-radius:20px;padding:44px 40px 40px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 4px 0;text-align:center;">
              <p style="font-family:${SANS};font-size:12px;line-height:1.6;color:#9A8F82;margin:0;">MambaHR does the HR admin. You make the calls.<br/><a href="https://www.mambahr.com" style="color:#8A6535;text-decoration:none;">mambahr.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ── Shared inner components ── */
function kicker(text: string): string {
  return `<p style="font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8A6535;margin:0 0 14px 0;">${escapeHtml(text)}</p>`
}

function serif(text: string): string {
  return `<h1 style="font-family:${SERIF};font-size:30px;font-weight:400;letter-spacing:-0.02em;line-height:1.15;color:${INK};margin:0 0 16px 0;">${text}</h1>`
}

function body(text: string): string {
  return `<p style="font-family:${SANS};font-size:15.5px;line-height:1.65;color:#4A4038;margin:0 0 24px 0;">${text}</p>`
}

function ctaButton(href: string, label: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:4px 0 32px;">
    <tr>
      <td style="background:${INK};border-radius:999px;">
        <a href="${escapeHtml(href)}" style="display:inline-block;font-family:${SANS};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;padding:14px 30px;border-radius:999px;">${label}</a>
      </td>
    </tr>
  </table>`
}

function divider(): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:0 0 24px 0;"><tr><td style="height:1px;background:#EEE8DD;font-size:0;line-height:0;">&nbsp;</td></tr></table>`
}

function finePrint(text: string): string {
  return `<p style="font-family:${SANS};font-size:13px;line-height:1.6;color:#8C8276;margin:0;">${text}</p>`
}

// The founding pass is a picture rendered by the site
// (/early-access/pass-image/<code>): mail apps collapse table layouts, drop
// dashed rules and ignore cell widths, so drawing the ticket in HTML broke.
// The alt text carries every fact for readers who block images.
function passImage(p: { referralCode: string; alt: string }): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:8px 0 28px;">
    <tr>
      <td align="center">
        <img src="https://www.mambahr.com/early-access/pass-image/${escapeHtml(p.referralCode)}" width="480" alt="${escapeHtml(p.alt)}" style="display:block;width:100%;max-width:480px;height:auto;border:0;outline:none;border-radius:22px;font-family:${SANS};font-size:14px;color:#4A4038;" />
      </td>
    </tr>
  </table>`
}

export function passCode(referralCode: string): string {
  return `EA-${referralCode.slice(0, 6).toUpperCase()}`
}

/* ════════════════════════════════════════════
   EARLY ACCESS: WELCOME, PASS LINK AGAIN, PARTNER
   ════════════════════════════════════════════ */
type PassEmail = { company: string | null; email: string; referralCode: string; joinedAt: string; passUrl: string; referralUrl: string }

function passFor(p: PassEmail) {
  const joined = new Date(p.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
  return passImage({
    referralCode: p.referralCode,
    alt: `Your founding pass: ${p.company || companyFromEmail(p.email) || 'founding member'}, founding pricing, joined ${joined}, pass ${passCode(p.referralCode)}`,
  })
}

function giftBlock(referralUrl: string): string {
  return divider() +
    `<p style="font-family:${SANS};font-size:15px;font-weight:600;color:${INK};margin:0 0 6px;">Know another company buried in HR admin?</p>` +
    body(`Give them a founding spot with your link. They skip the queue and get founding pricing. You get a free month for every company that becomes a customer.<br/><a href="${escapeHtml(referralUrl)}" style="color:#6A5DA6;font-weight:600;text-decoration:none;word-break:break-all;">${escapeHtml(referralUrl.replace('https://www.', ''))}</a>`)
}

export function renderWaitlistWelcome(p: PassEmail): { subject: string; html: string } {
  const subject = 'Your founding spot at MambaHR'
  const html = emailShell(
    subject,
    serif('You&rsquo;re on the list.') +
    body('We&rsquo;re opening MambaHR to companies in small groups, and we&rsquo;ll email you when yours opens. Your founding pricing is held until then.') +
    passFor(p) +
    body('Tell us your team size and where your HR records live today, and we&rsquo;ll have the import ready the day you&rsquo;re in.') +
    ctaButton(p.passUrl, 'Open your pass') +
    giftBlock(p.referralUrl) +
    finePrint('Questions? Reply to this email, it comes straight to us.<br/>Brian and Sebastian'),
  )
  return { subject, html }
}

export function renderPassLinkAgain(p: PassEmail): { subject: string; html: string } {
  const subject = 'Your MambaHR pass'
  const html = emailShell(
    subject,
    serif('You&rsquo;re already on the list.') +
    body('Someone, probably you, tried to join again with this address. Your spot and your founding pricing are unchanged. Here is your pass.') +
    passFor(p) +
    ctaButton(p.passUrl, 'Open your pass') +
    finePrint('Didn&rsquo;t try to join? You can ignore this email.'),
  )
  return { subject, html }
}

export function renderPartnerAck(p: { name: string; share: string }): { subject: string; html: string } {
  const subject = 'Your MambaHR partner application'
  const first = p.name.split(' ')[0]
  const html = emailShell(
    subject,
    kicker('Partner program') +
    serif(`Thanks, ${escapeHtml(first)}.`) +
    body('We read every application ourselves and will reply within two business days with your partner link and the partner terms.') +
    body(`As a partner you earn ${escapeHtml(p.share)} of the first-year revenue of every company you bring to MambaHR, and your clients get founding customer pricing.`) +
    finePrint('Questions in the meantime? Reply to this email.<br/>Brian and Sebastian'),
  )
  return { subject, html }
}

async function send(tag: string, to: string, m: { subject: string; html: string }) {
  const client = await getClient()
  if (!client) { console.warn(`[email:${tag}] skipped: no RESEND_API_KEY`); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to, subject: m.subject, html: m.html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error(`[email:${tag}] failed:`, err)
  }
}

export const sendWaitlistWelcome = (p: PassEmail) => send('waitlist-welcome', p.email, renderWaitlistWelcome(p))
export const sendPassLinkAgain = (p: PassEmail) => send('waitlist-pass-again', p.email, renderPassLinkAgain(p))
export const sendPartnerAck = (to: string, p: { name: string; share: string }) => send('partner-ack', to, renderPartnerAck(p))

/* ════════════════════════════════════════════
   INVESTOR INQUIRY CONFIRMATION
   ════════════════════════════════════════════ */
export async function sendInvestorAck(opts: { email: string; name: string }) {
  const client = await getClient()
  const subject = 'Thanks for reaching out | MambaHR'
  const firstName = escapeHtml(opts.name.split(' ')[0])
  const html = emailShell(
    subject,
    kicker('Investor inquiry') +
    serif(`Thanks, ${firstName}.`) +
    body('We received your message and one of the founders will get back to you within 24 hours.') +
    body('In the meantime, our investor materials live at <a href="https://www.mambahr.com/investors" style="color:#B08D57;font-weight:600;text-decoration:none;">mambahr.com/investors</a>.') +
    divider() +
    finePrint('Brian Bell (CEO) &amp; Sebastian Kirsch (CTO)<br/>MambaHR'),
  )

  if (!client) { console.warn('[email:investor-ack] skipped: no RESEND_API_KEY'); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error('[email:investor-ack] failed:', err)
  }
}

/* ════════════════════════════════════════════
   HR-BENCH NOTIFY CONFIRMATION
   ════════════════════════════════════════════ */
export async function sendHRBenchAck(opts: { email: string }) {
  const client = await getClient()
  const subject = 'You\'re on the HR-Bench list'
  const html = emailShell(
    subject,
    kicker('HR-Bench') +
    serif('You&rsquo;re on the list.') +
    body('We&rsquo;ll let you know the moment HR-Bench ships, including the full dataset, methodology, and benchmark results across leading AI models.') +
    body('HR-Bench is the first open benchmark for evaluating AI on HR decision-making. 500+ scenarios across federal and state regulations, validated by domain experts.') +
    divider() +
    finePrint('Read more about our research: <a href="https://www.mambahr.com/research" style="color:#B08D57;font-weight:600;text-decoration:none;">mambahr.com/research &rarr;</a>'),
  )

  if (!client) { console.warn('[email:hrbench-ack] skipped: no RESEND_API_KEY'); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error('[email:hrbench-ack] failed:', err)
  }
}

/* ════════════════════════════════════════════
   FIELD GUIDE, deliver the gated playbook link
   ════════════════════════════════════════════ */
export async function sendFieldGuide(opts: { email: string; guideTitle: string; url: string }): Promise<void> {
  const client = await getClient()
  const subject = `Your field guide: ${opts.guideTitle}`
  const html = emailShell(
    subject,
    kicker('Field guide') +
    serif('Your playbook is ready.') +
    body(`<strong style="color:#1A1611;">${escapeHtml(opts.guideTitle)}</strong> is a practical guide to the rules, for when you have to make a hard call.`) +
    ctaButton(opts.url, 'Open the playbook →') +
    divider() +
    body('For new guides, follow MambaHR on LinkedIn. If a colleague faces the same decision, feel free to forward this email.') +
    ctaButton('https://www.linkedin.com/company/mamba-hr', 'Follow on LinkedIn →') +
    finePrint('This link is personal, please don&rsquo;t share it publicly. Questions? Just reply to this email.'),
  )

  if (!client) { console.log('[email:field-guide] (dev) →', opts.email, opts.url); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error('[email:field-guide] failed:', err)
  }
}

/* ════════════════════════════════════════════
   DEMO REQUEST CONFIRMATION
   ════════════════════════════════════════════ */
const TEAM_INBOX = 'hello@mambahr.com'

/** A job application, sent to the team inbox with reply-to set to the applicant. */
export async function sendCareersApplication(opts: {
  name: string
  email: string
  role: string
  link: string
  note: string
}): Promise<boolean> {
  const client = await getClient()
  const subject = `Application: ${opts.role} | ${opts.name}`
  const html = emailShell(
    subject,
    kicker('Careers') +
    serif(`${escapeHtml(opts.name)} applied`) +
    body(`<strong style="color:#1A1611;">Role:</strong> ${escapeHtml(opts.role)}`) +
    body(`<strong style="color:#1A1611;">Email:</strong> ${escapeHtml(opts.email)}`) +
    (opts.link ? body(`<strong style="color:#1A1611;">Link:</strong> ${escapeHtml(opts.link)}`) : '') +
    divider() +
    body(escapeHtml(opts.note).replace(/\n/g, '<br/>')) +
    finePrint('Reply to this email to answer the applicant directly.'),
  )
  if (!client) { console.log('[email:careers-application] (dev) →', TEAM_INBOX, opts.email); return true }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: TEAM_INBOX, replyTo: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
    return true
  } catch (err) {
    console.error('[email:careers-application] failed:', err)
    return false
  }
}

/** Confirmation to the applicant. Best-effort. */
export async function sendCareersConfirmation(opts: { email: string; name: string; role: string }): Promise<void> {
  const client = await getClient()
  const firstName = escapeHtml(opts.name.split(' ')[0] || opts.name)
  const subject = 'We got your application | MambaHR'
  const html = emailShell(
    subject,
    kicker('Careers') +
    serif(`Thanks, ${firstName}.`) +
    body(`Your application for <strong style="color:#1A1611;">${escapeHtml(opts.role)}</strong> is with the team. We will reply by email.`) +
    finePrint('Anything to add? Reply to this email.'),
  )
  if (!client) { console.log('[email:careers-confirmation] (dev) →', opts.email); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error('[email:careers-confirmation] failed:', err)
  }
}

export async function sendDemoConfirmation(opts: { email: string; name: string; company: string }): Promise<void> {
  const client = await getClient()
  const firstName = opts.name ? escapeHtml(opts.name.split(' ')[0]) : null
  const subject = 'Your MambaHR demo request'
  const html = emailShell(
    subject,
    kicker('Demo request') +
    serif(firstName ? `Thanks, ${firstName}.` : 'We got your demo request.') +
    body(`We will email you to find 30 minutes for <strong style="color:#1A1611;">${escapeHtml(opts.company || 'your team')}</strong>.`) +
    body('On the call we will run MambaHR on your own HR scenarios and show you the price for your number of employees.') +
    divider() +
    body('For product updates, follow MambaHR on LinkedIn.') +
    ctaButton('https://www.linkedin.com/company/mamba-hr', 'Follow on LinkedIn →') +
    finePrint('Questions before the call? Reply to this email.<br/>Brian &amp; Sebastian, MambaHR'),
  )

  if (!client) { console.log('[email:demo-confirmation] (dev) →', opts.email); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error('[email:demo-confirmation] failed:', err)
  }
}

/* ════════════════════════════════════════════
   RESOURCE DOWNLOAD, deliver the PDF link
   ════════════════════════════════════════════ */
export async function sendResourceDownload(opts: { email: string; name: string; title: string; kicker: string; downloadUrl: string }): Promise<void> {
  const client = await getClient()
  const firstName = opts.name ? escapeHtml(opts.name.split(' ')[0]) : null
  const subject = `Your download: ${opts.title}`
  const greeting = firstName ? `Here you go, ${firstName}.` : 'Your download is ready.'
  const html = emailShell(
    subject,
    kicker(opts.kicker) +
    serif(greeting) +
    body(`<strong style="color:#1A1611;">${escapeHtml(opts.title)}</strong> is ready. Click below to open the PDF in your browser.`) +
    ctaButton(opts.downloadUrl, 'Download now →') +
    divider() +
    finePrint(`Button not working? <a href="${escapeHtml(opts.downloadUrl)}" style="color:#B08D57;font-weight:600;text-decoration:none;">Click here</a> to open the PDF directly.`),
  )

  if (!client) { console.log('[email:resource-download] (dev) →', opts.email, opts.downloadUrl); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error('[email:resource-download] failed:', err)
  }
}
