'use client'
import ui from '../admin-ui.module.css'
export const PAGE_SIZE = 25
export default function Pagination({ total, page, onPage, label = 'results' }: { total: number; page: number; onPage: (page: number) => void; label?: string }) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const current = Math.min(page, pages)
  return <div className={ui.tableFooter}><span role="status">{total === 0 ? `No ${label}` : `${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, total)} of ${total.toLocaleString()} ${label}`}</span><div className={ui.pagination}><button type="button" className={ui.pageButton} disabled={current <= 1} onClick={() => onPage(current - 1)} aria-label="Previous page">Previous</button><span>{current} / {pages}</span><button type="button" className={ui.pageButton} disabled={current >= pages} onClick={() => onPage(current + 1)} aria-label="Next page">Next</button></div></div>
}
