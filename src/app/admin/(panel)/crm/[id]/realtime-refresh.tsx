'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

// Keeps the contact detail page live: when anyone (you on another device, or a
// teammate) logs an activity, edits the contact, or changes a task, the page
// re-fetches so the timeline/tasks stay current without a manual reload.
export function RealtimeRefresh({ contactId }: { contactId: string }) {
  const router = useRouter()
  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    const channel = supabase
      .channel(`crm-detail-${contactId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_activities', filter: `contact_id=eq.${contactId}` }, () => router.refresh())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_tasks', filter: `contact_id=eq.${contactId}` }, () => router.refresh())
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'crm_contacts', filter: `id=eq.${contactId}` }, () => router.refresh())
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [contactId, router])
  return null
}
