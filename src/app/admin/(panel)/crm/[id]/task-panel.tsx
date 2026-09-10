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
  const [pending, start] = useTransition()

  function add() {
    if (!title.trim()) return
    const fd = new FormData()
    fd.set('contact_id', contactId)
    fd.set('title', title.trim())
    if (due) fd.set('due_date', due)
    start(async () => {
      await addTask(fd)
      setTitle('')
      setDue('')
      router.refresh()
    })
  }

  function toggle(t: Task) {
    const fd = new FormData()
    fd.set('id', t.id)
    fd.set('contact_id', contactId)
    fd.set('done', String(!t.done))
    start(async () => {
      await toggleTask(fd)
      router.refresh()
    })
  }

  function remove(t: Task) {
    const fd = new FormData()
    fd.set('id', t.id)
    fd.set('contact_id', contactId)
    start(async () => {
      await deleteTask(fd)
      router.refresh()
    })
  }

  // Captured once per mount: "overdue" is decided against the time the panel
  // opened, not re-evaluated on every render (Date.now() in render is impure).
  const [now] = useState(() => Date.now())
  return (
    <div>
      {tasks.length > 0 && (
        <ul className={styles.tasks}>
          {tasks.map((t) => {
            const overdue = !t.done && t.due_date && new Date(t.due_date).getTime() < now
            return (
              <li key={t.id} className={`${styles.task} ${t.done ? styles.taskDone : ''}`}>
                <button type="button" className={styles.taskBox} onClick={() => toggle(t)} aria-label={t.done ? 'Mark incomplete' : 'Mark complete'}>
                  {t.done ? '☑' : '☐'}
                </button>
                <span className={styles.taskTitle}>{t.title}</span>
                {t.due_date && (
                  <span className={`${styles.taskDue} ${overdue ? styles.taskDueOverdue : ''}`}>
                    {new Date(t.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
                <button type="button" className={styles.taskDel} onClick={() => remove(t)} aria-label="Delete task">✕</button>
              </li>
            )
          })}
        </ul>
      )}
      <div className={styles.compose}>
        <input
          className={styles.input}
          placeholder="New follow-up…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <input type="date" className={styles.input} style={{ width: 150 }} value={due} onChange={(e) => setDue(e.target.value)} />
        <button type="button" className={ui.btnGhost} onClick={add} disabled={pending || !title.trim()}>
          Add
        </button>
      </div>
    </div>
  )
}
