/**
 * Email helpers for MambaHR, uses Resend API.
 * Sends from team@mambahr.com (domain already verified in Resend).
 */

import { Resend } from 'resend'
import { getSecret } from '@/lib/secrets'

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

/* ── Premium branded email shell ── */
function emailShell(headline: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(headline)}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:#EDE8DF;-webkit-text-size-adjust:100%;mso-line-height-rule:exactly;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EDE8DF;">
    <tr>
      <td align="center" style="padding:40px 16px 48px;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:36px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:30px;height:30px;background:#1A1611;border-radius:7px;text-align:center;vertical-align:middle;">
                    <span style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:#FFFFFF;line-height:30px;">M</span>
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#1A1611;letter-spacing:-0.01em;">MambaHR</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#FDFAF5;border:1px solid #DDD6C8;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(26,22,17,0.08);">
              <!-- Gold accent bar -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:3px;background:linear-gradient(90deg,#B08D57 0%,#8A6535 50%,#C4A96C 100%);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
              <!-- Card body -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:44px 40px 40px;">
                    ${body}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;text-align:center;">
              <p style="font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9A8F82;margin:0 0 6px 0;">MambaHR &middot; HR admin, done for you</p>
              <p style="margin:0;"><a href="https://www.mambahr.com" style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#B08D57;text-decoration:none;">mambahr.com</a></p>
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
  return `<p style="font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#8A6535;margin:0 0 18px 0;">${escapeHtml(text)}</p>`
}

function serif(text: string): string {
  return `<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;letter-spacing:-0.02em;line-height:1.18;color:#1A1611;margin:0 0 16px 0;">${text}</h1>`
}

function body(text: string): string {
  return `<p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5C5046;margin:0 0 28px 0;">${text}</p>`
}

function ctaButton(href: string, label: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
    <tr>
      <td style="background:#1A1611;border-radius:999px;">
        <a href="${escapeHtml(href)}" style="display:inline-block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14.5px;font-weight:600;color:#FFFFFF;text-decoration:none;padding:15px 34px;border-radius:999px;letter-spacing:0.01em;">${label}</a>
      </td>
    </tr>
  </table>`
}

function divider(): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;"><tr><td style="height:1px;background:#E5DDD0;font-size:0;line-height:0;">&nbsp;</td></tr></table>`
}

function finePrint(text: string): string {
  return `<p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.65;color:#9A8F82;margin:0;">${text}</p>`
}

/* ════════════════════════════════════════════
   WAITLIST WELCOME EMAIL
   ════════════════════════════════════════════ */
export async function sendWaitlistWelcome(opts: { email: string; company: string }) {
  const client = await getClient()
  const subject = 'We got your application | MambaHR'
  const html = emailShell(
    subject,
    serif('We got your application.') +
    body(`Thanks for reaching out${opts.company ? ` from <strong style="color:#1A1611;">${escapeHtml(opts.company)}</strong>` : ''}. We&rsquo;ll email you within one business day.`) +
    body(`MambaHR takes the HR admin off your team: onboarding, offboarding, hiring, leave and compliance. Your team keeps the decisions that need judgment.`) +
    divider() +
    body(`While you wait, follow us on LinkedIn, it&rsquo;s where we build in public.`) +
    ctaButton('https://www.linkedin.com/company/mamba-hr', 'Follow on LinkedIn →') +
    finePrint('Questions? Just reply, this goes straight to us.<br/>Brian &amp; Sebastian, MambaHR'),
  )

  if (!client) { console.log('[email:waitlist-welcome] sent successfully'); return }
  try {
    const { error } = await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
    if (error) throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  } catch (err) {
    console.error('[email:waitlist-welcome] failed:', err)
  }
}

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

  if (!client) { console.log('[email:investor-ack] sent successfully'); return }
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

  if (!client) { console.log('[email:hrbench-ack] sent successfully'); return }
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
