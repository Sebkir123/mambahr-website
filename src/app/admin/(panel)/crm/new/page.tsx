import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { STAGES, type ContactKind } from '@/lib/crm'
import { NewContactForm } from './new-contact-form'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

export const dynamic = 'force-dynamic'

export default async function NewContactPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  await requireAdmin()
  const { kind: kindParam } = await searchParams
  const kind: ContactKind = kindParam === 'investor' ? 'investor' : 'customer'

  return (
    <>
      <div className={ui.header}>
        <div>
          <Link href={`/admin/crm?kind=${kind}`} className={styles.backLink}>← Pipeline</Link>
          <h1 className={ui.h1}>Add {kind}</h1>
          <p className={ui.subtitle}>A new {kind} in the pipeline</p>
        </div>
      </div>
      <div className={styles.panel} style={{ maxWidth: 760 }}>
        <NewContactForm kind={kind} stages={STAGES[kind]} />
      </div>
    </>
  )
}
