import 'server-only'
import { getLeadSlackWebhook } from '@/lib/secrets'

// Slack lead notifications. One premium Block Kit card for every inbound form
// (demo, waitlist, field-guide, resource) so the channel reads like a clean
// CRM feed instead of an emoji-prefixed text line. Best-effort: resolves the
// webhook from env/Vault and never throws back into the request handler.

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export type LeadField = { label: string; value: string | null | undefined }

export async function notifyLeadSlack(opts: {
  title: string // e.g. "New demo request"
  fields: LeadField[] // rendered as two-column mrkdwn fields
  context?: string // small footer line, e.g. "Demo form · mambahr.com/demo"
}): Promise<void> {
  const webhook = await getLeadSlackWebhook()
  if (!webhook) return

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
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: fallback, blocks }),
    })
  } catch {
    /* best-effort */
  }
}
