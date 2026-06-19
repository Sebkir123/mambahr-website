/**
 * Email helpers for MambaHR — uses Resend API.
 * Sends from team@mambahr.com (domain already verified in Resend).
 *
 * In dev mode (no RESEND_API_KEY), logs to console instead of sending.
 */

import { Resend } from 'resend'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const FROM_EMAIL = 'MambaHR <team@mambahr.com>'

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('RESEND_API_KEY not set in production — emails disabled')
    }
    return null
  }
  return new Resend(key)
}

/* ── Wrap content in a clean, branded HTML shell ── */
function emailShell(headline: string, body: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${headline}</title>
</head>
<body style="margin:0;padding:0;background:#fafaf7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1611;">
  <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
    <!-- Logo -->
    <div style="margin-bottom:32px;">
      <span style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#1a1611;">MambaHR</span>
    </div>
    <!-- Body card -->
    <div style="background:#ffffff;border:1px solid #e7e5e4;border-radius:16px;padding:40px 32px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
      ${body}
    </div>
    <!-- Footer -->
    <div style="margin-top:32px;text-align:center;font-size:12px;color:#a8a29e;line-height:1.6;">
      MambaHR Inc. &middot; The autonomous HR agent.<br/>
      <a href="https://mambahr.com" style="color:#B08D57;text-decoration:none;">mambahr.com</a>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/* ════════════════════════════════════════════
   WAITLIST WELCOME EMAIL
   ════════════════════════════════════════════ */
export async function sendWaitlistWelcome(opts: { email: string; company: string }) {
  const client = getClient()
  const subject = 'Welcome to MambaHR — we got your application'
  const html = emailShell(
    subject,
    `
    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0 0 16px 0;color:#1a1611;">
      You&rsquo;re on the list.
    </h1>
    <p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 16px 0;">
      Thanks for your interest in MambaHR. We received your inquiry for <strong>${escapeHtml(opts.company)}</strong> and we&rsquo;ll be in touch soon.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 24px 0;">
      MambaHR is the AI HR department — every function, every workflow, one human in the loop. If there&rsquo;s a fit for your team, we&rsquo;ll respond with next steps. No sales pitch, just a real conversation.
    </p>
    <div style="border-top:1px solid #e7e5e4;padding-top:24px;margin-top:24px;">
      <p style="font-size:13px;line-height:1.6;color:#78716c;margin:0;">
        In the meantime, take a look at what the agent does:<br/>
        <a href="https://mambahr.com" style="color:#B08D57;font-weight:600;text-decoration:none;">mambahr.com &rarr;</a>
      </p>
    </div>
    `,
  )

  if (!client) {
    console.log('[email:waitlist-welcome] sent successfully')
    return
  }
  try {
    await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
  } catch (err) {
    console.error('[email:waitlist-welcome] failed:', err)
  }
}

/* ════════════════════════════════════════════
   INVESTOR INQUIRY CONFIRMATION
   ════════════════════════════════════════════ */
export async function sendInvestorAck(opts: { email: string; name: string }) {
  const client = getClient()
  const subject = 'Thanks for reaching out — MambaHR'
  const html = emailShell(
    subject,
    `
    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0 0 16px 0;color:#1a1611;">
      Thanks, ${opts.name.split(' ')[0]}.
    </h1>
    <p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 16px 0;">
      We received your message and one of the founders will get back to you within 24 hours.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 24px 0;">
      In the meantime, our investor materials live at <a href="https://mambahr.com/investors" style="color:#B08D57;font-weight:600;text-decoration:none;">mambahr.com/investors</a>.
    </p>
    <div style="border-top:1px solid #e7e5e4;padding-top:24px;margin-top:24px;">
      <p style="font-size:13px;line-height:1.6;color:#78716c;margin:0;">
        Brian Bell (CEO) &amp; Sebastian Kirsch (CTO)<br/>
        MambaHR
      </p>
    </div>
    `,
  )

  if (!client) {
    console.log('[email:investor-ack] sent successfully')
    return
  }
  try {
    await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
  } catch (err) {
    console.error('[email:investor-ack] failed:', err)
  }
}

/* ════════════════════════════════════════════
   HR-BENCH NOTIFY CONFIRMATION
   ════════════════════════════════════════════ */
export async function sendHRBenchAck(opts: { email: string }) {
  const client = getClient()
  const subject = 'You\'re on the HR-Bench list'
  const html = emailShell(
    subject,
    `
    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0 0 16px 0;color:#1a1611;">
      You&rsquo;re on the list.
    </h1>
    <p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 16px 0;">
      We&rsquo;ll let you know the moment HR-Bench ships in Q2 2026 — including the full dataset, methodology, and benchmark results across leading AI models.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 24px 0;">
      HR-Bench is the first open benchmark for evaluating AI on HR decision-making. 500+ scenarios across federal and state regulations, validated by domain experts.
    </p>
    <div style="border-top:1px solid #e7e5e4;padding-top:24px;margin-top:24px;">
      <p style="font-size:13px;line-height:1.6;color:#78716c;margin:0;">
        Read more about our research:<br/>
        <a href="https://mambahr.com/research" style="color:#B08D57;font-weight:600;text-decoration:none;">mambahr.com/research &rarr;</a>
      </p>
    </div>
    `,
  )

  if (!client) {
    console.log('[email:hrbench-ack] sent successfully')
    return
  }
  try {
    await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
  } catch (err) {
    console.error('[email:hrbench-ack] failed:', err)
  }
}

/* ── Field-guide lead magnet: deliver the gated playbook link ── */
export async function sendFieldGuide(opts: { email: string; guideTitle: string; url: string }): Promise<void> {
  const client = getClient()
  const subject = `Your field guide: ${opts.guideTitle}`
  const html = emailShell(
    subject,
    `
    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0 0 16px 0;color:#1a1611;">
      Your field guide is ready.
    </h1>
    <p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 24px 0;">
      Here&rsquo;s <strong style="color:#1a1611;">${escapeHtml(opts.guideTitle)}</strong> — a practical, compliance-first walkthrough you can use the next time you have to make the hard calls.
    </p>
    <a href="${escapeHtml(opts.url)}" style="display:inline-block;background:#1a1611;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:999px;">
      Open the playbook &rarr;
    </a>
    <div style="border-top:1px solid #e7e5e4;padding-top:24px;margin-top:32px;">
      <p style="font-size:13px;line-height:1.6;color:#78716c;margin:0;">
        This link is just for you — please don&rsquo;t share it publicly. Questions? Just reply to this email.
      </p>
    </div>
    `,
  )

  if (!client) {
    console.log('[email:field-guide] (dev) →', opts.email, opts.url)
    return
  }
  try {
    await client.emails.send({ from: FROM_EMAIL, to: opts.email, subject, html })
  } catch (err) {
    console.error('[email:field-guide] failed:', err)
  }
}
