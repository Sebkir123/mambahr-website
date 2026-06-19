'use client'

// Submit button that asks for confirmation before letting its <form> (a server
// action) fire — used for destructive admin actions (disconnect / delete) so a
// non-technical manager can't wipe a connection or post in one misclick.
export function ConfirmSubmit({
  children,
  className,
  confirm,
}: {
  children: React.ReactNode
  className?: string
  confirm: string
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirm)) e.preventDefault()
      }}
    >
      {children}
    </button>
  )
}
