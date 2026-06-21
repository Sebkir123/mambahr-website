'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteContact } from '../actions'
import { ConfirmButton } from '../../_components/confirm-button'
import ui from '../../admin-ui.module.css'

export function DeleteContact({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [pending, start] = useTransition()

  function doDelete() {
    const fd = new FormData()
    fd.set('id', id)
    start(async () => {
      await deleteContact(fd)
      router.push('/admin/crm')
    })
  }

  return (
    <ConfirmButton
      onConfirm={doDelete}
      confirmLabel={`Delete ${name}`}
      pending={pending}
      className={ui.btnGhost}
    >
      Delete
    </ConfirmButton>
  )
}
