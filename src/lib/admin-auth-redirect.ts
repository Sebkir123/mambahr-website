export function safeAdminNext(value: string | null | undefined): string {
  return value && /^\/admin(?:\/|\?|$)/.test(value) && !value.includes('\\') && !/[\r\n]/.test(value) ? value : '/admin'
}
