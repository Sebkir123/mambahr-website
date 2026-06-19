import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getContactsByKind } from '@/lib/crm'
import { ContactsTable } from './contacts-table'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

export const dynamic = 'force-dynamic'

export default async function ContactsListPage() {
  const [, cust, inv] = await Promise.all([
    requireAdmin(),
    getContactsByKind('customer'),
    getContactsByKind('investor'),
  ])
  const contacts = [...cust.contacts, ...inv.contacts].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  )
  const warnings = [...cust.warnings, ...inv.warnings]

  return (
    <>
      <div className={ui.header}>
        <div>
          <Link href="/admin/crm" className={styles.backLink}>← Pipeline</Link>
          <h1 className={ui.h1}>All contacts</h1>
          <p className={ui.subtitle}>{contacts.length} customers &amp; investors</p>
        </div>
        <Link href="/admin/crm/new?kind=customer" className={ui.btnPrimary}>+ Add contact</Link>
      </div>

      {warnings.length > 0 && <div className={styles.notice}>{warnings[0]}</div>}

      <ContactsTable contacts={contacts} />
    </>
  )
}
