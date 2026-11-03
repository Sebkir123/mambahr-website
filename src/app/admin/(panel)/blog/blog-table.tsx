'use client'
import { useDeferredValue, useMemo, useState } from 'react'
import Link from 'next/link'
import type { PostStatus } from '@/lib/blog-types'
import { compact, formatReadTime, type BlogStat } from '@/lib/blog-analytics-types'
import Icon from '../_components/icon'
import Pagination, { PAGE_SIZE } from '../_components/pagination'
import ui from '../admin-ui.module.css'
import styles from './blog.module.css'
export type BlogRow = { id: string; title: string; slug: string; status: PostStatus; published_at: string | null; updated_at: string; tags: string[] }
const statuses = ['all', 'published', 'draft', 'scheduled'] as const
const statusClass = { published: ui.badgePublished, draft: ui.badgeDraft, scheduled: ui.badgeScheduled }
export default function BlogTable({ posts, stats, analyticsAvailable, initialStatus = 'all' }: { initialStatus?: typeof statuses[number]; posts: BlogRow[]; stats: Record<string, BlogStat>; analyticsAvailable: boolean }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<typeof statuses[number]>(initialStatus)
  const [sort, setSort] = useState('updated')
  const [page, setPage] = useState(1)
  const needle = useDeferredValue(query.trim().toLowerCase())
  const filtered = useMemo(() => posts.filter((post) => (status === 'all' || post.status === status) && (!needle || [post.title, post.slug, ...(post.tags ?? [])].some((value) => value.toLowerCase().includes(needle)))).sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : sort === 'reads' ? (stats[b.slug]?.views ?? 0) - (stats[a.slug]?.views ?? 0) : b.updated_at.localeCompare(a.updated_at)), [posts, stats, status, needle, sort])
  const current = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  return <div className={ui.card}>
    <div className={ui.toolbar}><div className={ui.tabs} aria-label="Filter posts by status">{statuses.map((value) => <button type="button" key={value} aria-pressed={status === value} className={status === value ? ui.tabActive : ui.tab} onClick={() => { setStatus(value); setPage(1) }}>{value === 'all' ? 'All posts' : value[0].toUpperCase() + value.slice(1)}<span className={ui.count}>{value === 'all' ? posts.length : posts.filter((post) => post.status === value).length}</span></button>)}</div><label className={ui.search}><Icon name="search" size={15} /><input type="search" aria-label="Search posts" placeholder="Search posts or tags…" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} /></label></div>
    <div className={styles.sortBar}><span>{status === 'all' ? 'Your posts' : `${status[0].toUpperCase() + status.slice(1)} posts`}</span><label>Sort by <select aria-label="Sort posts" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1) }}><option value="updated">Recently edited</option><option value="title">Title</option><option value="reads">Most read</option></select></label></div>
    {!rows.length ? <div className={ui.empty}><span className={ui.emptyIcon}><Icon name="file" size={21} /></span><h3>{posts.length ? 'No matching posts' : 'Start with a story'}</h3><p>{posts.length ? 'Try another search or status filter.' : 'Use New post to write, save a draft, and publish when you’re ready.'}</p>{posts.length > 0 && <button className={ui.btnGhost} onClick={() => { setQuery(''); setStatus('all'); setPage(1) }}>Clear filters</button>}</div> : <div className={ui.tableWrap}><table className={`${ui.table} ${styles.table}`}><thead><tr><th scope="col">Article</th><th scope="col">Status</th><th scope="col" className={styles.numeric}>Reads</th><th scope="col" className={styles.numeric}>Readers</th><th scope="col">Last edited</th><th scope="col"><span className={styles.srOnly}>Open editor</span></th></tr></thead><tbody>{rows.map((post) => <tr key={post.id}><td><Link href={`/admin/blog/${post.id}`} className={ui.rowLink}>{post.title || 'Untitled post'}</Link><div className={styles.articleMeta}><span>/blog/{post.slug}</span>{analyticsAvailable && (stats[post.slug]?.views ?? 0) > 0 && <span>· {formatReadTime(stats[post.slug].avgReadMs)} average read</span>}</div></td><td><span className={`${ui.badge} ${statusClass[post.status]}`}>{post.status}</span></td><td className={styles.numeric}>{analyticsAvailable ? compact(stats[post.slug]?.views ?? 0) : 'Unavailable'}</td><td className={styles.numeric}>{analyticsAvailable ? compact(stats[post.slug]?.readers ?? 0) : '—'}</td><td className={styles.date}>{new Date(post.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td><td><Link href={`/admin/blog/${post.id}`} className={styles.editLink} aria-label={`Edit ${post.title || 'untitled post'}`}><Icon name="chevron" size={14} /></Link></td></tr>)}</tbody></table></div>}
    <Pagination total={filtered.length} page={current} onPage={setPage} label="posts" />
  </div>
}
