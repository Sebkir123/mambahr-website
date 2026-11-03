import type { IconName } from './icon'
export type NavItem = { href: string; label: string; icon: IconName; exact?: boolean }
export const NAVIGATION: { label: string; items: NavItem[] }[] = [
  { label: 'Workspace', items: [
    { href: '/admin', label: 'Overview', icon: 'home', exact: true },
    { href: '/admin/site', label: 'Website analytics', icon: 'chart' },
  ] },
  { label: 'Relationships', items: [
    { href: '/admin/customers', label: 'Customers', icon: 'briefcase' },
    { href: '/admin/investors', label: 'Investors', icon: 'people' },
    { href: '/admin/crm/contacts', label: 'All contacts', icon: 'people' },
    { href: '/admin/leads', label: 'Incoming leads', icon: 'inbox' },
  ] },
  { label: 'Publishing', items: [
    { href: '/admin/blog', label: 'Blog', icon: 'file' },
    { href: '/admin/resources', label: 'Resources', icon: 'book' },
    { href: '/admin/field-guides', label: 'Field guides', icon: 'book' },
    { href: '/admin/seo', label: 'Search health', icon: 'search' },
  ] },
]
export const PAGES = NAVIGATION.flatMap((group) => group.items)
export function activeNav(pathname: string, kind: string | null): string {
  if (pathname === '/admin/crm' || pathname === '/admin/crm/new') return kind === 'investor' ? '/admin/investors' : '/admin/customers'
  if (pathname.startsWith('/admin/crm/')) return '/admin/crm/contacts'
  return PAGES.find((item) => item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`))?.href ?? '/admin'
}
