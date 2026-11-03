'use client'
import { useFormStatus } from 'react-dom'
import ui from '../admin-ui.module.css'
export default function SubmitButton({ children, pendingLabel = 'Working…', className, disabled }: { children: React.ReactNode; pendingLabel?: string; className?: string; disabled?: boolean }) {
  const { pending } = useFormStatus()
  return <button type="submit" className={className ?? ui.btnPrimary} disabled={pending || disabled} aria-busy={pending}>{pending ? pendingLabel : children}</button>
}
