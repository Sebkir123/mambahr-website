'use client'

import { useState, useRef } from 'react'
import styles from './confirm-button.module.css'

// Inline two-step confirm, replaces window.confirm() across all destructive
// admin actions. First click arms the button (shows Cancel + Confirm); second
// click fires the action. Auto-disarms after 4s if ignored.
export function ConfirmButton({
  onConfirm,
  confirmLabel = 'Delete',
  disabled = false,
  pending = false,
  pendingLabel = 'Deleting…',
  className,
  children,
}: {
  onConfirm: () => void
  confirmLabel?: string
  disabled?: boolean
  pending?: boolean
  pendingLabel?: string
  className?: string
  children: React.ReactNode
}) {
  const [armed, setArmed] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function arm() {
    setArmed(true)
    timer.current = setTimeout(() => setArmed(false), 4000)
  }

  function disarm() {
    if (timer.current) clearTimeout(timer.current)
    setArmed(false)
  }

  function fire() {
    disarm()
    onConfirm()
  }

  if (pending) {
    return (
      <button type="button" className={className} disabled>
        {pendingLabel}
      </button>
    )
  }

  if (armed) {
    return (
      <span className={styles.armed}>
        <button type="button" className={styles.cancel} onClick={disarm}>Cancel</button>
        <button type="button" className={styles.confirm} onClick={fire}>{confirmLabel}</button>
      </span>
    )
  }

  return (
    <button type="button" className={className} disabled={disabled} onClick={arm}>
      {children}
    </button>
  )
}
