'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteContact } from '../actions'
import { ConfirmButton } from '../../_components/confirm-button'
import ui from '../../admin-ui.module.css'

export function DeleteContact({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [error, setError] = useState('')

  function doDelete() {
    const fd = new FormData()
    fd.set('id', id)
    start(async () => {
      setError('')
      try {
        const result = await deleteContact(fd)
        if (!result.ok) { setError(result.message); return }
        router.push('/admin/crm')
      } catch { setError('The contact could not be deleted. Please try again.') }
    })
  }

  return (
    <div>
    <ConfirmButton
      onConfirm={doDelete}
      confirmLabel={`Delete ${name}`}
      pending={pending}
      className={ui.btnGhost}
    >
      Delete
    </ConfirmButton>
    {error && <p role="alert" className={ui.error}>{error}</p>}
    </div>
  )
}
