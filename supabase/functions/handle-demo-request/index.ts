// handle-demo-request — Book-a-demo form endpoint for the landing site (/demo).
//
// Flow: verify Cloudflare Turnstile (fail-CLOSED) → persist the lead to
// demo_requests → ping the founders' Slack channel so a human replies same-day
// → send the requester a confirmation email. Slack is the speed-to-lead surface.
//
// Conventions mirror handle-waitlist (getSecret env→vault fallback, CORS, size
// cap) but tighten security:
//   • Turnstile is REQUIRED — no `dev-mode-bypass` backdoor, and a missing
//     secret rejects rather than silently skipping verification.
//   • Stricter email validation + length caps on stored fields.
//   • Lead goes to its own demo_requests table (no waitlist DB-webhook), so the
//     Slack message is correctly labeled and fires exactly once.
//
// Secrets (Supabase Vault / function env — Mamba_landing project only):
//   CLOUDFARE_SECRET_KEY        Turnstile server secret (note vendor's spelling)
//   SLACK_WEBHOOK_URL           founders' leads channel incoming webhook
//   RESEND_API_KEY              transactional email (optional; skipped if unset)
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   injected automatically
//
// Deploy:
//   supabase functions deploy handle-demo-request --project-ref dqoqnlecylqlwsahudjn

import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Secret resolution: function env first, then Supabase Vault via the existing
// get_secret RPC (same pattern as handle-waitlist).
async function getSecret(name: string): Promise<string | null> {
  const envVal = Deno.env.get(name)
  if (envVal) return envVal
  const { data, error } = await supabase.rpc('get_secret', { p_name: name })
  if (error || !data) return null
  return data as string
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
function escapeSlack(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)

  // Parse with a hard size cap to bound abuse.
  let email: string, company: string, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 4096) return json({ error: 'Payload too large.' }, 413)
    const body = JSON.parse(raw)
    email = String(body.email ?? '').trim().toLowerCase().slice(0, 254)
    company = String(body.company ?? '').trim().slice(0, 200)
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  // RFC-ish email shape — stricter than a bare "@" check.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Valid work email required.' }, 400)
  }
  if (!turnstileToken) {
    return json({ error: 'Verification required. Refresh and try again.' }, 400)
  }

  // Turnstile — REQUIRED and fail-closed. If the secret isn't configured we
  // refuse rather than letting unverified submissions through (the gap in
  // handle-waitlist). No literal-token bypass exists.
  const cfSecret = await getSecret('CLOUDFARE_SECRET_KEY')
  if (!cfSecret) {
    console.error('[handle-demo-request] CLOUDFARE_SECRET_KEY not set — refusing')
    return json({ error: 'Verification is temporarily unavailable.' }, 503)
  }
  try {
    const form = new URLSearchParams()
    form.append('secret', cfSecret)
    form.append('response', turnstileToken)
    const ip = req.headers.get('cf-connecting-ip')
    if (ip) form.append('remoteip', ip)
    const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    })
    const ok = cfRes.ok && ((await cfRes.json()) as { success: boolean }).success === true
    if (!ok) return json({ error: 'Verification failed. Refresh and try again.' }, 403)
  } catch (e) {
    console.error('[handle-demo-request] turnstile error:', e)
    return json({ error: 'Verification failed. Refresh and try again.' }, 403)
  }

  // Persist the lead (service role bypasses RLS).
  const { error: dbError } = await supabase
    .from('demo_requests')
    .insert({ email, company, source: 'demo' })
  if (dbError) {
    console.error('[handle-demo-request] db error:', dbError.message)
    return json({ error: 'Something went wrong.' }, 500)
  }

  // Notify Slack + confirm by email. Both best-effort and non-blocking — a
  // delivery failure must not fail the request the user already completed.
  const [slackUrl, resendKey] = await Promise.all([
    getSecret('SLACK_WEBHOOK_URL'),
    getSecret('RESEND_API_KEY'),
  ])

  if (slackUrl) {
    fetch(slackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🎯 New demo request: ${escapeSlack(email)}`,
        blocks: [
          { type: 'header', text: { type: 'plain_text', text: '🎯 New demo request', emoji: true } },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Email:*\n${escapeSlack(email)}` },
              { type: 'mrkdwn', text: `*Company:*\n${escapeSlack(company) || '—'}` },
            ],
            accessory: {
              type: 'button',
              text: { type: 'plain_text', text: '✉️ Reply', emoji: true },
              url: `mailto:${email}`,
              action_id: 'email_demo_lead',
            },
          },
          { type: 'context', elements: [{ type: 'mrkdwn', text: 'Source: /demo · reply same-day from a founder address' }] },
        ],
      }),
    }).catch((e) => console.error('[handle-demo-request] slack error:', e))
  }

  if (resendKey) {
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'MambaHR <team@mambahr.com>',
        to: email,
        subject: 'Your MambaHR demo — we’ll be in touch today',
        html: `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fafaf7;margin:0;padding:48px 24px;"><div style="max-width:520px;margin:0 auto;"><p style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#1a1611;margin:0 0 32px;">MambaHR</p><div style="background:#fff;border:1px solid #e7e5e4;border-radius:16px;padding:40px 32px;"><h1 style="font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0 0 16px;color:#1a1611;">We got your demo request.</h1><p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 16px;">Thanks for your interest in MambaHR. A founder will reach out today &mdash; from a real address, not a no-reply &mdash; to set up 30 minutes for <strong>${escapeHtml(company || 'your team')}</strong>.</p><p style="font-size:15px;line-height:1.7;color:#57534e;margin:0 0 24px;">On the call we&rsquo;ll run the AI HR department on your scenarios and price it against your headcount &mdash; no deck, just the product.</p><div style="border-top:1px solid #e7e5e4;padding-top:24px;margin-top:24px;"><a href="https://mambahr.com" style="color:#B08D57;font-weight:600;text-decoration:none;font-size:13px;">mambahr.com &rarr;</a></div></div></div></body></html>`,
      }),
    }).catch((e) => console.error('[handle-demo-request] email error:', e))
  }

  return json({ ok: true }, 200)
})
