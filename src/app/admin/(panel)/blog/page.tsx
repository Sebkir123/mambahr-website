import { createSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { getBlogStatsResult } from '@/lib/blog-analytics'
import { readAdminRows } from '@/lib/admin-rows'
import { compact } from '@/lib/blog-analytics-types'
import { createDraft } from './actions'
import BlogTable, { type BlogRow } from './blog-table'
import Icon from '../_components/icon'
import DataNotice from '../_components/data-notice'
import SubmitButton from '../_components/submit-button'
import ui from '../admin-ui.module.css'
import styles from './blog.module.css'
export const dynamic = 'force-dynamic'
export default async function BlogListPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const query = await searchParams
  const initialStatus = query.status === 'draft' || query.status === 'published' || query.status === 'scheduled' ? query.status : 'all'
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const [result, analytics] = await Promise.all([
    readAdminRows<BlogRow>((from, to) => supabase.from('posts').select('id, title, slug, status, published_at, updated_at, tags').order('updated_at', { ascending: false }).order('id').range(from, to)),
    getBlogStatsResult(),
  ])
  if (result.error) throw new Error('Your posts could not be loaded. Please try again.')
  const posts = result.rows
  const totalReads = Array.from(analytics.stats.values()).reduce((total, stat) => total + stat.views, 0)
  return <>
    <div className={ui.header}><div><h1 className={ui.h1}>Blog</h1><p className={ui.subtitle}>Write, refine, and publish your next story.</p></div><form action={createDraft}><SubmitButton pendingLabel="Creating draft…"><Icon name="plus" size={15} />New post</SubmitButton></form></div>
    <div className={styles.summary}><span><strong>{posts.filter((post) => post.status === 'published').length}</strong> published</span><span><strong>{posts.filter((post) => post.status === 'draft').length}</strong> drafts</span><span><strong>{posts.filter((post) => post.status === 'scheduled').length}</strong> scheduled</span><span className={styles.summaryReads}><Icon name="book" size={14} /><strong>{analytics.warning ? 'Unavailable' : compact(totalReads)}</strong> all-time reads · bots excluded</span></div>
    <DataNotice warnings={[...(analytics.warning ? [analytics.warning] : []), ...(result.truncated ? ['Only the 10,000 most recently edited posts are shown.'] : [])]} />
    <BlogTable key={initialStatus} initialStatus={initialStatus} posts={posts} stats={Object.fromEntries(analytics.stats)} analyticsAvailable={!analytics.warning} />
  </>
}
