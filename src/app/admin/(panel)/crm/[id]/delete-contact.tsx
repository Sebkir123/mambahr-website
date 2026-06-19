'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteContact } from '../actions'
import ui from '../../admin-ui.module.css'

export function DeleteContact({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [pending, start] = useTransition()

  return (
    <button
      type="button"
      className={ui.btnGhost}
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete ${name}? This removes the contact and its full timeline and tasks. This can’t be undone.`)) return
        const fd = new FormData()
        fd.set('id', id)
        start(async () => {
          await deleteContact(fd)
          router.push('/admin/crm')
        })
      }}
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  )
}
