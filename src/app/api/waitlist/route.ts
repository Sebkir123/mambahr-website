import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendWaitlistWelcome } from '@/lib/email'

async function notifySlack(text: string) {
  const url = process.env.SLACK_WEBHOOK_WAITLIST
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  } catch {
    // best-effort
  }
}

export async function POST(req: NextRequest) {
  let email: string, company: string
  try {
    const body = await req.json()
    email = String(body.email ?? '').trim()
    company = String(body.company ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid work email required.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, company })

  if (error && error.code !== '23505') {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  if (!error) {
    await Promise.all([
      notifySlack(`New waitlist signup:\n• *Email:* ${email}\n• *Company:* ${company || '(not provided)'}`),
      sendWaitlistWelcome({ email, company }),
    ])
  }

  return NextResponse.json({ success: true })
}
