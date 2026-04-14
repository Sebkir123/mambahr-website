'use server'

import { z } from 'zod'
import { supabase } from './supabase'
import { verifyTurnstile } from './turnstile'
import { sendWaitlistWelcome, sendInvestorAck, sendHRBenchAck } from './email'

async function notifySlack(webhookEnvKey: string, text: string) {
  const url = process.env[webhookEnvKey]
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  } catch {
    // Slack notification is best-effort — don't block the user
  }
}

const waitlistSchema = z.object({
  email: z.string().email().max(320),
  company: z.string().min(1).max(200),
  size: z.enum(['', '50-200', '200-500', '500+']).default(''),
})

export async function submitWaitlist(formData: FormData) {
  // Verify Turnstile token first
  const token = formData.get('cf-turnstile-response') as string | null
  const verified = await verifyTurnstile(token)
  if (!verified) {
    return { success: false, error: 'Bot verification failed. Please try again.' }
  }

  const parsed = waitlistSchema.safeParse({
    email: formData.get('email'),
    company: formData.get('company'),
    size: formData.get('size') ?? '',
  })

  if (!parsed.success) {
    return { success: false, error: 'Invalid input.' }
  }

  const { email, company } = parsed.data

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, company })

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'This email is already on the waitlist.' }
    }
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  await Promise.all([
    notifySlack(
      'SLACK_WEBHOOK_WAITLIST',
      `New waitlist signup:\n• *Email:* ${email}\n• *Company:* ${company}`,
    ),
    sendWaitlistWelcome({ email, company }),
  ])

  return { success: true }
}

const investorSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  firm: z.string().max(200).default(''),
  message: z.string().max(2000).default(''),
})

export async function submitInvestorContact(formData: FormData) {
  const token = formData.get('cf-turnstile-response') as string | null
  const verified = await verifyTurnstile(token)
  if (!verified) {
    return { success: false, error: 'Bot verification failed. Please try again.' }
  }

  const parsed = investorSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    firm: formData.get('firm') ?? '',
    message: formData.get('message') ?? '',
  })

  if (!parsed.success) {
    return { success: false, error: 'Invalid input.' }
  }

  const { name, email, firm, message } = parsed.data

  const { error } = await supabase
    .from('contact_leads')
    .insert({
      name,
      email,
      company: firm,
      company_size: '',
      message: message || null,
    })

  if (error) {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  await Promise.all([
    notifySlack(
      'SLACK_WEBHOOK_INVESTORS',
      `New investor inquiry:\n• *Name:* ${name}\n• *Email:* ${email}\n• *Firm:* ${firm || 'Not provided'}\n• *Message:* ${message || 'None'}`,
    ),
    sendInvestorAck({ email, name }),
  ])

  return { success: true }
}

const hrbenchSchema = z.object({
  email: z.string().email().max(320),
})

export async function submitHRBenchNotify(formData: FormData) {
  const token = formData.get('cf-turnstile-response') as string | null
  const verified = await verifyTurnstile(token)
  if (!verified) {
    return { success: false, error: 'Bot verification failed.' }
  }

  const parsed = hrbenchSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success) return { success: false, error: 'Invalid email.' }

  const { email } = parsed.data

  const { error } = await supabase
    .from('hrbench_notify')
    .insert({ email })

  if (error) {
    if (error.code === '23505') {
      return { success: true } // Already subscribed — treat as success silently
    }
    // Fall back to console.log if table doesn't exist
    console.log('HR-Bench notify:', email)
  }

  await Promise.all([
    notifySlack(
      'SLACK_WEBHOOK_WAITLIST',
      `New HR-Bench notification signup:\n• *Email:* ${email}`,
    ),
    sendHRBenchAck({ email }),
  ])

  return { success: true }
}
