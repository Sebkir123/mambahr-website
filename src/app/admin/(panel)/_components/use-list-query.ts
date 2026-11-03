'use client'
import { useSearchParams } from 'next/navigation'
import { listQuery, patchListQuery } from '@/lib/admin-list-query'
export function useListQuery(statuses: readonly string[], sorts: readonly string[]) {
  const params = useSearchParams()
  const state = listQuery(new URLSearchParams(params.toString()), statuses, sorts)
  function change(patch: Record<string, string | number>) {
    const query = patchListQuery(window.location.search, patch, { status: statuses[0], sort: sorts[0], page: 1, q: '' })
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
  }
  return { ...state, setQuery: (q: string) => change({ q, page: 1 }), setStatus: (status: string) => change({ status, page: 1 }), setSort: (sort: string) => change({ sort, page: 1 }), setPage: (page: number) => change({ page }), clear: () => change({ q: '', status: statuses[0], sort: sorts[0], page: 1 }) }
}
