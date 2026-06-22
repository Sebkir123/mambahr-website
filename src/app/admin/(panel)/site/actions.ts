'use server'

import { requireAdmin } from '@/lib/auth'
import { getSiteSession, type SiteSessionDetail } from '@/lib/site-analytics'

// Lazy-load a single session's full detail (page-view trail, events, metadata)
// when its row is expanded, keeps the initial table query light.
export async function loadSiteSession(id: string): Promise<SiteSessionDetail | null> {
  await requireAdmin()
  if (!id) return null
  return getSiteSession(id)
}
