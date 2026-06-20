import { requireAdmin } from '@/lib/auth'
import { listAllResources, getResourceStats } from '@/lib/resources'
import ui from '../admin-ui.module.css'
import ResourcesManager from './manager'

export const dynamic = 'force-dynamic'

export default async function ResourcesPage() {
  const [, resources, stats] = await Promise.all([requireAdmin(), listAllResources(), getResourceStats()])

  // Flatten stats into a plain object keyed by slug for the client component.
  const statsBySlug: Record<string, { views: number; visitors: number; downloads: number }> = {}
  for (const [slug, s] of stats) statsBySlug[slug] = { views: s.views, visitors: s.visitors, downloads: s.downloads }

  const totalDownloads = Object.values(statsBySlug).reduce((n, s) => n + s.downloads, 0)

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Resources</h1>
          <p className={ui.subtitle}>
            Upload playbooks &amp; guides — they appear on the site and get a trackable share page
            {totalDownloads > 0 && ` · ${totalDownloads} download${totalDownloads === 1 ? '' : 's'} all-time`}
          </p>
        </div>
      </div>
      <ResourcesManager
        resources={resources.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          kicker: r.kicker,
          cover_no: r.cover_no,
          description: r.description,
          bullets: r.bullets,
          file_path: r.file_path,
          file_name: r.file_name,
          file_size: r.file_size,
          featured: r.featured,
          status: r.status,
          sort_order: r.sort_order,
        }))}
        stats={statsBySlug}
      />
    </>
  )
}
