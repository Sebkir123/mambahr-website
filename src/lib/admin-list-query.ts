/** URL-backed list state; omit defaults and preserve unrelated parameters. */
export function listQuery(params: URLSearchParams, statuses: readonly string[], sorts: readonly string[]) {
  const page = Number(params.get('page'))
  return { query: (params.get('q') ?? '').slice(0, 200), status: statuses.includes(params.get('status') ?? '') ? params.get('status')! : statuses[0], sort: sorts.includes(params.get('sort') ?? '') ? params.get('sort')! : sorts[0], page: Number.isSafeInteger(page) && page > 0 ? page : 1 }
}
export function patchListQuery(search: string, patch: Record<string, string | number>, defaults: Record<string, string | number>) {
  const params = new URLSearchParams(search)
  for (const [key, value] of Object.entries(patch)) {
    if (String(value) === String(defaults[key]) || value === '') params.delete(key)
    else params.set(key, String(value).slice(0, 200))
  }
  return params.toString()
}
