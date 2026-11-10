import 'server-only'
import { getLeadSlackWebhook } from '@/lib/secrets'

// Slack lead notifications. One premium Block Kit card for every inbound form
// (demo, waitlist, field-guide, resource) so the channel reads like a clean
// CRM feed instead of an emoji-prefixed text line. Best-effort: resolves the
// webhook from env/Vault and never throws back into the request handler, but
// every way it can fail is logged (never the webhook URL itself), and the
// result says whether Slack accepted the card. Callers must await it: an
// un-awaited fetch is dropped when the serverless function returns.

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export type LeadField = { label: string; value: string | null | undefined }

export async function notifyLeadSlack(opts: {
  title: string // e.g. "New demo request"
  fields: LeadField[] // rendered as two-column mrkdwn fields
  context?: string // small footer line, e.g. "Demo form · mambahr.com/demo"
}): Promise<boolean> {
  let webhook: Awaited<ReturnType<typeof getLeadSlackWebhook>>
  try {
    webhook = await getLeadSlackWebhook()
  } catch (err) {
    console.error(`[slack] "${opts.title}" not sent: could not read the webhook secret:`, err instanceof Error ? err.message : err)
    return false
  }
  if (!webhook) {
    console.error(`[slack] "${opts.title}" not sent: no webhook configured. Set SLACK_WEBHOOK_WAITLIST on the Vercel project (or SLACK_WEBHOOK_URL in Supabase Vault).`)
    return false
  }

  const fields = opts.fields
    .filter((f) => f.value && f.value.trim())
    .slice(0, 10) // Slack caps a section at 10 fields
    .map((f) => ({ type: 'mrkdwn' as const, text: `*${f.label}*\n${esc(f.value!.trim())}` }))

  const blocks: unknown[] = [
    { type: 'header', text: { type: 'plain_text', text: opts.title, emoji: true } },
  ]
  if (fields.length) blocks.push({ type: 'section', fields })
  if (opts.context) {
    blocks.push({ type: 'context', elements: [{ type: 'mrkdwn', text: opts.context }] })
  }

  // Plain-text fallback for notifications / no-block clients.
  const fallback = `${opts.title}, ${opts.fields.map((f) => f.value).filter(Boolean).join(' · ')}`

  try {
    const res = await fetch(webhook.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: fallback, blocks }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      // Slack answers with a short reason such as no_service (webhook revoked),
      // channel_is_archived or invalid_blocks. It never echoes the URL.
      const reason = (await res.text().catch(() => '')).slice(0, 200)
      console.error(`[slack] "${opts.title}" rejected via ${webhook.source}: HTTP ${res.status} ${reason}`)
      return false
    }
    return true
  } catch (err) {
    console.error(`[slack] "${opts.title}" failed via ${webhook.source}:`, err instanceof Error ? err.message : 'unknown error')
    return false
  }
}
