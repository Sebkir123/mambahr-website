import Link from 'next/link'
import Icon from './_components/icon'
import ui from './admin-ui.module.css'
export default function AdminNotFound() { return <div className={ui.card}><div className={ui.empty}><span className={ui.emptyIcon}><Icon name="search" size={21} /></span><h3>We couldn’t find that item</h3><p>It may have been removed or the address may have changed.</p><Link href="/admin" className={ui.btnPrimary}>Back to overview</Link></div></div> }
