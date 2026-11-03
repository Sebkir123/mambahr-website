// PostgREST caps a response at the project's configured row limit. A larger
// .limit() does not override that cap. Fetch bounded pages for admin lists and
// tell the caller when its safety limit prevents a complete result.
export async function readAdminRows<T>(
  read: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  maxRows = 10000,
): Promise<{ rows: T[]; error: string | null; truncated: boolean }> {
  const rows: T[] = []
  const batchSize = 500
  for (let from = 0; from < maxRows; from += batchSize) {
    const size = Math.min(batchSize, maxRows - from)
    const { data, error } = await read(from, from + size - 1)
    if (error) return { rows, error: error.message, truncated: false }
    rows.push(...(data ?? []))
    if (!data || data.length < size) return { rows, error: null, truncated: false }
  }
  // A full last page may be exactly the end. Probe one extra row rather than
  // showing a false "incomplete" warning for a list at the exact boundary.
  const probe = await read(maxRows, maxRows)
  return { rows, error: probe.error?.message ?? null, truncated: Boolean(probe.data?.length) }
}
