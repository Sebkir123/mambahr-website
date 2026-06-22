import 'server-only'
import { randomBytes } from 'node:crypto'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// The investor-deck route slug. Random + unguessable so the deck can't be found
// by guessing /deck; the route folder (src/app/<DECK_SLUG>) matches this exactly.
// Access is further gated by a per-recipient token (?k=), see resolveDeckLink.
export const DECK_SLUG = 'deck-b08abdaaf83c'

export type DeckLink = {
  id: string
  recipient_name: string
  recipient_org: string | null
}

// Validate a viewer token WITHOUT exposing the deck_links table: resolve_deck_link
// is a SECURITY DEFINER function the anon role may call, returning the recipient
// only for a live (non-revoked) token. Returns null for missing/unknown/revoked.
export async function resolveDeckLink(
  token: string | null | undefined,
): Promise<DeckLink | null> {
  if (!token) return null
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc('resolve_deck_link', { p_token: token })
  if (error || !data) return null
  const row = Array.isArray(data) ? data[0] : data
  if (!row?.id) return null
  return {
    id: row.id as string,
    recipient_name: (row.recipient_name as string) ?? '',
    recipient_org: (row.recipient_org as string) ?? null,
  }
}

/** A fresh, URL-safe, unguessable recipient token (~16 chars). */
export function newDeckToken(): string {
  return randomBytes(12).toString('base64url')
}

/** The full share link for a recipient token. */
export function deckUrl(origin: string, token: string): string {
  return `${origin}/${DECK_SLUG}?k=${encodeURIComponent(token)}`
}
