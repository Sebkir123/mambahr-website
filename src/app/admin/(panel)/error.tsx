'use client'
import Link from 'next/link'
import Icon from './_components/icon'
import ui from './admin-ui.module.css'
export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className={ui.card}><div className={ui.empty} role="alert"><span className={ui.emptyIcon}><Icon name="refresh" size={21} /></span><h3>This page couldn’t load</h3><p>Your data hasn’t been changed. Try again, or return to the overview.</p><div className={ui.actions}><button type="button" onClick={reset} className={ui.btnPrimary}>Try again</button><Link href="/admin" className={ui.btnGhost}>Overview</Link></div></div></div>
}
