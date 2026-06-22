import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { env } from '@/lib/env'

export const dynamic = 'force-dynamic'

// AI post drafting for the social composer. Admin-gated. Calls Claude with a
// MambaHR brand-voice system prompt to draft a post from a topic, or rewrite the
// current text (improve / shorter / punchier). Returns plain text for the editor.
const SYSTEM = `You write LinkedIn posts for MambaHR, the AI HR department for US startups and growing companies.

Voice: confident, concrete, plain-spoken. No corporate filler, no hype words ("revolutionary", "game-changing"), no AI clichés. Founder-to-operator tone.

Rules:
- Open with a sharp hook in the FIRST line (it's all that shows before LinkedIn's "see more" fold).
- One idea per post. Short lines, generous line breaks, easy to skim on mobile.
- End with a light CTA or a question that invites replies.
- 0–3 relevant hashtags max, only if they add reach. No hashtag walls.
- No emojis unless one genuinely earns its place.
- US market. Never claim SOC 2 (MambaHR does not have it). Truthful claims only.
- Keep it under ~1,300 characters so it never truncates.

Output ONLY the post text, no preamble, no quotes, no "Here's your post:".`

function clamp(s: unknown, max: number): string {
  return typeof s === 'string' ? s.slice(0, max) : ''
}

export async function POST(req: NextRequest) {
  await requireAdmin()
  if (!env.anthropicKey) {
    return NextResponse.json({ error: 'AI drafting not configured, add ANTHROPIC_API_KEY.' }, { status: 503 })
  }

  let body: { mode?: string; topic?: string; current?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const mode = body.mode
  const topic = clamp(body.topic, 1000)
  const current = clamp(body.current, 4000)

  let user: string
  if (mode === 'draft') {
    if (!topic) return NextResponse.json({ error: 'Give a topic to draft from.' }, { status: 400 })
    user = `Write a LinkedIn post about:\n\n${topic}`
  } else if (mode === 'improve') {
    user = `Improve this LinkedIn post, sharper hook, tighter, more concrete, keeping the same intent and any links:\n\n${current}`
  } else if (mode === 'shorter') {
    user = `Make this LinkedIn post noticeably shorter and punchier without losing the point:\n\n${current}`
  } else if (mode === 'punchier') {
    user = `Rewrite this LinkedIn post to be punchier and more scroll-stopping, same message, stronger hook and rhythm:\n\n${current}`
  } else {
    return NextResponse.json({ error: 'Unknown mode.' }, { status: 400 })
  }
  if (mode !== 'draft' && !current.trim()) {
    return NextResponse.json({ error: 'Nothing to rewrite, write a draft first.' }, { status: 400 })
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        system: SYSTEM,
        messages: [{ role: 'user', content: user }],
      }),
    })
    if (!r.ok) {
      return NextResponse.json({ error: 'Draft failed, try again.' }, { status: 502 })
    }
    const data = (await r.json()) as { content?: { type: string; text?: string }[] }
    const text = (data.content?.find((c) => c.type === 'text')?.text ?? '').trim()
    if (!text) return NextResponse.json({ error: 'Empty draft, try again.' }, { status: 502 })
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ error: 'Draft failed, try again.' }, { status: 502 })
  }
}
