import test from 'node:test'
import assert from 'node:assert/strict'
import { signUnsubscribe, verifyUnsubscribe, unsubscribeQuery } from '../../src/lib/unsubscribe-token.ts'

const KEY = 'test-key-not-a-secret'

test('a signed link names the address it was made for, lowercased', () => {
  const { e, t } = signUnsubscribe('Dana.Whitfield@Example.com ', KEY)
  assert.equal(verifyUnsubscribe(e, t, KEY), 'dana.whitfield@example.com')
})

test('a link signed with another key, or with a swapped address, is refused', () => {
  const { e, t } = signUnsubscribe('dana@example.com', KEY)
  assert.equal(verifyUnsubscribe(e, t, 'another-key'), null)
  const other = signUnsubscribe('someone@example.com', KEY)
  assert.equal(verifyUnsubscribe(other.e, t, KEY), null)
  assert.equal(verifyUnsubscribe(e, t.slice(0, -2) + 'AA', KEY), null)
})

test('missing, malformed or oversized parameters are refused without throwing', () => {
  for (const [e, t] of [[null, null], ['', ''], ['a', undefined], ['!!', 'x'], ['a'.repeat(500), 'b'], [Buffer.from('not-an-email').toString('base64url'), 'x']]) {
    assert.equal(verifyUnsubscribe(e, t, KEY), null, String(e))
  }
})

test('the query string carries only url-safe characters', () => {
  assert.match(unsubscribeQuery('a+b@example.com', KEY), /^e=[A-Za-z0-9_-]+&t=[A-Za-z0-9_-]+$/)
})
