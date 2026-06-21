'use client'

import { useRef, useState } from 'react'
import { saveResource, createResourceUploadUrl, setResourceStatus, deleteResource } from './actions'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import ui from '../admin-ui.module.css'
import styles from './resources.module.css'

const MAX_PDF_BYTES = 50 * 1024 * 1024

const SITE = 'https://mambahr.com'

export type Row = {
  id: string
  slug: string
  title: string
  kicker: string
  cover_no: string | null
  description: string
  bullets: string[]
  file_path: string | null
  file_name: string | null
  file_size: number | null
  featured: boolean
  status: 'draft' | 'published'
  sort_order: number
}
type Stat = { views: number; visitors: number; downloads: number; topSource: string | null }

const BLANK: Row = {
  id: '', slug: '', title: '', kicker: 'Playbook', cover_no: '', description: '',
  bullets: [], file_path: null, file_name: null, file_size: null, featured: false, status: 'draft', sort_order: 0,
}

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

export default function ResourcesManager({ resources, stats }: { resources: Row[]; stats: Record<string, Stat> }) {
  const [editing, setEditing] = useState<Row | null>(null)
  const [open, setOpen] = useState(false)

  const startNew = () => { setEditing({ ...BLANK }); setOpen(true) }
  const startEdit = (r: Row) => { setEditing({ ...r }); setOpen(true) }

  return (
    <>
      <div className={styles.toolbar}>
        <button type="button" className={ui.btnPrimary} onClick={startNew}>+ New resource</button>
      </div>

      {open && editing && (
        <Editor row={editing} onClose={() => setOpen(false)} />
      )}

      <div className={ui.card}>
        {resources.length === 0 ? (
          <div className={ui.empty}>
            <h3>No resources yet</h3>
            <p>Upload your first playbook — it’ll appear on the site with a trackable share page.</p>
          </div>
        ) : (
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Views</th>
                <th style={{ textAlign: 'right' }}>Downloads</th>
                <th>Top source</th>
                <th>Share link</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => {
                const s = stats[r.slug]
                const url = `${SITE}/resources/${r.slug}`
                return (
                  <tr key={r.id}>
                    <td>
                      <button type="button" className={styles.titleBtn} onClick={() => startEdit(r)}>
                        {r.title || 'Untitled'}
                      </button>
                      {r.featured && <span className={styles.featuredTag}>Featured</span>}
                      <span className={styles.kicker}>{r.kicker}</span>
                    </td>
                    <td>
                      <span className={`${ui.badge} ${r.status === 'published' ? ui.badgePublished : ui.badgeDraft}`}>{r.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>{s?.views ? s.views : '—'}</td>
                    <td style={{ textAlign: 'right', fontWeight: s?.downloads ? 600 : 400 }}>{s?.downloads ? s.downloads : '—'}</td>
                    <td>{s?.topSource ? <span className={styles.source}>{s.topSource}</span> : '—'}</td>
                    <td><CopyLinks url={url} /></td>
                    <td className={styles.rowActions}>
                      <form action={setResourceStatus}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="status" value={r.status === 'published' ? 'draft' : 'published'} />
                        <button type="submit" className={styles.miniBtn} disabled={r.status === 'draft' && !r.file_path}>
                          {r.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                      </form>
                      <form action={deleteResource} onSubmit={(e) => { if (!confirm('Delete this resource and its file?')) e.preventDefault() }}>
                        <input type="hidden" name="id" value={r.id} />
                        <button type="submit" className={styles.miniDanger}>Delete</button>
                      </form>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

function CopyLinks({ url }: { url: string }) {
  const [copied, setCopied] = useState<'' | 'plain' | 'li'>('')
  const copy = async (u: string, which: 'plain' | 'li') => {
    try { await navigator.clipboard.writeText(u); setCopied(which); setTimeout(() => setCopied(''), 1500) } catch { /* ignore */ }
  }
  return (
    <div className={styles.copyRow}>
      <button type="button" className={styles.copyBtn} onClick={() => copy(url, 'plain')}>{copied === 'plain' ? 'Copied' : 'Copy link'}</button>
      <button type="button" className={styles.copyBtn} onClick={() => copy(`${url}?utm_source=linkedin`, 'li')}>{copied === 'li' ? 'Copied' : 'LinkedIn'}</button>
    </div>
  )
}

function Editor({ row, onClose }: { row: Row; onClose: () => void }) {
  const [title, setTitle] = useState(row.title)
  const [slug, setSlug] = useState(row.slug)
  const [slugTouched, setSlugTouched] = useState(Boolean(row.slug))
  const [kicker, setKicker] = useState(row.kicker)
  const [coverNo, setCoverNo] = useState(row.cover_no ?? '')
  const [description, setDescription] = useState(row.description)
  const [bullets, setBullets] = useState(row.bullets.join('\n'))
  const [featured, setFeatured] = useState(row.featured)
  const [status, setStatus] = useState<'draft' | 'published'>(row.status)
  const [filePath, setFilePath] = useState(row.file_path)
  const [fileName, setFileName] = useState(row.file_name)
  const [fileSize, setFileSize] = useState(row.file_size)
  const [uploading, setUploading] = useState(false)
  const [pending, setPending] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const effectiveSlug = slug || slugify(title)

  async function onPickFile(file: File) {
    if (file.type !== 'application/pdf') { setMsg({ ok: false, text: 'Upload a PDF.' }); return }
    if (file.size > MAX_PDF_BYTES) { setMsg({ ok: false, text: 'PDF must be under 50 MB.' }); return }
    setUploading(true); setMsg(null)
    try {
      // 1) mint a signed upload URL (tiny request — just metadata)
      const fd = new FormData()
      fd.set('name', file.name); fd.set('type', file.type); fd.set('size', String(file.size))
      const ticket = await createResourceUploadUrl(fd)
      if (!ticket.ok || !ticket.path || !ticket.token) { setMsg({ ok: false, text: ticket.message ?? 'Upload failed.' }); return }
      // 2) upload the bytes DIRECTLY to storage (bypasses Vercel's body limit)
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.storage.from('resources').uploadToSignedUrl(ticket.path, ticket.token, file, {
        contentType: 'application/pdf',
      })
      if (error) { setMsg({ ok: false, text: 'Upload failed — try again.' }); return }
      setFilePath(ticket.path); setFileName(ticket.name ?? file.name); setFileSize(file.size)
    } catch { setMsg({ ok: false, text: 'Upload failed.' }) }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = '' }
  }

  async function submit() {
    if (!title.trim()) { setMsg({ ok: false, text: 'Title is required.' }); return }
    if (status === 'published' && !filePath) { setMsg({ ok: false, text: 'Attach a PDF before publishing.' }); return }
    setPending(true); setMsg(null)
    const fd = new FormData()
    if (row.id) fd.set('id', row.id)
    fd.set('title', title); fd.set('slug', effectiveSlug); fd.set('kicker', kicker); fd.set('cover_no', coverNo)
    fd.set('description', description); fd.set('bullets', bullets)
    if (filePath) fd.set('file_path', filePath)
    if (fileName) fd.set('file_name', fileName)
    if (fileSize) fd.set('file_size', String(fileSize))
    fd.set('featured', featured ? 'true' : 'false')
    fd.set('status', status)
    try {
      const res = await saveResource(fd)
      setMsg({ ok: res.ok, text: res.message })
      if (res.ok) setTimeout(onClose, 600)
    } catch { setMsg({ ok: false, text: 'Something went wrong.' }) }
    finally { setPending(false) }
  }

  return (
    <div className={ui.card}>
      <div className={styles.editorHead}>
        <h2 className={styles.editorTitle}>{row.id ? 'Edit resource' : 'New resource'}</h2>
        <button type="button" className={styles.miniBtn} onClick={onClose}>Close</button>
      </div>
      <div className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Title</span>
          <input className={styles.input} value={title} onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)) }} placeholder="The Defensible Layoff Playbook" />
        </label>
        <div className={styles.row2}>
          <label className={styles.field}>
            <span className={styles.label}>Slug</span>
            <input className={styles.input} value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true) }} placeholder="defensible-layoff-playbook" />
            <span className={styles.hint}>/resources/{effectiveSlug || '…'}</span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Kicker</span>
            <input className={styles.input} value={kicker} onChange={(e) => setKicker(e.target.value)} placeholder="Playbook" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Cover №</span>
            <input className={styles.input} value={coverNo} onChange={(e) => setCoverNo(e.target.value)} placeholder="02" />
          </label>
        </div>
        <label className={styles.field}>
          <span className={styles.label}>Description</span>
          <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="One or two sentences on what's inside." />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Key points <span className={styles.hint}>(one per line, max 8)</span></span>
          <textarea className={styles.textarea} value={bullets} onChange={(e) => setBullets(e.target.value)} rows={4} placeholder={'State-by-state notice rules\nWARN Act thresholds\nManager + employee scripts'} />
        </label>

        <div className={styles.field}>
          <span className={styles.label}>PDF</span>
          <input ref={fileRef} type="file" accept="application/pdf" hidden onChange={(e) => e.target.files?.[0] && onPickFile(e.target.files[0])} />
          <div className={styles.fileRow}>
            <button type="button" className={styles.miniBtn} onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? 'Uploading…' : filePath ? 'Replace PDF' : 'Upload PDF'}
            </button>
            {fileName ? <span className={styles.fileName}>{fileName}{fileSize ? ` · ${(fileSize / 1024 / 1024).toFixed(1)} MB` : ''}</span> : <span className={styles.hint}>Required to publish</span>}
          </div>
        </div>

        <div className={styles.row2}>
          <label className={styles.checkField}>
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            <span>Featured (listed first on the site)</span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Status</span>
            <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        {msg && <div className={msg.ok ? styles.okMsg : styles.errMsg}>{msg.text}</div>}
        <div className={styles.actions}>
          <button type="button" className={ui.btnGhost} onClick={onClose}>Cancel</button>
          <button type="button" className={ui.btnPrimary} onClick={submit} disabled={pending || uploading}>
            {pending ? 'Saving…' : row.id ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
