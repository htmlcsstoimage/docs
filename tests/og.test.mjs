import test from 'node:test';
import assert from 'node:assert/strict';
import { cardHash, signedImageUrl } from '../scripts/og.mjs';
test('OG URLs stay stable for equivalent content and change with content or design', () => {
  assert.equal(cardHash({ title: 'API', section: 'Docs' }, 'a'), cardHash({ section: 'Docs', title: 'API' }, 'a'));
  assert.notEqual(cardHash({ title: 'API' }, 'a'), cardHash({ title: 'API' }, 'b'));
  assert.notEqual(cardHash({ title: 'API' }, 'a'), cardHash({ title: 'New API' }, 'a'));
});
test('signing is deterministic and never exposes the API key in the public URL', () => {
  const key = 'test-only-secret-not-a-real-credential';
  const url = signedImageUrl('https://docs-new-docs.mike.workers.dev/_og/example/', 'test-id', key);
  assert.equal(url, signedImageUrl('https://docs-new-docs.mike.workers.dev/_og/example/', 'test-id', key));
  assert.ok(!url.includes(key));
  assert.equal(new URL(url).protocol, 'https:');
});
