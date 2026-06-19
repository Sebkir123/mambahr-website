'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { moveStage } from './actions'
import ui from '../admin-ui.module.css'
import { formatMoney, type Contact, type ContactKind } from '@/lib/crm-types'
import styles from './crm.module.css'

type Stage = { key: string; label: string }

// Real-time pipeline board. Cards drag between stage columns (HTML5 DnD →
// moveStage server action). A Supabase Realtime postgres_changes subscription
// keeps every viewer's board in sync: when anyone moves/edits/adds a contact,
// the others' boards refresh automatically.
export default function CrmBoard({
  kind,
  stages,
  contacts,
}: {
  kind: ContactKind
  stages: Stage[]
  contacts: Contact[]
}) {
  const router = useRouter()
  const [items, setItems] = useState<Contact[]>(contacts)
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<string | null>(null)
  // Optimistic stage overrides {id → stage}. Survive a server/realtime refresh
  // until the server props actually reflect the move, so a card never flickers
  // back to its old column mid-flight.
  const pending = useRef<Map<string, string>>(new Map())

  // Re-sync from the server, but keep any optimistic move the server hasn't
  // confirmed yet; drop overrides once props catch up.
  useEffect(() => {
    for (const [id, stage] of pending.current) {
      const c = contacts.find((x) => x.id === id)
      if (c && c.stage === stage) pending.current.delete(id)
    }
    setItems(contacts.map((c) => (pending.current.has(c.id) ? { ...c, stage: pending.current.get(c.id)! } : c)))
  }, [contacts])

  // Live collaboration: refresh when any contact of this kind changes elsewhere.
  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    const channel = supabase
      .channel(`crm-board-${kind}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_contacts' }, () => {
        router.refresh()
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [kind, router])

  async function drop(stage: string) {
    const id = dragId
    setOverCol(null)
    setDragId(null)
    if (!id) return
    const card = items.find((c) => c.id === id)
    if (!card || card.stage === stage) return
    pending.current.set(id, stage)
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, stage } : c)))
    const fd = new FormData()
    fd.set('id', id)
    fd.set('stage', stage)
    await moveStage(fd)
    router.refresh()
  }

  if (items.length === 0) {
    return (
      <div className={ui.card}>
        <div className={ui.empty}>
          <h3>No {kind === 'investor' ? 'investors' : 'customers'} yet</h3>
          <p>
            Add one manually, or <strong>Import leads</strong> above to pull in your existing{' '}
            {kind === 'investor' ? 'deck recipients' : 'waitlist, demo & field-guide signups'}.
          </p>
          <Link href={`/admin/crm/new?kind=${kind}`} className={ui.btnPrimary}>+ Add {kind}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.board} ${dragId ? styles.boardDragging : ''}`}>
      {stages.map((st) => {
        const inStage = items.filter((c) => c.stage === st.key)
        const value = inStage.reduce((s, c) => s + (c.value ?? 0), 0)
        return (
          <div
            key={st.key}
            className={overCol === st.key ? styles.columnOver : styles.column}
            onDragOver={(e) => {
              e.preventDefault()
              if (overCol !== st.key) setOverCol(st.key)
            }}
            onDragLeave={(e) => {
              // Only clear when leaving the column entirely.
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverCol(null)
            }}
            onDrop={() => drop(st.key)}
          >
            <div className={styles.columnHead}>
              <span className={styles.columnTitle}>{st.label}</span>
              {value > 0 && <span className={styles.columnValue}>{formatMoney(value)}</span>}
              <span className={styles.columnCount}>{inStage.length}</span>
            </div>
            {inStage.length === 0 ? (
              <div className={`${styles.columnEmpty} ${overCol === st.key ? styles.columnEmptyOver : ''}`}>
                {overCol === st.key ? 'Drop here' : ''}
              </div>
            ) : (
              <div className={styles.columnCards}>
                {inStage.map((c) => (
                  <BoardCard key={c.id} contact={c} dragging={dragId === c.id} onDragStart={() => setDragId(c.id)} onDragEnd={() => setDragId(null)} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function BoardCard({
  contact: c,
  dragging,
  onDragStart,
  onDragEnd,
}: {
  contact: Contact
  dragging: boolean
  onDragStart: () => void
  onDragEnd: () => void
}) {
  const router = useRouter()
  // A draggable DIV (not an <a>): anchors get native browser link-dragging,
  // which produces the URL ghost / janky drag visuals. A div drags as a clean
  // element snapshot; we navigate on click instead, suppressed right after a drag.
  const dragged = useRef(false)
  const go = () => {
    if (!dragged.current) router.push(`/admin/crm/${c.id}`)
  }
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${c.name} — open`}
      draggable
      onDragStart={(e) => {
        dragged.current = true
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', c.id)
        onDragStart()
      }}
      onDragEnd={() => {
        onDragEnd()
        // Keep the flag briefly so the trailing click after a drop doesn't navigate.
        setTimeout(() => (dragged.current = false), 60)
      }}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          router.push(`/admin/crm/${c.id}`)
        }
      }}
      className={`${styles.kcard} ${dragging ? styles.kcardDragging : ''}`}
    >
      <div className={styles.kcardTop}>
        <div>
          <div className={styles.kcardName}>{c.name}</div>
          {c.company && <div className={styles.kcardCompany}>{c.company}</div>}
        </div>
        {c.priority === 'high' && <span className={styles.dot} title="High priority" />}
      </div>
      {(c.value != null || c.source) && (
        <div className={styles.kcardFoot}>
          <span className={styles.kcardValue}>{c.value != null ? formatMoney(c.value) : ''}</span>
          {c.source && <span className={`${styles.pill} ${styles.pillSource}`}>{c.source.replace(/_/g, ' ')}</span>}
        </div>
      )}
    </div>
  )
}
