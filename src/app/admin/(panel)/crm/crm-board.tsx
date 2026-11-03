'use client'
import { useEffect, useOptimistic, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { formatMoney, type Contact, type ContactKind } from '@/lib/crm-types'
import { moveStage } from './actions'
import Icon from '../_components/icon'
import ui from '../admin-ui.module.css'
import styles from './crm.module.css'
type Stage = { key: string; label: string }
export default function CrmBoard({ kind, stages, contacts }: { kind: ContactKind; stages: Stage[]; contacts: Contact[] }) {
  const router = useRouter()
  const [items, optimisticMove] = useOptimistic(contacts, (current, move: { id: string; stage: string }) => current.map((contact) => contact.id === move.id ? { ...contact, stage: move.stage } : contact))
  const [pending, start] = useTransition()
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    const channel = supabase.channel(`crm-board-${kind}`).on('postgres_changes', { event: '*', schema: 'public', table: 'crm_contacts', filter: `kind=eq.${kind}` }, () => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => router.refresh(), 400)
    }).subscribe()
    return () => { if (timer.current) clearTimeout(timer.current); void supabase.removeChannel(channel) }
  }, [kind, router])
  function move(id: string, stage: string) {
    if (pending || items.find((contact) => contact.id === id)?.stage === stage) return
    setError(''); setMessage(''); setOverCol(null); setDragId(null)
    start(async () => {
      optimisticMove({ id, stage })
      const data = new FormData(); data.set('id', id); data.set('stage', stage)
      try {
        const result = await moveStage(data)
        if (!result.ok) { setError(result.message); return }
        setMessage(result.message); router.refresh()
      } catch { setError('The stage could not be saved. Your change was rolled back. Try again.') }
    })
  }
  const needle = query.trim().toLowerCase()
  const filtered = items.filter((contact) => !needle || [contact.name, contact.company, contact.email].some((value) => value?.toLowerCase().includes(needle)))
  return <>
    <div className={styles.boardTools}><label className={ui.search}><Icon name="search" size={15} /><input type="search" aria-label="Search pipeline" placeholder="Search this pipeline…" value={query} onChange={(e) => setQuery(e.target.value)} /></label><span className={styles.boardHint}>{pending ? 'Saving move…' : 'Drag a card or choose its stage'}</span></div>
    {error && <div role="alert" className={ui.error}>{error}</div>}<span className={styles.srOnly} role="status" aria-live="polite">{message}</span>
    {!contacts.length ? <div className={ui.card}><div className={ui.empty}><span className={ui.emptyIcon}><Icon name={kind === 'investor' ? 'people' : 'briefcase'} size={21} /></span><h3>Your {kind} pipeline starts here</h3><p>{kind === 'customer' ? 'Add a contact, or import your existing website leads using the button above.' : 'Add an investor to track the conversation and next step.'}</p><Link href={`/admin/crm/new?kind=${kind}`} className={ui.btnPrimary}><Icon name="plus" size={15} />Add {kind}</Link></div></div> : !filtered.length ? <div className={ui.card}><div className={ui.empty}><h3>No matching contacts</h3><p>Try another name, email, or company.</p><button type="button" className={ui.btnGhost} onClick={() => setQuery('')}>Clear search</button></div></div> :
      <div className={styles.board} aria-label={`${kind} pipeline`} aria-busy={pending}>{stages.map((stage) => {
        const cards = filtered.filter((contact) => contact.stage === stage.key)
        const value = cards.reduce((sum, contact) => sum + (contact.value ?? 0), 0)
        return <section key={stage.key} className={overCol === stage.key ? styles.columnOver : styles.column} aria-label={`${stage.label}: ${cards.length} contacts`} onDragOver={(e) => { e.preventDefault(); if (!pending) setOverCol(stage.key) }} onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverCol(null) }} onDrop={(e) => { e.preventDefault(); const id = dragId; if (id) move(id, stage.key) }}>
          <div className={styles.columnHead}><span className={styles.columnTitle}>{stage.label}</span><span className={styles.columnCount}>{cards.length}</span></div><span className={styles.columnValue}>{value ? formatMoney(value) : 'No value set'}</span>
          <div className={styles.columnCards}>{cards.map((contact) => <article key={contact.id} draggable={!pending} onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', contact.id); setDragId(contact.id) }} onDragEnd={() => { setDragId(null); setOverCol(null) }} className={`${styles.kcard} ${dragId === contact.id ? styles.kcardDragging : ''}`}>
            <div className={styles.kcardTop}><div><Link draggable={false} href={`/admin/crm/${contact.id}`} className={styles.kcardName}>{contact.name}</Link>{contact.company && <div className={styles.kcardCompany}>{contact.company}</div>}</div>{contact.priority === 'high' && <span className={styles.priority}>High</span>}</div>
            <div className={styles.kcardFoot}><span className={styles.kcardValue}>{contact.value != null ? formatMoney(contact.value) : '—'}</span>{contact.owner && <span className={styles.ownerAvatar} title={contact.owner}>{contact.owner.charAt(0).toUpperCase()}</span>}</div>
            <select aria-label={`Move ${contact.name} to stage`} value={contact.stage} disabled={pending} className={styles.stageSelect} onChange={(e) => move(contact.id, e.target.value)}>{stages.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}</select>
          </article>)}{!cards.length && <div className={styles.columnEmpty}>{overCol === stage.key ? 'Drop here' : 'No contacts'}</div>}</div>
        </section>
      })}</div>}
  </>
}
