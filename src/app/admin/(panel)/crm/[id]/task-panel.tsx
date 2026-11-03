'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addTask, toggleTask, deleteTask } from '../actions'
import type { Task } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

export function TaskPanel({ contactId, tasks }: { contactId: string; tasks: Task[] }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [due, setDue] = useState('')
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  function add() {
    if (pending || !title.trim()) return
    const fd = new FormData()
    fd.set('contact_id', contactId)
    fd.set('title', title.trim())
    if (due) fd.set('due_date', due)
    start(async () => {
      setError('')
      try {
        const result = await addTask(fd)
        if (!result.ok) { setError(result.message); return }
        setTitle(''); setDue(''); router.refresh()
      } catch { setError('Your follow-up could not be added. Try again.') }
    })
  }

  function toggle(t: Task) {
    const fd = new FormData()
    fd.set('id', t.id)
    fd.set('contact_id', contactId)
    fd.set('done', String(!t.done))
    start(async () => {
      setError('')
      try { const result = await toggleTask(fd); if (!result.ok) { setError(result.message); return }; router.refresh() } catch { setError('The task could not be updated. Try again.') }
    })
  }

  function remove(t: Task) {
    const fd = new FormData()
    fd.set('id', t.id)
    fd.set('contact_id', contactId)
    start(async () => {
      setError('')
      try { const result = await deleteTask(fd); if (!result.ok) { setError(result.message); return }; router.refresh() } catch { setError('The task could not be deleted. Try again.') }
    })
  }

  // Captured once per mount: "overdue" is decided against the time the panel
  // opened, not re-evaluated on every render (Date.now() in render is impure).
  const [now] = useState(() => Date.now())
  return (
    <div>
      {error && <p role="alert" className={ui.error}>{error}</p>}
      {tasks.length === 0 && <p className={styles.muted}>Add a follow-up so the next step stays in view.</p>}
      {tasks.length > 0 && (
        <ul className={styles.tasks}>
          {tasks.map((t) => {
            const overdue = !t.done && t.due_date && new Date(`${t.due_date}T23:59:59`).getTime() < now
            return (
              <li key={t.id} className={`${styles.task} ${t.done ? styles.taskDone : ''}`}>
                <button type="button" className={styles.taskBox} disabled={pending} onClick={() => toggle(t)} aria-label={t.done ? 'Mark incomplete' : 'Mark complete'}>
                  {t.done ? '☑' : '☐'}
                </button>
                <span className={styles.taskTitle}>{t.title}</span>
                {t.due_date && (
                  <span className={`${styles.taskDue} ${overdue ? styles.taskDueOverdue : ''}`}>
                    {new Date(t.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
                <button type="button" className={styles.taskDel} disabled={pending} onClick={() => remove(t)} aria-label="Delete task">✕</button>
              </li>
            )
          })}
        </ul>
      )}
      <div className={styles.compose}>
        <input
          className={styles.input}
          aria-label="Follow-up title"
          placeholder="New follow-up…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <input aria-label="Follow-up due date" type="date" className={styles.input} style={{ width: 150 }} value={due} onChange={(e) => setDue(e.target.value)} />
        <button type="button" className={ui.btnGhost} onClick={add} disabled={pending || !title.trim()}>
          Add
        </button>
      </div>
    </div>
  )
}
