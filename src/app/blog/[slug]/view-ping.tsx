'use client'

import { useEffect } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

// Fire-and-forget first-party view counter. Calls the SECURITY DEFINER RPC that
// only ever +1's a published post; no PII, no cookies. Guarded per-slug per tab
// so a re-render or back/forward doesn't double-count within a session.
export default function ViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `mamba_pv_${slug}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // private mode / storage disabled — still count once per mount
    }
    const supabase = createSupabaseBrowserClient()
    void supabase.rpc('increment_post_view', { p_slug: slug })
  }, [slug])

  return null
}
