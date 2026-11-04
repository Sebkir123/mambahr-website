import test from 'node:test'
import assert from 'node:assert/strict'
import { isAdminEmail } from '../../src/lib/admin-domain.ts'

test('the approved publishing team passes the shared admin gate, including case-insensitive email claims', () => {
  for (const email of ['seb.kirsch@mambahr.com', 'brian.bell@mambahr.com', 'audley.harley@mambahr.com', 'jasimen.harley@mambahr.com', 'mark.bahle@mambahr.com', 'petra.gojun@mambahr.com']) {
    assert.equal(isAdminEmail(email), true, email)
    assert.equal(isAdminEmail(email.toUpperCase()), true, email)
  }
})
test('admin access remains restricted to named addresses rather than opening the whole domain', () => {
  for (const email of [null, undefined, '', 'unapproved@mambahr.com', 'audley.harley@example.com', 'audley.harley@mambahr.com.evil.test', 'jasimen.harley+alias@mambahr.com', 'mark.bahle@evilmambahr.com', 'petra.gojun@mambahr.com\n']) {
    assert.equal(isAdminEmail(email), false, String(email))
  }
})
