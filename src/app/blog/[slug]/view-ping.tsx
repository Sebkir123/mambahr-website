'use client'

import { useEffect } from 'react'

// Fire-and-forget first-party view counter. POSTs to a tiny API route that runs
// the SECURITY DEFINER increment_post_view RPC server-side — so public blog
// pages never load supabase-js (~240 KB) just to count a read. No PII, no
// cookies. Guarded per-slug per tab so a re-render / back-forward can't double
// count within a session.
export default function ViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `mamba_pv_${slug}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // private mode / storage disabled — still count once per mount
    }
    void fetch('/api/blog/view', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => {})
  }, [slug])

  return null
}
