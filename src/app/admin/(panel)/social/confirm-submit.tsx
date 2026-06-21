'use client'

import { useTransition } from 'react'
import { ConfirmButton } from '../_components/confirm-button'

// Wraps a server action in the inline two-step confirm pattern. Pass the
// action + formData builder instead of a <form> so we keep a single client
// component with no hidden inputs leaking into the DOM.
export function ConfirmSubmit({
  action,
  buildFormData,
  label,
  confirmLabel,
  className,
  children,
}: {
  action: (fd: FormData) => Promise<unknown>
  buildFormData: () => FormData
  label?: string
  confirmLabel?: string
  className?: string
  children?: React.ReactNode
}) {
  const [pending, start] = useTransition()

  function doAction() {
    start(async () => {
      await action(buildFormData())
    })
  }

  return (
    <ConfirmButton
      onConfirm={doAction}
      confirmLabel={confirmLabel}
      pending={pending}
      className={className}
    >
      {children ?? label}
    </ConfirmButton>
  )
}
