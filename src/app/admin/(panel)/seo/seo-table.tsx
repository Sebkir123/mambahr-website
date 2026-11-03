'use client'
import Link from 'next/link'
import { useDeferredValue, useMemo } from 'react'
import type { PostSeo } from '@/lib/admin-seo'
import { useListQuery } from '../_components/use-list-query'
import Pagination, { PAGE_SIZE } from '../_components/pagination'
import ui from '../admin-ui.module.css'
import styles from './seo.module.css'
export default function SeoTable({ posts }: { posts: PostSeo[] }) {
  const { query, status, sort, page, setQuery, setStatus, setSort, setPage, clear } = useListQuery(['all', 'description', 'noindex', 'cover'], ['health', 'title'])
  const needle = useDeferredValue(query.trim().toLowerCase())
  const filtered = useMemo(() => posts.filter(post => (status === 'all' || (status === 'description' ? !post.hasMetaDescription : status === 'noindex' ? post.noindex : !post.hasCover)) && `${post.title} ${post.slug}`.toLowerCase().includes(needle)).sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : ({ published: 0, scheduled: 1, draft: 2 }[a.status] - { published: 0, scheduled: 1, draft: 2 }[b.status]) || a.score - b.score), [posts, needle, status, sort])
  const current = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  return <div className={ui.card}>
    <div className={styles.cardHead}><div><h2 className={styles.cardTitle}>Content checks</h2><p className={styles.cardHint}>On-page completeness · indexing and rankings are not measured here.</p></div></div>
    <div className={ui.toolbar}>
      <label className={ui.search}><input type="search" aria-label="Search content checks" placeholder="Search posts…" value={query} onChange={e => setQuery(e.target.value)} /></label>
      <label className={styles.listFilter}>Check<select aria-label="Filter content checks" value={status} onChange={e => setStatus(e.target.value)}><option value="all">All posts</option><option value="description">Missing description</option><option value="noindex">Noindex</option><option value="cover">Missing cover</option></select></label>
      <label className={styles.listFilter}>Sort<select aria-label="Sort content checks" value={sort} onChange={e => setSort(e.target.value)}><option value="health">Needs attention first</option><option value="title">Title</option></select></label>
    </div>
    {!visible.length ? <div className={ui.empty}><h3>{posts.length ? 'No matching posts' : 'No posts to check'}</h3><p>{posts.length ? 'Try another search or check.' : 'Write your first post to see its content checks.'}</p>{posts.length > 0 && <button className={ui.btnGhost} onClick={clear}>Clear filters</button>}</div> : <div className={ui.tableWrap}><table className={ui.table}><thead><tr><th>Post</th><th>Status</th><th>Completeness</th><th>Checks</th></tr></thead><tbody>{visible.map(p => <PostRow key={p.id} p={p} />)}</tbody></table></div>}
    <Pagination total={filtered.length} page={current} onPage={setPage} label="posts" />
  </div>
}
function scoreClass(score: number): string {
  if (score >= 85) return styles.scoreGood
  if (score >= 60) return styles.scoreOk
  return styles.scoreBad
}

const STATUS_CLASS: Record<PostSeo['status'], string> = {
  published: ui.badgePublished,
  draft: ui.badgeDraft,
  scheduled: ui.badgeScheduled,
}

function PostRow({ p }: { p: PostSeo }) {
  return (
    <tr>
      <td>
        <Link href={`/admin/blog/${p.id}`} className={styles.postTitle}>{p.title}</Link>
        <span className={styles.postSlug}>/blog/{p.slug}</span>
      </td>
      <td>
        <span className={`${ui.badge} ${STATUS_CLASS[p.status]}`}>{p.status}</span>
        {p.noindex && <span className={styles.noindexTag}>noindex</span>}
      </td>
      <td>
        <span className={`${styles.score} ${scoreClass(p.score)}`}>{p.score}</span>
      </td>
      <td className={styles.issues}>
        {p.issues.length === 0 ? (
          <span className={styles.allGood}>All set</span>
        ) : (
          <ul className={styles.issueList}>
            {p.issues.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  )
}
